import {GET_COUNTRY_DATA} from '../actions/allActions';

const countryInitialData = {
  countryData: [],
};
export const countryReducer = (state = countryInitialData, action) => {
  switch (action.type) {
    case GET_COUNTRY_DATA:
      return {
        ...state,
        countryData: action.payload,
      };
    default:
      return state;
  }
};
