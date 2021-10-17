import {Activator, Node, Lifecycle} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createActivator = (): Activator => {
  const active = createStore<Node[]>([]);

  const emitter = createEmitter();

  const remove = (node: Node) => {
    active.set(active.get().filter((thing) => thing !== node));
  };

  const push = (node: Node) => {
    remove(node);
    active.get().push(node);
    emitter.emit();

    return () => {
      remove(node);
      emitter.emit();
    };
  };

  const getActive = () => {
    return [...active.get()];
  };

  const isActive = (node: Node) => {
    return active.get().some((thing) => thing === node);
  };

  const onChange: Lifecycle<() => void> = (listner) => {
    return emitter.listen(listner);
  };

  return {
    push,
    getActive,
    isActive,
    onChange,
  };
};
