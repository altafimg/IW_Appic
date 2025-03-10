import {
  SEND_OTP_FAILURE,
  SEND_OTP_LOADING,
  SEND_OTP_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const sendOtpLoading = () => ({type: SEND_OTP_LOADING});

const sendOtpSuccess = response => ({
  type: SEND_OTP_SUCCESS,
  payload: response,
});

const sendOtpFailure = response => ({
  type: SEND_OTP_FAILURE,
  payload: response,
});

export const sendOptAction =
  ({phone_number}) =>
  async dispatch => {
    dispatch(sendOtpLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/send-otp`,
        {phone_number},
        config,
      );

      if (response) {
        dispatch(sendOtpSuccess(response));
        console.log(response, 'otp<<<<<<<<<<<<<<<<<');
      } else {
        dispatch(sendOtpFailure('send otp failed. Please try again.'));
        console.log('action error otp screen <<<<<<<<<<<<<<<<<');
      }

      return response;
    } catch (error) {
      console.log(error);
      dispatch(sendOtpFailure(error));
    }
  };
