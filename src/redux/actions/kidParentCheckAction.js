import {KID_PARENT_CHECK_REMOVE, KID_PARENT_CHECK_STORE} from './allActions';

export const kidParentCheckStoreAction = response => ({
  type: KID_PARENT_CHECK_STORE,
  payload: response,
});

export const kidParentCheckRemoveAction = () => ({
  type: KID_PARENT_CHECK_REMOVE,
});
