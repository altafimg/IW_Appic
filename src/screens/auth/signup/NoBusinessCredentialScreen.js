import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import {useHeaderHeight} from '@react-navigation/elements';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import CredentialsTextInput from '../../../components/Auth/CredentialsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {signUpAction} from '../../../redux/actions/signupAction';
import {checkExistingAction} from '../../../redux/actions/checkExistingAction';

const NoBusinessCredentialScreen = ({navigation, route}) => {
  const {dateOfBirth, firstName, lastName, profileName, userName} =
    route.params.customerFormData;
  const {user_role} = route.params;

  const dispatch = useDispatch();

  const loading = useSelector(state => state.signUpReducer.loading);

  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    emailError: '',
    confirmEmailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleError = (field, value) => {
    setError(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onSentEmailThanksHandler = () => {
    const {confirmEmail, confirmPassword, email, password} = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    const newError = {
      emailError: '',
      confirmEmailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    // Validate email
    if (email.trim() === '') {
      newError.emailError = 'Please fill in this field';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newError.emailError = 'Please enter a valid email address';
      valid = false;
    }

    // Validate confirm email
    if (confirmEmail.trim() === '') {
      newError.confirmEmailError = 'Please fill in this field';
      valid = false;
    } else if (confirmEmail !== email) {
      newError.confirmEmailError = 'Emails must match';
      valid = false;
    }

    // Validate password
    if (password.trim() === '') {
      newError.passwordError = 'Please fill in this field';
      valid = false;
    } else if (password.length < 8) {
      newError.passwordError = 'Password must be at least 8 characters long';
      valid = false;
    }

    // Validate confirm password
    if (confirmPassword.trim() === '') {
      newError.confirmPasswordError = 'Please fill in this field';
      valid = false;
    } else if (confirmPassword !== password) {
      newError.confirmPasswordError = 'Passwords must match';
      valid = false;
    }

    setError(newError);

    if (!valid) {
      return;
    }

    const signupData = {
      firstName,
      lastName,
      userName,
      profileName,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      user_role,
    };

    console.log(signupData);

    const type = 'user';

    const existDataCheck = {
      type: 'email',
      data: formData.email,
    };

    dispatch(checkExistingAction(existDataCheck))
      .then(res => {
        if (res.data.status === true) {
          handleError('emailError', '');
          dispatch(signUpAction(signupData, type))
            .then(res => {
              console.log(res);
              navigation.navigate('SentEmailThanksScreen', {
                email: email,
                type: type,
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          handleError('emailError', 'This email is already in use');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.CredentialsScreen.credentials}
          subTitle={AppLocalizedStrings.CredentialsScreen.subTitle}
        />
        <CredentialsTextInput
          formData={formData}
          handleFormData={handleFormData}
          handleError={handleError}
          error={error}
          user_role={user_role}
        />
      </ScrollView>
      <PrimaryButton
        title={
          loading ? (
            <View
              style={{
                width: wp('93%'),
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={Colors.White}
                size={'small'}
                style={{marginTop: hp(1)}}
              />
            </View>
          ) : (
            AppLocalizedStrings.button.submit
          )
        }
        onPress={onSentEmailThanksHandler}
      />
    </KeyboardAvoidingView>
  );
};

export default NoBusinessCredentialScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
});
