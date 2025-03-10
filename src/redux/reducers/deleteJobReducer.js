import {
  DELETE_JOB_FAILURE,
  DELETE_JOB_LOADING,
  DELETE_JOB_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: null,
}

const deleteJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      }
    case DELETE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      }
    default:
      return state
  }
}

export default deleteJobReducer
