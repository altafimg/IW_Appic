import axios from 'axios';
import {
  DOCUMENT_UPLOAD_FAILURE,
  DOCUMENT_UPLOAD_LOADING,
  DOCUMENT_UPLOAD_SUCCESS,
} from './allActions';
import {global} from '../../global';

export const documentUploadLoading = () => ({
  type: DOCUMENT_UPLOAD_LOADING,
});

export const documentUploadFailure = response => ({
  type: DOCUMENT_UPLOAD_FAILURE,
  payload: response,
});

export const documentUploadSuccess = response => ({
  type: DOCUMENT_UPLOAD_SUCCESS,
  payload: response,
});

export const documentUploadAction = document => async dispatch => {
  dispatch(documentUploadLoading());
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(
      global.BASE_URL + `users/upload/document`,
      document,
      config,
    );
    if (response) {
      dispatch(documentUploadSuccess(response));
    }
    return response;
  } catch (err) {
    dispatch(documentUploadFailure(err));
    return err;
  }
};
