// import {
//   IMAGE_UPLOAD_FAILURE,
//   IMAGE_UPLOAD_LOADING,
//   IMAGE_UPLOAD_SUCCESS,
// } from './allActions';
// import axios from 'axios';
// import {global} from '../../global';

// export const imageUploadLoading = () => ({
//   type: IMAGE_UPLOAD_LOADING,
// });

// export const imageUploadFailure = response => ({
//   type: IMAGE_UPLOAD_FAILURE,
//   payload: response,
// });

// export const imageUploadSuccess = response => ({
//   type: IMAGE_UPLOAD_SUCCESS,
//   payload: response,
// });

// export const imageUploadAction = image => async dispatch => {
//   dispatch(imageUploadLoading());
//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   };
//   try {
//     const response = await axios.post(
//       global.BASE_URL + `users/upload/image`,
//       image,
//       config,
//     );
//     dispatch(imageUploadSuccess(response));
//     return response;
//   } catch (err) {
//     dispatch(imageUploadFailure(err));
//   }
// };

// imageUploadActions.js

import axios from 'axios';
import {
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_LOADING,
  IMAGE_UPLOAD_SUCCESS,
} from './allActions';
import {global} from '../../global';
import {Alert} from 'react-native';

export const imageUploadLoading = () => ({
  type: IMAGE_UPLOAD_LOADING,
});

export const imageUploadFailure = response => ({
  type: IMAGE_UPLOAD_FAILURE,
  payload: response,
});

export const imageUploadSuccess = response => ({
  type: IMAGE_UPLOAD_SUCCESS,
  payload: response,
});

export const imageUploadAction = image => async dispatch => {
  dispatch(imageUploadLoading());
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(
      global.BASE_URL + `users/upload/image`,
      image,
      config,
    );
    if (response) {
      dispatch(imageUploadSuccess(response));
    } else {
      dispatch(imageUploadFailure('upload failed'));
    }
    return response;
  } catch (err) {
    console.log(err, '))))))');
    Alert.alert('Something went wrong. Please upload again.');
    dispatch(imageUploadFailure(err));
  }
};
