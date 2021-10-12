export type Assign<T, P> = T & P;

export type Undefinable<T> = T | undefined;

export type Engine = {
  send: (spark: Spark) => void;
  getActive: () => Node[];
  isActive: (node: Node) => boolean;
};

export type Spark = {
  name?: string;
};

export type Action = (engine: Engine) => void;

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
  Engine,
  {
    eject: () => Scheme;
    onChange: Lifecycle<() => void>;
  }
>;

export type Queue = {
  push: (spark: Spark) => void;
  shift: () => Undefinable<Spark>;
  head: () => Undefinable<Spark>;
  last: () => Undefinable<Spark>;
  tail: () => Spark[];
  body: () => Spark[];
  onShift: Lifecycle<(spark: Spark) => void>;
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
};
