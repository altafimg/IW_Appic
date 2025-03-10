import {
  GET_JOB_BY_DATE_TIME_FAILURE,
  GET_JOB_BY_DATE_TIME_LOADING,
  GET_JOB_BY_DATE_TIME_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const getJobByDateTimeLoading = () => ({
  type: GET_JOB_BY_DATE_TIME_LOADING,
});

export const getJobByDateTimeFailure = error => ({
  type: GET_JOB_BY_DATE_TIME_FAILURE,
  payload: error,
});

export const getJobByDateTimeSuccess = response => ({
  type: GET_JOB_BY_DATE_TIME_SUCCESS,
  payload: response,
});

export const getJobByDateTimeAction =
  ({applicantsId, postDate, token}) =>
  async dispatch => {
    dispatch(getJobByDateTimeLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL +
          `quickAds/findJobsOnlyDateAndTime?applicantsId=${applicantsId}&postDate=${postDate}`,
        config,
      );
      if (response) {
        dispatch(getJobByDateTimeSuccess(response?.data));
      }

      return response;
    } catch (error) {
      dispatch(getJobByDateTimeFailure(error?.response));
      return error?.response;
    }
  };
