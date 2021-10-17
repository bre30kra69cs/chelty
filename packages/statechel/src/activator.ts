import {Activator, StateBuild} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createActivator = (): Activator => {
  const activeStore = createStore<StateBuild[]>([]);

  const pushEmitter = createEmitter<StateBuild>();

  const removeEmitter = createEmitter<StateBuild>();

  const getActive = () => {
    return [...activeStore.get()];
  };

  const isActive = (stateBuild: StateBuild) => {
    return activeStore.get().some((value) => value === stateBuild);
  };

  const remove = (stateBuild: StateBuild) => {
    activeStore.map((value) => value.filter((item) => item !== stateBuild));
    removeEmitter.emit(stateBuild);
  };

  const push = (stateBuild: StateBuild) => {
    if (isActive(stateBuild)) {
      return;
    }

    activeStore.get().push(stateBuild);
    pushEmitter.emit(stateBuild);
  };

  return {
    onRemove: removeEmitter.listen,
    onPush: pushEmitter.listen,
    push,
    remove,
    getActive,
    isActive,
  };
};
