import {State} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isParallelState = (state: State) => {
  return !!state?.childrens.length;
};
