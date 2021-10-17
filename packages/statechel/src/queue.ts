import {SparkContainer, Queue} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createQueue = (): Queue<SparkContainer> => {
  const sparksContainers = createStore<SparkContainer[]>([]);

  const emitter = createEmitter<SparkContainer>();

  const push = (sparkContainer: SparkContainer) => {
    sparksContainers.get().push(sparkContainer);
  };

  const shift = () => {
    const sparksContainer = sparksContainers.get().shift();

    if (sparksContainer) {
      emitter.emit(sparksContainer);
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
