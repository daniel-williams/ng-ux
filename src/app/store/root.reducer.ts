import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';
import { IStudyState, studyReducer } from './study';
import { IBrowserState, browserReducer } from './browser';


export interface IAppState {
  browser?: IBrowserState;
  study?: IStudyState;

  router?: any;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    browser: browserReducer(state.browser, action),
    study: studyReducer(state.study, action),

    router: routerReducer(state.router, action as any),
  });
}
