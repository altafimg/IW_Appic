import {
  GET_SAVED_QUICK_ADS_API_FAILURE,
  GET_SAVED_QUICK_ADS_API_LOADING,
  GET_SAVED_QUICK_ADS_API_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const getSavedQuickAdsApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVED_QUICK_ADS_API_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SAVED_QUICK_ADS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_SAVED_QUICK_ADS_API_FAILURE:
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

export default getSavedQuickAdsApiReducer;
