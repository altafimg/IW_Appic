import axios from 'axios';
import {global} from '../../global';
import {
  OTP_VERIFICATION_FAILURE,
  OTP_VERIFICATION_LOADING,
  OTP_VERIFICATION_SUCCESS,
} from './allActions';

const optVerificationLoading = () => ({type: OTP_VERIFICATION_LOADING});

const optVerificationSuccess = response => ({
  type: OTP_VERIFICATION_SUCCESS,
  payload: response,
});

const optVerificationFailure = response => ({
  type: OTP_VERIFICATION_FAILURE,
  payload: response,
});

export const optVerificationAction =
  ({email, otp}) =>
  async dispatch => {
    dispatch(optVerificationLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + 'users/verification-otp',
        {email: email, otp: otp},
        config,
      );
      dispatch(optVerificationSuccess(response));

      return response;
    } catch (error) {
      if (error.response.data) {
        if (error.response.status === 404) {
          // console.log(error.response.data.message, "404");
          dispatch(optVerificationFailure(error.response.data.message));
        } else {
          dispatch(optVerificationFailure(error.response.data.message));
        }
      }
      // console.log(error, 'action error');
      // dispatch(optVerificationFailure(error));
    }
  };
