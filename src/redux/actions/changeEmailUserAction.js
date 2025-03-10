import {
  CHANGE_EMAIL_USER_FAILURE,
  CHANGE_EMAIL_USER_SUCCESS,
  CHANGE_EMAIL_USER_LOADING,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const changeEmailUserLoading = () => ({
  type: CHANGE_EMAIL_USER_LOADING,
});

export const changeEmailUserFailure = error => ({
  type: CHANGE_EMAIL_USER_FAILURE,
  payload: error,
});

export const changeEmailUserSuccess = response => ({
  type: CHANGE_EMAIL_USER_SUCCESS,
  payload: response,
});

export const changeEmailUserAction =
  ({token, _id, currentEmail, newEmail}) =>
  async dispatch => {
    dispatch(changeEmailUserLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/change/email`,
        {
          userId: _id,
          currentEmail: currentEmail,
          newEmail: newEmail,
        },
        config,
      );
      if (response) {
        dispatch(changeEmailUserSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(changeEmailUserFailure(error?.response));
      return error?.response;
    }
  };
