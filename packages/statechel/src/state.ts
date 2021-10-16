import {State} from './types';

export const createState = (
  state: State = {
    type: 'state',
  },
) => {
  return {
    ...state,
  };
};
