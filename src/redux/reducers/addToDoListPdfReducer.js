import {
  ADD_TO_DO_LIST_PDF_LOADING,
  ADD_TO_DO_LIST_PDF_SUCCESS,
  ADD_TO_DO_LIST_PDF_FAILURE,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToDoListPdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DO_LIST_PDF_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_DO_LIST_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TO_DO_LIST_PDF_FAILURE:
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

export default addToDoListPdfReducer;
