import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case RESET_PASSWORD_FAILURE:
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

export default resetPasswordReducer;
