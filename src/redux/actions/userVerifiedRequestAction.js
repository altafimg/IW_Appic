import {
  USER_VERIFIED_REQUEST_FAILURE,
  USER_VERIFIED_REQUEST_LOADING,
  USER_VERIFIED_REQUEST_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const userVerifiedRequestLoading = () => ({
  type: USER_VERIFIED_REQUEST_LOADING,
});

export const userVerifiedRequestFailure = response => ({
  type: USER_VERIFIED_REQUEST_FAILURE,
  payload: response,
});

export const userVerifiedRequestSuccess = response => ({
  type: USER_VERIFIED_REQUEST_SUCCESS,
  payload: response,
});

export const userVerifiedRequestAction =
  ({user_id, govt_id, pose1, pose2, token, user_verify_status}) =>
  async dispatch => {
    dispatch(userVerifiedRequestLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-verification`,
        {
          user_Id: user_id,
          govt_id: govt_id,
          pose1: pose1,
          pose2: pose2,
          user_verify_status: user_verify_status,
        },
        config,
      );
      if (response) {
        dispatch(userVerifiedRequestSuccess(response));
      } else {
        dispatch(userVerifiedRequestFailure('user verified request failed'));
      }

      return response;
    } catch (err) {
      console.log(err);
      dispatch(userVerifiedRequestFailure(err));
    }
  };
