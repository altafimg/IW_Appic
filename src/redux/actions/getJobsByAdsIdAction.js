import {
  GET_JOBS_BY_ADS_ID_FAILURE,
  GET_JOBS_BY_ADS_ID_LOADING,
  GET_JOBS_BY_ADS_ID_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const getJobsByAdsIdLoading = () => ({
  type: GET_JOBS_BY_ADS_ID_LOADING,
});

export const getJobsByAdsIdFailure = response => ({
  type: GET_JOBS_BY_ADS_ID_FAILURE,
  payload: response,
});

export const getJobsByAdsIdSuccess = response => ({
  type: GET_JOBS_BY_ADS_ID_SUCCESS,
  payload: response,
});

export const getJobsByAdsIdAction =
  ({token, id}) =>
  async dispatch => {
    dispatch(getJobsByAdsIdLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        `${global.BASE_URL}quickAds/ads?ads_id=${id}`,
        config,
      );
      if (response) {
        dispatch(getJobsByAdsIdSuccess(response));
      }
      return response;
    } catch (error) {
      dispatch(getJobsByAdsIdFailure(error?.response?.data?.message));
      return error?.response?.data?.message;
    }
  };
