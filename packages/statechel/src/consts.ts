import {createMstScheme} from './mst';
import {MachineState, MachineSpark} from './types';

export const MACHINE_STATE_MST_SCHEME = createMstScheme<MachineState, MachineSpark, MachineState>({
  init: 'init',
  states: ['init', 'started', 'stoped', 'destroyed'],
  sparks: ['start', 'stop', 'destroy'],
  transitions: [
    {
      source: 'init',
      target: 'started',
      spark: 'start',
    },
    {
      source: 'started',
      target: 'stoped',
      spark: 'stop',
    },
    {
      source: 'stoped',
      target: 'started',
      spark: 'start',
    },
    {
      source: 'started',
      target: 'destroyed',
      spark: 'destroy',
    },
    {
      source: 'stoped',
      target: 'destroyed',
      spark: 'destroy',
    },
  ],
});
