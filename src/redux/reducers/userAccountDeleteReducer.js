import {
  USER_ACCOUNT_DELETE_FAILURE,
  USER_ACCOUNT_DELETE_LOADING,
  USER_ACCOUNT_DELETE_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const userAccountDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT_DELETE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_ACCOUNT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case USER_ACCOUNT_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userAccountDeleteReducer;