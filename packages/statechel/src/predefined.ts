import {createSpark} from './spark';
import {createTransition} from './transition';
import {SYSTEM_RUN_NAME} from './names';

export const RUN_SYSTEM_SPARK = createSpark({
  name: SYSTEM_RUN_NAME,
});

export const RUN_SYSTEM_TRANSITION = createTransition({
  name: SYSTEM_RUN_NAME,
});