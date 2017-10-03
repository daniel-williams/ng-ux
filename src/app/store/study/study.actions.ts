import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class StudyActions {
  static FETCH_STUDIES = 'FETCH_STUDIES';
  static FETCH_STUDIES_SUCCESS = 'FETCH_STUDIES_SUCCESS';
  static FETCH_STUDIES_FAILED = 'FETCH_STUDIES_FAILED';
  
  static SET_SELECTED_STUDY = 'SET_SELECTED_STUDY';

  static TOGGLE_SHOW_PANEL = 'TOGGLE_SHOW_PANEL';
  static OPEN_SHOW_PANEL = 'OPEN_SHOW_PANEL';
  static CLOSE_SHOW_PANEL = 'CLOSE_SHOW_PANEL';

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

  togglePanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.TOGGLE_SHOW_PANEL,
    });
  }

  openPanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.OPEN_SHOW_PANEL,
    });
  }

  closePanel(): void {
    this.ngRedux.dispatch({
      type: StudyActions.CLOSE_SHOW_PANEL,
    });
  }

}
