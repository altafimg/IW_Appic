import {
  CANCEL_JOB_LOADING,
  CANCEL_JOB_SUCCESS,
  CANCEL_JOB_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const CancelJobTodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CANCEL_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CANCEL_JOB_FAILURE:
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

export default CancelJobTodoListReducer;
