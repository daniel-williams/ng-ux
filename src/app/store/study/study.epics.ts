import { Injectable } from '@angular/core';
import { Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action, IAppState, Status, StudyActions } from '../';
import { UxScorecardService } from '../../shared';


@Injectable()
export class StudyEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchStudies = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_STUDIES)
      .mergeMap(({payload}) => {
        return Observable.fromPromise(this.uxss.getStudies())
          .map(result => ({
            type: StudyActions.FETCH_STUDIES_SUCCESS,
            payload: result
          }))
          .catch(error => Observable.of({
            type: StudyActions.FETCH_STUDIES_FAILED,
            payload: error
          }));
      });
  }

  fetchInsights = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_INSIGHTS)
    .mergeMap(({payload}) => {
      return Observable.fromPromise(this.uxss.getStudyInsights(payload))
        .map(result => ({
          type: StudyActions.FETCH_INSIGHTS_SUCCESS,
          payload: result
        }))
        .catch(error => Observable.of({
          type: StudyActions.FETCH_INSIGHTS_FAILED,
          payload: error
        }));
    });
  }

  fetchTopIssues = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_TOP_ISSUES)
    .mergeMap(({payload}) => {
      return Observable.fromPromise(this.uxss.getStudyTopIssues(payload))
        .map(result => ({
          type: StudyActions.FETCH_TOP_ISSUES_SUCCESS,
          payload: result
        }))
        .catch(error => Observable.of({
          type: StudyActions.FETCH_TOP_ISSUES_FAILED,
          payload: error
        }));
    });
  }
}
