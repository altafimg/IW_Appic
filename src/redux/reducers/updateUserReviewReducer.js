import {
  UPDATE_USER_REVIEW_FAILURE,
  UPDATE_USER_REVIEW_LOADING,
  UPDATE_USER_REVIEW_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const updateUserReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REVIEW_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_USER_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case UPDATE_USER_REVIEW_FAILURE:
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

export default updateUserReviewReducer;
