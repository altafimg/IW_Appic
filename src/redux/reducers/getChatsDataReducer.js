import {
  GET_CHATS_DATA_FAILURE,
  GET_CHATS_DATA_LOADING,
  GET_CHATS_DATA_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const getChatsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };
    case GET_CHATS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case GET_CHATS_DATA_FAILURE:
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

export default getChatsDataReducer;
