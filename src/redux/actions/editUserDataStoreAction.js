import {EDIT_USER_DATA_REMOVE, EDIT_USER_DATA_STORE} from './allActions';

export const editUserDataStoreAction = response => ({
  type: EDIT_USER_DATA_STORE,
  payload: response,
});

export const editUserDataRemoveAction = () => ({
  type: EDIT_USER_DATA_REMOVE,
});
