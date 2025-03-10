import {
  JOB_DETAILS_LOADING,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const jobDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case JOB_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case JOB_DETAILS_FAILURE:
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

export default jobDetailsReducer;
