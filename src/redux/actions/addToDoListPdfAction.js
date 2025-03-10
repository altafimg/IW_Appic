import {
  ADD_TO_DO_LIST_PDF_FAILURE,
  ADD_TO_DO_LIST_PDF_LOADING,
  ADD_TO_DO_LIST_PDF_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const addToDoListPdfLoading = () => ({
  type: ADD_TO_DO_LIST_PDF_LOADING,
});

const addToDoListPdfFailure = error => ({
  type: ADD_TO_DO_LIST_PDF_FAILURE,
  payload: error,
});

const addToDoListPdfSuccess = response => ({
  type: ADD_TO_DO_LIST_PDF_SUCCESS,
  payload: response,
});

export const addToDoListPdfAction = ({id, applicant_id, mediaFilesPdf}) => {
  return async dispatch => {
    dispatch(addToDoListPdfLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addPdf',
        {
          id: id,
          applicant_id: applicant_id,
          mediaFilesPdf: mediaFilesPdf,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListPdfSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListPdfFailure(err?.response));
    }
  };
};
