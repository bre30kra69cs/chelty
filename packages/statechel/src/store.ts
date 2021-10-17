import {Store} from './types';

export const createStore = <T>(initState: T): Store<T> => {
  let state = initState;

  const set = (nextState: T) => {
    state = nextState;
  };

  const get = () => {
    return state;
  };

  return {
    set,
    get,
  };
};
