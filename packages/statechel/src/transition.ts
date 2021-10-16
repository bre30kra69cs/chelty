import {Transition} from './types';

export const createTransition = (transition: Transition = {}) => {
  return {
    ...transition,
  };
};
