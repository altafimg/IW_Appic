import axios from 'axios';
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_LOADING,
  GET_USER_PROFILE_SUCCESS,
} from './allActions';

import {global} from '../../global';

export const getUserProfileLoading = () => ({
  type: GET_USER_PROFILE_LOADING,
});

export const getUserProfileFailure = response => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: response,
});

export const getUserProfileSuccess = response => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: response,
});

export const getUserProfileAction =
  ({_id, token}) =>
  async dispatch => {
    dispatch(getUserProfileLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL + `users/user-profile?_id=${_id}`,
        config,
      );
      if (response) {
        dispatch(getUserProfileSuccess(response));
      } else {
        dispatch(getUserProfileFailure('get user profile failed'));
      }

      return response;
    } catch (err) {
      dispatch(getUserProfileFailure(err));
    }
  };
