import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { Experience, StudyOptions, StudyStep } from '../../scorecard/types';
import { IAppState } from '../';


@Injectable()
export class UserActions {
  static SET_FEEDBACK_SORT = 'SET_FEEDBACK_SORT';
  static SET_SELECTED_BROWSERS = 'SET_SELECTED_BROWSERS';
  static SET_SELECTED_EXPERIENCE = 'SET_SELECTED_EXPERIENCE';
  static SET_SELECTED_STUDY = 'SET_SELECTED_STUDY';
  static SET_SELECTED_TASK = 'SET_SELECTED_TASK';

  static OPEN_DIMENSION_PANEL = 'OPEN_DIMENSION_PANEL';
  static CLOSE_DIMENSION_PANEL = 'CLOSE_DIMENSION_PANEL';
  static TOGGLE_DIMENSION_PANEL = 'TOGGLE_DIMENSION_PANEL';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  setFeedbackSort(payload: string): void {
    this.ngRedux.dispatch({
      type: UserActions.SET_FEEDBACK_SORT,
      payload,
    });
  }

  setBrowsers(payload: string[]): void {
    this.ngRedux.dispatch({
      type: UserActions.SET_SELECTED_BROWSERS,
      payload: payload,
    });
  }

  setSelectedExperience(payload: Experience) {
    this.ngRedux.dispatch({
      type: UserActions.SET_SELECTED_EXPERIENCE,
      payload: payload
    });
  }

  setStudy(payload: StudyOptions): void {
    this.ngRedux.dispatch({
      type: UserActions.SET_SELECTED_STUDY,
      payload: payload,
    });
  }

  setSelectedTask(payload: StudyStep) {
    this.ngRedux.dispatch({
      type: UserActions.SET_SELECTED_TASK,
      payload: payload
    });
  }

  openDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: UserActions.OPEN_DIMENSION_PANEL,
    });
  }

  closeDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: UserActions.CLOSE_DIMENSION_PANEL,
    });
  }

  toggleDimensionsPanel(): void {
    this.ngRedux.dispatch({
      type: UserActions.TOGGLE_DIMENSION_PANEL,
    });
  }
}
