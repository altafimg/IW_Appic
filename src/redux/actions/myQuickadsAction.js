import {
  MY_QUICKADS_LOADING,
  MY_QUICKADS_SUCCESS,
  MY_QUICKADS_FAILURE,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const myQuickAdsLoading = () => ({
  type: MY_QUICKADS_LOADING,
});

export const myQuickAdsSuccess = response => ({
  type: MY_QUICKADS_SUCCESS,
  payload: response,
});

export const myQuickAdsFailure = response => ({
  type: MY_QUICKADS_FAILURE,
  payload: response,
});

export const myQuickAdsAction =
  ({token, _id}) =>
  async dispatch => {
    dispatch(myQuickAdsLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL + `quickAds/ads?user_id=${_id}`,
        config,
      );
      if (response) {
        dispatch(myQuickAdsSuccess(response));
      } else {
        dispatch(myQuickAdsFailure('Network Error'));
      }
      return response;
    } catch (error) {
      dispatch(myQuickAdsFailure(error.response.data.message));
    }
  };
