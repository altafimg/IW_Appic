import {
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_LOADING,
  UPDATE_JOB_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: [],
}

const updateJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      }
    case UPDATE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      }
    default:
      return state
  }
}

export default updateJobReducer
