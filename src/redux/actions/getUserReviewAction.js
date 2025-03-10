import axios from 'axios';
import {
  GET_USER_REVIEW_FAILURE,
  GET_USER_REVIEW_LOADING,
  GET_USER_REVIEW_SUCCESS,
} from './allActions';

import {global} from '../../global';

export const getUserReviewLoading = () => ({
  type: GET_USER_REVIEW_LOADING,
});

export const getUserReviewFailure = error => ({
  type: GET_USER_REVIEW_FAILURE,
  payload: error,
});

export const getUserReviewSuccess = (response, reviewerId, revieweeId) => ({
  type: GET_USER_REVIEW_SUCCESS,
  payload: {response, reviewerId, revieweeId},
});

export const getUserReviewAction =
  ({reviewerId, revieweeId}) =>
  async dispatch => {
    dispatch(getUserReviewLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL +
          `users/getReview?reviewerId=${reviewerId}&revieweeId=${revieweeId}`,
        config,
      );
      if (response) {
        dispatch(getUserReviewSuccess(response, reviewerId, revieweeId));
      }

      return response;
    } catch (err) {
      dispatch(getUserReviewFailure(err));
      return err;
    }
  };
