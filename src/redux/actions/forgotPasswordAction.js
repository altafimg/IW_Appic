import axios from 'axios';
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
} from './allActions';
import {global} from '../../global';

export const forgotPasswordLoading = () => ({
  type: FORGOT_PASSWORD_LOADING,
});

export const forgotPasswordFailure = response => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: response,
});

export const forgotPasswordSuccess = response => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: response,
});

export const forgotPasswordAction =
  ({email, mobileNumber, calling_code}) =>
  async dispatch => {
    dispatch(forgotPasswordLoading());
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (email !== '' && mobileNumber === '') {
      try {
        const response = await axios.post(
          global.BASE_URL + 'users/user-forgot-password',
          {
            email: email,
          },
          config,
        );
        if (response) {
          dispatch(forgotPasswordSuccess(response));
        } else {
          dispatch(forgotPasswordFailure('forgot password failed'));
        }

        return response;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          dispatch(forgotPasswordFailure(error.response.data.message));
        } else if (error.response && error.response.status === 401) {
          dispatch(forgotPasswordFailure(error.response.data.message));
        } else {
          dispatch(
            forgotPasswordFailure(
              'An unexpected error occurred. Please try again later.',
            ),
          );
        }
      }
    } else if (mobileNumber !== '' && email === '') {
      const phone_number = parseInt(mobileNumber);
      try {
        const response = await axios.post(
          global.BASE_URL + 'users/user-forgot-password',
          {
            phone_number: phone_number,
            phoneCode: calling_code,
          },
          config,
        );
        if (response) {
          dispatch(forgotPasswordSuccess(response));
        } else {
          dispatch(forgotPasswordFailure('forgot password failed'));
        }

        return response;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          dispatch(forgotPasswordFailure(error.response.data.message));
        } else if (error.response && error.response.status === 401) {
          dispatch(forgotPasswordFailure(error.response.data.message));
        } else {
          dispatch(
            forgotPasswordFailure(
              'An unexpected error occurred. Please try again later.',
            ),
          );
        }
      }
    }
  };