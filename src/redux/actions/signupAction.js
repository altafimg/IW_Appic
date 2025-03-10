import axios from 'axios';
import {SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_LOADING} from './allActions';
import {global} from '../../global';

export const signUpLoading = () => ({
  type: SIGNUP_LOADING,
});

export const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signUpSuccess = response => ({
  type: SIGNUP_SUCCESS,
  payload: response,
});

export const signUpAction = (data, type) => async dispatch => {
  dispatch(signUpLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let response;
    if (type === 'user') {
      response = await axios.post(
        global.BASE_URL + `users/signup`,
        {
          email: data.email,
          confirmPassword: data.confirmPassword,
          password: data.password,
          user_name: data.userName,
          first_name: data.firstName,
          last_name: data.lastName,
          profile_name: data.profileName,
          user_role: data.user_role,
          dob: data.dateOfBirth,
        },
        config,
      );
    } else if (type === 'company') {
      response = await axios.post(
        global.BASE_URL + `users/signup`,
        {
          company_name: data.companyName,
          profile_name: data.profileName,
          user_name: data.userName,
          user_role: data.user_role,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        config,
      );
    }

    if (response && response.data) {
      dispatch(signUpSuccess(response.data));
    } else {
      dispatch(signUpFailure('Sign up failed'));
    }

    return response;
  } catch (err) {
    console.log(err.response);
    console.log(err.message);
    dispatch(signUpFailure(err.message));
  }
};
