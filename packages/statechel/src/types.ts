export type Assign<T, P> = T & P;

export type Undefinable<T> = T | undefined;

export type Engine<T> = {
  send: (value: T) => void;
  getActive: () => Node[];
  isActive: (node: Node) => boolean;
};

export type Spark = {
  name?: string;
};

export type SparkContainer = {
  spark: Spark;
  type: 'external' | 'internal';
};

export type Action = (engine: Engine<Spark>) => void;

export type State = {
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
  from: Node;
  spark: Spark;
  transition: Transition;
  to: Node;
};

export type Scheme = Assign<
  State,
  {
    init: Node;
    levers: Lever[];
  }
>;

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
};

export type EmitterAction<T> = (message: T) => void;

export type Emitter<T> = {
  emit: EmitterAction<T>;
  listen: Lifecycle<EmitterAction<T>>;
};

export type Activator = {
  push: Lifecycle<Node>;
  getActive: () => Node[];
  isActive: (node: Node) => boolean;
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
  build: (scheme: Scheme) => void;
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

export type SchemeBuild = {
  init: Node;
  levers: Lever[];
  name: string;
  onIn: ActionBuild;
  onOut: ActionBuild;
};
