import {MOBILE_NUMBER_DATA_REMOVE, MOBILE_NUMBER_DATA_SAVE} from './allActions';

export const mobileNumberDataSaveAction = response => ({
  type: MOBILE_NUMBER_DATA_SAVE,
  payload: response,
});

export const mobileNumberDataRemoveAction = () => ({
  type: MOBILE_NUMBER_DATA_REMOVE,
});
