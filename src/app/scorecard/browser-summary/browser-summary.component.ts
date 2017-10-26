import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { Experience, StudyOptions } from '../types';
import { ScoreRollup } from '../../shared';
import { IAppState, Status, ExperiencesActions, IUserState } from '../../store';

@Component({
  selector: 'browser-summary',
  templateUrl: './browser-summary.component.html',
  styleUrls: ['./browser-summary.component.scss']
})
export class BrowserSummary implements OnDestroy {
  @select(['experiences', 'experienceList']) experienceList$: Observable<{[key: string]: Experience[]}>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;
  @select(['user', 'selectedBrowsers']) selectedBrowsers$: Observable<string[]>;
  @select(['user', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  
  private subs: Subscription[] = [];

  private browserSummaries: any[] = [];
  private experiences: Experience[] = [];
  private filteredSummaries: any[] = [];
  private scores: ScoreRollup = null;
  private selectedBrowsers: string[] = [];
  private selectedStudy: StudyOptions;

  constructor(private experiencesActions: ExperiencesActions, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.experienceList$.subscribe(x => {
      if(x && this.selectedStudy) {
        this.experiences = x[this.selectedStudy.id];
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
    this.subs.push(this.selectedBrowsers$.subscribe(x => {
      if(x) {
        this.selectedBrowsers = x;
        this.setFilteredSummaries();
      }
    }));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
  }

  setFilteredSummaries() {
    this.filteredSummaries = this.browserSummaries.filter(bs => this.selectedBrowsers.includes(bs.name));
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
