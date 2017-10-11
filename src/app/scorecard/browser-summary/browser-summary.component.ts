import { Component, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { Experience, StudyOptions } from '../types';
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

  private selectedBrowsers: string[] = [];
  private selectedStudy: StudyOptions;
  private experienceList: {[key: string]: Experience[]} = {};
  private experienceListStatus: {[key: string]: Status};
  
  private subs: Subscription[] = [];

  constructor(private experiencesActions: ExperiencesActions, private ngRedux: NgRedux<IAppState>) {
    this.subs.push(this.selectedBrowsers$.subscribe(x => this.selectedBrowsers = x));
    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.selectedStudy = x;
        this.experiencesActions.fetchExperiences(this.selectedStudy.id);
      }
    }));
    this.subs.push(this.experienceList$.subscribe(x => {
      this.experienceList = x;
      console.log('experienceList changed', this.experienceList);
    }));
    this.subs.push(this.experienceListStatus$.subscribe(x => this.experienceListStatus = x));
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
}
