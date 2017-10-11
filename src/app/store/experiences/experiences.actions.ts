import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class ExperiencesActions {
  static FETCH_EXPERIENCES = 'FETCH_EXPERIENCES';
  static FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
  static FETCH_EXPERIENCES_FAILED = 'FETCH_EXPERIENCES_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchExperiences(id: number): void {
    this.ngRedux.dispatch({
      type: ExperiencesActions.FETCH_EXPERIENCES,
      payload: id,
    });
  }
}
