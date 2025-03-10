import {
  ADD_SOCIAL_MEDIA_POST_LINK_FAILURE,
  ADD_SOCIAL_MEDIA_POST_LINK_LOADING,
  ADD_SOCIAL_MEDIA_POST_LINK_SUCCESS,
} from '../actions/allActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addSocialMediaPostLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SOCIAL_MEDIA_POST_LINK_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_SOCIAL_MEDIA_POST_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case ADD_SOCIAL_MEDIA_POST_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

export default addSocialMediaPostLinkReducer;
