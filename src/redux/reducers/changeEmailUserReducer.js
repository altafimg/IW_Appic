import {
  CHANGE_EMAIL_USER_FAILURE,
  CHANGE_EMAIL_USER_LOADING,
  CHANGE_EMAIL_USER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const changeEmailUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHANGE_EMAIL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHANGE_EMAIL_USER_FAILURE:
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

export default changeEmailUserReducer;
