import {
  Builder,
  Locker,
  Transition,
  TransitionBuild,
  State,
  StateBuild,
  Engine,
  Spark,
  Lever,
  LeverBuild,
} from './types';
import {RUN_SYSTEM_SPARK, RUN_SYSTEM_TRANSITION} from './predefined';
import {
  SYSTEM_RUN_NAME,
  DEFAULT_LEVER_NAME,
  DEFAULT_SCHEME_NAME,
  DEFAULT_TRANSITION_NAME,
} from './names';

export const createBuilder = (locker: Locker, engine: Engine<Spark>): Builder => {
  const buildAction = (action: () => void) => () => {
    locker.lock();
    action();
    locker.unlock();
  };

  const buildTransition = (transition: Transition): TransitionBuild => {
    return {
      name: transition.name ?? DEFAULT_TRANSITION_NAME,
      source: transition,
      onEnter: buildAction(() => {
        // TODO: use copy
        transition?.onEnter?.(engine);
      }),
    };
  };

  const buildState = (state: State, parent?: StateBuild): StateBuild => {
    const stateBuild: StateBuild = {
      id: state.id,
      name: state.name ?? DEFAULT_SCHEME_NAME,
      isRoot: false,
      source: state,
      childrens: [],
      levers: [],
      parent,
      onIn: buildAction(() => {
        // TODO: use copy
        state?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        // TODO: use copy
        state?.onOut?.(engine);
      }),
    };

    stateBuild.levers = state.levers.map((lever) => buildLever(lever, state, stateBuild));
    stateBuild.childrens = state.childrens.map((children) => buildState(children, stateBuild));

    return stateBuild;
  };

  const buildLever = (lever: Lever, state: State, stateBuild: StateBuild): LeverBuild => {
    return {
      name: lever.name ?? DEFAULT_LEVER_NAME,
      spark: lever.spark,
      transition: buildTransition(lever.transition),
      to: lever.to === state ? stateBuild : buildState(lever.to, stateBuild),
    };
  };

  const build = (state: State): StateBuild => {
    const stateBuild = buildState(state);

    stateBuild.isRoot = true;
    stateBuild.levers.push({
      name: SYSTEM_RUN_NAME,
      spark: RUN_SYSTEM_SPARK,
      transition: buildTransition(RUN_SYSTEM_TRANSITION),
      to: stateBuild,
    });

    return stateBuild;
  };

  return {
    build,
  };
};
