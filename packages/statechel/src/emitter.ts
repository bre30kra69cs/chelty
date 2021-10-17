import {Emitter, EmitterAction, Lifecycle} from './types';
import {createStore} from './store';

export const createEmitter = <T = void>(): Emitter<T> => {
  const listnersStore = createStore<EmitterAction<T>[]>([]);

  const emit: EmitterAction<T> = (message) => {
    listnersStore.get().forEach((listner) => listner(message));
  };

  const unlisten = (action: EmitterAction<T>) => {
    listnersStore.map((listners) => listners.filter((listner) => listner !== action));
  };

  const listen: Lifecycle<EmitterAction<T>> = (listner) => {
    unlisten(listner);
    listnersStore.get().push(listner);

    return () => {
      unlisten(listner);
    };
  };

  return {
    emit,
    listen,
  };
};
