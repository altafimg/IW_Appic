import axios from 'axios';
import {
  EDIT_USER_REQUEST_FAILURE,
  EDIT_USER_REQUEST_LOADING,
  EDIT_USER_REQUEST_SUCCESS,
} from './allActions';
import {global} from '../../global';

export const editUserRequestLoading = () => ({
  type: EDIT_USER_REQUEST_LOADING,
});

export const editUserRequestSuccess = response => ({
  type: EDIT_USER_REQUEST_SUCCESS,
  payload: response,
});

export const editUserRequestFailure = response => ({
  type: EDIT_USER_REQUEST_FAILURE,
  payload: response,
});

export const editUserRequestAction =
  ({
    user_id,
    req_name,
    new_value,
    current_value,
    reason_change,
    govt_id,
    pose1,
    pose2,
    token,
  }) =>
  async dispatch => {
    dispatch(editUserRequestLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/edit-request`,
        {
          user_id: user_id,
          edit_user_request: {
            req_name: req_name,
            new_value: new_value,
            current_value: current_value,
            reason_change: reason_change,
            govt_id: govt_id,
            pose1: pose1,
            pose2: pose2,
          },
        },
        config,
      );
      if (response) {
        dispatch(editUserRequestSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(editUserRequestFailure(error?.response));
      return error?.response;
    }
  };
