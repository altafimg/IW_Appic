import {
  SEND_OTP_FAILURE,
  SEND_OTP_LOADING,
  SEND_OTP_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const sendOtpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data:[]
      };
    default:
      return state;
  }
};

export default sendOtpReducer;
