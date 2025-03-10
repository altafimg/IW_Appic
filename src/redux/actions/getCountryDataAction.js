import {GET_COUNTRY_DATA, GET_CITY_DATA, GET_STATE_DATA} from './allActions';

export const getCountryDataAction = countryData => ({
  type: GET_COUNTRY_DATA,
  payload: countryData,
});
