import {
  GET_SAVED_QUICK_ADS_API_FAILURE,
  GET_SAVED_QUICK_ADS_API_LOADING,
  GET_SAVED_QUICK_ADS_API_SUCCESS,
} from './allActions';

import axios from 'axios';

import {global} from '../../global';

export const getSavedQuickAdsApiLoading = () => ({
  type: GET_SAVED_QUICK_ADS_API_LOADING,
});

export const getSavedQuickAdsApiFailure = error => ({
  type: GET_SAVED_QUICK_ADS_API_FAILURE,
  payload: error,
});

export const getSavedQuickAdsApiSuccess = response => ({
  type: GET_SAVED_QUICK_ADS_API_SUCCESS,
  payload: response,
});

export const getSavedQuickAdsApiAction = _id => async dispatch => {
  dispatch(getSavedQuickAdsApiLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      global.BASE_URL + `quickAds/saveGetAds?userId=${_id}`,
      config,
    );
    if (response) {
      dispatch(getSavedQuickAdsApiSuccess(response?.data));
    }

    return response;
  } catch (error) {
    dispatch(getSavedQuickAdsApiFailure(error?.response));
    return error?.response;
  }
};
