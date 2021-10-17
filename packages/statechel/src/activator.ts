import {Activator, NodeBuild, Lifecycle} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createActivator = (): Activator => {
  const activeStore = createStore<NodeBuild[]>([]);

  const pushEmitter = createEmitter<NodeBuild>();

  const removeEmitter = createEmitter<NodeBuild>();

  const clean = (nodeBuild: NodeBuild) => {
    activeStore.map((value) => value.filter((thing) => thing !== nodeBuild));
  };

  const remove = (nodeBuild: NodeBuild) => {
    clean(nodeBuild);
    removeEmitter.emit(nodeBuild);
  };

  const push = (nodeBuild: NodeBuild) => {
    clean(nodeBuild);
    activeStore.get().push(nodeBuild);
    pushEmitter.emit(nodeBuild);

    return () => {
      remove(nodeBuild);
    };
  };

  const getActive = () => {
    return [...activeStore.get()];
  };

  const isActive = (nodeBuild: NodeBuild) => {
    return activeStore.get().some((thing) => thing === nodeBuild);
  };

  return {
    onRemove: removeEmitter.listen,
    onPush: pushEmitter.listen,
    push,
    getActive,
    isActive,
  };
};
