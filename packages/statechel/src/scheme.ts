import {Scheme} from './types';

export const createScheme = (scheme: Scheme = {}) => {
  return {
    ...scheme,
  };
};
