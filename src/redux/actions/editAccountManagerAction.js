import axios from 'axios';
import {
  EDIT_ACCOUNT_MANAGER_FAILURE,
  EDIT_ACCOUNT_MANAGER_LOADING,
  EDIT_ACCOUNT_MANAGER_SUCCESS,
} from './allActions';
import {global} from '../../global';

export const editAccountManagerLoading = () => ({
  type: EDIT_ACCOUNT_MANAGER_LOADING,
});

export const editAccountManagerSuccess = response => ({
  type: EDIT_ACCOUNT_MANAGER_SUCCESS,
  payload: response,
});

export const editAccountManagerFailure = response => ({
  type: EDIT_ACCOUNT_MANAGER_FAILURE,
  payload: response,
});

export const editAccountManagerAction =
  ({photo, manager_Id, token}) =>
  async dispatch => {
    dispatch(editAccountManagerLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/manager-profile-Update`,
        {
          manager_Id: manager_Id,
          photo: photo,
        },
        config,
      );
      if (response) {
        dispatch(editAccountManagerSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(editAccountManagerFailure(error?.response));
      return error?.response;
    }
  };
