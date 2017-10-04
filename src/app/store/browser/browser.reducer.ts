import { Action } from '../Action';
import { StudyBrowser } from '../../scorecard/types';

import { BrowserActions as Actions } from './browser.actions';

import { Status } from '../Status';


export interface IBrowserState {
  error?: string;
  showPanel?: boolean;
  selectedBrowsers?: string[];
  browserList?: StudyBrowser[];
  browserListStatus?: Status,
}

export const initialBrowserState: IBrowserState = {
  error: null,
  showPanel: false,
  selectedBrowsers: [],
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
    case Actions.SET_SELECTED_BROWSERS: {
      return mergeState(state, {
        selectedBrowsers: payload,
      });
    }
    case Actions.TOGGLE_BROWSER_PANEL: {
      return mergeState(state, {
        showPanel: !state.showPanel,
      });
    }
    case Actions.CLOSE_BROWSER_PANEL: {
      return mergeState(state, {
        showPanel: false,
      });
    }
    case Actions.OPEN_BROWSER_PANEL: {
      return mergeState(state, {
        showPanel: true,
      });
    }
    case Actions.RESET: {
      return mergeState(state, initialBrowserState)
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IBrowserState, mergeState: IBrowserState) => Object.assign({}, currentState, mergeState);
