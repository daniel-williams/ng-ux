import { Injectable } from '@angular/core';
import { Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { Action, FeedbackActions, IAppState } from '../';
import { UxScorecardService } from '../../shared';


@Injectable()
export class FeedbackEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchFeedback = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(FeedbackActions.FETCH_FEEDBACK)
      .mergeMap(({payload}) => {
        return Observable.fromPromise(this.uxss.fetchFeedback(payload))
          .map(result => ({
            type: FeedbackActions.FETCH_FEEDBACK_SUCCESS,
            payload: result
          }))
          .catch(error => Observable.of({
            type: FeedbackActions.FETCH_FEEDBACK_FAILED,
            payload: error
          }));
      });
  }
}
