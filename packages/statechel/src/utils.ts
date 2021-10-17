import {Scheme} from './types';

export const tap = <T>(value: T): T => {
  return value;
};

export const isCompoundScheme = (scheme: Scheme) => {
  return !!scheme?.levers?.length;
};

export const isAtomicScheme = (scheme: Scheme) => {
  return !isCompoundScheme(scheme);
};
