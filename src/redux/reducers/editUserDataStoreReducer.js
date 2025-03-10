import {
  EDIT_USER_DATA_REMOVE,
  EDIT_USER_DATA_STORE,
} from '../actions/allActions';

const initialData = {
  data: {},
};

export const editUserDataStoreReducer = (state = initialData, action) => {
  switch (action.type) {
    case EDIT_USER_DATA_STORE:
      return {
        ...state,
        data: action.payload,
      };
    case EDIT_USER_DATA_REMOVE:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};
