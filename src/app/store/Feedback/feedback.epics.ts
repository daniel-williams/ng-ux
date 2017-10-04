import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from '../Action';
import { UxScorecardService } from '../../shared';

import { FeedbackActions } from './feedback.actions';


@Injectable()
export class FeedbackEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchFeedback = (action$: ActionsObservable<Action>, store: any) => {
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
