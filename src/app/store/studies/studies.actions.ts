import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import * as Redux from 'redux';

import { Action, IAppState } from '../';

import { UxScorecardService } from '../../scorecard/ux-scorecard.service';


@Injectable()
export class StudiesActions {

  static FETCHING_STUDIES = 'FETCHING_STUDIES';
  static FETCHING_STUDIES_SUCCESS = 'FETCHING_STUDIES_SUCCESS';
  static FETCHING_STUDIES_FAILED = 'FETCHING_STUDIES_FAILED';
  
  static SET_STUDY = 'SET_STUDY';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private uxss: UxScorecardService) {}

  fetchStudies(): void {
    this.ngRedux.dispatch({
      type: StudiesActions.FETCHING_STUDIES
    });

    this.uxss.getStudies()
      .then(studies => this.ngRedux.dispatch({
        type: StudiesActions.FETCHING_STUDIES_SUCCESS,
        payload: studies }))
      .catch(err => this.ngRedux.dispatch({
        type: StudiesActions.FETCHING_STUDIES_FAILED,
        payload: err }));
  }

  setStudy(payload: string): void {
    this.ngRedux.dispatch({
      type: StudiesActions.SET_STUDY,
      payload: payload
    });
  }

}
