export type Assign<T, P> = T & P;

export type Undefinable<T> = T | undefined;

export type Engine<T> = {
  send: (value: T) => void;
  getActive: () => StateBuild[];
  isActive: (stateBuild: StateBuild) => boolean;
};

export type Spark = {
  id: string;
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
  spark: Spark;
  transition: Transition;
  to: State;
  name?: string;
};

export type State = {
  id: string;
  name?: string;
  levers?: Lever[];
  childrens?: State[];
  onIn?: Action;
  onOut?: Action;
};

export type Lifecycle<T> = (listner: T) => () => void;

export type Machine = {
  send: (spark: Spark) => void;
  eject: () => State;
  start: () => void;
  stop: () => void;
  isStarted: () => boolean;
  isStoped: () => void;
  run: () => void;
  forceStop: () => void;
  destroy: () => void;
  isDestroyed: () => boolean;
  onRemove: Lifecycle<(state: State) => void>;
  onPush: Lifecycle<(state: State) => void>;
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
  push: (stateBuild: StateBuild) => void;
  remove: (stateBuild: StateBuild) => void;
  getActive: () => StateBuild[];
  isActive: (stateBuild: StateBuild) => boolean;
  onRemove: Lifecycle<(stateBuild: StateBuild) => void>;
  onPush: Lifecycle<(stateBuild: StateBuild) => void>;
};

export type Locker = {
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
  isLocked: () => boolean;
  isUnlocked: () => boolean;
};

export type Builder = {
  build: (state: State) => StateBuild;
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
  from?: StateBuild;
  to: StateBuild;
};

export type StateBuild = {
  id: string;
  name: string;
  isRoot: boolean;
  levers: LeverBuild[];
  source: State;
  childrens: StateBuild[];
  onIn: ActionBuild;
  onOut: ActionBuild;
  parent?: StateBuild;
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
