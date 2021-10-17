import {Scheme} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isParallelScheme = (scheme: Scheme) => {
  return !!scheme?.childrens.length;
};
