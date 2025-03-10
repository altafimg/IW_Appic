import {
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_LOADING,
  GET_LANGUAGES_SUCCESS,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

export const getLanguagesLoading = () => ({
  type: GET_LANGUAGES_LOADING,
});

export const getLanguagesSuccess = response => ({
  type: GET_LANGUAGES_SUCCESS,
  payload: response,
});

export const getLanguagesFailure = response => ({
  type: GET_LANGUAGES_FAILURE,
  payload: response,
});

export const getLanguagesAction = () => async dispatch => {
  dispatch(getLanguagesLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      global.BASE_URL + `users/language`,
      config,
    );
    if (response) {
      dispatch(getLanguagesSuccess(response));
    } else {
      dispatch(getLanguagesFailure('get languages failed'));
    }

    return response;
  } catch (err) {
    dispatch(getLanguagesFailure(err));
    return err.response;
  }
};
