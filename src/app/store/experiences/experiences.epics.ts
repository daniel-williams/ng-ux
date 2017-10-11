import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from '../Action';
import { UxScorecardService } from '../../shared';

import { ExperiencesActions } from './experiences.actions';


@Injectable()
export class ExperiencesEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchExperiences = (action$: ActionsObservable<Action>, store: any) => {
    return action$.ofType(ExperiencesActions.FETCH_EXPERIENCES)
      .mergeMap(({payload}) => {
        let studyId: number = payload;

        return Observable.fromPromise(this.uxss.fetchExperiences(studyId))
          .map(result => ({
            type: ExperiencesActions.FETCH_EXPERIENCES_SUCCESS,
            payload: {
              study: studyId,
              experiences: result
            }
          }))
          .catch(error => Observable.of({
            type: ExperiencesActions.FETCH_EXPERIENCES_FAILED,
            payload: {
              study: studyId,
              error: error
            }
          }));
      });
  }
}
