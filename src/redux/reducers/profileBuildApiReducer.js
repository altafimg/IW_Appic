import {
  PROFILE_BUILD_API_FAILURE,
  PROFILE_BUILD_API_LOADING,
  PROFILE_BUILD_API_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const profileBuildApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_BUILD_API_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROFILE_BUILD_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case PROFILE_BUILD_API_FAILURE:
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

export default profileBuildApiReducer;
