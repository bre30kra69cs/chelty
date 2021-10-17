import {Locker} from './types';
import {createStore} from './store';

export const createLocker = (init = false): Locker => {
  const stateStore = createStore(init);

  const lock = () => {
    stateStore.set(true);
  };

  const unlock = () => {
    stateStore.set(false);
  };

  const toggle = () => {
    stateStore.map((value) => !value);
  };

  const isLocked = () => {
    return stateStore.get();
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
