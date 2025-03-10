import {
  TWO_FACTOR_AUTH_FAILURE,
  TWO_FACTOR_AUTH_LOADING,
  TWO_FACTOR_AUTH_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const twoFactorAuthLoading = () => ({
  type: TWO_FACTOR_AUTH_LOADING,
});

export const twoFactorAuthFailure = error => ({
  type: TWO_FACTOR_AUTH_FAILURE,
  payload: error,
});

export const twoFactorAuthSuccess = response => ({
  type: TWO_FACTOR_AUTH_SUCCESS,
  payload: response,
});

export const twoFactorAuthAction =
  ({token, _id, isEnabled}) =>
  async dispatch => {
    dispatch(twoFactorAuthLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/two-factor-auth`,
        {
          userId: _id,
          two_factor_auth: isEnabled,
        },
        config,
      );
      if (response) {
        dispatch(twoFactorAuthSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(twoFactorAuthFailure(error?.response));
      return error?.response;
    }
  };
