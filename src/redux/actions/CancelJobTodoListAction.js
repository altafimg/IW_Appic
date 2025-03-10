import axios from 'axios';
import {
  CANCEL_JOB_LOADING,
  CANCEL_JOB_SUCCESS,
  CANCEL_JOB_FAILURE,
} from './allActions';
import {global} from '../../global';

const CancelJobLoading = () => ({type: CANCEL_JOB_LOADING});

const CancelJobSuccess = response => ({
  type: CANCEL_JOB_SUCCESS,
  payload: response,
});

const CancelJobFailure = errorMessage => ({
  type: CANCEL_JOB_FAILURE,
  payload: errorMessage,
});

export const CancelJobTodoListAction =
  ({applicantId, adsId, status, reason}) =>
  async dispatch => {
    dispatch(CancelJobLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        global.BASE_URL +
          `quickAds/update-applicant-status?applicantId=${applicantId}&adsId=${adsId}&status=${status}&reason=${reason}`,
        config,
      );

      if (response) {
        dispatch(CancelJobSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(CancelJobFailure(err?.response));
      return err?.response;
    }
  };
