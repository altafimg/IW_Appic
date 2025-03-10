import {
  GET_JOB_BY_DATE_TIME_FAILURE,
  GET_JOB_BY_DATE_TIME_LOADING,
  GET_JOB_BY_DATE_TIME_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getJobByDateTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_BY_DATE_TIME_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case GET_JOB_BY_DATE_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_JOB_BY_DATE_TIME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
};

export default getJobByDateTimeReducer;
