import {
  CLEAR_LOGIN_ERROR,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  user: [],
  error: null,
  token: null,
  loggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        loggedIn: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        token: action.payload.data.token,
        loggedIn: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
        loggedIn: false,
      };

    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default loginReducer;
