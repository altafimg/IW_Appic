import {BUILD_PROFILE_DATA, BUILD_PROFILE_DATA_REMOVE} from './allActions';

export const buildProfileDataAction = response => ({
  type: BUILD_PROFILE_DATA,
  payload: response,
});

export const buildProfileDataRemoveAction = () => ({
  type: BUILD_PROFILE_DATA_REMOVE,
});
