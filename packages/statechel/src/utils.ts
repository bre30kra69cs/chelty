import {State} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isCompoundedState = (state: State) => {
  return !!state?.childrens.length;
};

export const isAtomicState = (state: State) => {
  return !isCompoundedState(state);
};
