import exp from 'constants';
import {Spark} from './types';

export const createSpark = (name = 'spark'): Spark => {
  return {
    name,
  };
};

export const spark = createSpark;
