import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { Experience } from '../../scorecard/types';
import { IAppState } from '../';


@Injectable()
export class ExperiencesActions {
  static FETCH_EXPERIENCES = 'FETCH_EXPERIENCES';
  static FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
  static FETCH_EXPERIENCES_FAILED = 'FETCH_EXPERIENCES_FAILED';

  static SET_SELECTED_EXPERIENCE = 'SET_SELECTED_EXPERIENCE';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchExperiences(id: number): void {
    this.ngRedux.dispatch({
      type: ExperiencesActions.FETCH_EXPERIENCES,
      payload: id,
    });
  }

  setSelectedExperience(experience: Experience) {
    this.ngRedux.dispatch({
      type: ExperiencesActions.SET_SELECTED_EXPERIENCE,
      payload: experience
    });
  }
}
