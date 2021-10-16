import {Machine, Scheme, Lifecycle} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine} from './engine';
import {createLocker} from './locker';
import {createBuilder} from './builder';

export const createMachine = (scheme: Scheme): Machine => {
  const activator = createActivator();

  const queue = createQueue();

  const locker = createLocker();

  const builder = createBuilder(locker);

  const engine = createEngine(queue, activator, locker);

  const eject = () => {
    return scheme;
  };

  return {
    send: engine.send,
    getActive: engine.getActive,
    isActive: engine.isActive,
    onChange: activator.onChange,
    eject,
  };
};
