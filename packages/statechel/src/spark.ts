import {Spark, SparkContainer} from './types';
import {DEFAULT_SPARK_NAME} from './names';

export const createSpark = (spark: Spark = {}): Spark => {
  return {
    name: spark.name ?? DEFAULT_SPARK_NAME,
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

export const createSystemSparkContainer = (spark: Spark): SparkContainer => {
  return {
    spark,
    type: 'system',
  };
};
