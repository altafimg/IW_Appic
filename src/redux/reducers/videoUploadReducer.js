// import {
//   VIDEO_UPLOAD_FAILURE,
//   VIDEO_UPLOAD_LOADING,
//   VIDEO_UPLOAD_SUCCESS,
// } from '../actions/allActions';

// const initialState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// const videoUploadReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case VIDEO_UPLOAD_LOADING:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case VIDEO_UPLOAD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };
//     case VIDEO_UPLOAD_FAILURE:
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
// export default videoUploadReducer;


// videoUploadReducer.js

import {
  VIDEO_UPLOAD_FAILURE,
  VIDEO_UPLOAD_LOADING,
  VIDEO_UPLOAD_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: null,
}

const videoUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEO_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case VIDEO_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case VIDEO_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default videoUploadReducer
