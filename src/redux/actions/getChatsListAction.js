import {
  GET_CHATS_LIST_FAILURE,
  GET_CHATS_LIST_LOADING,
  GET_CHATS_LIST_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const getChatsListLoading = () => ({
  type: GET_CHATS_LIST_LOADING,
});

export const getChatsListFailure = response => ({
  type: GET_CHATS_LIST_FAILURE,
  payload: response,
});

export const getChatsListSuccess = response => ({
  type: GET_CHATS_LIST_SUCCESS,
  payload: response,
});

export const getChatsListAction = senderId => async dispatch => {
  dispatch(getChatsListLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.get(
      global.BASE_URL + `chat/getchatlist/${senderId}`,
      config,
    );
    if (response) {
      dispatch(getChatsListSuccess(response));
    } else {
      dispatch(getChatsListFailure('Chats list failed'));
    }
    return response;
  } catch (error) {
    dispatch(getChatsListFailure(error?.response?.data?.message));
  }
};
