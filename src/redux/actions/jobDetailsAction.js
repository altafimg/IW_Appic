import {
  JOB_DETAILS_LOADING,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAILURE,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const jobDetailsLoading = () => ({
  type: JOB_DETAILS_LOADING,
});

export const jobDetailsSuccess = response => ({
  type: JOB_DETAILS_SUCCESS,
  payload: response,
});

export const jobDetailsFailure = response => ({
  type: JOB_DETAILS_FAILURE,
  payload: response,
});

export const jobDetailsAction =
  ({token, id}) =>
  async dispatch => {
    dispatch(jobDetailsLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL + `quickAds/ads?ads_id=${id}`,
        config,
      );
      if (response) {
        dispatch(jobDetailsSuccess(response));
      } else {
        dispatch(jobDetailsFailure('Network Error'));
      }
      return response;
    } catch (error) {
      dispatch(jobDetailsFailure(error));
    }
  };
