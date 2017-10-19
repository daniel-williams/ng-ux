import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';

import { StudyOptions } from '../../scorecard/types';
import { IAppState } from '../';
import { BrowserActions } from '../browser/browser.actions';
import { ExperiencesActions } from '../experiences/experiences.actions';


@Injectable()
export class StudyActions implements OnDestroy {
  @select(['study', 'selectedStudy']) selectedStudy$: Observable<StudyOptions>;

  static FETCH_STUDY_OPTIONS = 'FETCH_STUDY_OPTIONS';
  static FETCH_STUDIES_SUCCESS = 'FETCH_STUDIES_SUCCESS';
  static FETCH_STUDIES_FAILED = 'FETCH_STUDIES_FAILED';

  static FETCH_INSIGHTS = 'FETCH_INSIGHTS';
  static FETCH_INSIGHTS_SUCCESS = 'FETCH_INSIGHTS_SUCCESS';
  static FETCH_INSIGHTS_FAILED = 'FETCH_INSIGHTS_FAILED';

  static FETCH_SCORES = 'FETCH_SCORES';
  static FETCH_SCORES_SUCCESS = 'FETCH_SCORES_SUCCESS';
  static FETCH_SCORES_FAILED = 'FETCH_SCORES_FAILED';

  static FETCH_TOP_ISSUES = 'FETCH_TOP_ISSUES';
  static FETCH_TOP_ISSUES_SUCCESS = 'FETCH_TOP_ISSUES_SUCCESS';
  static FETCH_TOP_ISSUES_FAILED = 'FETCH_TOP_ISSUES_FAILED';

  static SET_SELECTED_STUDY = 'SET_SELECTED_STUDY';

  static TOGGLE_STUDY_PANEL = 'TOGGLE_STUDY_PANEL';
  static OPEN_STUDY_PANEL = 'OPEN_STUDY_PANEL';
  static CLOSE_STUDY_PANEL = 'CLOSE_STUDY_PANEL';

  private subs: Subscription[] = [];

  constructor(
    private browserActions: BrowserActions,
    private experiencesActions: ExperiencesActions,
    private ngRedux: NgRedux<IAppState>) {

    this.subs.push(this.selectedStudy$.subscribe(study => {
      if(study) {
        // perform fetches for study change
        this.fetchInsights(study.id)
        this.fetchScores(study.id);
        this.fetchTopIssues(study.id);
        browserActions.fetchBrowsers(study.id);
        experiencesActions.fetchExperiences(study.id);
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  fetchStudyOptions(): void {
    this.ngRedux.dispatch({
      type: StudyActions.FETCH_STUDY_OPTIONS,
    });
  }

  setStudy(payload: StudyOptions): void {
    this.ngRedux.dispatch({
      type: StudyActions.SET_SELECTED_STUDY,
      payload: payload,
    });
  }

  fetchInsights(id: number): void {
    this.ngRedux.dispatch({
      type: StudyActions.FETCH_INSIGHTS,
      payload: id,
    });
  }

  fetchTopIssues(id: number): void {
    this.ngRedux.dispatch({
      type: StudyActions.FETCH_TOP_ISSUES,
      payload: id,
    });
  }

  fetchScores(studyId: number): void {
    this.ngRedux.dispatch({
      type: StudyActions.FETCH_SCORES,
      payload: studyId,
    });
  }

  togglePanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.TOGGLE_STUDY_PANEL,
    });
  }

  openPanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.OPEN_STUDY_PANEL,
    });
  }

  closePanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.CLOSE_STUDY_PANEL,
    });
  }

}
