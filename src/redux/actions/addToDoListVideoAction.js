import {
  ADD_TO_DO_LIST_VIDEO_FAILURE,
  ADD_TO_DO_LIST_VIDEO_SUCCESS,
  ADD_TO_DO_LIST_VIDEO_LOADING,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

const addToDoListVideoLoading = () => ({
  type: ADD_TO_DO_LIST_VIDEO_LOADING,
});

const addToDoListVideoFailure = error => ({
  type: ADD_TO_DO_LIST_VIDEO_FAILURE,
  payload: error,
});

const addToDoListVideoSuccess = response => ({
  type: ADD_TO_DO_LIST_VIDEO_SUCCESS,
  payload: response,
});

export const addToDoListVideoAction = ({id, applicant_id, mediaFilesVideo}) => {
  return async dispatch => {
    dispatch(addToDoListVideoLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addVideo',
        {
          id: id,
          applicant_id: applicant_id,
          mediaFilesVideo: mediaFilesVideo,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListVideoSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListVideoFailure(err?.response));
    }
  };
};
