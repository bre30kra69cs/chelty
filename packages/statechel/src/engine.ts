import {Spark, Engine, Queue, Activator, Node} from './types';

export const createEngine = (queue: Queue, activator: Activator): Engine => {
  const send = (spark: Spark) => {
    queue.push(spark);
  };

  const getActive = () => {
    return activator.getActive();
  };

  const isActive = (node: Node) => {
    return activator.isActive(node);
  };

  return {
    send,
    getActive,
    isActive,
  };
};
