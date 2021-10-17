import {SparkContainer, Queue} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';
import {createLocker} from './locker';

export const createQueue = (): Queue<SparkContainer> => {
  const locker = createLocker();

  const sparksContainersStore = createStore<SparkContainer[]>([]);

  const shiftEmitter = createEmitter<SparkContainer>();

  const pushEmitter = createEmitter<SparkContainer>();

  const push = (sparkContainer: SparkContainer) => {
    if (locker.isLocked()) {
      return;
    }

    sparksContainersStore.get().push(sparkContainer);
    pushEmitter.emit(sparkContainer);
  };

  const shift = () => {
    const sparksContainer = sparksContainersStore.get().shift();

    if (sparksContainer) {
      shiftEmitter.emit(sparksContainer);
    }

    return sparksContainer;
  };

  const head = () => {
    return sparksContainersStore.get().at(0);
  };

  const last = () => {
    return sparksContainersStore.get().at(-1);
  };

  const tail = () => {
    const [, ...rest] = sparksContainersStore.get();
    return rest;
  };

  const body = () => {
    const [, ...rest] = [...sparksContainersStore.get()].reverse();
    return rest.reverse();
  };

  return {
    lock: locker.lock,
    unlock: locker.unlock,
    onShift: shiftEmitter.listen,
    onPush: pushEmitter.listen,
    push,
    shift,
    head,
    last,
    tail,
    body,
  };
};
