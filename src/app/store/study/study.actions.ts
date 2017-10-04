import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class StudyActions {
  static FETCH_STUDIES = 'FETCH_STUDIES';
  static FETCH_STUDIES_SUCCESS = 'FETCH_STUDIES_SUCCESS';
  static FETCH_STUDIES_FAILED = 'FETCH_STUDIES_FAILED';

  static FETCH_INSIGHTS = 'FETCH_INSIGHTS';
  static FETCH_INSIGHTS_SUCCESS = 'FETCH_INSIGHTS_SUCCESS';
  static FETCH_INSIGHTS_FAILED = 'FETCH_INSIGHTS_FAILED';

  static FETCH_TOP_ISSUES = 'FETCH_TOP_ISSUES';
  static FETCH_TOP_ISSUES_SUCCESS = 'FETCH_TOP_ISSUES_SUCCESS';
  static FETCH_TOP_ISSUES_FAILED = 'FETCH_TOP_ISSUES_FAILED';
  
  static SET_SELECTED_STUDY = 'SET_SELECTED_STUDY';

  static TOGGLE_STUDY_PANEL = 'TOGGLE_STUDY_PANEL';
  static OPEN_STUDY_PANEL = 'OPEN_STUDY_PANEL';
  static CLOSE_STUDY_PANEL = 'CLOSE_STUDY_PANEL';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchStudies(): void {
    this.ngRedux.dispatch({
      type: StudyActions.FETCH_STUDIES,
    });
  }

  setStudy(payload: number): void {
    this.ngRedux.dispatch({
      type: StudyActions.SET_SELECTED_STUDY,
      payload: payload,
    });
    this.closePanel();
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
