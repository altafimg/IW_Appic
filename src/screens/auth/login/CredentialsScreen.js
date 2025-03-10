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
const CredentialsScreen = ({navigation, route}) => {
  const {
    accountManagerDateOfBirth,
    accountManagerFirstName,
    accountManagerLastName,
    accountManagerRelationship,
    accountManagerOccupation,
  } = route.params.managerData;

  const {
    dateOfBirth,
    firstName,
    lastName,
    profileName,
    userName,
    kid_influencer,
    user_role,
  } = route.params.customerFormData;

  // const {user_role, type} = route.params;
  // const {dateOfBirth, firstName, lastName, profileName, userName, user_role} =
  //   route.params.customerFormData;
  const dispatch = useDispatch();
  const height = useHeaderHeight();
  const toast = useToast();
  const loading = useSelector(state => state.signUpReducer.loading);

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setEmailError('');
  };

  const resetFormData = () => {
    setFormData({
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    });
    setEmailError('');
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onSentEmailThanksHandler = () => {
    const {confirmEmail, confirmPassword, email, password} = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      confirmEmail.trim() === '' ||
      confirmPassword.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      setError('Please fill details');
      setEmailError('');
      // toast.show('Enter profile details', {
      //   type: 'danger',
      // });
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

    const type = 'user';

    const existDataCheck = {
      type: 'email',
      data: formData.email,
    };

    dispatch(checkExistingAction(existDataCheck))
      .then(res => {
        if (res.data.status === true) {
          setEmailError('');
          dispatch(signUpAction(signupData, type))
            .then(res => {
              navigation.navigate('SentEmailThanksScreen', {
                email: email,
                accountManagerDateOfBirth: accountManagerDateOfBirth,
                accountManagerFirstName: accountManagerFirstName,
                accountManagerLastName: accountManagerLastName,
                accountManagerRelationship: accountManagerRelationship,
                accountManagerOccupation: accountManagerOccupation,
                type: type,
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setEmailError('This username is already in use');
        }
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // if (type === 'individual') {
    // dispatch(signUpAction(updatedIndividualData))
    //   .then(res => {
    //     console.log(res);
    //     navigation.navigate('SentEmailThanksScreen', {email: email});
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // }

    // resetFormData();
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
          error={error}
          emailError={emailError}
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

export default CredentialsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
});
