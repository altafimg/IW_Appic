import {MUSIC_VIDEO_DATA} from '../actions/allActions';
const initialData = {
  data: [],
};

const musicVideoDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case MUSIC_VIDEO_DATA:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default musicVideoDataReducer;
