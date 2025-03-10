import {
  USER_ACCOUNT_DELETE_FAILURE,
  USER_ACCOUNT_DELETE_LOADING,
  USER_ACCOUNT_DELETE_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const userAccountDeleteLoading = () => ({
  type: USER_ACCOUNT_DELETE_LOADING,
});

export const userAccountDeleteFailure = response => ({
  type: USER_ACCOUNT_DELETE_FAILURE,
  payload: response,
});

export const userAccountDeleteSuccess = response => ({
  type: USER_ACCOUNT_DELETE_SUCCESS,
  payload: response,
});

export const userAccountDeleteAction =
  ({token, _id, Password, Reason}) =>
  async dispatch => {
    dispatch(userAccountDeleteLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    // console.log(token, _id, Password, Reason);

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-account-delete/${_id}`,
        {
          Password: Password,
          Reason: Reason,
        },
        config,
      );
      // if (response) {
      //   dispatch(userAccountDeleteSuccess(response));
      // } else {
      //   dispatch(userAccountDeleteFailure('user account delete failed'));
      // }
      //   dispatch(userAccountDeleteSuccess(response));
      dispatch(userAccountDeleteSuccess(response?.data?.message));
      return response?.data?.message;
    } catch (error) {
      // dispatch(userAccountDeleteFailure(error));
      // return error;

      if (error?.response?.status === 400) {
        dispatch(userAccountDeleteAction(error?.response?.data?.message));
        return error?.response?.data?.message;
      } else if (error?.response?.status === 401) {
        dispatch(userAccountDeleteAction(error?.response?.data?.message));
        return error?.response?.data?.message;
      } else if (error?.response?.status === 404) {
        dispatch(userAccountDeleteAction(error?.response?.data?.message));
        return error?.response?.data?.message;
      } else {
        dispatch(
          userAccountDeleteAction(
            'An unexpected error occurred. Please try again later.',
          ),
        );
      }
    }
  };
