import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { Experience, StudyOptions } from '../types';
import { ScoreRollup } from '../../shared';
import { IAppState } from '../../store';


@Component({
  selector: 'browser-summary',
  templateUrl: './browser-summary.component.html',
  styleUrls: ['./browser-summary.component.scss'],
})
export class BrowserSummary implements OnDestroy {
  @select(['experiences', 'experienceList']) experienceList$: Observable<{[key: string]: Experience[]}>;
  @select(['user', 'selectedBrowsers']) selectedBrowsers$: Observable<string[]>;
  
  private subs: Subscription[] = [];

  private browserSummaries: any[] = [];
  private experiences: Experience[] = [];
  private filteredSummaries: any[] = [];
  private selectedBrowsers: string[] = [];

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      if(x) {
        this.selectedBrowsers = x;
        this.filterSummaries();
      }
    }));
    this.subs.push(this.experienceList$.subscribe(x => {
      let { experiences, study, user } = this.ngRedux.getState();

      if(x) {
        this.buildSummaries(study.scores);
        this.experiences = x[user.selectedStudy && user.selectedStudy.id] || [];
        this.filterSummaries();
      }
    }));
  }

  buildSummaries(scores: ScoreRollup) {
    if(scores) {
      this.browserSummaries = [];
      
      // build a score/wordMap cache
      scores.browserRollups.forEach(b => {
        let browserSummary = { name: b.name, score: b.score, experiences: [] as any };

        b.experienceRollups.forEach(e => {
          browserSummary.experiences.push({score: e.score, words: this.getWords(e.wordMap)});
        });

        this.browserSummaries.push(browserSummary);
      });
    }
  }

  filterSummaries() {
    this.filteredSummaries = this.browserSummaries
      .filter(bs => this.selectedBrowsers.includes(bs.name))
      .sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        return (aName === 'edge' || (aName < bName && bName !== 'edge'))
          ? -1
          : (bName === 'edge' || bName < aName)
            ? 1
            : 0;
      });
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  getWords(wm: any): any[] {
    let result = Object.keys(wm).map(x => [x, wm[x]]).sort((a, b) => a[1] < b[1] ? -1 : b[1] < a[1] ? 1 : 0);

    result = result.slice(-(3));

    return result;
  }
}
