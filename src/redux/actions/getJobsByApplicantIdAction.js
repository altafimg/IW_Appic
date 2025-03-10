import {
  GET_JOBS_BY_APPLICANT_ID_FAILURE,
  GET_JOBS_BY_APPLICANT_ID_LOADING,
  GET_JOBS_BY_APPLICANT_ID_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const getJobsByApplicantIdLoading = () => ({
  type: GET_JOBS_BY_APPLICANT_ID_LOADING,
});

export const getJobsByApplicantIdFailure = response => ({
  type: GET_JOBS_BY_APPLICANT_ID_FAILURE,
  payload: response,
});

export const getJobsByApplicantIdSuccess = response => ({
  type: GET_JOBS_BY_APPLICANT_ID_SUCCESS,
  payload: response,
});

export const getJobsByApplicantIdAction =
  ({token, _id}) =>
  async dispatch => {
    dispatch(getJobsByApplicantIdLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        `${global.BASE_URL + `quickAds/ads?applicants_id=${_id}`}`,
        config,
      );
      if (response) {
        dispatch(getJobsByApplicantIdSuccess(response));
      }
      return response;
    } catch (error) {
      dispatch(getJobsByApplicantIdFailure(error));
      return error;
    }
  };
