import {Activator, Node, Lifecycle} from './types';
import {createEmitter} from './emitter';

export const createActivator = (): Activator => {
  let active: Node[] = [];

  const emitter = createEmitter();

  const remove = (node: Node) => {
    active = active.filter((thing) => thing !== node);
  };

  const push = (node: Node) => {
    remove(node);
    active.push(node);
    emitter.emit();

    return () => {
      remove(node);
      emitter.emit();
    };
  };

  const getActive = () => {
    return [...active];
  };

  const isActive = (node: Node) => {
    return active.some((thing) => thing === node);
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
