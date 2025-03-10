import {
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
} from './allActions';

import {global} from '../../global';

export const editProfileLoading = () => ({
  type: EDIT_PROFILE_LOADING,
});

export const editProfileFailure = response => ({
  type: EDIT_PROFILE_FAILURE,
  payload: response,
});

export const editProfileSuccess = response => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: response,
});

export const editProfileAction =
  ({
    bio,
    dob,
    user_role,
    profile_picture,
    street,
    city,
    state,
    zip_code,
    gender,
    otp,
    connect_socials,
    category,
    Subcategory,
    age,
    intro_video,
    _id,
    reviews,
    tag,
    my_music,
    my_images,
    my_video,
    language,
    two_factor_auth,
    is_active,
    token,
  }) =>
  async dispatch => {
    dispatch(editProfileLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/user-edit-profile/${_id}`,
        {
          bio,
          dob,
          user_role,
          profile_picture,
          street,
          city,
          state,
          city,
          state,
          zip_code,
          gender,
          otp,
          connect_socials,
          category,
          Subcategory,
          age,
          intro_video,
          reviews,
          tag,
          my_music,
          my_images,
          my_video,
          language,
          two_factor_auth,
          is_active,
        },
        config,
      );
      if (response) {
        dispatch(editProfileSuccess(response));
      } else {
        dispatch(editProfileFailure('edit profile failed'));
      }

      return response;
    } catch (err) {
      dispatch(editProfileFailure(err));
    }
  };
