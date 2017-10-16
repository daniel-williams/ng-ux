import { Action } from '../Action';

import { GlobalActions as Actions } from './global.actions';


export interface IGlobalState {
  showDimensionPanel?: boolean;
}

export const initialGlobalState: IGlobalState = {
  showDimensionPanel: true,
};

export function globalReducer(state: IGlobalState = initialGlobalState, action: Action) {
  const { type, payload } = action;

  switch(type) {
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