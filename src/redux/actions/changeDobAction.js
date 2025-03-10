import {
  CHANGE_DOB_FAILURE,
  CHANGE_DOB_LOADING,
  CHANGE_DOB_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const changeDobLoading = () => ({
  type: CHANGE_DOB_LOADING,
});

export const changeDobFailure = error => ({
  type: CHANGE_DOB_FAILURE,
  payload: error,
});

export const changeDobSuccess = response => ({
  type: CHANGE_DOB_SUCCESS,
  payload: response,
});

export const changeDobAction =
  ({userId, newDob, reason}) =>
  async dispatch => {
    dispatch(changeDobLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        global.BASE_URL + `users/change-dob`,
        {
          userId: userId,
          newDob: newDob,
          reason: reason,
        },
        config,
      );
      if (response) {
        dispatch(changeDobSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(changeDobFailure(error?.response));
      return error?.response;
    }
  };
