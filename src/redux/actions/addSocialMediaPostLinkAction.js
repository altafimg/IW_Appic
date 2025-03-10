import {
  ADD_SOCIAL_MEDIA_POST_LINK_FAILURE,
  ADD_SOCIAL_MEDIA_POST_LINK_LOADING,
  ADD_SOCIAL_MEDIA_POST_LINK_SUCCESS,
} from './allActions';

import axios from 'axios';
import {global} from '../../global';

const addSocialMediaPostLinkLoading = () => ({
  type: ADD_SOCIAL_MEDIA_POST_LINK_LOADING,
});

const addSocialMediaPostLinkFailure = error => ({
  type: ADD_SOCIAL_MEDIA_POST_LINK_FAILURE,
  payload: error,
});

const addSocialMediaPostLinkSuccess = response => ({
  type: ADD_SOCIAL_MEDIA_POST_LINK_SUCCESS,
  payload: response,
});

export const addSocialMediaPostLinkAction = ({
  id,
  applicant_id,
  socialMediaPostLink,
}) => {
  return async dispatch => {
    dispatch(addSocialMediaPostLinkLoading());
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = axios.post(
        global.BASE_URL + 'quickAds/socialMediaPostLink',
        {
          id: id,
          applicant_id: applicant_id,
          socialMediaPostLink: [
            {
              postLink: socialMediaPostLink,
            },
          ],
        },
        config,
      );

      if (response) {
        dispatch(addSocialMediaPostLinkSuccess(response));
      }
      return response;
    } catch (err) {
      dispatch(addSocialMediaPostLinkFailure(err?.response));
      return err?.response;
    }
  };
};
