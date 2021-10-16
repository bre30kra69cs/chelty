import {SparkContainer, Queue} from './types';
import {createEmitter} from './emitter';

export const createQueue = (): Queue<SparkContainer> => {
  const sparksContainers: SparkContainer[] = [];

  const emitter = createEmitter<SparkContainer>();

  const push = (sparkContainer: SparkContainer) => {
    sparksContainers.push(sparkContainer);
  };

  const shift = () => {
    const sparksContainer = sparksContainers.shift();

    if (sparksContainer) {
      emitter.emit(sparksContainer);
    }

    return sparksContainer;
  };

  const head = () => {
    return sparksContainers.at(0);
  };

  const last = () => {
    return sparksContainers.at(-1);
  };

  const tail = () => {
    const [, ...rest] = sparksContainers;
    return rest;
  };

  const body = () => {
    const [, ...rest] = [...sparksContainers].reverse();
    return rest.reverse();
  };

  const onShift = (listner: (sparkContainer: SparkContainer) => void) => {
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
