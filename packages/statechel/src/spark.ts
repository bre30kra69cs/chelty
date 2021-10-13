import exp from 'constants';
import {Spark} from './types';

export const createSpark = (spark: Spark = {}): Spark => {
  return {
    name: spark.name ?? 'spark',
    ...spark,
  };
};

export const spark = createSpark;
