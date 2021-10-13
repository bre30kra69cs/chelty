import {Lever} from './types';

export const createLever = (lever: Lever) => {
  return {
    name: lever.name ?? 'lever',
    ...lever,
  };
};
