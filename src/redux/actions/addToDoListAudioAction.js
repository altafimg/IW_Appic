import {
  ADD_TO_DO_LIST_AUDIO_FAILURE,
  ADD_TO_DO_LIST_AUDIO_LOADING,
  ADD_TO_DO_LIST_AUDIO_SUCCESS,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

const addToDoListAudioLoading = () => ({
  type: ADD_TO_DO_LIST_AUDIO_LOADING,
});

const addToDoListAudioFailure = error => ({
  type: ADD_TO_DO_LIST_AUDIO_FAILURE,
  payload: error,
});

const addToDoListAudioSuccess = response => ({
  type: ADD_TO_DO_LIST_AUDIO_SUCCESS,
  payload: response,
});

export const addToDoListAudioAction = ({id, applicant_id, mediaFilesAudio}) => {
  return async dispatch => {
    dispatch(addToDoListAudioLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addAudio',
        {
          id: id,
          applicant_id: applicant_id,
          mediaFilesAudio: mediaFilesAudio,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListAudioSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListAudioFailure(err?.response));
    }
  };
};
