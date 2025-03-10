import {
  RECOVER_ACCOUNT_FAILURE,
  RECOVER_ACCOUNT_LOADING,
  RECOVER_ACCOUNT_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const recoverAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOVER_ACCOUNT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RECOVER_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case RECOVER_ACCOUNT_FAILURE:
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

export default recoverAccountReducer;
