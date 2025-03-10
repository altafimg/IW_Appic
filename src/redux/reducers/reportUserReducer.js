import {
  REPORT_USER_FAILURE,
  REPORT_USER_LOADING,
  REPORT_USER_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const reportUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REPORT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case REPORT_USER_FAILURE:
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

export default reportUserReducer;
