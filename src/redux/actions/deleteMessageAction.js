import axios from 'axios';
import {
  DELETE_MESSAGE_FAILURE,
  DELETE_MESSAGE_LOADING,
  DELETE_MESSAGE_SUCCESS,
} from './allActions';
import {global} from '../../global';

const deleteMessageLoading = () => ({type: DELETE_MESSAGE_LOADING});

const deleteMessageSuccess = response => ({
  type: DELETE_MESSAGE_SUCCESS,
  payload: response,
});

const deleteMessageFailure = response => ({
  type: DELETE_MESSAGE_FAILURE,
  payload: response,
});

export const deleteMessageAction = messageId => async dispatch => {
  dispatch(deleteMessageLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.delete(
      global.BASE_URL + `chat/messages/delete/${messageId}`,
      config,
    );

    if (response) {
      dispatch(deleteMessageSuccess(response));
    } else {
      dispatch(
        deleteMessageFailure('delete message failed. Please try again.'),
      );
    }

    return response;
  } catch (error) {
    if (error?.response) {
      dispatch(deleteMessageFailure(error?.response));
    }
  }
};
