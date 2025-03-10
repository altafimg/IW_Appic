import {
  REMOVE_SAVED_QUICK_ADS_API_FAILURE,
  REMOVE_SAVED_QUICK_ADS_API_LOADING,
  REMOVE_SAVED_QUICK_ADS_API_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const removeSavedQuickAdsApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_SAVED_QUICK_ADS_API_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REMOVE_SAVED_QUICK_ADS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case REMOVE_SAVED_QUICK_ADS_API_FAILURE:
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

export default removeSavedQuickAdsApiReducer;
