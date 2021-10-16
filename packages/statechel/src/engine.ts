import {Spark, Engine, Queue, Activator, Node, Locker} from './types';

export const createEngine = (queue: Queue, activator: Activator, locker: Locker): Engine => {
  const send = (spark: Spark) => {
    queue.push(spark);
  };

  return {
    getActive: activator.getActive,
    isActive: activator.isActive,
    send,
  };
};
