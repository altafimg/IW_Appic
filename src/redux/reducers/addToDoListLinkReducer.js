import {
  ADD_TO_DO_LIST_LINK_FAILURE,
  ADD_TO_DO_LIST_LINK_LOADING,
  ADD_TO_DO_LIST_LINK_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToDoListLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_DO_LIST_LINK_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_DO_LIST_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_TO_DO_LIST_LINK_FAILURE:
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

export default addToDoListLinkReducer;
