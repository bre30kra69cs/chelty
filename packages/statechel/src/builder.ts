import {
  Builder,
  Locker,
  Scheme,
  State,
  StateBuild,
  Transition,
  TransitionBuild,
  SchemeBuild,
} from './types';

export const createBuilder = (locker: Locker): Builder => {
  const buildState = (state: State): StateBuild => {
    return {
      name: state.name ?? 'state',
      onIn: (engine) => {
        locker.lock();
        state?.onIn?.(engine);
        locker.unlock();
      },
      onOut: (engine) => {
        locker.lock();
        state?.onOut?.(engine);
        locker.unlock();
      },
    };
  };

  const buildTransition = (transition: Transition): TransitionBuild => {
    return {
      name: transition.name ?? 'transition',
      onEnter: (engine) => {
        locker.lock();
        transition?.onEnter?.(engine);
        locker.unlock();
      },
    };
  };

  const buildScheme = (scheme: Scheme): SchemeBuild => {
    return {
      name: scheme.name ?? 'scheme',
      onIn: (engine) => {
        locker.lock();
        scheme?.onIn?.(engine);
        locker.unlock();
      },
      onOut: (engine) => {
        locker.lock();
        scheme?.onOut?.(engine);
        locker.unlock();
      },
      init: scheme.init,
      levers: scheme.levers,
    };
  };

  const build = (scheme: Scheme) => {};

  return {
    build,
  };
};
