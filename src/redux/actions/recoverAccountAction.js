import {
  RECOVER_ACCOUNT_FAILURE,
  RECOVER_ACCOUNT_LOADING,
  RECOVER_ACCOUNT_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';
const recoverAccountLoading = () => ({type: RECOVER_ACCOUNT_LOADING});

const recoverAccountSuccess = response => ({
  type: RECOVER_ACCOUNT_SUCCESS,
  payload: response,
});

const recoverAccountFailure = response => ({
  type: RECOVER_ACCOUNT_FAILURE,
  payload: response,
});

export const recoverAccountAction =
  ({
    lastPurchase,
    lastJob,
    currentJob,
    modifiedMobileNumber,
    email,
    fullName,
    address,
    country,
    state,
    city,
    zipCode,
    phoneNumber,
    otherEmail,
    uploadedID,
    poseImage1,
    poseImage2,
  }) =>
  async dispatch => {
    dispatch(recoverAccountLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/recovering-account`,
        {
          lastPurchase: lastPurchase,
          lastJob: lastJob,
          jobsInProgress: currentJob,
          lostPhoneNumber: modifiedMobileNumber,
          lostEmailAddress: email,
          fullName: fullName,
          address: address,
          Country: country,
          state: state,
          city: city,
          postcode: zipCode,
          newPhone_number: phoneNumber,
          newEmail: otherEmail,
          govId: uploadedID,
          poseImage1: poseImage1,
          poseImage2: poseImage2,
        },
        config,
      );

      if (response) {
        dispatch(recoverAccountSuccess(response));
      } else {
        dispatch(
          recoverAccountFailure(' recover account failed. Please try again.'),
        );
      }

      return response;
    } catch (error) {
      console.log(error);
      dispatch(recoverAccountFailure(error));
    }
  };
