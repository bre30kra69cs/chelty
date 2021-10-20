import {Machine, State, StateId, Spark} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine, adaptInternalEngine, adaptExternalEngine} from './engine';
import {createLocker} from './locker';
import {createBuilder} from './builder';
import {createMst} from './mst';
import {MACHINE_STATE_MST_SCHEME} from './consts';

export const createMachine = (state: State): Machine => {
  const machineState = createMst(MACHINE_STATE_MST_SCHEME);

  const activator = createActivator();

  const queue = createQueue();

  const locker = createLocker();

  const engine = createEngine(queue, activator);
  const internalEngine = adaptInternalEngine(engine);
  const externalEngine = adaptExternalEngine(engine);
  const systemEngine = adaptExternalEngine(engine);

  const builder = createBuilder(locker, internalEngine, systemEngine);

  const eject = () => {
    return state;
  };

  const send = (spark: Spark) => {
    if (machineState.get() === 'started') {
      externalEngine.send(spark);
    }
  };

  const start = () => {
    if (!machineState.send('start')) {
      return;
    }

    queue.unlock();
  };

  const stop = () => {
    machineState.send('stop');
  };

  const forceStop = () => {
    if (!machineState.send('stop')) {
      return;
    }

    queue.lock();
  };

  const stateBuild = builder.build(state);
  activator.push(stateBuild);

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
    if (!machineState.send('destroy')) {
      return;
    }

    queue.lock();
    unlistenPushQueue();
    unlistenShiftQueue();
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
