import {State} from './types';

export const createState = (state: State = {}) => {
  return {
    ...state,
  };
};
