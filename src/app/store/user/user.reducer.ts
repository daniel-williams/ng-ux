import { Action } from '../Action';
import { Experience, StudyOptions, StudyStep } from '../../scorecard/types';

import { UserActions as Actions } from './user.actions';

const sortItems = ['Avg Score', 'Findable', 'Usable', 'Predictable', 'Useful'];

export interface IUserState {
  showDimensionPanel?: boolean;

  feedbackSort?: string;
  feedbackSortOptions?: string[];

  selectedBrowsers?: string[];
  selectedExperience?: Experience,
  selectedStudy?: StudyOptions;
  selectedTask?: StudyStep,
}

export const initialUserState: IUserState = {
  showDimensionPanel: true,

  feedbackSort: 'Avg Score',
  feedbackSortOptions: sortItems,

  selectedBrowsers: [],
  selectedExperience: null,
  selectedStudy: null,
};

export function userReducer(state: IUserState = initialUserState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    // Selected feedback sort
    case Actions.SET_FEEDBACK_SORT: {
      return mergeState(state, {
        feedbackSort: payload,
      });
    }
    // Seleceted browsers
    case Actions.SET_SELECTED_BROWSERS: {
      return mergeState(state, {
        selectedBrowsers: payload,
      });
    }
    // Selected experience
    case Actions.SET_SELECTED_EXPERIENCE: {
      return mergeState(state, {
        selectedExperience: payload,
      });
    }
    // Selected study
    case Actions.SET_SELECTED_STUDY: {
      return mergeState(state, {
        selectedStudy: payload,
      });
    }
    // Selected task
    case Actions.SET_SELECTED_TASK: {
      return mergeState(state, {
        selectedTask: payload,
      });
    }
    // Dimension panel state
    case Actions.OPEN_DIMENSION_PANEL: {
      return mergeState(state, {
        showDimensionPanel: true,
      });
    }
    case Actions.CLOSE_DIMENSION_PANEL: {
      return mergeState(state, {
        showDimensionPanel: true,
      });
    }
    case Actions.TOGGLE_DIMENSION_PANEL: {
      return mergeState(state, {
        showDimensionPanel: !state.showDimensionPanel,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IUserState, mergeState: IUserState) => Object.assign({}, currentState, mergeState);