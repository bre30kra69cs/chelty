import {SparkContainer, Queue} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';
import {createLocker} from './locker';

export const createQueue = (): Queue<SparkContainer> => {
  const locker = createLocker();

  const sparksContainers = createStore<SparkContainer[]>([]);

  const shiftEmitter = createEmitter<SparkContainer>();

  const pushEmitter = createEmitter<SparkContainer>();

  const push = (sparkContainer: SparkContainer) => {
    if (locker.isLocked()) {
      return;
    }

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
    lock: locker.lock,
    unlock: locker.unlock,
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
