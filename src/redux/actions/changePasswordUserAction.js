import {
  CHANGE_PASSWORD_USER_FAILURE,
  CHANGE_PASSWORD_USER_LOADING,
  CHANGE_PASSWORD_USER_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const changePasswordUserLoading = () => ({
  type: CHANGE_PASSWORD_USER_LOADING,
});

export const changePasswordUserFailure = error => ({
  type: CHANGE_PASSWORD_USER_FAILURE,
  payload: error,
});

export const changePasswordUserSuccess = response => ({
  type: CHANGE_PASSWORD_USER_SUCCESS,
  payload: response,
});

export const changePasswordUserAction =
  ({currentPassword, newPassword, _id, token}) =>
  async dispatch => {
    dispatch(changePasswordUserLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/change-password/${_id}`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        config,
      );
      if (response) {
        dispatch(changePasswordUserSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(changePasswordUserFailure(error?.response));
      return error?.response;
    }
  };
