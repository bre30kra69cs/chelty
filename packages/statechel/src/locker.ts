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

  return {
    lock,
    unlock,
    toggle,
    isLocked,
  };
};
