import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const resetPasswordLoading = () => ({type: RESET_PASSWORD_LOADING});

const resetPasswordSuccess = response => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: response,
});

const resetPasswordFailure = response => ({
  type: RESET_PASSWORD_FAILURE,
  payload: response,
});

export const resetPasswordAction =
  ({email, password, confirmPassword}) =>
  async dispatch => {
    dispatch(resetPasswordLoading());
    console.log(email,password,confirmPassword);
   
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-Reset-password`,
        {email, password, confirmPassword},
        config,
      );

      if (response) {
        dispatch(resetPasswordSuccess(response));
      } else {
        dispatch(
          resetPasswordFailure(' reset password failed. Please try again.'),
        );
      }

      return response;
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordFailure(error));
    }
  };
