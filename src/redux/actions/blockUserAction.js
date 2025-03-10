import {
  BLOCK_USER_FAILURE,
  BLOCK_USER_LOADING,
  BLOCK_USER_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const blockUserLoading = () => ({type: BLOCK_USER_LOADING});

const blockUserSuccess = response => ({
  type: BLOCK_USER_SUCCESS,
  payload: response,
});

const blockUserFailure = response => ({
  type: BLOCK_USER_FAILURE,
  payload: response,
});

export const blockUserAction = data => async dispatch => {
  dispatch(blockUserLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(
      // global.BASE_URL + `users/send-otp`,
      {data},
      config,
    );

    if (response) {
      dispatch(blockUserSuccess(response));
    } else {
      dispatch(blockUserFailure('block user failed. Please try again.'));
    }

    return response;
  } catch (error) {
    console.log(error);
    dispatch(blockUserFailure(error));
  }
};
