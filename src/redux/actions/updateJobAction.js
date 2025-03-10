import axios from 'axios'
import {
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_LOADING,
  UPDATE_JOB_SUCCESS,
} from './allActions'
import {global} from '../../global'

const updateJobPending = () => ({type: UPDATE_JOB_LOADING})

const updateJobSuccess = response => ({
  type: UPDATE_JOB_SUCCESS,
  payload: response,
})

const updateJobFailure = errorMessage => ({
  type: UPDATE_JOB_FAILURE,
  payload: errorMessage,
})

export const updateJobAction = () => async dispatch => {
  dispatch(updateJobPending())
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await axios.put(
      global.BASE_URL + `quickAds/update`,
      {}, 
      config,
    )

    if (response) {
      dispatch(updateJobSuccess(response))
    } else {
      dispatch(updateJobFailure('Update Job failed. Please try again.'))
    }

    return response
  } catch (error) {
    if (error.response && error.response.status === 400) {
      dispatch(updateJobFailure(error.response.data.message))
    } else if (error.response && error.response.status === 401) {
      dispatch(updateJobFailure(error.response.data.message))
    } else {
      dispatch(
        updateJobFailure(
          'An unexpected error occurred. Please try again later.',
        ),
      )
    }
  }
}
