import axios from 'axios';
import {
  GET_LOGGEDIN_USER_PROFILE_FAILURE,
  GET_LOGGEDIN_USER_PROFILE_LOADING,
  GET_LOGGEDIN_USER_PROFILE_SUCCESS,
} from './allActions';

import {global} from '../../global';

export const getLoggedInUserProfileLoading = () => ({
  type: GET_LOGGEDIN_USER_PROFILE_LOADING,
});

export const getLoggedInUserProfileFailure = response => ({
  type: GET_LOGGEDIN_USER_PROFILE_FAILURE,
  payload: response,
});

export const getLoggedInUserProfileSuccess = response => ({
  type: GET_LOGGEDIN_USER_PROFILE_SUCCESS,
  payload: response,
});

export const getLoggedInUserProfileAction =
  ({_id, token}) =>
  async dispatch => {
    dispatch(getLoggedInUserProfileLoading());

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
        dispatch(getLoggedInUserProfileSuccess(response));
      } else {
        dispatch(getLoggedInUserProfileFailure('get user profile failed'));
      }

      return response;
    } catch (err) {
      dispatch(getLoggedInUserProfileFailure(err));
    }
  };
