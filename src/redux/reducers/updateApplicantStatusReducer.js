import {
  UPDATE_APPLICANT_STATUS_FAILURE,
  UPDATE_APPLICANT_STATUS_LOADING,
  UPDATE_APPLICANT_STATUS_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const updateApplicantStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPLICANT_STATUS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_APPLICANT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_APPLICANT_STATUS_FAILURE:
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

export default updateApplicantStatusReducer;
