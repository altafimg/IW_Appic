import {
  AVAILABLE_QUICKADS_LOADING,
  AVAILABLE_QUICKADS_SUCCESS,
  AVAILABLE_QUICKADS_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const availableQuickAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case AVAILABLE_QUICKADS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AVAILABLE_QUICKADS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case AVAILABLE_QUICKADS_FAILURE:
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

export default availableQuickAdsReducer;
