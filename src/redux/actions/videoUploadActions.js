// videoUploadActions.js

import axios from 'axios'
import {
  VIDEO_UPLOAD_FAILURE,
  VIDEO_UPLOAD_LOADING,
  VIDEO_UPLOAD_SUCCESS,
} from './allActions'
import {global} from '../../global'

export const videoUploadLoading = () => ({
  type: VIDEO_UPLOAD_LOADING,
})

export const videoUploadFailure = response => ({
  type: VIDEO_UPLOAD_FAILURE,
  payload: response,
})

export const videoUploadSuccess = response => ({
  type: VIDEO_UPLOAD_SUCCESS,
  payload: response,
})

export const videoUploadAction = video => async dispatch => {
  dispatch(videoUploadLoading())
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  // console.log(videoUrls)
  try {
    const response = await axios.post(
      global.BASE_URL + `users/upload/video`,
      video,
      config,
    )
    dispatch(videoUploadSuccess(response))
    return response
  } catch (err) {
    dispatch(videoUploadFailure(err.response))
    return err.response
  }
}
