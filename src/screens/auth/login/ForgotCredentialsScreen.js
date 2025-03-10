import React, {Suspense, useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import CountryPickerWithNumber from '../../../components/countryPicker/CountryPickerWithNumber';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import {UseDispatch, useDispatch, useSelector} from 'react-redux';
import {forgotPasswordAction} from '../../../redux/actions/forgotPasswordAction';
import {useToast} from 'react-native-toast-notifications';

const ForgotCredentialsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const errorMessage = useSelector(state => state.forgotPasswordReducer.error);
  const loading = useSelector(state => state.forgotPasswordReducer.loading);
  const [countryCode, setCountryCode] = useState();
  const [callingCode, setCallingCode] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const onCountryCodeChange = (countCode, callCode) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const resetCredentials = () => {
    setEmail('');
    setMobileNumber('');
    setCallingCode('');
  };

  const onSubmitHandler = () => {
    if (email === '' && mobileNumber === '') {
      // toast.show('Please enter your credentials', {
      //   type: 'danger',
      // });

      setError('Please enter your credentials');

      return;
    } else {
      const requestData = {
        email: email,
        mobileNumber: mobileNumber,
        callingCode: callingCode,
      };
      dispatch(forgotPasswordAction(requestData))
        .then(res => {
          if (res?.data?.status === true) {
            toast.show(res?.data?.message, {
              type: 'success',
            });
            setError('');
            navigation.navigate('OTPScreen', {
              type: 'reset',
              email: email,
              title: AppLocalizedStrings.otpScreen.verifyAccount,
              subTitle: AppLocalizedStrings.otpScreen.pleaseConfirm,
            });
            resetCredentials();
          } else {
            setError('');
            setErrorVisible(true);
          }
        })
        .catch(err => {
          console.log(err, 'error');
          setErrorVisible(true);
        });
    }
  };
  const onAccessHandler = () => {
    navigation.navigate('RecoveringAccountScreen');
  };
  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={
              AppLocalizedStrings.forgotCredentialsScreen.forgotCredentials
            }
            subTitle={AppLocalizedStrings.forgotCredentialsScreen.please}
          />
          <View>
            <View style={styles.inputMainView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.forgotCredentialsScreen.phoneNumber}
              </Text>
              <CountryPickerWithNumber
                mobileNumber={mobileNumber}
                countryCode={countryCode}
                placeholderTitle=" "
                onCountryCodeChange={onCountryCodeChange}
                onPhoneNumberChange={setMobileNumber}
                rightIcon={false}
              />
            </View>
            <Text style={styles.orTitle}>
              {AppLocalizedStrings.forgotCredentialsScreen.or}
            </Text>
            <DetailsTextInput
              title={AppLocalizedStrings.forgotCredentialsScreen.email}
              placeholder=" "
              editable={true}
              onChangeText={e => setEmail(e)}
              value={email}
            />
          </View>
          {errorVisible && errorMessage && (
            <Text style={{color: 'red'}}>{errorMessage}</Text>
          )}
          {error ? <Text style={{color: 'red'}}>{error}</Text> : ''}
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
              <Text>{AppLocalizedStrings.button.submit}</Text>
            )
          }
          onPress={onSubmitHandler}
        />
        <TouchableOpacity onPress={onAccessHandler}>
          <Text style={styles.bottomTitle}>
            {AppLocalizedStrings.forgotCredentialsScreen.access}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotCredentialsScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  inputMainView: {
    marginVertical: hp(1),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  orTitle: {
    textAlign: 'center',
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
  },
  bottomTitle: {
    textAlign: 'center',
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(2),
  },
});
