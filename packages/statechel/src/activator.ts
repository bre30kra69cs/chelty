import {Activator, Node, Lifecycle} from './types';
import {createEmitter} from './emitter';
import exp from 'constants';

export const createActivator = (): Activator => {
  let active: Node[] = [];

  const emitter = createEmitter<Node>();

  const remove = (node: Node) => {
    active = active.filter((thing) => thing !== node);
  };

  const push = (node: Node) => {
    remove(node);
    active.push(node);
    emitter.emit(node);
    return () => remove(node);
  };

  const getActive = () => {
    return [...active];
  };

  const isActive = (node: Node) => {
    return active.some((thing) => thing === node);
  };

  const onPush: Lifecycle<(node: Node) => void> = (listner) => {
    return emitter.listen(listner);
  };

  return {
    push,
    getActive,
    isActive,
    onPush,
  };
};
