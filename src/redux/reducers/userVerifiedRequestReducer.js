import {
  USER_VERIFIED_REQUEST_FAILURE,
  USER_VERIFIED_REQUEST_LOADING,
  USER_VERIFIED_REQUEST_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const userVerifiedRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_VERIFIED_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_VERIFIED_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case USER_VERIFIED_REQUEST_FAILURE:
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

export default userVerifiedRequestReducer;
