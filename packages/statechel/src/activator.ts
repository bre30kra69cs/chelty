import {Activator, NodeBuild, Lifecycle} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createActivator = (): Activator => {
  const active = createStore<NodeBuild[]>([]);

  const emitter = createEmitter();

  const remove = (nodeBuild: NodeBuild) => {
    active.set(active.get().filter((thing) => thing !== nodeBuild));
  };

  const push = (nodeBuild: NodeBuild) => {
    remove(nodeBuild);
    active.get().push(nodeBuild);
    emitter.emit();

    return () => {
      remove(nodeBuild);
      emitter.emit();
    };
  };

  const getActive = () => {
    return [...active.get()];
  };

  const isActive = (nodeBuild: NodeBuild) => {
    return active.get().some((thing) => thing === nodeBuild);
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
