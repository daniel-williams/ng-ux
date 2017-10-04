import { Action } from '../Action';
import { FeedbackCardData } from '../../scorecard/types';

import { FeedbackActions as Actions } from './feedback.actions';

import { Status } from '../Status';


export interface IFeedbackState {
  error?: string;
  showPanel?: boolean;
  feedbackCardDataList?: FeedbackCardData[];
  feedbackCardDataListStatus?: Status,
}

export const initialFeedbackState: IFeedbackState = {
  error: null,
  showPanel: false,
  feedbackCardDataList: [],
  feedbackCardDataListStatus: Status.notFetched,
};

export function feedbackReducer(state: IFeedbackState = initialFeedbackState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_FEEDBACK: {
      return mergeState(state, {
        feedbackCardDataList: [],
        feedbackCardDataListStatus: Status.fetching,
      });
    }
    case Actions.FETCH_FEEDBACK_SUCCESS: {
      return mergeState(state, {
        feedbackCardDataList: payload,
        feedbackCardDataListStatus: Status.fetched,
      });
    }
    case Actions.FETCH_FEEDBACK_FAILED: {
      return mergeState(state, {
        error: payload,
        feedbackCardDataListStatus: Status.errorFetching,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IFeedbackState, mergeState: IFeedbackState) => Object.assign({}, currentState, mergeState);
