import {Machine, MachineState, State, StateId, Spark} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine, adaptInternalEngine, adaptExternalEngine} from './engine';
import {createLocker} from './locker';
import {createBuilder} from './builder';
import {createStore} from './store';

export const createMachine = (state: State): Machine => {
  const machineState = createStore<MachineState>('init');

  const activator = createActivator();

  const queue = createQueue();

  const locker = createLocker();

  const engine = createEngine(queue, activator);
  const internalEngine = adaptInternalEngine(engine);
  const externalEngine = adaptExternalEngine(engine);
  const systemEngine = adaptExternalEngine(engine);

  const builder = createBuilder(locker, internalEngine, systemEngine);
  const rootStateBuild = builder.build(state);

  const eject = () => {
    return state;
  };

  const send = (spark: Spark) => {
    if (machineState.get() === 'working') {
      externalEngine.send(spark);
    }
  };

  const start = () => {
    if (machineState.get() === 'working' || machineState.get() === 'destroyed') {
      return;
    }

    queue.unlock();
  };

  const stop = () => {
    if (machineState.get() === 'stopped' || machineState.get() === 'destroyed') {
      return;
    }

    machineState.set('stopped');
  };

  const forceStop = () => {
    if (machineState.get() === 'stopped' || machineState.get() === 'destroyed') {
      return;
    }

    machineState.set('stopped');
    queue.lock();
  };

  const unlistenPushQueue = queue.onPush(() => {
    if (locker.isLocked()) {
      return;
    }

    queue.shift();
  });

  const unlistenShiftQueue = queue.onShift(() => {
    queue.shift();
  });

  const destroy = () => {
    if (machineState.get() === 'destroyed') {
      return;
    }

    queue.lock();
    unlistenPushQueue();
    unlistenShiftQueue();
    machineState.set('destroyed');
  };

  const onRemove = (listner: (id: StateId) => void) => {
    return activator.onRemove((stateBuild) => {
      listner(stateBuild.id);
    });
  };

  const onPush = (listner: (id: StateId) => void) => {
    return activator.onPush((stateBuild) => {
      listner(stateBuild.id);
    });
  };

  return {
    getState: machineState.get,
    start,
    stop,
    destroy,
    eject,
    send,
    forceStop,
    onRemove,
    onPush,
  };
};
