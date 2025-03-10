import {
  SAVE_QUICK_ADS_API_FAILURE,
  SAVE_QUICK_ADS_API_LOADING,
  SAVE_QUICK_ADS_API_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const saveQuickAdsApiLoading = () => ({
  type: SAVE_QUICK_ADS_API_LOADING,
});

export const saveQuickAdsApiFailure = error => ({
  type: SAVE_QUICK_ADS_API_FAILURE,
  payload: error,
});

export const saveQuickAdsApiSuccess = response => ({
  type: SAVE_QUICK_ADS_API_SUCCESS,
  payload: response,
});

export const saveQuickAdsApiAction =
  ({adsId, userId}) =>
  async dispatch => {
    dispatch(saveQuickAdsApiLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `quickAds/saveAds?adsId=${adsId}&userId=${userId}`,
        config,
      );
      if (response) {
        dispatch(saveQuickAdsApiSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(saveQuickAdsApiFailure(error?.response));
      return error?.response;
    }
  };
