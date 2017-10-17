import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Action } from '../Action';
import { UxScorecardService } from '../../shared';

import { TaskActions } from './task.actions';


@Injectable()
export class TaskEpics {
  constructor(private uxss: UxScorecardService) {}

  fetchTasks = (action$: ActionsObservable<Action>, store: any) => {
    return action$.ofType(TaskActions.FETCH_TASKS)
      .mergeMap(({payload}) => {
        let { studyId, experienceId } = payload;

        return Observable.fromPromise(this.uxss.fetchTasks(studyId, experienceId))
          .flatMap(result => {
            let actions: Action[] =[];
            
            actions.push({
              type: TaskActions.FETCH_TASKS_SUCCESS,
              payload: {
                studyId,
                experienceId,
                tasks: result
              }
            });

            if(result.length) {
              let task = result[0];

              actions.push({
                type: TaskActions.SET_SELECTED_TASK,
                payload: task
              });
            }

            return actions;
          })
          .catch(error => Observable.of({
            type: TaskActions.FETCH_TASKS_FAILED,
            payload: {
              studyId,
              experienceId,
              error: error
            }
          }));
      });
  }
}
