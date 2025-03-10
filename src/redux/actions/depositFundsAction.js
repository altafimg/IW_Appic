import {DEPOIST_FUNDES_STATE_REMOVE} from './allActions';

// actions.js
export const DEPOIST_FUNDES_STATE = 'DEPOIST_FUNDES_STATE';

export const depositFundsAction = depositFunds => ({
  type: DEPOIST_FUNDES_STATE,
  payload: depositFunds,
});
export const depositFundsRemoveAction = depositFunds => ({
  type: DEPOIST_FUNDES_STATE_REMOVE,
});
