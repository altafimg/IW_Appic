import {
  CHECK_EXISTING_FAILURE,
  CHECK_EXISTING_LOADING,
  CHECK_EXISTING_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const checkExistingLoading = () => ({
  type: CHECK_EXISTING_LOADING,
});

export const checkExistingFailure = err => ({
  type: CHECK_EXISTING_FAILURE,
  payload: err,
});

export const checkExistingSuccess = response => ({
  type: CHECK_EXISTING_SUCCESS,
  payload: response,
});

export const checkExistingAction =
  ({data, type}) =>
  async dispatch => {
    dispatch(checkExistingLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      let response;
      if (type == 'email') {
        response = await axios.post(
          global.BASE_URL + 'users/checkemail',
          {
            email: data,
          },
          config,
        );
      } else if (type == 'user_name') {
        response = await axios.post(
          global.BASE_URL + 'users/checkemail',
          {
            user_name: data,
          },
          config,
        );
      }

      dispatch(checkExistingSuccess(response));
      return response;
    } catch (err) {
      dispatch(checkExistingFailure(err.response.data));
      return err.response;
    }
  };
