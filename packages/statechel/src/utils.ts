import {State} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isCompoundedState = (state: State) => {
  return !!state.transitions?.length;
};

export const isAtomicState = (state: State) => {
  return !isCompoundedState(state);
};

export const isParallelState = (state: State) => {
  return state.init?.length && state.init.length > 1;
};
