import {
  CHECK_EXISTING_FAILURE,
  CHECK_EXISTING_LOADING,
  CHECK_EXISTING_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const checkExistingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_EXISTING_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHECK_EXISTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHECK_EXISTING_FAILURE:
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

export default checkExistingReducer;
