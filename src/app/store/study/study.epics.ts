import { Injectable } from '@angular/core';
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

  // TODO: only fetch 
  fetchStudies = (action$: ActionsObservable<Action>, store: any) => {
    const state = store.getState() as IAppState;

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
}
