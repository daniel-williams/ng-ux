import { Component, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BrowserActions, IAppState, Status, IStudyState, StudyActions } from '../../store';
import { Study, StudyOptions } from '../types';

@Component({
  selector: 'top-issues',
  templateUrl: './top-issues.component.html',
  styleUrls: ['./top-issues.component.scss']
})
export class TopIssues implements OnDestroy {
  @select(['user', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;
  @select(['study', 'topIssues']) topIssues$: Observable<string[]>;

  private subs: Subscription[] = [];
  private topIssues: string[] = [];

  constructor(private studyActions: StudyActions) {

    this.subs.push(this.selectedStudy$.subscribe(x => {
      if(!!x && typeof x.id === 'number') {
        this.studyActions.fetchTopIssues(x.id);
      }
    }));
    this.subs.push(this.topIssues$.subscribe(x => this.topIssues = x));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}