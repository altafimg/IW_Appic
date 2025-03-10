import {
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const getCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };
    default:
      return state;
  }
};

export default getCategoryReducer;
