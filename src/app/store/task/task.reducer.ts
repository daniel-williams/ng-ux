import { Action } from '../Action';
import { StudyStep } from '../../scorecard/types';

import { TaskActions as Actions } from './task.actions';

import { Status } from '../Status';


export interface ITaskState {
  error?: string;

  taskList?: { [key: string]: StudyStep[] };
  taskListStatus?: { [key: string]: Status },
}

export const initialTaskState: ITaskState = {
  error: null,

  taskList: {},
  taskListStatus: {},
};

function buildKey(payload: any): string {
  return `${payload.studyId}-${payload.experienceId}`;
}

export function taskReducer(state: ITaskState = initialTaskState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_TASKS: {
      let key = buildKey(payload);
      let taskList = Object.assign({}, state.taskList, {
        [key]: [],
      });
      let taskListStatus = Object.assign({}, state.taskListStatus, {
        [key]: Status.fetching,
      });

      return mergeState(state, {
        error: null,
        taskList: taskList,
        taskListStatus: taskListStatus,
      });
    }
    case Actions.FETCH_TASKS_SUCCESS: {
      let key = buildKey(payload);
      let taskList = Object.assign({}, state.taskList, {
        [key]: payload.tasks,
      });
      let taskListStatus = Object.assign({}, state.taskListStatus, {
        [key]: Status.fetched,
      });

      return mergeState(state, {
        taskList: taskList,
        taskListStatus: taskListStatus,
      });
    }
    case Actions.FETCH_TASKS_FAILED: {
      let key = buildKey(payload);
      let taskListStatus = Object.assign({}, state.taskListStatus, {
        [key]: Status.errorFetching,
      });

      return mergeState(state, {
        error: payload.error,
        taskListStatus: taskListStatus,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: ITaskState, mergeState: ITaskState) => Object.assign({}, currentState, mergeState);
