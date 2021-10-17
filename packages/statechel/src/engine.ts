import {Spark, Engine, Queue, Activator, SparkContainer, Locker} from './types';
import {createInternalSparkContainer, createExternalSparkContainer} from './spark';

export const createEngine = (
  queue: Queue<SparkContainer>,
  activator: Activator,
  // TODO: ?
  locker: Locker,
): Engine<SparkContainer> => {
  const send = (sparkContainer: SparkContainer) => {
    queue.push(sparkContainer);
  };

  return {
    getActive: activator.getActive,
    isActive: activator.isActive,
    send,
  };
};

export const adaptInternalEngine = (engine: Engine<SparkContainer>): Engine<Spark> => {
  const send = (spark: Spark) => {
    engine.send(createInternalSparkContainer(spark));
  };

  return {
    getActive: engine.getActive,
    isActive: engine.isActive,
    send,
  };
};

export const adaptExternalEngine = (engine: Engine<SparkContainer>): Engine<Spark> => {
  const send = (spark: Spark) => {
    engine.send(createExternalSparkContainer(spark));
  };

  return {
    getActive: engine.getActive,
    isActive: engine.isActive,
    send,
  };
};
