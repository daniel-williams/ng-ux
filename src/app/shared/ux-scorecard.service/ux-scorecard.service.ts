import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { studies } from './conductedStudies';
import {
  AssociativeResponse,
  GradedResponse,
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
  VerbatimResponse,
} from '../../scorecard/types';
import {
  desirableResponse,
} from './conductedStudies/common.types';

const videoBaseUrl = '/assets/videos/';
// TODO djw: decide if these should be part of the study definition
const scoredDimensionTypes: DimensionType[] = [
  DimensionType.findable,
  DimensionType.usable,
  DimensionType.predictable,
  DimensionType.useful,
];
const associativeDimensionTypes: DimensionType[] = [
  DimensionType.desirable,
  DimensionType.desirableAppIcon,
  DimensionType.desirableButtons,
  DimensionType.desirableLayout,
  DimensionType.desirableOverflowMenu,
];


@Injectable()
export class UxScorecardService {

  fetchStudyOptions(): Promise<StudyOptions[]> {
    return Promise.resolve(studies.map(x=> ({ id: x.id, name: x.title })));
  }

  fetchBrowsers(studyId: number): Promise<StudyBrowser[]> {
    return new Promise((resolve, reject) => {
      resolve(this.getBrowsers(studyId));
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

  fetchFeedback(options: { studyId: number, experienceId: number, taskId: number }): Promise<{ studyId: number, experienceId: number, taskId: number, feedback: FeedbackCardData[] }> {
    let { studyId, experienceId, taskId } = options;
    // let assocResponse = study.responses[0] as AssociativeResponse; // FIX

    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let groupTasks: IGroupTasks = this.findResponses(study, experienceId, taskId);
        let taskResponses: {
          [key: string]: {
            task: StudyStep,
            responses: any[],
          }
        } = {};

        let participantData = Object.keys(study.data)
          .filter(key => study.data[key]['__taskGroup'] === groupTasks.group)
          .map(key => {
            let p = study.data[key]
            p.userId = key;
            return p;
          });
        let feedbackCardData: FeedbackCardData[] = [];
        let userDetailsMask: any = {
          '__browser': undefined,
          '__session': undefined,
          '__timestamp': undefined,
          '__taskGroup': undefined,
          '__tasks': undefined,
        };

        participantData.forEach(data => {
          let userDetails = Object.assign({}, data, userDetailsMask);
          let videoOffset: number;
          let videoDuration: number;
          let videoUrl: string;
          let videoPoster: string;
          let verbatim: string;
          let terms: {name: string, isPositive: boolean}[] = [];

          let videoTask = groupTasks.tasks.find(t => t.type === StepType.instruction && t.responseType === null);
          let verbatimTask = groupTasks.tasks.find(t => t.type === StepType.question && t.responseType instanceof VerbatimResponse);
          let associateTask = groupTasks.tasks.find(t => t.type === StepType.question && t.responseType instanceof AssociativeResponse);

          if(videoTask) {
            let videoTaskData = data['__tasks'][videoTask.id];

            videoOffset = videoTaskData['offset'];
            videoDuration = videoTaskData['duration'];
            if(videoOffset && videoDuration) {
              videoUrl = videoBaseUrl + 'UserTesting-' + userDetails['userId'] + '.mp4';
              videoPoster = videoBaseUrl + 'edge.poster.png';
            }
          }

          if(verbatimTask) {
            verbatim = data['__tasks'][verbatimTask.id];
          }

          if(associateTask) {
            let associateTaskData = data['__tasks'][associateTask.id];

            Object.keys(associateTaskData).forEach(term => {
              terms.push({
                name: term,
                isPositive: desirableResponse.isPositive(term)
              });
            });
          }

          let feedback = new FeedbackCardData({
            terms,
            userDetails: userDetails,
            videoOffset,
            videoDuration,
            videoUrl,
            videoPoster,
            verbatim,
          });

          feedbackCardData.push(feedback);
        });

        console.log(groupTasks, feedbackCardData);
        // result.username = participant.Username;
        // result.scores = [
        //   { name: 'Findable', value: tasks[2] },
        //   { name: 'Usable', value: tasks[3] },
        //   { name: 'Predictable', value: tasks[4] },
        //   { name: 'Useful', value: tasks[5] },
        // ];
        // result.terms = Object.keys(tasks[7]).map(term => ({ name: term, isPositive: assocResponse.isPositive(term) }));
        // result.verbatim = tasks[9];
        // result.videoUrl = videoBaseUrl + 'UserTesting-' + key + '.mp4';
        // result.videoPoster = videoBaseUrl + 'edge.poster.png';
        // result.videoOffset = tasks[0].offset;
        // result.videoDuration = tasks[0].duration;
        // result.scoreAverage = Math.round((result.scores.reduce((accum, item): number => {
        //   accum += item.value;
        //   return accum;
        // }, 0) / result.scores.length) * 10) / 10;

        // result.push(result);

        resolve({
          studyId,
          experienceId,
          taskId,
          feedback: feedbackCardData,
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

  fetchScores(studyId: number): Promise<ScoreRollup> {
    return new Promise((resolve, reject) => {
      let study = this.getStudy(studyId);

      if(study) {
        let browsers = this.getBrowsers(study.id);
        let scoreRollup = new ScoreRollup(study.id, browsers.map(x => new BrowserRollup(x.name, study)));

        resolve(scoreRollup);
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

  private findResponses(study: Study, eId: number, tId: number): IGroupTasks {
    let result: IGroupTasks;
    let etype = study.experiences.find(e => e.type.id === eId).type;

    study.groups.forEach(g => {
      let targetTask = g.studySteps.find(step => step.id === tId && step.experienceType === etype);

      if(targetTask) {
        let steps: StudyStep[] = [];

        g.studySteps.forEach(step => {
          if(step.experienceType === etype && step.taskType === targetTask.taskType) {
            steps.push(step);
          }
        });

        result = {group: g.title, tasks: steps};
      }
    });

    return result;
  }
}


// Rollup classes for calculated values
export class ScoreRollup {
  constructor(public id: number, public browserRollups: BrowserRollup[] = []) { }
}

export class BrowserRollup {
  experienceRollups: ExperienceRollup[] = [];

  constructor(public name: string, private study: Study) {
    this.experienceRollups = study.experiences.map(x => new ExperienceRollup(x.type.id));
    this.experienceRollups.forEach(exp => {
      let expData = Object.keys(study.data).map(key => study.data[key]).filter((x: any) => x.__browser === name);

      study.groups.forEach(group => {
        let groupData = expData.filter((x: any) => x.__taskGroup === group.title);
        let allExpTasks = group.studySteps.filter(step => step.experienceType && step.experienceType.id === exp.id);
        let taskInstructions = allExpTasks.filter(x => x.type === StepType.instruction);

        taskInstructions.forEach(x => {
          let targetTasks = allExpTasks.filter(t => t.taskType === x.taskType);
          let taskRollup = new TaskRollup(x.id);

          targetTasks
            .filter(t => scoredDimensionTypes.includes(t.dimensionType))
            .forEach(t => {
              let d = new ScoredDimension(t.dimensionType, t.description);

              groupData.forEach((x: any) => d.add(x.__tasks[t.id]));
              taskRollup.scoredDimensions.push(d);
            });

          targetTasks
            .filter(t => associativeDimensionTypes.includes(t.dimensionType))
            .forEach(t => {
              let d = new AssociativeDimension(t.dimensionType, t.description);

              groupData.forEach((x: any) => d.addWordMap(x.__tasks[t.id]));
              taskRollup.associativeDimensions.push(d);
            });

          exp.taskRollup.push(taskRollup);
        })
      });
    });
  }

  get average(): number {
    return this.experienceRollups.length
      ? this.experienceRollups.reduce((total, item) => {
        total += item.score;
        return total;
      }, 0) / this.experienceRollups.filter(x => x.score !== 0).length
      : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  getDimensionAverage(type: DimensionType): number {
    return this.experienceRollups.length
      ? this.experienceRollups.reduce((total, item) => {
        total += item.getDimensionAverage(type);
        return total;
      }, 0) / this.experienceRollups.filter(x => x.score !== 0).length
      : 0;
  }

  getDimensionScore(type: DimensionType): number {
    return formattedScore(this.getDimensionAverage(type), 1);
  }

  get wordMap(): IWordMap {
    return this.experienceRollups.length
      ? combineWordMaps(this.experienceRollups.map(x => x.wordMap))
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
        total += item.average;
        return total;
      }, 0) / this.taskRollup.filter(x => x.score !== 0).length
      : 0;
  }

  get score(): number {
    return formattedScore(this.average, 1);
  }

  getDimensionAverage(type: DimensionType): number {
    return this.taskRollup.length
      ? this.taskRollup.reduce((total, item) => {
        total += item.getDimensionAverage(type);
        return total;
      }, 0) / this.taskRollup.filter(x => x.score !== 0).length
      : 0;
  }

  getDimensionScore(type: DimensionType): number {
    return formattedScore(this.getDimensionAverage(type), 1);
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

  getDimensionAverage(type: DimensionType): number {
    let sd = this.scoredDimensions.find(x => x.dimensionType === type);

    return sd ? sd.average : 0;
  }

  getDimensionScore(type: DimensionType): number {
    return formattedScore(this.getDimensionAverage(type), 1);
  }

  get wordMap(): IWordMap {
    return this.associativeDimensions.length
      ? combineWordMaps(this.associativeDimensions.map(x => x.wordMap))
      : {};
  }
}

export class ScoredDimension {
  public readonly type: string = 'score';
  private _scores: number[] = [];

  constructor(public dimensionType: DimensionType, public description: string[] = []) { }

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
  public readonly type: string = 'associative';
  private _wordMap: IWordMap = {};

  constructor(public dimensionType: DimensionType, public description: string[] = []) { }

  addWordMap(map: IWordMap): void {
    this._wordMap = combineWordMaps([this._wordMap, map]);
  }

  get wordMap(): IWordMap {
    return Object.assign({}, this._wordMap);
  }
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

interface IGroupTasks {
  group: string;
  tasks: StudyStep[];
}