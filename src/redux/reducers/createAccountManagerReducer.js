import {
  CREATE_ACCOUNT_MANAGER_FAILURE,
  CREATE_ACCOUNT_MANAGER_LOADING,
  CREATE_ACCOUNT_MANAGER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const createAccountManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT_MANAGER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ACCOUNT_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CREATE_ACCOUNT_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data:[]
      };
    default:
      return state;
  }
};

export default createAccountManagerReducer;
