import axios from 'axios';
import {global} from '../../global';
import {LOGOUT} from './allActions';

export const logoutAction = userId => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-logout`,
        {userId},
        config,
      );

      if (response) {
        dispatch({
          type: LOGOUT,
          payload: response.data,
        });
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  };
};
