// import {
//   AUDIO_UPLOAD_FAILURE,
//   AUDIO_UPLOAD_LOADING,
//   AUDIO_UPLOAD_SUCCESS,
// } from './allActions';
// import axios from 'axios';
// import {global} from '../../global';

// export const audioUploadLoading = () => ({
//   type: AUDIO_UPLOAD_LOADING,
// });

// export const audioUploadFailure = response => ({
//   type: AUDIO_UPLOAD_FAILURE,
//   payload: response,
// });

// export const audioUploadSuccess = response => ({
//   type: AUDIO_UPLOAD_SUCCESS,
//   payload: response,
// });

// export const audioUploadAction = audio => async dispatch => {
//   dispatch(audioUploadLoading());
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   };
//   try {
//     const response = await axios.post(
//       global.BASE_URL + `users/upload/audio`,
//       audio,
//       config,
//     );
//     dispatch(audioUploadSuccess(response));
//     return response;
//   } catch (err) {
//     dispatch(audioUploadFailure(err));
//   }
// };

// audioUploadActions.js

import axios from 'axios'
import {
  AUDIO_UPLOAD_FAILURE,
  AUDIO_UPLOAD_LOADING,
  AUDIO_UPLOAD_SUCCESS,
} from './allActions'
import {global} from '../../global'

export const audioUploadLoading = () => ({
  type: AUDIO_UPLOAD_LOADING,
})

export const audioUploadFailure = response => ({
  type: AUDIO_UPLOAD_FAILURE,
  payload: response,
})

export const audioUploadSuccess = response => ({
  type: AUDIO_UPLOAD_SUCCESS,
  payload: response,
})

export const audioUploadAction = audio => async dispatch => {
  dispatch(audioUploadLoading())
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  try {
    const response = await axios.post(
      global.BASE_URL + `users/upload/audio`,
      audio,
      config,
    )
    dispatch(audioUploadSuccess(response))
    return response
  } catch (err) {
    dispatch(audioUploadFailure(err.response))
    return err.response
  }
}
