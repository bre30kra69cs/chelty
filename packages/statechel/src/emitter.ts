import {Emitter, EmitterAction, Lifecycle} from './types';

export const createEmitter = <T = void>(): Emitter<T> => {
  let listners: EmitterAction<T>[] = [];

  const emit: EmitterAction<T> = (message) => {
    listners.forEach((listner) => listner(message));
  };

  const unlisten = (action: EmitterAction<T>) => {
    listners = listners.filter((listner) => listner !== action);
  };

  const listen: Lifecycle<EmitterAction<T>> = (listner) => {
    unlisten(listner);
    listners.push(listner);
    return () => unlisten(listner);
  };

  return {
    emit,
    listen,
  };
};
