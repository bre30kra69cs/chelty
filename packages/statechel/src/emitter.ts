import {Emitter, EmitterAction, Lifecycle} from './types';
import {createStore} from './store';

export const createEmitter = <T = void>(): Emitter<T> => {
  const listners = createStore<EmitterAction<T>[]>([]);

  const emit: EmitterAction<T> = (message) => {
    listners.get().forEach((listner) => listner(message));
  };

  const unlisten = (action: EmitterAction<T>) => {
    listners.set(listners.get().filter((listner) => listner !== action));
  };

  const listen: Lifecycle<EmitterAction<T>> = (listner) => {
    unlisten(listner);
    listners.get().push(listner);

    return () => {
      unlisten(listner);
    };
  };

  return {
    emit,
    listen,
  };
};
