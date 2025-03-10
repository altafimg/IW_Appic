import {
  MY_QUICKADS_LOADING,
  MY_QUICKADS_SUCCESS,
  MY_QUICKADS_FAILURE,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const myQuickAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_QUICKADS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MY_QUICKADS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case MY_QUICKADS_FAILURE:
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

export default myQuickAdsReducer;
