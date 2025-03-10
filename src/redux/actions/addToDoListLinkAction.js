import {
  ADD_TO_DO_LIST_LINK_FAILURE,
  ADD_TO_DO_LIST_LINK_LOADING,
  ADD_TO_DO_LIST_LINK_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

const addToDoListLinkLoading = () => ({
  type: ADD_TO_DO_LIST_LINK_LOADING,
});

const addToDoListLinkFailure = error => ({
  type: ADD_TO_DO_LIST_LINK_FAILURE,
  payload: error,
});

const addToDoListLinkSuccess = response => ({
  type: ADD_TO_DO_LIST_LINK_SUCCESS,
  payload: response,
});

export const addToDoListLinkAction = ({id, applicant_id, mediaFilesLink}) => {
  return async dispatch => {
    dispatch(addToDoListLinkLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/addLink',
        {
          id: id,
          applicant_id: applicant_id,
          mediaFilesLink: mediaFilesLink,
        },
        config,
      );

      if (response) {
        dispatch(addToDoListLinkSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addToDoListLinkFailure(err?.response));
    }
  };
};
