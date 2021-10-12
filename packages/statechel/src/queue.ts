import {Spark, Queue} from './types';
import {createEmitter} from './emitter';

export const createQueue = (): Queue => {
  const sparks: Spark[] = [];
  const emitter = createEmitter<Spark>();

  const push = (spark: Spark) => {
    sparks.push(spark);
  };

  const shift = () => {
    const spark = sparks.shift();

    if (spark) {
      emitter.emit(spark);
    }

    return spark;
  };

  const head = () => {
    return sparks.at(0);
  };

  const last = () => {
    return sparks.at(-1);
  };

  const tail = () => {
    const [, ...rest] = sparks;
    return rest;
  };

  const body = () => {
    const [, ...rest] = [...sparks].reverse();
    return rest.reverse();
  };

  const onShift = (listner: (spark: Spark) => void) => {
    return emitter.listen(listner);
  };

  return {
    push,
    shift,
    head,
    last,
    tail,
    body,
    onShift,
  };
};
