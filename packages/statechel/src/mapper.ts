import {Mapper} from './types';

export const createMapper = <T, U>(): Mapper<T, U> => {
  const map = new Map<T, U>();

  return {
    get: map.get,
    set: map.set,
  };
};
