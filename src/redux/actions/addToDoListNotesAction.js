import {
  ADD_TO_DO_LIST_NOTES_FAILURE,
  ADD_TO_DO_LIST_NOTES_LOADING,
  ADD_TO_DO_LIST_NOTES_SUCCESS,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

const addToDoListNotesLoading = () => ({
  type: ADD_TO_DO_LIST_NOTES_LOADING,
});

const addToDoListNotesFailure = error => ({
  type: ADD_TO_DO_LIST_NOTES_FAILURE,
  payload: error,
});

const addToDoListNotesSuccess = response => ({
  type: ADD_TO_DO_LIST_NOTES_SUCCESS,
  payload: response,
});

export const addToDoListNotesAction = ({id, applicants_id, notes}) => {
  return async dispatch => {
    dispatch(addToDoListNotesLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addNotes',
        {
          id: id,
          applicant_id: applicants_id,
          notes: notes,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListNotesSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListNotesFailure(err?.response));
    }
  };
};
