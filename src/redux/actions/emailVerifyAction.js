import {
  EMAIL_VERIFY_STATUS_FAILURE,
  EMAIL_VERIFY_STATUS_LOADING,
  EMAIL_VERIFY_STATUS_SUCCESS,
} from './allActions';
import {global} from '../../global';
import axios from 'axios';

export const emailVerifyLoading = () => ({
  type: EMAIL_VERIFY_STATUS_LOADING,
});

export const emailVerifyFailure = response => ({
  type: EMAIL_VERIFY_STATUS_FAILURE,
  payload: response,
});

export const emailVerifySuccess = data => ({
  type: EMAIL_VERIFY_STATUS_SUCCESS,
  payload: data,
});

export const emailVerifyAction = _id => async dispatch => {
  dispatch(emailVerifyLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      global.BASE_URL + `users/email-verification-status/${_id}`,
      config,
    );
    if (response) {
      dispatch(emailVerifySuccess(response.data));
    } else {
      dispatch(emailVerifyFailure('email verify action failed'));
    }

    return response.data;
  } catch (err) {
    dispatch(emailVerifyFailure(err.response));
    return err.response;
  }
};
