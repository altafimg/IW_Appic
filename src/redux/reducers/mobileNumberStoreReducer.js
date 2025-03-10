import {
  MOBILE_NUMBER_DATA_REMOVE,
  MOBILE_NUMBER_DATA_SAVE,
} from '../actions/allActions';

const initialData = {
  data: null,
};

export const mobileNumberDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case MOBILE_NUMBER_DATA_SAVE:
      return {
        ...state,
        data: action.payload,
      };
    case MOBILE_NUMBER_DATA_REMOVE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
