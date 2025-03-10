import {
  RECOVER_ACCOUNT_DATA_ADD,
  RECOVER_ACCOUNT_DATA_REMOVE,
} from './allActions';

export const recoverAccountDataAddAction = response => ({
  type: RECOVER_ACCOUNT_DATA_ADD,
  payload: response,
});

export const recoverAccountDataRemoveAction = () => ({
  type: RECOVER_ACCOUNT_DATA_REMOVE,
});
