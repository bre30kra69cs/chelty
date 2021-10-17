export type Assign<T, P> = T & P;

export type Undefinable<T> = T | undefined;

export type Engine<T> = {
  send: (value: T) => void;
  getActive: () => NodeBuild[];
  isActive: (nodeBuild: NodeBuild) => boolean;
};

export type Spark = {
  name?: string;
};

export type SparkContainer = {
  spark: Spark;
  type: 'external' | 'internal' | 'system';
};

export type Action = (engine: Engine<Spark>) => void;

export type State = {
  type: 'state';
  name?: string;
  onIn?: Action;
  onOut?: Action;
};

export type Transition = {
  name?: string;
  onEnter?: Action;
};

export type Lever = {
  name?: string;
  spark: Spark;
  transition: Transition;
  to: Node;
};

export type Scheme = {
  init: Node;
  levers: Lever[];
  type: 'scheme';
  name?: string;
  onIn?: Action;
  onOut?: Action;
};

export type Node = State | Scheme;

export type Lifecycle<T> = (listner: T) => () => void;

export type Machine = Assign<
  Engine<Spark>,
  {
    eject: () => Scheme;
    onChange: Lifecycle<() => void>;
    start: () => void;
    stop: () => void;
    isStarted: () => boolean;
    isStoped: () => void;
    run: () => void;
    destroy: () => void;
  }
>;

export type Queue<T> = {
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
  push: Lifecycle<NodeBuild>;
  getActive: () => NodeBuild[];
  isActive: (nodeBuild: NodeBuild) => boolean;
  onChange: Lifecycle<() => void>;
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

export type StateBuild = {
  name: string;
  onIn: ActionBuild;
  onOut: ActionBuild;
};

export type TransitionBuild = {
  name: string;
  onEnter: ActionBuild;
};

export type LeverBuild = {
  name: string;
  spark: Spark;
  transition: TransitionBuild;
  to: NodeBuild;
};

export type SchemeBuild = {
  init: NodeBuild;
  levers: LeverBuild[];
  name: string;
  onIn: ActionBuild;
  onOut: ActionBuild;
  getLeversBySpark: (spark: Spark) => LeverBuild[];
};

export type NodeBuild = StateBuild | SchemeBuild;

export type Mapper<T, V> = {
  set: (key: T, value: V) => void;
  get: (key: T) => void;
};

export type Store<T> = {
  set: (value: T) => void;
  get: () => T;
};
