import {
  REMOVE_SAVED_QUICK_ADS_API_FAILURE,
  REMOVE_SAVED_QUICK_ADS_API_LOADING,
  REMOVE_SAVED_QUICK_ADS_API_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const removeSavedQuickAdsApiLoading = () => ({
  type: REMOVE_SAVED_QUICK_ADS_API_LOADING,
});

export const removeSavedQuickAdsApiFailure = error => ({
  type: REMOVE_SAVED_QUICK_ADS_API_FAILURE,
  payload: error,
});

export const removeSavedQuickAdsApiSuccess = response => ({
  type: REMOVE_SAVED_QUICK_ADS_API_SUCCESS,
  payload: response,
});

export const removeSavedQuickAdsApiAction =
  ({adsId, userId}) =>
  async dispatch => {
    dispatch(removeSavedQuickAdsApiLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.delete(
        global.BASE_URL +
          `quickAds/removeSaveAds?adsId=${adsId}&userId=${userId}`,
        config,
      );
      if (response) {
        dispatch(removeSavedQuickAdsApiSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(removeSavedQuickAdsApiFailure(error?.response));
      return error?.response;
    }
  };
