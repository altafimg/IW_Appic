import {
  OTP_VERIFICATION_FAILURE,
  OTP_VERIFICATION_LOADING,
  OTP_VERIFICATION_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const otpVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_VERIFICATION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case OTP_VERIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default otpVerificationReducer;
