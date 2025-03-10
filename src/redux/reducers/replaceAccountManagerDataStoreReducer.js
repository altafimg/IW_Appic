import {
  REPLACE_ACCOUNT_MANAGER_DATA_REMOVE,
  REPLACE_ACCOUNT_MANAGER_DATA_STORE,
} from '../actions/allActions';

const initialData = {
  data: [],
};

export const replaceAccountManagerDataStoreReducer = (
  state = initialData,
  action,
) => {
  switch (action.type) {
    case REPLACE_ACCOUNT_MANAGER_DATA_STORE:
      return {
        ...state,
        data: action.payload,
      };
    case REPLACE_ACCOUNT_MANAGER_DATA_REMOVE:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
