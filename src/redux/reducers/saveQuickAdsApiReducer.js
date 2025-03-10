import {
  SAVE_QUICK_ADS_API_FAILURE,
  SAVE_QUICK_ADS_API_LOADING,
  SAVE_QUICK_ADS_API_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const saveQuickAdsApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUICK_ADS_API_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_QUICK_ADS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SAVE_QUICK_ADS_API_FAILURE:
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

export default saveQuickAdsApiReducer;
