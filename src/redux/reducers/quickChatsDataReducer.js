import {
  QUICK_CHATS_DATA_FAILURE,
  QUICK_CHATS_DATA_LOADING,
  QUICK_CHATS_DATA_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const quickChatsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUICK_CHATS_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case QUICK_CHATS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case QUICK_CHATS_DATA_FAILURE:
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

export default quickChatsDataReducer;
