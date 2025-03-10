import {
  ADD_TO_DO_LIST_VIDEO_FAILURE,
  ADD_TO_DO_LIST_VIDEO_LOADING,
  ADD_TO_DO_LIST_VIDEO_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToDoListVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DO_LIST_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_DO_LIST_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TO_DO_LIST_VIDEO_FAILURE:
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

export default addToDoListVideoReducer;
