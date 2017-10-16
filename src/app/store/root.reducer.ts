import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';

import { IBrowserState, browserReducer } from './browser';
import { IExperienceState, experiencesReducer } from './experiences';
import { IFeedbackState, feedbackReducer } from './feedback';
import { IGlobalState, globalReducer } from './global';
import { IStudyState, studyReducer } from './study';
import { ITaskState, taskReducer } from './task';


export interface IAppState {
  browser?: IBrowserState;
  experiences?: IExperienceState,
  feedback?: IFeedbackState;
  global?: IGlobalState;
  study?: IStudyState;
  task?: ITaskState;

  router?: any;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    browser: browserReducer(state.browser, action),
    experiences: experiencesReducer(state.experiences, action),
    feedback: feedbackReducer(state.feedback, action),
    global: globalReducer(state.global, action),
    study: studyReducer(state.study, action),
    task: taskReducer(state.task, action),

    router: routerReducer(state.router, action as any),
  });
}
