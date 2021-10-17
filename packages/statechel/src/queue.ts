import {SparkContainer, Queue} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createQueue = (): Queue<SparkContainer> => {
  const sparksContainers = createStore<SparkContainer[]>([]);

  const shiftEmitter = createEmitter<SparkContainer>();

  const pushEmitter = createEmitter<SparkContainer>();

  const push = (sparkContainer: SparkContainer) => {
    sparksContainers.get().push(sparkContainer);
    pushEmitter.emit(sparkContainer);
  };

  const shift = () => {
    const sparksContainer = sparksContainers.get().shift();

    if (sparksContainer) {
      shiftEmitter.emit(sparksContainer);
    }

    return sparksContainer;
  };

  const head = () => {
    return sparksContainers.get().at(0);
  };

  const last = () => {
    return sparksContainers.get().at(-1);
  };

  const tail = () => {
    const [, ...rest] = sparksContainers.get();
    return rest;
  };

  const body = () => {
    const [, ...rest] = [...sparksContainers.get()].reverse();
    return rest.reverse();
  };

  const onShift = (listner: (sparkContainer: SparkContainer) => void) => {
    return shiftEmitter.listen(listner);
  };

  const onPush = (listner: (sparkContainer: SparkContainer) => void) => {
    return pushEmitter.listen(listner);
  };

  return {
    push,
    shift,
    head,
    last,
    tail,
    body,
    onShift,
    onPush,
  };
};
