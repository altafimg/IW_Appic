import {
  REPORT_JOB_LOADING,
  REPORT_JOB_SUCCESS,
  REPORT_JOB_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const reportJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REPORT_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case REPORT_JOB_FAILURE:
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

export default reportJobReducer;
