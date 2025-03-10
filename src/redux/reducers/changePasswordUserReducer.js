import {
  CHANGE_PASSWORD_USER_FAILURE,
  CHANGE_PASSWORD_USER_LOADING,
  CHANGE_PASSWORD_USER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const changePasswordUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHANGE_PASSWORD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHANGE_PASSWORD_USER_FAILURE:
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

export default changePasswordUserReducer;