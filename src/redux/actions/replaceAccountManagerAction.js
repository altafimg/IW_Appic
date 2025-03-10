import {
  REPLACE_ACCOUNT_MANAGER_FAILURE,
  REPLACE_ACCOUNT_MANAGER_LOADING,
  REPLACE_ACCOUNT_MANAGER_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const replaceAccountManagerLoading = () => ({
  type: REPLACE_ACCOUNT_MANAGER_LOADING,
});

export const replaceAccountManagerFailure = error => ({
  type: REPLACE_ACCOUNT_MANAGER_FAILURE,
  payload: error,
});

export const replaceAccountManagerSuccess = response => ({
  type: REPLACE_ACCOUNT_MANAGER_SUCCESS,
  payload: response,
});

export const replaceAccountManagerAction =
  ({
    user_Id,
    managerId,
    first_name,
    last_name,
    profile_name,
    relationship,
    date_of_birth,
    email,
    token,
    pose1,
    pose2,
    govt_id,
    Manager_verify_request_Status,
  }) =>
  async dispatch => {
    dispatch(replaceAccountManagerLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/manager-replace`,
        {
          user_Id,
          managerId,
          first_name,
          last_name,
          profile_name,
          relationship,
          date_of_birth,
          email,
          Manager_verify_request_Status,
          Manager_verify_request: {
            govt_id: govt_id,
            pose1: pose1,
            pose2: pose2,
          },
        },
        config,
      );
      if (response) {
        dispatch(replaceAccountManagerSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(replaceAccountManagerFailure(error?.response));
      return error?.response;
    }
  };
