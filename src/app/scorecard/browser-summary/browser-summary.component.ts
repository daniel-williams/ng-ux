import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { Experience, StudyOptions } from '../types';
import { ScoreRollup } from '../../shared';
import { IAppState, Status, ExperiencesActions } from '../../store';

@Component({
  selector: 'browser-summary',
  templateUrl: './browser-summary.component.html',
  styleUrls: ['./browser-summary.component.scss']
})
export class BrowserSummary implements OnDestroy {
  @select(['browser', 'selectedBrowsers']) selectedBrowsers$: Observable<string[]>;
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['experiences', 'experienceList']) experienceList$: Observable<{[key: string]: Experience[]}>;
  // @select(['experiences', 'experienceListStatus']) experienceListStatus$: Observable<{[key: string]: Status}>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;

  private selectedBrowsers: string[] = [];
  private selectedStudy: StudyOptions;
  private experienceList: {[key: string]: Experience[]} = {};
  private experiences: Experience[] = [];
  private scores: ScoreRollup = null;

  private subs: Subscription[] = [];

  private browserSummaries: any[] = [];
  private filteredSummaries: any[] = [];

  constructor(private experiencesActions: ExperiencesActions, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      if(x) {
        this.selectedBrowsers = x;
        this.setFilteredSummaries();
      }
    }));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
    this.subs.push(this.experienceList$.subscribe(x => {
      if(x && this.selectedStudy) {
        this.experienceList = x;
        this.experiences = this.experienceList[this.selectedStudy.id];
        this.setFilteredSummaries()
      }
    }));

    this.subs.push(this.scores$.subscribe(x => {
      if(x) {
        this.scores = x;
        this.browserSummaries = [];
        
        // build a score/wordMap cache
        this.scores.browserRollups.forEach(b => {
          let browserSummary = { name: b.name, score: b.score, experiences: [] as any };

          b.experienceRollups.forEach(e => {
            browserSummary.experiences.push({score: e.score, words: this.getWords(e.wordMap)});
          });

          this.browserSummaries.push(browserSummary);
        });
      }

    }));
  }

  setFilteredSummaries() {
    this.filteredSummaries = this.browserSummaries.filter(bs => this.selectedBrowsers.includes(bs.name));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  // getBrowserScore(browserName: string) {
  //   return this.scores
  //     ? this.scores.browserRollups.find(x => x.name === browserName).score
  //     : '-';
  // }

  // getExperienceScore(browserName: string, expId: number) {
  //   return this.scores
  //     ? this.scores.browserRollups
  //       .find(x => x.name === browserName)
  //       .experienceRollups.find(x => x.id === expId).score || ''
  //     : '';
  // }

  getWords(wm: any): any[] {
    let result = Object.keys(wm).map(x => [x, wm[x]]).sort((a, b) => a[1] < b[1] ? -1 : b[1] < a[1] ? 1 : 0);

    result = result.slice(-(3));

    return result;
  }
}
