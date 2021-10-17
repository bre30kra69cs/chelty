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
  Node,
  NodeBuild,
  Lever,
  LeverBuild,
} from './types';
import {isState} from './node';
import {RUN_SYSTEM_SPARK, RUN_SYSTEM_TRANSITION} from './predefined';
import {
  SYSTEM_RUN_NAME,
  DEFAULT_LEVER_NAME,
  DEFAULT_SCHEME_NAME,
  DEFAULT_STATE_NAME,
  DEFAULT_TRANSITION_NAME,
} from './names';

export const createBuilder = (locker: Locker, engine: Engine<Spark>): Builder => {
  const buildAction = (action: () => void) => () => {
    locker.lock();
    action();
    locker.unlock();
  };

  const buildState = (state: State): StateBuild => {
    return {
      name: state.name ?? DEFAULT_STATE_NAME,
      source: state,
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
      name: transition.name ?? DEFAULT_TRANSITION_NAME,
      source: transition,
      onEnter: buildAction(() => {
        transition?.onEnter?.(engine);
      }),
    };
  };

  const buildScheme = (scheme: Scheme): SchemeBuild => {
    const schemeBuild = {
      name: scheme.name ?? DEFAULT_SCHEME_NAME,
      source: scheme,
      onIn: buildAction(() => {
        scheme?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        scheme?.onOut?.(engine);
      }),
      init: buildNode(scheme.init),
      levers: [],
    };

    schemeBuild.levers = scheme.levers.map(buildLever(schemeBuild, scheme));

    return schemeBuild;
  };

  const buildNode = (node: Node): NodeBuild => {
    if (isState(node)) {
      return buildState(node);
    }

    return buildScheme(node);
  };

  const buildLever =
    (schemeBuild: SchemeBuild, scheme: Scheme) =>
    (lever: Lever): LeverBuild => {
      return {
        name: lever.name ?? DEFAULT_LEVER_NAME,
        spark: lever.spark,
        transition: buildTransition(lever.transition),
        to: lever.to === scheme ? schemeBuild : buildNode(lever.to),
      };
    };

  const build = (scheme: Scheme): SchemeBuild => {
    const schemeBuild = buildScheme(scheme);
    return {
      ...schemeBuild,
      levers: [
        ...schemeBuild.levers,
        {
          name: SYSTEM_RUN_NAME,
          spark: RUN_SYSTEM_SPARK,
          transition: buildTransition(RUN_SYSTEM_TRANSITION),
          to: schemeBuild,
        },
      ],
    };
  };

  return {
    build,
  };
};
