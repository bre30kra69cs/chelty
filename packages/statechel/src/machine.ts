import {Machine, Scheme, Lifecycle} from './types';
import {createQueue} from './queue';
import {createActivator} from './activator';
import {createEngine} from './engine';

export const createMachine = (scheme: Scheme): Machine => {
  const activator = createActivator();
  const queue = createQueue();
  const engine = createEngine(queue, activator);

  const eject = () => {
    return scheme;
  };

  const onChange: Lifecycle<() => void> = (listner) => {
    return activator.onChange(listner);
  };

  return {
    send: engine.send,
    getActive: engine.getActive,
    isActive: engine.isActive,
    eject,
    onChange,
  };
};
