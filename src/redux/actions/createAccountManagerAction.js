import {
  CREATE_ACCOUNT_MANAGER_FAILURE,
  CREATE_ACCOUNT_MANAGER_LOADING,
  CREATE_ACCOUNT_MANAGER_SUCCESS,
} from './allActions';
import axios from 'axios';
import {global} from '../../global';

export const createAccountManagerLoading = () => ({
  type: CREATE_ACCOUNT_MANAGER_LOADING,
});

export const createAccountManagerFailure = response => ({
  type: CREATE_ACCOUNT_MANAGER_FAILURE,
  payload: response,
});

export const createAccountManagerSuccess = response => ({
  type: CREATE_ACCOUNT_MANAGER_SUCCESS,
  payload: response,
});

export const createAccountManagerAction =
  (
    _id,
    accountManagerDateOfBirth,
    accountManagerFirstName,
    accountManagerLastName,
    accountManagerRelationship,
    accountManagerOccupation,
  ) =>
  async dispatch => {
    dispatch(createAccountManagerLoading());
    console.log(
      _id,
      accountManagerDateOfBirth,
      accountManagerFirstName,
      accountManagerLastName,
      accountManagerRelationship,
      accountManagerOccupation,
    );
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        global.BASE_URL + `users/create-account-manager`,
        {
          user_Id: _id,
          first_name: accountManagerFirstName,
          last_name: accountManagerLastName,
          relationship: accountManagerRelationship,
          date_of_birth: accountManagerDateOfBirth,
          occupation: accountManagerOccupation,
        },
        config,
      );
      if (response) {
        dispatch(createAccountManagerSuccess(response));
      } else {
        dispatch(createAccountManagerFailure('create account manager failed'));
      }

      return response;
    } catch (err) {
      dispatch(createAccountManagerFailure(err.response));
    }
  };
