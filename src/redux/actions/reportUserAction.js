import {
  REPORT_USER_FAILURE,
  REPORT_USER_LOADING,
  REPORT_USER_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const reportUserLoading = () => ({type: REPORT_USER_LOADING});

const reportUserSuccess = response => ({
  type: REPORT_USER_SUCCESS,
  payload: response,
});

const reportUserFailure = response => ({
  type: REPORT_USER_FAILURE,
  payload: response,
});

export const reportUserAction =
  ({reportedById, reportedToId, reportMessage}) =>
  async dispatch => {
    dispatch(reportUserLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-report`,
        {
          reportedById: reportedById,
          reportedToId: reportedToId,
          reportMessage: reportMessage,
        },
        config,
      );

      if (response) {
        dispatch(reportUserSuccess(response));
      }

      return response;
    } catch (error) {
      dispatch(reportUserFailure(error?.response));
      return error?.response;
    }
  };
