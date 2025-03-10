import {
  QUICK_CHATS_LIST_FAILURE,
  QUICK_CHATS_LIST_LOADING,
  QUICK_CHATS_LIST_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const quickChatsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK_CHATS_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case QUICK_CHATS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case QUICK_CHATS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default quickChatsListReducer;
