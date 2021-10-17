export type Assign<T, P> = T & P;

export type Undefinable<T> = T | undefined;

export type Engine<T> = {
  send: (value: T) => void;
  getActive: () => SchemeBuild[];
  isActive: (schemeBuild: SchemeBuild) => boolean;
};

export type Spark = {
  name?: string;
};

export type SparkContainer = {
  spark: Spark;
  type: 'external' | 'internal' | 'system';
};

export type Action = (engine: Engine<Spark>) => void;

export type Transition = {
  name?: string;
  onEnter?: Action;
};

export type Lever = {
  name?: string;
  spark: Spark;
  transition: Transition;
  to: Scheme;
};

export type Scheme = {
  name?: string;
  levers?: Lever[];
  childrens?: Scheme[];
  onIn?: Action;
  onOut?: Action;
};

export type Lifecycle<T> = (listner: T) => () => void;

export type Machine = {
  send: (spark: Spark) => void;
  eject: () => Scheme;
  start: () => void;
  stop: () => void;
  isStarted: () => boolean;
  isStoped: () => void;
  run: () => void;
  forceStop: () => void;
  destroy: () => void;
  isDestroyed: () => boolean;
  onRemove: Lifecycle<(scheme: Scheme) => void>;
  onPush: Lifecycle<(scheme: Scheme) => void>;
};

export type Queue<T> = {
  lock: () => void;
  unlock: () => void;
  push: (value: T) => void;
  shift: () => Undefinable<T>;
  head: () => Undefinable<T>;
  last: () => Undefinable<T>;
  tail: () => T[];
  body: () => T[];
  onShift: Lifecycle<(value: T) => void>;
  onPush: Lifecycle<(value: T) => void>;
};

export type EmitterAction<T> = (message: T) => void;

export type Emitter<T> = {
  emit: EmitterAction<T>;
  listen: Lifecycle<EmitterAction<T>>;
};

export type Activator = {
  push: (schemeBuild: SchemeBuild) => void;
  remove: (schemeBuild: SchemeBuild) => void;
  getActive: () => SchemeBuild[];
  isActive: (schemeBuild: SchemeBuild) => boolean;
  onRemove: Lifecycle<(schemeBuild: SchemeBuild) => void>;
  onPush: Lifecycle<(schemeBuild: SchemeBuild) => void>;
};

export type Locker = {
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
  isLocked: () => boolean;
  isUnlocked: () => boolean;
};

export type Builder = {
  build: (scheme: Scheme) => SchemeBuild;
};

export type ActionBuild = () => void;

export type TransitionBuild = {
  name: string;
  source: Transition;
  onEnter: ActionBuild;
};

export type LeverBuild = {
  name: string;
  spark: Spark;
  transition: TransitionBuild;
  to: SchemeBuild;
};

export type SchemeBuild = {
  name: string;
  isRoot: boolean;
  levers: LeverBuild[];
  source: Scheme;
  childrens: SchemeBuild[];
  onIn: ActionBuild;
  onOut: ActionBuild;
  parent?: SchemeBuild;
};

export type Mapper<T, V> = {
  set: (key: T, value: V) => void;
  get: (key: T) => void;
};

export type Store<T> = {
  set: (value: T) => void;
  get: () => T;
  map: (mapper: (value: T) => T) => void;
};
