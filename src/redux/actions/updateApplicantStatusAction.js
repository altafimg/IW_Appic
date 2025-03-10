import {
  UPDATE_APPLICANT_STATUS_FAILURE,
  UPDATE_APPLICANT_STATUS_LOADING,
  UPDATE_APPLICANT_STATUS_SUCCESS,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

const updateApplicantStatusLoading = () => ({
  type: UPDATE_APPLICANT_STATUS_LOADING,
});

const updateApplicantStatusFailure = error => ({
  type: UPDATE_APPLICANT_STATUS_FAILURE,
  payload: error,
});

const updateApplicantStatusSuccess = response => ({
  type: UPDATE_APPLICANT_STATUS_SUCCESS,
  payload: response,
});

export const updateApplicantStatusAction = ({
  applicantId,
  adsId,
  status,
  completeDate,
  reason,
}) => {
  return async dispatch => {
    dispatch(updateApplicantStatusLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL +
          `quickAds/update-applicant-status?applicantId=${applicantId}&adsId=${adsId}&status=${status}&completeDate=${completeDate}&reason=${reason}`,
        config,
      );

      if (response) {
        dispatch(updateApplicantStatusSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(updateApplicantStatusFailure(err?.response));
      return err?.response;
    }
  };
};
