// actions.js
import {COMPLETE_STEPS, RESET_STEPS} from './allActions';

export const completeSteps = stepNumber => ({
  type: COMPLETE_STEPS,
  payload: stepNumber,
});

export const resetSteps = () => ({
  type: RESET_STEPS,
});
