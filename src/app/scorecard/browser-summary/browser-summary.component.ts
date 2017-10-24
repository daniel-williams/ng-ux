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
  @select(['experiences', 'experienceListStatus']) experienceListStatus$: Observable<{[key: string]: Status}>;
  @select(['study', 'scores']) scores$: Observable<ScoreRollup>;

  private selectedBrowsers: string[] = [];
  private selectedStudy: StudyOptions;
  private experienceList: {[key: string]: Experience[]} = {};
  private experienceListStatus: {[key: string]: Status};
  private scores: ScoreRollup = null;

  private subs: Subscription[] = [];

  constructor(private experiencesActions: ExperiencesActions, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedBrowsers$.subscribe(x => this.selectedBrowsers = x));
    this.subs.push(this.selectedStudy$.subscribe(study => this.selectedStudy = study));
    this.subs.push(this.experienceList$.subscribe(x => this.experienceList = x));
    this.subs.push(this.experienceListStatus$.subscribe(x => this.experienceListStatus = x));
    this.subs.push(this.scores$.subscribe(x => this.scores = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  get experiences(): Experience[] {
    let result: Experience[] = [];

    if(this.selectedStudy && this.experienceListStatus && this.experienceListStatus[this.selectedStudy.id] === Status.fetched) {
      result = this.experienceList[this.selectedStudy.id];
    }

    return result;
  }

  getBrowserScore(browserName: string) {
    return this.scores
      ? this.scores.browserRollups.find(x => x.name === browserName).score
      : '-';
  }

  getExperienceScore(browserName: string, expId: number) {
    return this.scores
      ? this.scores.browserRollups
        .find(x => x.name === browserName)
        .experienceRollups.find(x => x.id === expId).score || ''
      : '';
  }
}
