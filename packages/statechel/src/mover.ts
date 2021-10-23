import {Activator, Mover, StateBuild} from './types';

export const createMover = (activator: Activator): Mover => {
  const activate = (stateBuild: StateBuild) => {};

  return {
    activate,
  };
};
