import axios from 'axios';
import {
  USER_REVIEW_FAILURE,
  USER_REVIEW_LOADING,
  USER_REVIEW_SUCCESS,
} from './allActions';
import {global} from '../../global';

const userReviewLoading = () => ({type: USER_REVIEW_LOADING});

const userReviewSuccess = response => ({
  type: USER_REVIEW_SUCCESS,
  payload: response,
});

const userReviewFailure = errorMessage => ({
  type: USER_REVIEW_FAILURE,
  payload: errorMessage,
});

export const userReviewAction =
  ({reviewerId, revieweeId, adsId, rating, comment}) =>
  async dispatch => {
    dispatch(userReviewLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/userReview`,
        {
          reviewerId: reviewerId,
          revieweeId: revieweeId,
          adsId: adsId,
          rating: rating,
          comment: comment,
        },
        config,
      );
      if (response) {
        dispatch(userReviewSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(userReviewFailure(error?.response));
      return error?.response;
    }
  };
