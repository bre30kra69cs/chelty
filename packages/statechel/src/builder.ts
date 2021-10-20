import {
  Builder,
  Locker,
  Transition,
  TransitionBuild,
  State,
  StateBuild,
  Engine,
  Spark,
} from './types';
import {DEFAULT_STATE_NAME, DEFAULT_TRANSITION_NAME} from './names';

export const createBuilder = (
  locker: Locker,
  internalEngine: Engine<Spark>,
  systemEngine: Engine<Spark>,
): Builder => {
  const buildAction = (action: () => void) => () => {
    locker.lock();
    action();
    locker.unlock();
  };

  const buildState = (state: State, parent?: StateBuild): StateBuild => {
    const stateBuild: StateBuild = {
      id: state.id,
      name: state.name ?? DEFAULT_STATE_NAME,
      isRoot: false,
      init: [],
      transitions: [],
      parent,
      onIn: buildAction(() => {
        state?.onIn?.(internalEngine);
      }),
      onOut: buildAction(() => {
        state?.onOut?.(internalEngine);
      }),
    };

    stateBuild.init =
      state.init?.map((item) => {
        return buildState(item, stateBuild);
      }) ?? [];

    stateBuild.transitions =
      state.transitions?.map((transition) => {
        return buildTransition(transition, state, stateBuild);
      }) ?? [];

    return stateBuild;
  };

  const buildTransition = (
    transition: Transition,
    state: State,
    stateBuild: StateBuild,
  ): TransitionBuild => {
    return {
      name: transition.name ?? DEFAULT_TRANSITION_NAME,
      spark: transition.spark,
      source: stateBuild,
      target: transition.target === state ? stateBuild : buildState(transition.target, stateBuild),
      onEnter: buildAction(() => {
        transition?.onEnter?.(internalEngine);
      }),
    };
  };

  const build = (state: State): StateBuild => {
    const stateBuild = buildState(state);

    stateBuild.isRoot = true;

    return stateBuild;
  };

  return {
    build,
  };
};
