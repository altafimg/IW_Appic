import {
  GET_JOBS_BY_APPLICANT_ID_FAILURE,
  GET_JOBS_BY_APPLICANT_ID_SUCCESS,
  GET_JOBS_BY_APPLICANT_ID_LOADING,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getJobsByApplicantIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS_BY_APPLICANT_ID_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case GET_JOBS_BY_APPLICANT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_JOBS_BY_APPLICANT_ID_FAILURE:
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

export default getJobsByApplicantIdReducer;
