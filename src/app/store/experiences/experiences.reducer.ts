import { Action } from '../Action';
import { Experience } from '../../scorecard/types';

import { ExperiencesActions as Actions } from './experiences.actions';

import { Status } from '../Status';


export interface IExperienceState {
  error?: string;
  showPanel?: boolean;
  experienceList?: { [key: string]: Experience[] };
  experienceListStatus?: { [key: string]: Status },
}

export const initialExperienceState: IExperienceState = {
  error: null,
  showPanel: false,
  experienceList: {},
  experienceListStatus: {},
};

export function experiencesReducer(state: IExperienceState = initialExperienceState, action: Action) {
  const { type, payload } = action;

  switch(type) {
    case Actions.FETCH_EXPERIENCES: {
      let key = `${payload.study}`;
      let experienceList = Object.assign({}, state.experienceList, {
        [key]: [],
      });
      let experienceListStatus = Object.assign({}, state.experienceListStatus, {
        [key]: Status.fetching,
      });
      return mergeState(state, {
        experienceList: experienceList,
        experienceListStatus: experienceListStatus,
      });
    }
    case Actions.FETCH_EXPERIENCES_SUCCESS: {
      let key = `${payload.study}`;
      let experienceList = Object.assign({}, state.experienceList, {
        [key]: payload.experiences,
      });
      let experienceListStatus = Object.assign({}, state.experienceListStatus, {
        [key]: Status.fetched,
      });
      return mergeState(state, {
        error: null,
        experienceList: experienceList,
        experienceListStatus: experienceListStatus,
      });
    }
    case Actions.FETCH_EXPERIENCES_FAILED: {
      let key = `${payload.study}`;
      let experienceListStatus = Object.assign({}, state.experienceListStatus, {
        [key]: Status.errorFetching,
      });
      return mergeState(state, {
        error: payload.error,
        experienceListStatus: experienceListStatus,
      });
    }
    default: {
      return state;
    }
  }
}

const mergeState = (currentState: IExperienceState, mergeState: IExperienceState) => Object.assign({}, currentState, mergeState);
