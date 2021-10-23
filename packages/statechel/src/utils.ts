import {State, StateBuild, StateType} from './types';

export const hasCompoundedStrictSign = (state: State | StateBuild) => {
  return !!state.transitions?.length && state.transitions.length > 0;
};

export const hasAtomicStrictSign = (state: State | StateBuild) => {
  return !state.transitions && !state.init;
};

export const hasParallelStrictSign = (state: State | StateBuild) => {
  return !!state.init?.length && state.init.length > 1;
};

export const getStateTypeStrictly = (state: State | StateBuild): StateType => {
  if (hasAtomicStrictSign(state)) {
    return 'atomic';
  }

  if (hasCompoundedStrictSign(state) && !hasParallelStrictSign(state)) {
    return 'compounded';
  }

  if (!hasCompoundedStrictSign(state) && hasParallelStrictSign(state)) {
    return 'parallel';
  }

  return 'other';
};
