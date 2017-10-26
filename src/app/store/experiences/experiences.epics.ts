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
import { UserActions } from '../user/user.actions';


@Injectable()
export class ExperiencesEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchExperiences = (action$: ActionsObservable<Action>, store: any) => {
    return action$.ofType(ExperiencesActions.FETCH_EXPERIENCES)
      .mergeMap(({payload}) => {
        let { studyId } = payload;

        return Observable.fromPromise(this.uxss.fetchExperiences(studyId))
          .flatMap(result => {
            let actions: Action[] = [];

            actions.push({
              type: ExperiencesActions.FETCH_EXPERIENCES_SUCCESS,
              payload: {
                studyId,
                experiences: result
              }
            });

            // by default, set selected to first item
            if(result.length) {
              let experience = result[0];

              actions.push({
                type: UserActions.SET_SELECTED_EXPERIENCE,
                payload: experience
              });
            }

            return actions;
          })
          .catch(error => Observable.of({
            type: ExperiencesActions.FETCH_EXPERIENCES_FAILED,
            payload: {
              studyId,
              error: error
            }
          }));
      });
  }
}
