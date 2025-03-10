import axios from 'axios';
import {
  REPORT_JOB_LOADING,
  REPORT_JOB_SUCCESS,
  REPORT_JOB_FAILURE,
} from './allActions';
import {global} from '../../global';

export const reportJobLoading = () => ({
  type: REPORT_JOB_LOADING,
});

export const reportJobSuccess = response => ({
  type: REPORT_JOB_SUCCESS,
  payload: response,
});

export const reportJobFailure = error => ({
  type: REPORT_JOB_FAILURE,
  payload: error,
});

export const reportJobAction =
  ({user_id, job_id, reportMessage, reportResion}) =>
  async dispatch => {
    dispatch(reportJobLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `quickAds/job/report`,
        {user_id, job_id, reportMessage, reportResion},
        config,
      );

      dispatch(reportJobSuccess(response));

      return response;
    } catch (error) {
      dispatch(reportJobFailure(error));
      return error;
    }
  };
