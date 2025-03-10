import {
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case EDIT_PROFILE_FAILURE:
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

export default editProfileReducer;
