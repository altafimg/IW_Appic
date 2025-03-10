import {
  CREATE_JOB_FAILURE,
  CREATE_JOB_LOADING,
  CREATE_JOB_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: [],
}

const createJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      }
    case CREATE_JOB_FAILURE:
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

export default createJobReducer
