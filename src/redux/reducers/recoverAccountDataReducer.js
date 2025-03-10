import {
  RECOVER_ACCOUNT_DATA_ADD,
  RECOVER_ACCOUNT_DATA_REMOVE,
} from '../actions/allActions';

const initialData = {
  data: [],
};

const recoverAccountDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case RECOVER_ACCOUNT_DATA_ADD:
      return {
        ...state,
        data: action.payload,
      };
    case RECOVER_ACCOUNT_DATA_REMOVE:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
export default recoverAccountDataReducer;
