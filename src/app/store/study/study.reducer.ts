import { Action } from '../Action';
import { ScoreRollup } from '../../shared';
import { Study, StudyOptions } from '../../scorecard/types';

import { StudyActions as Actions } from './study.actions';

import { Status } from '../Status';

export interface IStudyState {
  error?: string;

  studyList?: Study[];
  studyListStatus?: Status;

  insights?: string[];
  topIssues?: string[];
  scores?: ScoreRollup;
}

export const initialStudyState: IStudyState = {
  error: null,

  studyList: [],
  studyListStatus: Status.notFetched,

  insights: [],
  topIssues: [],
  scores: null,
};

export function studyReducer(state: IStudyState = initialStudyState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_STUDY_OPTIONS: {
      return mergeState(state, {
        studyListStatus: Status.fetching,
      });
    }
    case Actions.FETCH_STUDIES_SUCCESS: {
      return mergeState(state, {
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
    case Actions.FETCH_SCORES_SUCCESS: {
      return mergeState(state, {
        scores: payload,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IStudyState, mergeState: IStudyState) => Object.assign({}, currentState, mergeState);
