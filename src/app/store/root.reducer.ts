import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';

import { IBrowserState, browserReducer } from './browser';
import { IExperienceState, experiencesReducer } from './experiences';
import { IFeedbackState, feedbackReducer } from './feedback';
import { IStudyState, studyReducer } from './study';


export interface IAppState {
  browser?: IBrowserState;
  experiences?: IExperienceState,
  feedback?: IFeedbackState;
  study?: IStudyState;

  router?: any;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    browser: browserReducer(state.browser, action),
    experiences: experiencesReducer(state.experiences, action),
    feedback: feedbackReducer(state.feedback, action),
    study: studyReducer(state.study, action),

    router: routerReducer(state.router, action as any),
  });
}
