import {Locker} from './types';
import {createStore} from './store';

export const createLocker = (init = false): Locker => {
  const state = createStore(init);

  const lock = () => {
    state.set(true);
  };

  const unlock = () => {
    state.set(false);
  };

  const toggle = () => {
    state.set(!state.get());
  };

  const isLocked = () => {
    return state.get();
  };

  const isUnlocked = () => {
    return !isLocked();
  };

  return {
    lock,
    unlock,
    toggle,
    isLocked,
    isUnlocked,
  };
};
