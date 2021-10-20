import {MstScheme, Mst} from './types';
import {createStore} from './store';

export const createMstScheme = <S extends string, Sr extends string, I extends S>(
  scheme: MstScheme<S, Sr, I>,
): MstScheme<S, Sr, I> => {
  return {
    ...scheme,
  };
};

export const createMst = <S extends string, Sr extends string, I extends S>(
  scheme: MstScheme<S, Sr, I>,
): Mst<S, Sr> => {
  const state = createStore<S>(scheme.init);

  const send = (spark: Sr) => {
    if (!scheme.sparks.includes(spark)) {
      return false;
    }

    const transition = scheme.transitions.find(
      (item) => item.spark === spark && item.source === state.get(),
    );

    if (!transition) {
      return false;
    }

    state.set(transition.target);
    return true;
  };

  return {
    get: state.get,
    send,
  };
};
