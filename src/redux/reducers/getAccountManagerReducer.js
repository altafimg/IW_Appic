import {
  GET_ACCOUNT_MANAGER_FAILURE,
  GET_ACCOUNT_MANAGER_LOADING,
  GET_ACCOUNT_MANAGER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const getAccountManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_MANAGER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ACCOUNT_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case GET_ACCOUNT_MANAGER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getAccountManagerReducer;
