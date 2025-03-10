import axios from 'axios'
import {
  DELETE_JOB_FAILURE,
  DELETE_JOB_LOADING,
  DELETE_JOB_SUCCESS,
} from './allActions'
import {global} from '../../global'

const deleteJobPending = () => ({type: DELETE_JOB_LOADING})

const deleteJobSuccess = response => ({
  type: DELETE_JOB_SUCCESS,
  payload: response.data,
})

const deleteJobFailure = errorMessage => ({
  type: DELETE_JOB_FAILURE,
  payload: errorMessage,
})

export const deleteJobAction =
  ({user_id, AdsId}) =>
  async dispatch => {
    dispatch(deleteJobPending())
    try {
      const response = await axios.delete(
        `${global.BASE_URL}quickAds/delete?AdsId=${AdsId}&user_id=${user_id}`,
      )

      dispatch(deleteJobSuccess(response))
      return response
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'An unexpected error occurred'
      dispatch(deleteJobFailure(errorMessage))
      throw error
    }
  }
