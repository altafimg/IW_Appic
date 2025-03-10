import {
  BUILD_PROFILE_DATA,
  BUILD_PROFILE_DATA_REMOVE,
} from '../actions/allActions';
const initialData = {
  data: null,
};

export const buildProfileDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case BUILD_PROFILE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case BUILD_PROFILE_DATA_REMOVE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
