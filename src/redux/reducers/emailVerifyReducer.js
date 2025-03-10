import {
  EMAIL_VERIFY_STATUS_FAILURE,
  EMAIL_VERIFY_STATUS_LOADING,
  EMAIL_VERIFY_STATUS_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const emailVerifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_VERIFY_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EMAIL_VERIFY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case EMAIL_VERIFY_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
};

export default emailVerifyReducer;
