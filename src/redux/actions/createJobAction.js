import axios from 'axios';
import {
  CREATE_JOB_FAILURE,
  CREATE_JOB_LOADING,
  CREATE_JOB_SUCCESS,
} from './allActions';
import {global} from '../../global';

const createJobPending = () => ({type: CREATE_JOB_LOADING});

const createJobSuccess = response => ({
  type: CREATE_JOB_SUCCESS,
  payload: response,
});

const createJobFailure = errorMessage => ({
  type: CREATE_JOB_FAILURE,
  payload: errorMessage,
});

export const createJobAction =
  ({
    quick_ads_title,
    thumbnail_picture_ads,
    set_age_for_applicants,
    category,
    // descriptionQuick,
    bio,
    website_link,
    images,
    video,
    audio,
    content_right,
    followers_number,
    platform,
    minimum_number_follower_influencer_each,
    task_start_date,
    time,
    language,
    mood,
    swearing,
    token,
    user_id,
    city,
    country,
    state,
    target,
    pay_offered,
    customUserRights,
    particularPrice,
    apply_limit,
    utcTimeDate,
    timeZone,
  }) =>
  async dispatch => {
    dispatch(createJobPending());
    const config = {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    };
    try {
      const response = await axios.post(
        global.BASE_URL + `quickAds/create`,
        {
          quick_ads_title,
          thumbnail_picture_ads,
          set_age_for_applicants,
          category,
          // descriptionQuick,
          bio,
          website_link,
          images,
          video,
          audio,
          content_right,
          followers_number,
          platform,
          minimum_number_follower_influencer_each,
          task_start_date,
          time,
          language,
          mood,
          swearing,
          user_id,
          city,
          country,
          state,
          target,
          pay_offered,
          customUserRights,
          particularPrice,
          apply_limit,
          adsStatus: 'in progress',
          utcTimeDate,
          timeZone,
        },
        config,
      );

      if (response) {
        dispatch(createJobSuccess(response));
      } else {
        dispatch(createJobFailure('Create Job failed. Please try again.'));
      }

      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(createJobFailure(error.response.data.message));
      } else if (error.response && error.response.status === 401) {
        dispatch(createJobFailure(error.response.data.message));
      } else {
        dispatch(
          createJobFailure(
            'An unexpected error occurred. Please try again later.',
          ),
        );
      }
    }
  };
// import axios from 'axios'
// import {
//   CREATE_JOB_FAILURE,
//   CREATE_JOB_LOADING,
//   CREATE_JOB_SUCCESS,
// } from './allActions'
// import {global} from '../../global'

// const createJobPending = () => ({type: CREATE_JOB_LOADING})

// const createJobSuccess = response => ({
//   type: CREATE_JOB_SUCCESS,
//   payload: response,
// })

// const createJobFailure = errorMessage => ({
//   type: CREATE_JOB_FAILURE,
//   payload: errorMessage,
// })

// export const createJobAction =
//   ({
//     quick_ads_title,
//     thumbnail_picture_ads,
//     apply_limit,
//     category,
//     descriptionQuick,
//     website_link,
//     images,
//     followers_number,
//     platform,
//     minimum_number_follower_influencer_each,
//     task_start_date,
//     time,
//     language,
//     mood,
//     swearing,
//     token,
//     user_id,
//     city,
//     country,
//     state,
//     target,
//     pay_offered,
//   }) =>
//   async dispatch => {
//     dispatch(createJobPending())
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         token: token,
//       },
//     }

//     try {
//       const response = await axios.post(
//         global.BASE_URL + `quickAds/create`,
//         {
//           quick_ads_title,
//           thumbnail_picture_ads,
//           apply_limit,
//           category,
//           descriptionQuick,
//           website_link,
//           images,
//           followers_number,
//           platform,
//           minimum_number_follower_influencer_each,
//           task_start_date,
//           time,
//           language,
//           mood,
//           swearing,
//           user_id,
//           city,
//           country,
//           state,
//           target,
//           pay_offered,
//         },
//         config,
//       )

//       if (response) {
//         dispatch(createJobSuccess(response))
//       } else {
//         dispatch(createJobFailure('Create Job failed. Please try again.'))
//       }

//       return response
//     } catch (error) {
//       console.log(error.response)
//       if (error.response && error.response.status === 400) {
//         dispatch(createJobFailure(error.response.data.message))
//       } else if (error.response && error.response.status === 401) {
//         dispatch(createJobFailure(error.response.data.message))
//       } else {
//         dispatch(
//           createJobFailure(
//             'An unexpected error occurred. Please try again later.',
//           ),
//         )
//       }
//     }
//   }
