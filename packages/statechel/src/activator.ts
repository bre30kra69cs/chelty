import {Activator, SchemeBuild} from './types';
import {createEmitter} from './emitter';
import {createStore} from './store';

export const createActivator = (): Activator => {
  const activeStore = createStore<SchemeBuild[]>([]);

  const pushEmitter = createEmitter<SchemeBuild>();

  const removeEmitter = createEmitter<SchemeBuild>();

  const getActive = () => {
    return [...activeStore.get()];
  };

  const isActive = (schemeBuild: SchemeBuild) => {
    return activeStore.get().some((value) => value === schemeBuild);
  };

  const remove = (schemeBuild: SchemeBuild) => {
    activeStore.map((value) => value.filter((item) => item !== schemeBuild));
    removeEmitter.emit(schemeBuild);
  };

  const push = (schemeBuild: SchemeBuild) => {
    if (isActive(schemeBuild)) {
      return;
    }

    activeStore.get().push(schemeBuild);
    pushEmitter.emit(schemeBuild);
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
