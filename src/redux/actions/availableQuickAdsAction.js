// import {
//   AVAILABLE_QUICKADS_LOADING,
//   AVAILABLE_QUICKADS_SUCCESS,
//   AVAILABLE_QUICKADS_FAILURE,
// } from './allActions';
// import axios from 'axios';
// import {global} from '../../global';

// export const availableQuickAdsLoading = () => ({
//   type: AVAILABLE_QUICKADS_LOADING,
// });

// export const availableQuickAdsFailure = response => ({
//   type: AVAILABLE_QUICKADS_FAILURE,
//   payload: response,
// });

// export const availableQuickAdsSuccess = response => ({
//   type: AVAILABLE_QUICKADS_SUCCESS,
//   payload: response,
// });

// export const availableQuickAdsAction = data => async dispatch => {
//   const {token, applicants_id, check} = data || {};
//   dispatch(availableQuickAdsLoading());
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//   };

//   try {
//     const response = await axios.get(global.BASE_URL + `quickAds/ads`, config);
//     if (response) {
//       dispatch(availableQuickAdsSuccess(response));
//     } else {
//       dispatch(availableQuickAdsFailure('Network Error'));
//     }
//     return response;
//   } catch (error) {
//     dispatch(availableQuickAdsFailure(error.response.data.message));
//   }
// };

import {
  AVAILABLE_QUICKADS_LOADING,
  AVAILABLE_QUICKADS_SUCCESS,
  AVAILABLE_QUICKADS_FAILURE,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const availableQuickAdsLoading = () => ({
  type: AVAILABLE_QUICKADS_LOADING,
});

export const availableQuickAdsFailure = response => ({
  type: AVAILABLE_QUICKADS_FAILURE,
  payload: response,
});

export const availableQuickAdsSuccess = response => ({
  type: AVAILABLE_QUICKADS_SUCCESS,
  payload: response,
});

export const availableQuickAdsAction = data => async dispatch => {
  const {token, id, check} = data || {};
  console.log(token, '{}{}{');
  console.log(id, '{}{}{+++');
  console.log(check, '{}{}{___');
  dispatch(availableQuickAdsLoading());
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  let url = `${global.BASE_URL}quickAds/ads`;

  if (check === 'upcoming') {
    url += `?applicants_id=${id}`;
  } else if (check === 'ads_id') {
    url += `?ads_id=${id}`;
  } else if (check === 'user_id') {
    url += `?user_id=${id}`;
  }

  try {
    const response = await axios.get(url, config);
    if (response) {
      dispatch(availableQuickAdsSuccess(response));
    } else {
      dispatch(availableQuickAdsFailure('Network Error'));
    }
    return response;
  } catch (error) {
    dispatch(availableQuickAdsFailure(error.response.data.message));
  }
};
