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
        let scoredExperiences = study.experiences.map(x => new ScoredExperience(x.type.id));
        let scoredBrowsers = browsers.map(x => new ScoredBrowser(x.name, scoredExperiences.slice()));
        let scoreRollup = new ScoreRollup(study.id, scoredBrowsers);

        scoredExperiences.forEach(exp => {
          study.groups.forEach(group => {
            let allExpTasks = group.studySteps.filter(step => step.experienceType && step.experienceType.id === exp.id);
            let taskInstructions = allExpTasks.filter(x => x.type === StepType.instruction);
            
            taskInstructions.forEach(x => {
              let targetTasks = allExpTasks.filter(t => t.taskType === x.taskType);
              let scoredTask = new ScoredTask(x.id);

              targetTasks
                .filter(t =>
                    t.dimensionType === DimensionType.findable ||
                    t.dimensionType === DimensionType.usable ||
                    t.dimensionType === DimensionType.predictable ||
                    t.dimensionType === DimensionType.useful)
                .forEach(t => scoredTask.scoredDimensions.push(new ScoredDimension(t.dimensionType.toString())));

              targetTasks
                .filter(t =>
                  t.dimensionType === DimensionType.desirable ||
                  t.dimensionType === DimensionType.desirableAppIcon ||
                  t.dimensionType === DimensionType.desirableButtons ||
                  t.dimensionType === DimensionType.desirableLayout || 
                  t.dimensionType === DimensionType.desirableOverflowMenu)
                .forEach(t => scoredTask.associativeDimensions.push(new AssociativeDimension(t.dimensionType.toString())));

              exp.scoredTasks.push(scoredTask);
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


export class ScoredBrowser {
  public score: number;

  constructor(
    public name: string,
    public scoredExperiences: ScoredExperience[] = []) { }
}
export class ScoredExperience {
  public score: number;

  constructor(
    public id: number,
    public scoredTasks: ScoredTask[] = []) { }
}
export class ScoredTask {
  public score: number;

  constructor(
    public id: number,
    public scoredDimensions: ScoredDimension[] = [],
    public associativeDimensions: AssociativeDimension[] = []) { }
}
export class ScoredDimension {
  public score: number;

  constructor(
    public type: string) { }
}
export class AssociativeDimension {
  public wordMap: {[key: string]: number}

  constructor(
    public type: string) { }
}

export class ScoreRollup {
  constructor(
    public id: number,
    public scoredBrowsers: ScoredBrowser[] = []) { }
}