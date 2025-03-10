import {
  EDIT_ACCOUNT_MANAGER_FAILURE,
  EDIT_ACCOUNT_MANAGER_LOADING,
  EDIT_ACCOUNT_MANAGER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const editAccountManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ACCOUNT_MANAGER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_ACCOUNT_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case EDIT_ACCOUNT_MANAGER_FAILURE:
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

export default editAccountManagerReducer;
