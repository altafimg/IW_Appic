import {
  REPLACE_ACCOUNT_MANAGER_DATA_REMOVE,
  REPLACE_ACCOUNT_MANAGER_DATA_STORE,
} from './allActions';

export const replaceAccountManagerDataStoreAction = response => ({
  type: REPLACE_ACCOUNT_MANAGER_DATA_STORE,
  payload: response,
});

export const replaceAccountManagerDataRemoveAction = () => ({
  type: REPLACE_ACCOUNT_MANAGER_DATA_REMOVE,
});
