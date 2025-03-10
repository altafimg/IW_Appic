import axios from 'axios';
import {
  SEND_VERIFICATION_EMAIL_FAILURE,
  SEND_VERIFICATION_EMAIL_LOADING,
  SEND_VERIFICATION_EMAIL_SUCCESS,
} from './allActions';
import {global} from '../../global';

export const sendVerificationEmailLoading = () => ({
  type: SEND_VERIFICATION_EMAIL_LOADING,
});

export const sendVerificationEmailSuccess = response => ({
  type: SEND_VERIFICATION_EMAIL_SUCCESS,
  payload: response,
});

export const sendVerificationEmailFailure = response => ({
  type: SEND_VERIFICATION_EMAIL_FAILURE,
  payload: response,
});

export const sendVerificationEmailAction = email => async dispatch => {
  dispatch(sendVerificationEmailLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(
      global.BASE_URL + `users/resend-verification-email`,
      {
        email: email,
      },
      config,
    );
    if (response) {
      dispatch(sendVerificationEmailSuccess(response));
    } else {
      dispatch(sendVerificationEmailFailure('send verification email failed'));
    }

    return response;
  } catch (err) {
    console.log(err.response.data);
    dispatch(sendVerificationEmailFailure(err));
  }
};
