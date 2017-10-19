import { Injectable } from '@angular/core';
import { Store } from 'redux';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { Action, IAppState, Status, StudyActions } from '../';
import { UxScorecardService } from '../../shared';


@Injectable()
export class StudyEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchStudyOptions = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_STUDY_OPTIONS)
      .mergeMap(({payload}) => {
        return Observable.fromPromise(this.uxss.fetchStudyOptions())
          .flatMap(result => {
            let actions: Action[] = [];

            actions.push({
              type: StudyActions.FETCH_STUDIES_SUCCESS,
              payload: result
            });

            // by default, set selected study to the last item (most recent)
            if(result.length) {
              // let study = result[result.length - 1];
              let study = result[0]; // until we have all data for lastest study

              actions.push({
                type: StudyActions.SET_SELECTED_STUDY,
                payload: study
              });
            }

            return actions;
          })
          .catch(error => Observable.of({
            type: StudyActions.FETCH_STUDIES_FAILED,
            payload: error
          }));
      });
  }

  fetchInsights = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_INSIGHTS)
    .mergeMap(({payload}) => {
      return Observable.fromPromise(this.uxss.fetchStudyInsights(payload))
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
      return Observable.fromPromise(this.uxss.fetchStudyTopIssues(payload))
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

  fetchScores = (action$: ActionsObservable<Action>, store: Store<IAppState>) => {
    return action$.ofType(StudyActions.FETCH_SCORES)
    .mergeMap(({payload}) => {
      return Observable.fromPromise(this.uxss.fetchScores(payload))
        .map(result => ({
          type: StudyActions.FETCH_SCORES_SUCCESS,
          payload: result
        }))
        .catch(error => Observable.of({
          type: StudyActions.FETCH_SCORES_FAILED,
          payload: error
        }));
    });
  }
}
