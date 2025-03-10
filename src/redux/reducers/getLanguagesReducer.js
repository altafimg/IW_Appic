import {
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_LOADING,
  GET_LANGUAGES_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getLanguagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
};

export default getLanguagesReducer;
