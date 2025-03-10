import {
  ACCOUNT_MANAGER_VERIFIED_REQUEST_FAILURE,
  ACCOUNT_MANAGER_VERIFIED_REQUEST_LOADING,
  ACCOUNT_MANAGER_VERIFIED_REQUEST_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const accountManagerVerifiedRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_MANAGER_VERIFIED_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACCOUNT_MANAGER_VERIFIED_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ACCOUNT_MANAGER_VERIFIED_REQUEST_FAILURE:
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

export default accountManagerVerifiedRequestReducer;
