// import {
//   AUDIO_UPLOAD_FAILURE,
//   AUDIO_UPLOAD_LOADING,
//   AUDIO_UPLOAD_SUCCESS,
// } from '../actions/allActions';

// const initialState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// const audioUploadReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case AUDIO_UPLOAD_LOADING:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case AUDIO_UPLOAD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };
//     case AUDIO_UPLOAD_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         data: [],
//       };
//     default:
//       return state;
//   }
// };
// export default audioUploadReducer;


// audioUploadReducer.js

import {
  AUDIO_UPLOAD_FAILURE,
  AUDIO_UPLOAD_LOADING,
  AUDIO_UPLOAD_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: null,
}

const audioUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUDIO_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case AUDIO_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case AUDIO_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default audioUploadReducer
