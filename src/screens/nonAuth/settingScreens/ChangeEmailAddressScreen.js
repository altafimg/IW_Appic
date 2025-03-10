import React, {useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {editProfileAction} from '../../../redux/actions/editProfileAction';
import {changeEmailUserAction} from '../../../redux/actions/changeEmailUserAction';
import {sendVerificationEmailAction} from '../../../redux/actions/sendVerificationEmailAction';

const ChangeEmailAddressScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer.user?.data?.token);
  const _id = useSelector(state => state.loginReducer.user?.data?.data?._id);
  const loader = useSelector(state => state.changeEmailUserReducer.loading);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    currentEmail: '',
    newEmail: '',
    confirmNewEmail: '',
  });

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  // const onSentEmailThanksHandler = async () => {
  //   if (
  //     formData.currentEmail === '' ||
  //     formData.newEmail === '' ||
  //     formData.confirmNewEmail === ''
  //   ) {
  //     setErrorMessage('Please enter all fields');
  //   } else if (formData.newEmail !== formData.confirmNewEmail) {
  //     setErrorMessage('New email and confirm new email do not match');
  //   } else {
  //     const data = {
  //       token,
  //       _id,
  //       currentEmail: formData.currentEmail,
  //       newEmail: formData.newEmail,
  //     };
  //     try {
  //       const res = await dispatch(changeEmailUserAction(data));
  //       if (res?.data?.success) {
  //         setErrorMessage('');
  //         const verifyRes = await dispatch(
  //           sendVerificationEmailAction(formData.newEmail),
  //         );
  //         if (verifyRes?.data?.status) {
  //           navigation.navigate('SentEmailThanksScreen', {
  //             email: formData.newEmail,
  //             type: 'changeEmail',
  //           });
  //         } else {
  //           Alert.alert('Something went wrong!', {type: 'danger'});
  //         }
  //       } else {
  //         setErrorMessage(res?.data?.message || 'An error occurred');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setErrorMessage('An error occurred while changing the email');
  //     }
  //   }
  // };

  const onSentEmailThanksHandler = async () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    const isValidEmail = email => emailRegex.test(email);

    if (
      formData.currentEmail === '' ||
      formData.newEmail === '' ||
      formData.confirmNewEmail === ''
    ) {
      setErrorMessage('Please enter all fields');
    } else if (
      !isValidEmail(formData.currentEmail) ||
      !isValidEmail(formData.newEmail)
    ) {
      setErrorMessage('Please enter a valid email address');
    } else if (formData.newEmail !== formData.confirmNewEmail) {
      setErrorMessage('New email and confirm new email do not match');
    } else {
      const data = {
        token,
        _id,
        currentEmail: formData.currentEmail,
        newEmail: formData.newEmail,
      };
      try {
        const res = await dispatch(changeEmailUserAction(data));
        if (res?.data?.success) {
          setErrorMessage('');
          const verifyRes = await dispatch(
            sendVerificationEmailAction(formData.newEmail),
          );
          if (verifyRes?.data?.status) {
            navigation.navigate('SentEmailThanksScreen', {
              email: formData.newEmail,
              type: 'changeEmail',
            });
          } else {
            Alert.alert('Something went wrong!', {type: 'danger'});
          }
        } else {
          setErrorMessage(res?.data?.message || 'An error occurred');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while changing the email');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.changeEmailAddressScreen.changeEmail}
        />
        <View style={styles.inputMain}>
          <DetailsTextInput
            title={AppLocalizedStrings.changeEmailAddressScreen.currentEmail}
            onChangeText={e => {
              handleFormData('currentEmail', e);
            }}
            value={formData.currentEmail}
          />
          <Text style={styles.title}>
            {AppLocalizedStrings.changeEmailAddressScreen.newEmail}
          </Text>
          <DetailsTextInput
            title={AppLocalizedStrings.changeEmailAddressScreen.newEmail}
            onChangeText={e => {
              handleFormData('newEmail', e);
            }}
            value={formData.newEmail}
          />
          <DetailsTextInput
            title={AppLocalizedStrings.changeEmailAddressScreen.confirmEmail}
            onChangeText={e => {
              handleFormData('confirmNewEmail', e);
            }}
            value={formData.confirmNewEmail}
          />
        </View>
        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </ScrollView>
      <PrimaryButton
        title={
          loader ? (
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
            <Text>{AppLocalizedStrings.button.submit}</Text>
          )
        }
        onPress={onSentEmailThanksHandler}
      />
    </View>
  );
};

export default ChangeEmailAddressScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  inputMain: {
    marginTop: hp(-4),
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    lineHeight: '22@s',
    marginVertical: hp(2),
  },
  errorMessage: {
    color: 'red',
    textAlign: 'left',
    marginVertical: hp(2),
  },
});
