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
import {SYSTEM_RUN_NAME, RUN_SYSTEM_SPARK, RUN_SYSTEM_TRANSITION} from './consts';

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
    const leversBuild = scheme.levers.map(buildLever);

    return {
      name: scheme.name ?? 'scheme',
      onIn: buildAction(() => {
        scheme?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        scheme?.onOut?.(engine);
      }),
      init: buildNode(scheme.init),
      levers: leversBuild,
      getLeversBySpark: (spark) => {
        return leversBuild.filter((leverBuild) => leverBuild.spark === spark);
      },
    };
  };

  const buildNode = (node: Node): NodeBuild => {
    if (isState(node)) {
      return buildState(node);
    }

    return buildScheme(node);
  };

  const buildLever = (lever: Lever): LeverBuild => {
    return {
      name: lever.name ?? 'lever',
      spark: lever.spark,
      transition: buildTransition(lever.transition),
      to: buildNode(lever.to),
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
