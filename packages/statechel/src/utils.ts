import {State, StateBuild} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isCompoundedState = (state: State | StateBuild) => {
  return !!state.transitions?.length;
};

export const isAtomicState = (state: State | StateBuild) => {
  return !isCompoundedState(state);
};

export const isParallelState = (state: State | StateBuild) => {
  return state.init?.length && state.init.length > 1;
};
