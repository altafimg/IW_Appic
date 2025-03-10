import {
  ADD_TO_DO_LIST_IMAGE_LOADING,
  ADD_TO_DO_LIST_IMAGE_SUCCESS,
  ADD_TO_DO_LIST_IMAGE_FAILURE,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToDoListImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DO_LIST_IMAGE_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_DO_LIST_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TO_DO_LIST_IMAGE_FAILURE:
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

export default addToDoListImageReducer;
