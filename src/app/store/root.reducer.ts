import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';

import { IBrowserState, browserReducer } from './browser';
import { IFeedbackState, feedbackReducer } from './feedback';
import { IStudyState, studyReducer } from './study';


export interface IAppState {
  browser?: IBrowserState;
  feedback?: IFeedbackState;
  study?: IStudyState;

  router?: any;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    browser: browserReducer(state.browser, action),
    feedback: feedbackReducer(state.feedback, action),
    study: studyReducer(state.study, action),

    router: routerReducer(state.router, action as any),
  });
}
