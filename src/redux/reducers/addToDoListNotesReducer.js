import {
  ADD_TO_DO_LIST_NOTES_FAILURE,
  ADD_TO_DO_LIST_NOTES_LOADING,
  ADD_TO_DO_LIST_NOTES_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToDoListNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DO_LIST_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_DO_LIST_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TO_DO_LIST_NOTES_FAILURE:
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

export default addToDoListNotesReducer;
