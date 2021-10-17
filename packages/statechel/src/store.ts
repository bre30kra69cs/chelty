import {Store} from './types';

export const createStore = <T>(initState: T): Store<T> => {
  let state = initState;

  const set = (nextState: T) => {
    state = nextState;
  };

  const get = () => {
    return state;
  };

  const map = (mapper: (value: T) => T) => {
    set(mapper(get()));
  };

  return {
    set,
    get,
    map,
  };
};
