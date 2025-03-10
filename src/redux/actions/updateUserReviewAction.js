import axios from 'axios';
import {
  UPDATE_USER_REVIEW_FAILURE,
  UPDATE_USER_REVIEW_LOADING,
  UPDATE_USER_REVIEW_SUCCESS,
} from './allActions';

import {global} from '../../global';

const updateUserReviewPending = () => ({type: UPDATE_USER_REVIEW_LOADING});

const updateUserReviewSuccess = response => ({
  type: UPDATE_USER_REVIEW_SUCCESS,
  payload: response,
});

const updateUserReviewFailure = errorMessage => ({
  type: UPDATE_USER_REVIEW_FAILURE,
  payload: errorMessage,
});

export const updateUserReviewAction =
  ({id, rating, comment}) =>
  async dispatch => {
    dispatch(updateUserReviewPending());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.put(
        global.BASE_URL + `users/reviews/${id}`,
        {
          rating: rating,
          comment: comment,
        },
        config,
      );
      if (response) {
        dispatch(updateUserReviewSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(updateUserReviewFailure(error?.response));
      return error?.response;
    }
  };
