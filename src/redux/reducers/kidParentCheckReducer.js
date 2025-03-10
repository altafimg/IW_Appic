import {
  KID_PARENT_CHECK_REMOVE,
  KID_PARENT_CHECK_STORE,
} from '../actions/allActions';

const initialData = {
  data: null,
};

export const kidParentCheckReducer = (state = initialData, action) => {
  switch (action.type) {
    case KID_PARENT_CHECK_STORE:
      return {
        ...state,
        data: action.payload,
      };
    case KID_PARENT_CHECK_REMOVE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
