import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { studies } from './conductedStudies';
import {
  AssociativeResponse,
  DimensionType,
  Experience,
  FeedbackCardData,
  Study,
  StudyBrowser,
  StudyBrowserMap,
  StudyOptions,
  StepType,
  StudyStep,
  TaskType,
} from '../../scorecard/types';


const videoBaseUrl = '/assets/videos/';

@Injectable()
export class UxScorecardService {

  fetchStudyOptions(): Promise<StudyOptions[]> {
    return Promise.resolve(studies.map(x=> ({ id: x.id, name: x.title })));
  }

  fetchBrowsers(studyId: number): Promise<StudyBrowser[]> {
    return new Promise((resolve, reject) => {
      let browsers: StudyBrowser[] = [];
      let study = this.getStudy(studyId);
      let totals: { [key: string]: number } = {};

      if(study) {
        Object.keys(study.data).forEach((participant: any) => {
          let browserName = study.data[participant].__browser;

          totals[browserName] = !!totals[browserName]
          ? ++totals[browserName]
          : 1;
        });


        Object.keys(totals).forEach(key => {
          browsers.push({name: key, count: totals[key]});
        });

        resolve(browsers);
      }

      reject();
    });
  }

  fetchStudyInsights(studyId: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        resolve(study.insights || []);
      }

      reject();
    });
  }

  fetchStudyTopIssues(studyId: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        resolve(study.topIssues || []);
      }

      reject();
    });
  }

  fetchExperiences(studyId: number): Promise<Experience[]> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        resolve(study.experiences || []);
      }

      reject();
    });
  }

  fetchTasks(studyId: number, experienceId: number): Promise<StudyStep[]> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let experience = study.experiences.find(x => x.type.id === experienceId);

        if(experience) {
          let experienceType = experience.type;
          let tasks: StudyStep[] = [];

          study.groups.forEach(group => {
            group.studySteps.forEach(step => {
              if(step.type === StepType.instruction && step.experienceType === experienceType) {
                tasks.push(step);
              }
            });
          });

          resolve(tasks || []);
        }
      }

      reject();
    });
  }

  fetchFeedback(options: { studyId: number, browser: string }): Promise<{ studyId: number, browser: string, feedback: FeedbackCardData[] }> {
    let { studyId, browser } = options;

    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let result: FeedbackCardData[] = [];
        let assocResponse = study.responses[0] as AssociativeResponse;

        Object.keys(study.data).forEach((participant: any) => {
          let data = study.data[participant];
          if(data.__browser !== 'Edge' || data.__taskGroup !== 'groupA') { return; }

          let feedback: FeedbackCardData = new FeedbackCardData();
          let tasks: any = data.__tasks.slice(3,13);

          feedback.username = data.Username;
          feedback.scores = [
            { name: 'Findable', value: tasks[2] },
            { name: 'Usable', value: tasks[3] },
            { name: 'Predictable', value: tasks[4] },
            { name: 'Useful', value: tasks[5] },
          ]
          feedback.terms = Object.keys(tasks[7]).map(term => ({ name: term, isPositive: assocResponse.isPositive(term) }));
          feedback.verbatim = tasks[9];
          feedback.videoUrl = videoBaseUrl + 'UserTesting-' + participant + '.mp4';
          feedback.videoPoster = videoBaseUrl + 'edge.poster.png';
          feedback.videoOffset = tasks[0].offset;
          feedback.videoDuration = tasks[0].duration;
          feedback.scoreAverage = Math.round((feedback.scores.reduce((accum, item): number => {
            accum += item.value;
            return accum;
          }, 0) / feedback.scores.length) * 10) / 10;

          result.push(feedback);
        });

        resolve({
          studyId,
          browser,
          feedback: result,
        });
      }

      reject();
    });
  }

  fetchDimensions(studyId: number, experienceId: number, typeType: TaskType): Promise<StudyStep[]> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let experience = study.experiences.find(x => x.type.id === experienceId);

        if(experience) {
          let experienceType = experience.type;
          let tasks: StudyStep[] = [];

          study.groups.forEach(group => {
            group.studySteps.forEach(step => {
              if(step.experienceType === experienceType
                && step.taskType === typeType
                && (
                  step.dimensionType === DimensionType.findable
                  || step.dimensionType === DimensionType.usable
                  || step.dimensionType === DimensionType.predictable
                  || step.dimensionType === DimensionType.useful
                  || step.dimensionType === DimensionType.desirable
                  || step.dimensionType === DimensionType.desirableAppIcon
                  || step.dimensionType === DimensionType.desirableButtons
                  || step.dimensionType === DimensionType.desirableLayout
                  || step.dimensionType === DimensionType.desirableOverflowMenu
                )) {
                tasks.push(step);
              }
            });
          });

          resolve(tasks || []);
        }
      }

      reject();
    });
  }

  fetchScores(studyId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let browsers = this.getBrowsers(study.id);
        let experienceRollup = study.experiences.map(x => new ExperienceRollup(x.type.id));
        let browserRollups = browsers.map(x => new BrowserRollup(x.name, experienceRollup.slice()));
        let scoreRollup = new ScoreRollup(study.id, browserRollups);

        experienceRollup.forEach(exp => {
          study.groups.forEach(group => {
            let allExpTasks = group.studySteps.filter(step => step.experienceType && step.experienceType.id === exp.id);
            let taskInstructions = allExpTasks.filter(x => x.type === StepType.instruction);

            taskInstructions.forEach(x => {
              let targetTasks = allExpTasks.filter(t => t.taskType === x.taskType);
              let taskRollup = new TaskRollup(x.id);

              targetTasks
                .filter(t =>
                    t.dimensionType === DimensionType.findable ||
                    t.dimensionType === DimensionType.usable ||
                    t.dimensionType === DimensionType.predictable ||
                    t.dimensionType === DimensionType.useful)
                .forEach(t => {
                  let d = new ScoredDimension(t.dimensionType.toString());

                  d.add(4.4);
                  taskRollup.scoredDimensions.push(d);
                });

              targetTasks
                .filter(t =>
                  t.dimensionType === DimensionType.desirable ||
                  t.dimensionType === DimensionType.desirableAppIcon ||
                  t.dimensionType === DimensionType.desirableButtons ||
                  t.dimensionType === DimensionType.desirableLayout ||
                  t.dimensionType === DimensionType.desirableOverflowMenu)
                .forEach(t => {
                  let d = new AssociativeDimension(t.dimensionType.toString());

                  d.addWordMap({
                    'Familiar': 1,
                    'Professional': 2
                  });
                  taskRollup.associativeDimensions.push(d);
                });

              exp.taskRollup.push(taskRollup);
            })
          });
        })

        resolve({
          scoreRollup,
        });
      }

      reject();
    });
  }

  private getBrowsers(studyId: number) {
    let browsers: StudyBrowser[] = [];
    let study = this.getStudy(studyId);
    let totals: { [key: string]: number } = {};

    if(study) {
      Object.keys(study.data).forEach((participant: any) => {
        let browserName = study.data[participant].__browser;

        totals[browserName] = !!totals[browserName]
        ? ++totals[browserName]
        : 1;
      });


      Object.keys(totals).forEach(key => {
        browsers.push({name: key, count: totals[key]});
      });
    }

    return browsers;
  }

  private getStudy(studyId: number): Study {
    let study = studies.find(x => x.id === studyId);

    // gaurds
    if(!study) { console.error(`Study with id "${studyId}" not found.`); }
    if(!study.data) { console.error(`Study data missing for study with id "${studyId}".`); }

    return study;
  }
}


export class BrowserRollup {
  constructor(
    public name: string,
    public experienceRollup: ExperienceRollup[] = []) { }

  get average(): number {
    return this.experienceRollup.length
      ? this.experienceRollup.reduce((total, item) => {
        total += item.score;
        return total;
      }, 0) / this.experienceRollup.filter(x => x.score !== 0).length
      : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  get wordMap(): IWordMap {
    return this.experienceRollup.length
      ? combineWordMaps(this.experienceRollup.map(x => x.wordMap))
      : {};
  }
}

export class ExperienceRollup {
  constructor(
    public id: number,
    public taskRollup: TaskRollup[] = []) { }

  get average(): number {
    return this.taskRollup.length
      ? this.taskRollup.reduce((total, item) => {
        total += item.score;
        return total;
      }, 0) / this.taskRollup.filter(x => x.score !== 0).length
      : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  get wordMap(): IWordMap {
    return this.taskRollup.length
      ? combineWordMaps(this.taskRollup.map(x => x.wordMap))
      : {};
  }
}

export class TaskRollup {
  constructor(
    public id: number,
    public scoredDimensions: ScoredDimension[] = [],
    public associativeDimensions: AssociativeDimension[] = []) { }

  get average(): number {
    return this.scoredDimensions.length
      ? this.scoredDimensions.reduce((total, item) => {
        total += item.average;
        return total;
      }, 0) / this.scoredDimensions.filter(x => x.score !== 0).length
      : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  get wordMap(): IWordMap {
    return this.associativeDimensions.length
      ? combineWordMaps(this.associativeDimensions.map(x => x.wordMap))
      : {};
  }
}

export class ScoredDimension {
  private _scores: number[] = [];

  constructor(public type: string) { }

  get total(): number {
    return this._scores.reduce((total, n) => {
      total += n;
      return total;
    }, 0);
  }

  get average(): number {
    return this._scores.length
    ? this.total / this._scores.length
    : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  add(n: number) {
    this._scores.push(n);
  }

  getRawScores(): number[] {
    return this._scores.slice();
  }
}

export class AssociativeDimension {
  private _wordMap: IWordMap = {};

  constructor(public type: string) { }

  addWordMap(map: IWordMap): void {
    this._wordMap = combineWordMaps([this._wordMap, map]);
  }

  get wordMap(): IWordMap {
    return Object.assign({}, this._wordMap);
  }
}

export class ScoreRollup {
  constructor(
    public id: number,
    public browserRollups: BrowserRollup[] = []) { }
}


export interface IWordMap {
  [key: string]: number
}

function formattedScore(num: number, precision: number = 1): number {
  let p = Math.pow(10, precision);

  return num
    ? Math.round(num * p) / p
    : 0;
}

function combineWordMaps(maps: IWordMap[]): IWordMap {
  let result: IWordMap = {};

  maps.forEach(m => Object.keys(m).forEach(key => {
    if(typeof m[key] === 'number') {
      if(result[key]) {
        result[key] += m[key];
      } else {
        result[key] = m[key];
      }
    }
  }));

  return result;
}