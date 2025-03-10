// import {
//   IMAGE_UPLOAD_FAILURE,
//   IMAGE_UPLOAD_LOADING,
//   IMAGE_UPLOAD_SUCCESS,
// } from '../actions/allActions';

// const initialState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// const imageUploadReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case IMAGE_UPLOAD_LOADING:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case IMAGE_UPLOAD_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };
//     case IMAGE_UPLOAD_FAILURE:
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
// export default imageUploadReducer;


// imageUploadReducer.js

import {
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_LOADING,
  IMAGE_UPLOAD_SUCCESS,
} from '../actions/allActions'

const initialState = {
  loading: false,
  error: null,
  data: null,
}

const imageUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      }
    case IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default imageUploadReducer
