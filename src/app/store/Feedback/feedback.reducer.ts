import { Action } from '../Action';
import { FeedbackCardData } from '../../scorecard/types';

import { FeedbackActions as Actions } from './feedback.actions';

import { Status } from '../Status';


export interface IFeedbackState {
  error?: string;
  showPanel?: boolean;
  feedbackDataList?: { [key: string]: FeedbackCardData[] };
  feedbackDataListStatus?: { [key: string]: Status },
}

export const initialFeedbackState: IFeedbackState = {
  error: null,
  showPanel: false,
  feedbackDataList: {},
  feedbackDataListStatus: {},
};

export function feedbackReducer(state: IFeedbackState = initialFeedbackState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_FEEDBACK: {
      let key = `${payload.studyId}-${payload.experienceId}-${payload.taskId}`;
      let feedbackDataList = Object.assign({}, state.feedbackDataList, {
        [key]: [],
      });
      let feedbackDataListStatus = Object.assign({}, state.feedbackDataListStatus, {
        [key]: Status.fetching,
      });
      return mergeState(state, {
        feedbackDataList: feedbackDataList,
        feedbackDataListStatus: feedbackDataListStatus,
      });
    }
    case Actions.FETCH_FEEDBACK_SUCCESS: {
      let key = `${payload.studyId}-${payload.experienceId}-${payload.taskId}`;
      let feedbackDataList = Object.assign({}, state.feedbackDataList, {
        [key]: payload.feedback,
      });
      let feedbackDataListStatus = Object.assign({}, state.feedbackDataListStatus, {
        [key]: Status.fetched,
      });
      return mergeState(state, {
        feedbackDataList: feedbackDataList,
        feedbackDataListStatus: feedbackDataListStatus,
      });
    }
    case Actions.FETCH_FEEDBACK_FAILED: {
      let key = `${payload.studyId}-${payload.experienceId}-${payload.taskId}`;
      let feedbackDataListStatus = Object.assign({}, state.feedbackDataListStatus, {
        [key]: Status.errorFetching,
      });
      return mergeState(state, {
        error: payload,
        feedbackDataListStatus: feedbackDataListStatus,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IFeedbackState, mergeState: IFeedbackState) => Object.assign({}, currentState, mergeState);
