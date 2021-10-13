import {State} from './types';

export const createState = (state: State) => {
  return {
    name: state.name ?? 'state',
    ...state,
  };
};
