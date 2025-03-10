import {
  GET_USER_REVIEW_FAILURE,
  GET_USER_REVIEW_LOADING,
  GET_USER_REVIEW_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

const getUserReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REVIEW_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_REVIEW_SUCCESS:
      const {response, reviewerId, revieweeId} = action.payload;
      return {
        ...state,
        loading: false,
        data: {
          ...state?.data,
          [reviewerId]: {
            ...state?.data?.[reviewerId],
            [revieweeId]: response,
          },
        },
        error: null,
      };
    case GET_USER_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getUserReviewReducer;
