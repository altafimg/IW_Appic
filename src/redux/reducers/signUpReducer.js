import {
  SIGNUP_FAILURE,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case SIGNUP_FAILURE:
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

export default signUpReducer;
