import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import getUserProfileReducer from './getUserProfileReducer';
import userAccountDeleteReducer from './userAccountDeleteReducer';
import createAccountManagerReducer from './createAccountManagerReducer';
import otpVerificationReducer from './otpVerificationReducer';
import recoverAccountReducer from './recoverAccountReducer';
import editProfileReducer from './editProfileReducer';
import changePasswordUserReducer from './changePasswordUserReducer';
import sendOtpReducer from './sendOtpReducer';
import userVerifiedRequestReducer from './userVerifiedRequestReducer';
import resetPasswordReducer from './resetPasswordReducer';
import { LOGOUT } from '../actions/allActions';
import checkExistingReducer from './checkExistingReducer';
import sendVerificationEmailReducer from './sendVerificationEmailReducer';
import emailVerifyReducer from './emailVerifyReducer';
import { countryReducer } from './getCountryDataReducer';
import { buildProfileDataReducer } from './buildProfileDataReducer';
import { completeStepsReducer } from './completeStepsReducer';
import imageUploadReducer from './imageUploadReducer';
import videoUploadReducer from './videoUploadReducer';
import audioUploadReducer from './audioUploadReducer';
import musicVideoDataReducer from './musicVideoDataReducer';
import profileBuildApiReducer from './profileBuildApiReducer';
import getCategoryReducer from './getCategoryReducer';
import getLanguagesReducer from './getLanguagesReducer';
import availableQuickAdsReducer from './availableQuickAdsReducer';
import saveQuickAdsReducer from './saveQuickAdsReducer';
import myQuickAdsReducer from './myQuickAdsReducer';
import jobDetailsReducer from './jobDetailsReducer';
import acceptJobReducer from './acceptJobReducer';
import createJobReducer from './createJobReducer';
import updateJobReducer from './updateJobReducer';
import deleteJobReducer from './deleteJobReducer';
import getChatsDataReducer from './getChatsDataReducer';
import getChatsListReducer from './getChatsListReducer';
import quickChatsDataReducer from './quickChatsDataReducer';
import quickChatsListReducer from './quickChatsListReducer';
import recoverAccountDataReducer from './recoverAccountDataReducer';
import depositFundsReducer from './depositFundsReducer';
import getAccountManagerReducer from './getAccountManagerReducer';
import changeEmailUserReducer from './changeEmailUserReducer';
import twoFactorAuthReducer from './twoFactorAuthReducer';
import changeDobReducer from './changeDobReducer';
import { mobileNumberDataReducer } from './mobileNumberStoreReducer';
import { editUserDataStoreReducer } from './editUserDataStoreReducer';
import editAccountManagerReducer from './editAccountManagerReducer';
import accountManagerVerifiedRequestReducer from './accountManagerVerifiedRequestReducer';
import { kidParentCheckReducer } from './kidParentCheckReducer';
import replaceAccountManagerReducer from './replaceAccountManagerReducer';
import { replaceAccountManagerDataStoreReducer } from './replaceAccountManagerDataStoreReducer';
import reportUserReducer from './reportUserReducer';
import saveQuickAdsApiReducer from './saveQuickAdsApiReducer';
import getSavedQuickAdsApiReducer from './getSavedQuickAdsApiReducer';
import removeSavedQuickAdsApiReducer from './removeSavedQuickAdsApiReducer';
import getJobByDateTimeReducer from './getJobByDateTimeReducer';
import addToDoListNotesReducer from './addToDoListNotesReducer';
import addToDoListAudioReducer from './addToDoListAudioReducer';
import addToDoListVideoReducer from './addToDoListVideoReducer';
import addToDoListLinkReducer from './addToDoListLinkReducer';
import addToDoListPdfReducer from './addToDoListPdfReducer';
import addToDoListImageReducer from './addToDoListImageReducer';
import getLoggedInUserProfileReducer from './getLoggedInUserProfileReducer';
import getJobsByAdsIdReducer from './getJobsByAdsIdReducer';
import documentUploadReducer from './documentUploadReducer';
import addSocialMediaPostLinkReducer from './addSocialMediaPostLinkReducer';
import updateApplicantStatusReducer from './updateApplicantStatusReducer';
import getJobsByApplicantIdReducer from './getJobsByApplicantIdReducer';
import userReviewReducer from './userReviewReducer';
import getUserReviewReducer from './getUserReviewReducer';
import reportJobReducer from './reportJobReducer';
import updateUserReviewReducer from './updateUserReviewReducer';
import filterReducer from './filterReducer';
const appReducer = combineReducers({
  loginReducer,
  signUpReducer,
  forgotPasswordReducer,
  getUserProfileReducer,
  userAccountDeleteReducer,
  quickChatsDataReducer,
  quickChatsListReducer,
  updateUserReviewReducer,
  reportJobReducer,
  createAccountManagerReducer,
  changeDobReducer,
  addSocialMediaPostLinkReducer,
  getUserReviewReducer,
  getJobsByApplicantIdReducer,
  twoFactorAuthReducer,
  addToDoListAudioReducer,
  userReviewReducer,
  updateApplicantStatusReducer,
  addToDoListPdfReducer,
  documentUploadReducer,
  addToDoListLinkReducer,
  otpVerificationReducer,
  getLoggedInUserProfileReducer,
  addToDoListImageReducer,
  addToDoListNotesReducer,
  getJobByDateTimeReducer,
  addToDoListVideoReducer,
  recoverAccountReducer,
  replaceAccountManagerReducer,
  editProfileReducer,
  reportUserReducer,
  getSavedQuickAdsApiReducer,
  mobileNumberDataReducer,
  removeSavedQuickAdsApiReducer,
  saveQuickAdsApiReducer,
  replaceAccountManagerDataStoreReducer,
  kidParentCheckReducer,
  changePasswordUserReducer,
  sendOtpReducer,
  getJobsByAdsIdReducer,
  userVerifiedRequestReducer,
  accountManagerVerifiedRequestReducer,
  editUserDataStoreReducer,
  resetPasswordReducer,
  checkExistingReducer,
  changeEmailUserReducer,
  sendVerificationEmailReducer,
  emailVerifyReducer,
  editAccountManagerReducer,
  countryReducer,
  buildProfileDataReducer,
  completeStepsReducer,
  imageUploadReducer,
  videoUploadReducer,
  audioUploadReducer,
  musicVideoDataReducer,
  profileBuildApiReducer,
  getCategoryReducer,
  getLanguagesReducer,
  availableQuickAdsReducer,
  saveQuickAdsReducer,
  myQuickAdsReducer,
  jobDetailsReducer,
  acceptJobReducer,
  createJobReducer,
  updateJobReducer,
  deleteJobReducer,
  getChatsDataReducer,
  getChatsListReducer,
  recoverAccountDataReducer,
  depositFundsReducer,
  getAccountManagerReducer,
  filterReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
