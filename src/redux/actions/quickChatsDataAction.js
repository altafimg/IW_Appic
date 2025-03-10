import {
  QUICK_CHATS_DATA_FAILURE,
  QUICK_CHATS_DATA_LOADING,
  QUICK_CHATS_DATA_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const quickChatsDataLoading = () => ({
  type: QUICK_CHATS_DATA_LOADING,
});

export const quickChatsDataFailure = response => ({
  type: QUICK_CHATS_DATA_FAILURE,
  payload: response,
});

export const quickChatsDataSuccess = response => ({
  type: QUICK_CHATS_DATA_SUCCESS,
  payload: response,
});

export const quickChatsDataAction =
  ({senderId, receiverId}) =>
  async dispatch => {
    dispatch(quickChatsDataLoading());
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
        dispatch(quickChatsDataSuccess(response));
      } else {
        dispatch(quickChatsDataFailure('quick Chats data failed'));
      }
      return response;
    } catch (error) {
      dispatch(quickChatsDataFailure(error?.response?.data?.message));
    }
  };
