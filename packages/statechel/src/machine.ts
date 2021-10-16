import {Machine, Scheme, Lifecycle, Spark} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine, adaptInternalEngine, adaptExternalEngine} from './engine';
import {createLocker} from './locker';
import {createBuilder} from './builder';

export const createMachine = (scheme: Scheme): Machine => {
  const activator = createActivator();

  const queue = createQueue();

  const locker = createLocker();

  const engine = createEngine(queue, activator, locker);
  const internalEngine = adaptInternalEngine(engine);
  const externalEngine = adaptExternalEngine(engine);

  const builder = createBuilder(locker, internalEngine);

  const machineLocker = createLocker();

  const eject = () => {
    return scheme;
  };

  const send = (spark: Spark) => {
    if (machineLocker.isUnlocked()) {
      externalEngine.send(spark);
    }
  };

  const init = () => {
    builder.build(scheme);
  };

  init();

  return {
    getActive: engine.getActive,
    isActive: engine.isActive,
    onChange: activator.onChange,
    start: machineLocker.unlock,
    stop: machineLocker.lock,
    isStarted: machineLocker.isUnlocked,
    isStoped: machineLocker.isLocked,
    eject,
    send,
  };
};
