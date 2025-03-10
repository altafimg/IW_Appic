import axios from 'axios';
import {
  CANCEL_JOB_QUICKADS_LOADING,
  CANCEL_JOB_QUICKADS_SUCCESS,
  CANCEL_JOB_QUICKADS_FAILURE,
} from './allActions';
import {global} from '../../global';

const CancelJobLoading = () => ({type: CANCEL_JOB_QUICKADS_LOADING});

const CancelJobSuccess = response => ({
  type: CANCEL_JOB_QUICKADS_SUCCESS,
  payload: response,
});

const CancelJobFailure = errorMessage => ({
  type: CANCEL_JOB_QUICKADS_FAILURE,
  payload: errorMessage,
});

export const CancelJobQuickadAction =
  ({adsId, user_id, adsStatus, customerCancelReson}) =>
  async dispatch => {
    dispatch(CancelJobLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(
        global.BASE_URL + `quickAds/adsStatus`,
        {adsId, user_id, adsStatus, customerCancelReson},
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
