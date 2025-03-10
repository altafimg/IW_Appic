import axios from 'axios';
import {
  GET_ACCOUNT_MANAGER_FAILURE,
  GET_ACCOUNT_MANAGER_LOADING,
  GET_ACCOUNT_MANAGER_SUCCESS,
} from './allActions';
import {global} from '../../global';

const getAccountManagerLoading = () => ({type: GET_ACCOUNT_MANAGER_LOADING});

const getAccountManagerSuccess = response => ({
  type: GET_ACCOUNT_MANAGER_SUCCESS,
  payload: response,
});

const getAccountManagerFailure = error => ({
  type: GET_ACCOUNT_MANAGER_FAILURE,
  payload: error,
});

export const getAccountManagerAction = id => async dispatch => {
  dispatch(getAccountManagerLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.get(
      global.BASE_URL + `users/get-manager/${id}`,
      config,
    );

    if (response) {
      dispatch(getAccountManagerSuccess(response));
    } else {
      dispatch(
        getAccountManagerFailure(
          'get account manager failed. Please try again.',
        ),
      );
    }

    return response;
  } catch (error) {
    dispatch(getAccountManagerFailure(error));
    return error;
  }
};
