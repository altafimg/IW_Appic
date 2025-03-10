import {
  QUICK_CHATS_LIST_FAILURE,
  QUICK_CHATS_LIST_LOADING,
  QUICK_CHATS_LIST_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const quickChatsListLoading = () => ({
  type: QUICK_CHATS_LIST_LOADING,
});

export const quickChatsListFailure = response => ({
  type: QUICK_CHATS_LIST_FAILURE,
  payload: response,
});

export const quickChatsListSuccess = response => ({
  type: QUICK_CHATS_LIST_SUCCESS,
  payload: response,
});

export const quickChatsListAction =
  ({senderId, receiverId}) =>
  async dispatch => {
    dispatch(quickChatsListLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(
        // global.BASE_URL + `chat/getchat/${senderId}/${receiverId}`,
        config,
      );
      if (response) {
        dispatch(quickChatsListSuccess(response));
      } else {
        dispatch(quickChatsListFailure('quick Chats list  failed'));
      }
      return response;
    } catch (error) {
      dispatch(quickChatsListFailure(error?.response?.data?.message));
    }
  };
