import {Activator, Node} from './types';

export const createActivator = (): Activator => {
  let active: Node[] = [];

  const remove = (node: Node) => {
    active = active.filter((thing) => thing !== node);
  };

  const push = (node: Node) => {
    remove(node);
    active.push(node);
    return () => remove(node);
  };

  const getActive = () => {
    return [...active];
  };

  const isActive = (node: Node) => {
    return active.some((thing) => thing === node);
  };

  return {
    push,
    getActive,
    isActive,
  };
};
