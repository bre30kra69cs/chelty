import exp from 'constants';
import {Spark, SparkContainer} from './types';

export const createSpark = (spark: Spark = {}): Spark => {
  return {
    ...spark,
  };
};

export const createExternalSparkContainer = (spark: Spark): SparkContainer => {
  return {
    spark,
    type: 'external',
  };
};

export const createInternalSparkContainer = (spark: Spark): SparkContainer => {
  return {
    spark,
    type: 'internal',
  };
};
