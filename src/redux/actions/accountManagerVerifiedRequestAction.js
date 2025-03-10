import {
  ACCOUNT_MANAGER_VERIFIED_REQUEST_FAILURE,
  ACCOUNT_MANAGER_VERIFIED_REQUEST_LOADING,
  ACCOUNT_MANAGER_VERIFIED_REQUEST_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const accountManagerVerifiedRequestLoading = () => ({
  type: ACCOUNT_MANAGER_VERIFIED_REQUEST_LOADING,
});

export const accountManagerVerifiedRequestFailure = response => ({
  type: ACCOUNT_MANAGER_VERIFIED_REQUEST_FAILURE,
  payload: response,
});

export const accountManagerVerifiedRequestSuccess = response => ({
  type: ACCOUNT_MANAGER_VERIFIED_REQUEST_SUCCESS,
  payload: response,
});

export const accountManagerVerifiedRequestAction =
  ({
    user_id,
    govt_id,
    pose1,
    pose2,
    token,
    Manager_verify_request_Status,
    user_role,
  }) =>
  async dispatch => {
    dispatch(accountManagerVerifiedRequestLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/account-manager-verification`,
        {
          user_Id: user_id,
          govt_id: govt_id,
          pose1: pose1,
          pose2: pose2,
          Manager_verify_request_Status: Manager_verify_request_Status,
          user_role: user_role,
        },
        config,
      );
      if (response) {
        dispatch(accountManagerVerifiedRequestSuccess(response));
      } else {
        dispatch(
          accountManagerVerifiedRequestFailure(
            'account manager verified request failed',
          ),
        );
      }

      return response;
    } catch (err) {
      console.log(err);
      dispatch(accountManagerVerifiedRequestFailure(err));
    }
  };
