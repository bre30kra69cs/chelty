import {Transition} from './types';

export const createTransition = (transition: Transition) => {
  return {
    name: transition.name ?? 'transition',
    ...transition,
  };
};
