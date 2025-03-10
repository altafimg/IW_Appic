import {
  ADD_TO_DO_LIST_IMAGE_LOADING,
  ADD_TO_DO_LIST_IMAGE_FAILURE,
  ADD_TO_DO_LIST_IMAGE_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const addToDoListImageLoading = () => ({
  type: ADD_TO_DO_LIST_IMAGE_LOADING,
});

const addToDoListImageFailure = error => ({
  type: ADD_TO_DO_LIST_IMAGE_FAILURE,
  payload: error,
});

const addToDoListImageSuccess = response => ({
  type: ADD_TO_DO_LIST_IMAGE_SUCCESS,
  payload: response,
});

export const addToDoListImageAction = ({id, applicant_id, mediaFilesImage}) => {
  return async dispatch => {
    dispatch(addToDoListImageLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addImage',
        {
          id: id,
          applicant_id: applicant_id,
          mediaFilesImage: mediaFilesImage,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListImageSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListImageFailure(err?.response));
    }
  };
};
