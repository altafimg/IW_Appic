import {
  SEND_VERIFICATION_EMAIL_FAILURE,
  SEND_VERIFICATION_EMAIL_LOADING,
  SEND_VERIFICATION_EMAIL_SUCCESS,
} from '../actions/allActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const sendVerificationEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_VERIFICATION_EMAIL_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SEND_VERIFICATION_EMAIL_FAILURE:
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

export default sendVerificationEmailReducer;
