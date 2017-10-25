import { Action } from '../Action';

import { GlobalActions as Actions } from './global.actions';

const sortItems = ['Avg Score', 'Findable', 'Usable', 'Predictable', 'Useful'];

export interface IGlobalState {
  showDimensionPanel?: boolean;
  feedbackSort?: string;
  feedbackSortOptions?: string[];
}

export const initialGlobalState: IGlobalState = {
  showDimensionPanel: true,

  feedbackSort: 'Avg Score',
  feedbackSortOptions: sortItems,
};

export function globalReducer(state: IGlobalState = initialGlobalState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.SET_FEEDBACK_SORT: {
      return mergeState(state, {
        feedbackSort: payload,
      });
    }
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

const mergeState = (currentState: IGlobalState, mergeState: IGlobalState) => Object.assign({}, currentState, mergeState);