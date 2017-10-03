import { routerReducer } from '@angular-redux/router';

import { Action } from './Action';
import { IStudyState, studyReducer } from './study';


export interface IAppState {
  router?: any;
  study?: IStudyState;
};

export const rootReducer = (state: IAppState = {}, action: Action): IAppState => {
  return Object.assign({}, state, {
    router: routerReducer(state.router, action as any),
    study: studyReducer(state.study, action),
  });
}
