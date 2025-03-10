import {
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

export const getCategoryLoading = () => ({
  type: GET_CATEGORY_LOADING,
});

export const getCategorySuccess = response => ({
  type: GET_CATEGORY_SUCCESS,
  payload: response,
});

export const getCategoryFailure = response => ({
  type: GET_CATEGORY_FAILURE,
  payload: response,
});

export const getCategoryAction = () => async dispatch => {
  dispatch(getCategoryLoading());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      global.BASE_URL + `users/cat-subcat-tag`,
      config,
    );
    if (response) {
      dispatch(getCategorySuccess(response));
    } else {
      dispatch(getCategoryFailure('get category failed'));
    }

    return response;
  } catch (err) {
    dispatch(getCategoryFailure(err));
    return err.response;
  }
};
