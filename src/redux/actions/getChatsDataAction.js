import {
  GET_CHATS_DATA_FAILURE,
  GET_CHATS_DATA_LOADING,
  GET_CHATS_DATA_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const getChatsDataLoading = () => ({
  type: GET_CHATS_DATA_LOADING,
});

export const getChatsDataFailure = response => ({
  type: GET_CHATS_DATA_FAILURE,
  payload: response,
});

export const getChatsDataSuccess = response => ({
  type: GET_CHATS_DATA_SUCCESS,
  payload: response,
});

export const getChatsDataAction =
  ({senderId, receiverId}) =>
  async dispatch => {
    dispatch(getChatsDataLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(
        global.BASE_URL + `chat/getchat/${senderId}/${receiverId}`,
        config,
      );
      if (response) {
        dispatch(getChatsDataSuccess(response));
      } else {
        dispatch(getChatsDataFailure('Chats data failed'));
      }
      return response;
    } catch (error) {
      dispatch(getChatsDataFailure(error?.response?.data?.message));
    }
  };
