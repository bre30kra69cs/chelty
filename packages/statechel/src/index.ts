type Engine = {
  send: (spark: Spark) => void;
  getActive: () => Node[];
  isActive: (node: Node) => boolean;
};

type Spark = {
  name?: string;
};

type Action = (engine: Engine) => void;

type State = {
  name?: string;
  onIn?: Action;
  onOut?: Action;
};

type Transition = {
  name?: string;
  onEnter?: Action;
};

type Lever = {
  name?: string;
  from: Node;
  spark: Spark;
  transition: Transition;
  to: Node;
};

type Scheme = State & {
  init: Node;
  levers: Lever[];
};

type Node = State | Scheme;

type Unlisten = () => void;

type Listen<T> = (listner: T) => Unlisten;

type Machine = Engine & {
  onState: Listen<(node: Node) => void>;
  onUnhandle: Listen<(spark: Spark) => void>;
  eject: () => Scheme;
  combine: (machine: Machine) => Machine;
};

type Queue = {
  push: (action: Action) => void;
  shift: () => void;
  pop: () => Action;
  head: () => Action;
  last: () => Action;
  tail: () => Action[];
  body: () => Action[];
  onPush: Listen<() => void>;
  onShift: Listen<() => void>;
};
