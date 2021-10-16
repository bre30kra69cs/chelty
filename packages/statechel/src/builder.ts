import {
  Builder,
  Locker,
  Scheme,
  State,
  StateBuild,
  Transition,
  TransitionBuild,
  SchemeBuild,
  Engine,
  Spark,
} from './types';

export const createBuilder = (locker: Locker, engine: Engine<Spark>): Builder => {
  const buildAction = (action: () => void) => () => {
    locker.lock();
    action();
    locker.unlock();
  };

  const buildState = (state: State): StateBuild => {
    return {
      name: state.name ?? 'state',
      onIn: buildAction(() => {
        state?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        state?.onOut?.(engine);
      }),
    };
  };

  const buildTransition = (transition: Transition): TransitionBuild => {
    return {
      name: transition.name ?? 'transition',
      onEnter: buildAction(() => {
        transition?.onEnter?.(engine);
      }),
    };
  };

  const buildScheme = (scheme: Scheme): SchemeBuild => {
    return {
      name: scheme.name ?? 'scheme',
      onIn: buildAction(() => {
        scheme?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        scheme?.onOut?.(engine);
      }),
      init: scheme.init,
      levers: scheme.levers,
    };
  };

  const build = (scheme: Scheme) => {};

  return {
    build,
  };
};
