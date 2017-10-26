import { Action } from '../Action';
import { StudyBrowser } from '../../scorecard/types';

import { BrowserActions as Actions } from './browser.actions';

import { Status } from '../Status';

export interface IBrowserState {
  error?: string;
  showPanel?: boolean;

  browserList?: StudyBrowser[];
  browserListStatus?: Status,
}

export const initialBrowserState: IBrowserState = {
  error: null,
  showPanel: false,

  browserList: [],
  browserListStatus: Status.notFetched,
};

export function browserReducer(state: IBrowserState = initialBrowserState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_BROWSERS: {
      return mergeState(state, {
        browserListStatus: Status.fetching,
      });
    }
    case Actions.FETCH_BROWSERS_SUCCESS: {
      return mergeState(state, {
        browserList: payload,
        browserListStatus: Status.fetched,
      });
    }
    case Actions.FETCH_BROWSERS_FAILED: {
      return mergeState(state, {
        browserList: [],
        error: payload,
        browserListStatus: Status.errorFetching,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IBrowserState, mergeState: IBrowserState) => Object.assign({}, currentState, mergeState);
