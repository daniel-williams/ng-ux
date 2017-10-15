import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { StudyStep } from '../../scorecard/types';
import { IAppState } from '../';


@Injectable()
export class TaskActions {
  static FETCH_TASKS = 'FETCH_TASKS';
  static FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
  static FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

  static SET_SELECTED_TASK = 'SET_SELECTED_TASK';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  fetchTasks(studyId: number, experienceId: number): void {
    this.ngRedux.dispatch({
      type: TaskActions.FETCH_TASKS,
      payload: {
        studyId,
        experienceId
      },
    });
  }

  setSelectedTask(task: StudyStep) {
    this.ngRedux.dispatch({
      type: TaskActions.SET_SELECTED_TASK,
      payload: task
    });
  }
}
