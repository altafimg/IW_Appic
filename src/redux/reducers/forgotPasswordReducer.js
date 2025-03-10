import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FORGOT_PASSWORD_FAILURE:
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

export default forgotPasswordReducer;
