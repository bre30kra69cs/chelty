import {Locker} from './types';

export const createLocker = (init = false): Locker => {
  let state = init;

  const lock = () => {
    state = true;
  };

  const unlock = () => {
    state = false;
  };

  const toggle = () => {
    state = !state;
  };

  const isLocked = () => {
    return state;
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
