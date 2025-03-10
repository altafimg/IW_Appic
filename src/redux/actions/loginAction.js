import axios from 'axios';
import {
  CLEAR_LOGIN_ERROR,
  LOGIN_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from './allActions';
import {global} from '../../global';

const loginPending = () => ({type: LOGIN_LOADING});

const loginSuccess = response => ({
  type: LOGIN_SUCCESS,
  payload: response,
});

const loginFailure = errorMessage => ({
  type: LOGIN_FAILURE,
  payload: errorMessage,
});

export const loginAction =
  ({email, password}) =>
  async dispatch => {
    dispatch(loginPending());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        global.BASE_URL + `users/login`,
        {email, password},
        config,
      );

      if (response) {
        dispatch(loginSuccess(response));
      } else {
        dispatch(loginFailure('Login failed. Please try again.'));
      }

      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(loginFailure(error.response.data.message));
      } else if (error.response && error.response.status === 401) {
        dispatch(loginFailure(error.response.data.message));
      }
      //  else {
      //   dispatch(
      //     loginFailure('An unexpected error occurred. Please try again later.'),
      //   );
      // }
    }
  };

export const clearLoginError = () => ({type: CLEAR_LOGIN_ERROR});
