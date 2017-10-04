import { Action } from '../Action';
import { Study } from '../../scorecard/types';

import { StudyActions as Actions } from './study.actions';

import { Status } from '../Status';

export interface IStudyState {
  error?: string;
  showPanel?: boolean;

  studyList?: Study[];
  studyListStatus?: Status;
  
  selectedStudy?: number;
  insights?: string[];
  topIssues?: string[];
}

export const initialStudyState: IStudyState = {
  error: null,
  showPanel: false,

  studyList: [],
  studyListStatus: Status.notFetched,
  
  selectedStudy: null,
  
  insights: [],
  topIssues: [],
};

export function studyReducer(state: IStudyState = initialStudyState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_STUDIES: {
      return mergeState(state, {
        studyListStatus: Status.fetching,
      });
    }
    case Actions.FETCH_STUDIES_SUCCESS: {
      let selectedStudy = payload.length ? payload[0] : null;

      return mergeState(state, {
        selectedStudy: selectedStudy,
        studyList: payload,
        studyListStatus: Status.fetched,
      });
    }
    case Actions.FETCH_STUDIES_FAILED: {
      return mergeState(state, {
        studyList: [],
        error: payload,
        studyListStatus: Status.errorFetching,
      });
    }
    case Actions.SET_SELECTED_STUDY: {
      return mergeState(state, {
        selectedStudy: payload,
      });
    }
    case Actions.FETCH_INSIGHTS_SUCCESS: {
      return mergeState(state, {
        insights: payload,
      });
    }
    case Actions.FETCH_TOP_ISSUES_SUCCESS: {
      return mergeState(state, {
        topIssues: payload,
      });
    }
    case Actions.TOGGLE_SHOW_PANEL: {
      return mergeState(state, {
        showPanel: !state.showPanel,
      });
    }
    case Actions.CLOSE_SHOW_PANEL: {
      return mergeState(state, {
        showPanel: false,
      });
    }
    case Actions.OPEN_SHOW_PANEL: {
      return mergeState(state, {
        showPanel: true,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IStudyState, mergeState: IStudyState) => Object.assign({}, currentState, mergeState);