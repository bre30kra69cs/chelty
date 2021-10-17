import {
  Builder,
  Locker,
  Scheme,
  Transition,
  TransitionBuild,
  SchemeBuild,
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
        transition?.onEnter?.(engine);
      }),
    };
  };

  const buildScheme = (scheme: Scheme, parent?: SchemeBuild): SchemeBuild => {
    const schemeBuild: SchemeBuild = {
      isRoot: false,
      name: scheme.name ?? DEFAULT_SCHEME_NAME,
      source: scheme,
      childrens: [],
      levers: [],
      parent,
      onIn: buildAction(() => {
        scheme?.onIn?.(engine);
      }),
      onOut: buildAction(() => {
        scheme?.onOut?.(engine);
      }),
    };

    schemeBuild.levers = scheme.levers.map((lever) => buildLever(lever, scheme, schemeBuild));
    schemeBuild.childrens = scheme.childrens.map((children) => buildScheme(children, schemeBuild));

    return schemeBuild;
  };

  const buildLever = (lever: Lever, scheme: Scheme, schemeBuild: SchemeBuild): LeverBuild => {
    return {
      name: lever.name ?? DEFAULT_LEVER_NAME,
      spark: lever.spark,
      transition: buildTransition(lever.transition),
      to: lever.to === scheme ? schemeBuild : buildScheme(lever.to, schemeBuild),
    };
  };

  const build = (scheme: Scheme): SchemeBuild => {
    const schemeBuild = buildScheme(scheme);

    schemeBuild.isRoot = true;
    schemeBuild.levers.push({
      name: SYSTEM_RUN_NAME,
      spark: RUN_SYSTEM_SPARK,
      transition: buildTransition(RUN_SYSTEM_TRANSITION),
      to: schemeBuild,
    });

    return schemeBuild;
  };

  return {
    build,
  };
};
