import {Machine, Scheme, Lifecycle, Spark, Node} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine, adaptInternalEngine, adaptExternalEngine} from './engine';
import {createLocker} from './locker';
import {createBuilder} from './builder';
import {RUN_SYSTEM_SPARK} from './predefined';
import {createStore} from './store';

export const createMachine = (scheme: Scheme): Machine => {
  const destroyStore = createStore(false);

  const activator = createActivator();

  const queue = createQueue();

  const locker = createLocker();

  const machineLocker = createLocker();

  const engine = createEngine(queue, activator);
  const internalEngine = adaptInternalEngine(engine);
  const externalEngine = adaptExternalEngine(engine);
  const systemEngine = adaptExternalEngine(engine);

  const builder = createBuilder(locker, internalEngine);

  const eject = () => {
    return scheme;
  };

  const send = (spark: Spark) => {
    if (machineLocker.isUnlocked()) {
      externalEngine.send(spark);
    }
  };

  const run = () => {
    queue.unlock();
    machineLocker.unlock();
    systemEngine.send(RUN_SYSTEM_SPARK);
  };

  const forceStop = () => {
    queue.lock();
    machineLocker.lock();
  };

  const schemeBuild = builder.build(scheme);

  const unlistenPushQueue = queue.onPush(() => {
    if (locker.isLocked()) {
      return;
    }

    queue.shift();
  });

  const unlistenShiftQueue = queue.onShift((sparkContainer) => {
    queue.shift();
  });

  const destroy = () => {
    unlistenPushQueue();
    unlistenShiftQueue();
    destroyStore.set(true);
  };

  const onRemove = (listner: (node: Node) => void) => {
    return activator.onRemove((nodeBuild) => {
      listner(nodeBuild.source);
    });
  };

  const onPush = (listner: (node: Node) => void) => {
    return activator.onPush((nodeBuild) => {
      listner(nodeBuild.source);
    });
  };

  return {
    start: machineLocker.unlock,
    stop: machineLocker.lock,
    isStarted: machineLocker.isUnlocked,
    isStoped: machineLocker.isLocked,
    isDestroyed: destroyStore.get,
    eject,
    send,
    run,
    forceStop,
    destroy,
    onRemove,
    onPush,
  };
};
