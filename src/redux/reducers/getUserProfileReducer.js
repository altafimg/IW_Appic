import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_LOADING,
  GET_USER_PROFILE_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const getUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case GET_USER_PROFILE_FAILURE:
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

export default getUserProfileReducer;
