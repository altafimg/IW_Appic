import {
  TWO_FACTOR_AUTH_FAILURE,
  TWO_FACTOR_AUTH_LOADING,
  TWO_FACTOR_AUTH_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const twoFactorAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWO_FACTOR_AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TWO_FACTOR_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case TWO_FACTOR_AUTH_FAILURE:
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

export default twoFactorAuthReducer;
