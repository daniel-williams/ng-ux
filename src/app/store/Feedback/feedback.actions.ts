import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../';


@Injectable()
export class FeedbackActions {
  static FETCH_FEEDBACK = 'FETCH_FEEDBACK';
  static FETCH_FEEDBACK_SUCCESS = 'FETCH_FEEDBACK_SUCCESS';
  static FETCH_FEEDBACK_FAILED = 'FETCH_FEEDBACK _FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchFeedback(options: { id: number, browsers: string[] }): void {
    this.ngRedux.dispatch({
      type: FeedbackActions.FETCH_FEEDBACK,
      payload: options,
    });
  }
}