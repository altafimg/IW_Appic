import {
  ACCEPT_JOB_LOADING,
  ACCEPT_JOB_SUCCESS,
  ACCEPT_JOB_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const acceptJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACCEPT_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ACCEPT_JOB_FAILURE:
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

export default acceptJobReducer;
