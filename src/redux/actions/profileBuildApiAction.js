import axios from 'axios';
import {global} from '../../global';
import {
  PROFILE_BUILD_API_FAILURE,
  PROFILE_BUILD_API_LOADING,
  PROFILE_BUILD_API_SUCCESS,
} from './allActions';

export const profileBuildApiLoading = () => ({
  type: PROFILE_BUILD_API_LOADING,
});

export const profileBuildApiFailure = error => ({
  type: PROFILE_BUILD_API_FAILURE,
  payload: error,
});

export const profileBuildApiSuccess = response => ({
  type: PROFILE_BUILD_API_SUCCESS,
  payload: response,
});

export const profileBuildApiAction =
  ({
    profileCheck,
    bio,
    category,
    city,
    country,
    gender,
    image,
    language,
    musicUrls,
    state,
    subCategory,
    tags,
    videoUrls,
    _id,
    fileUrl,
    phone_number,

    // profile_picture,
    // country,
    // state,
    // city,
    // gender,
    // language,
    // bio,
    // dob,
    // category,
    // Subcategory,
    // tag,
    // my_music,
    // my_video,
    // intro_video,
    // phone_number,
    // connect_socials,
    // _id,
  }) =>
  async dispatch => {
    dispatch(profileBuildApiLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // console.log(
    //   bio,
    //   category,
    //   city,
    //   country,
    //   gender,
    //   image,
    //   language,
    //   musicItems,
    //   state,
    //   subCategory,
    //   tags,
    //   videoItems,
    //   _id,
    // );

    try {
      let response = '';
      if (profileCheck === 'profileBuild') {
        response = await axios.patch(
          global.BASE_URL + `users/profile-update/${_id}`,
          {
            profile_picture: image,
            country: country,
            state: state,
            city: city,
            gender: gender,
            language: language,
            bio: bio,
            category: category,
            Subcategory: subCategory,
            tag: tags,
            my_music: musicUrls,
            my_video: videoUrls,
            intro_video: fileUrl,
            phone_number,

            // connect_socials,
          },
          config,
        );
      } else {
        response = await axios.patch(
          global.BASE_URL + `users/profile-update/${_id}`,
          {
            // intro_video: intro_video,
            // profile_picture: image,
            // country: country,
            // state: state,
            // city: city,
            // gender: gender,
            // language: language,
            // bio: bio,
            // category: category,
            // Subcategory: subCategory,
            // tag: tags,
            // my_music: music,
            // my_video: video,
            // phone_number,

            bio,
            category,
            city,
            country,
            gender,
            profile_picture: image,
            language,
            state,
            Subcategory: subCategory,
            tag: tags,
            intro_video: fileUrl,
            my_music: musicUrls,
            phone_number,
            my_video: videoUrls,
          },
          config,
        );
      }

      if (response) {
        dispatch(profileBuildApiSuccess(response));
      } else {
        dispatch(profileBuildApiFailure('profileBuildApi failed'));
      }

      return response;
    } catch (err) {
      console.log(err.response);
      dispatch(profileBuildApiFailure(err?.response?.message));
    }
  };
