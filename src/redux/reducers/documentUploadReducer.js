import {
  DOCUMENT_UPLOAD_FAILURE,
  DOCUMENT_UPLOAD_LOADING,
  DOCUMENT_UPLOAD_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const documentUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DOCUMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case DOCUMENT_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default documentUploadReducer;
