import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { studies } from './conductedStudies';
import { AssociativeResponse, FeedbackCardData, StudyBrowser, StudyBrowserMap, StudyOptions } from '../types';


const videoBaseUrl = '/assets/videos/exp-scorecard/';

@Injectable()
export class UxScorecardService {
  private browserMap: StudyBrowserMap = {};

  constructor() {}
  
  getStudies(): Promise<StudyOptions[]> {
    return Promise.resolve(studies.map(x=> ({ id: x.id, name: x.title })));
  }

  getStudyBrowsers(id: number): Promise<StudyBrowser[]> {
    return new Promise((resolve, reject) => {
      // resolve if cached
      if(this.browserMap[id]) {
        resolve(this.browserMap[id]);
      } else {
        this.browserMap[id] = [];
      }

      let study = studies.find(x => x.id === id);

      // gaurds
      if(!study) { reject(`Study with id "${id}" not found.`); }
      if(!study.data) { reject(`Study data missing for study with id "${id}".`); }

      let totals: { [key: string]: number } = {};

      Object.keys(study.data).forEach((participant: any) => {
        let browserName = study.data[participant].__browser;

        totals[browserName] = !!totals[browserName]
          ? ++totals[browserName]
          : 1;
      });

      Object.keys(totals).forEach(key => {
        this.browserMap[id].push({name: key, count: totals[key]});
      });

      resolve(this.browserMap[id]);
    });
  }

  getFeedbackCardData(id: number, browser: string): Promise<FeedbackCardData[]> {
    return new Promise((resolve, reject) => {
      let result: FeedbackCardData[] = [];
      let study = studies.find(x => x.id === id);
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

      resolve(result);
    });
  }

}
