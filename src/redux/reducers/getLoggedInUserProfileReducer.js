import {
  GET_LOGGEDIN_USER_PROFILE_FAILURE,
  GET_LOGGEDIN_USER_PROFILE_LOADING,
  GET_LOGGEDIN_USER_PROFILE_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const getLoggedInUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGEDIN_USER_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LOGGEDIN_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_LOGGEDIN_USER_PROFILE_FAILURE:
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

export default getLoggedInUserProfileReducer;
