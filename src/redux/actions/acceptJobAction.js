import axios from 'axios';
import {
  ACCEPT_JOB_LOADING,
  ACCEPT_JOB_SUCCESS,
  ACCEPT_JOB_FAILURE,
} from './allActions';
import {global} from '../../global';

export const acceptJobLoading = () => ({
  type: ACCEPT_JOB_LOADING,
});

export const acceptJobSuccess = response => ({
  type: ACCEPT_JOB_SUCCESS,
  payload: response,
});

export const acceptJobFailure = error => ({
  type: ACCEPT_JOB_FAILURE,
  payload: error,
});

export const acceptJobsAction =
  ({applicants_id, ads_id, token, date, status, overrideConflict}) =>
  async dispatch => {
    dispatch(acceptJobLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL +
          `quickAds/job/apply?ads_id=${ads_id}&applicants_id=${applicants_id}&date=${date}&status=${status}&overrideConflict=${overrideConflict}`,
        config,
      );

      dispatch(acceptJobSuccess(response));

      return response;
    } catch (error) {
      dispatch(acceptJobFailure(error?.response?.data?.message));
      return error?.response?.data?.message;
    }
  };
