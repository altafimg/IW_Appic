import {
  REPLACE_ACCOUNT_MANAGER_FAILURE,
  REPLACE_ACCOUNT_MANAGER_LOADING,
  REPLACE_ACCOUNT_MANAGER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const replaceAccountManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPLACE_ACCOUNT_MANAGER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REPLACE_ACCOUNT_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case REPLACE_ACCOUNT_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};

export default replaceAccountManagerReducer;
