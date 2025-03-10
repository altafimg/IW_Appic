import {
  CANCEL_JOB_QUICKADS_LOADING,
  CANCEL_JOB_QUICKADS_SUCCESS,
  CANCEL_JOB_QUICKADS_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const CancelJobTodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_JOB_QUICKADS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CANCEL_JOB_QUICKADS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CANCEL_JOB_QUICKADS_FAILURE:
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
