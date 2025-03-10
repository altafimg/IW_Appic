import {
  CHANGE_DOB_FAILURE,
  CHANGE_DOB_LOADING,
  CHANGE_DOB_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const changeDobReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHANGE_DOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHANGE_DOB_FAILURE:
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

export default changeDobReducer;
