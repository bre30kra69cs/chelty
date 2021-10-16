import exp from 'constants';
import {Spark} from './types';

export const createExternalSpark = (name = 'spark'): Spark => {
  return {
    name,
    type: 'external',
  };
};

export const createInternalSpark = (name = 'spark'): Spark => {
  return {
    name,
    type: 'internal',
  };
};
