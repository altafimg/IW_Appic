import {Text, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Header from '../../../components/Auth/Header';
import {useHeaderHeight} from '@react-navigation/elements';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import CountryPickerWithNumber from '../../../components/countryPicker/CountryPickerWithNumber';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';

const PhoneNumberScreen = ({navigation, route}) => {
  const height = useHeaderHeight();

  const {check} = route?.params || '';
  // console.log(check);
  // check: 'signup',
  // check: 'edit',

  const [countryCode, setCountryCode] = useState();
  const [callingCode, setCallingCode] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, showError] = useState(false);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onCountryCodeChange = (countCode, callCode) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };

  const onSubmitHandler = () => {
    if (mobileNumber !== '') {
      const modifiedNumber = '+' + callingCode + mobileNumber;

      if (check === 'edit') {
        navigation.navigate('OTPScreen', {
          type: 'edit',
          number: modifiedNumber,
          title: 'Verify phone number',
          subTitle:
            'Please confirm your account by entering the code we’ve sent to ',
        });
        showError(false);
      } else {
        navigation.navigate('OTPScreen', {
          type: 'signup',
          number: modifiedNumber,
          title: 'Verify phone number',
          subTitle: 'Please enter the code we’ve sent to ',
        });
        showError(false);
      }
    } else {
      showError(true);
    }
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <BackArrow goBack={onGoBackHandler} />
          {check === 'edit' ? (
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.phoneNumberScreen.changePhoneNumber}
            </Text>
          ) : (
            <Header
              headerTitle={AppLocalizedStrings.phoneNumberScreen.phoneNumber}
              subTitle={AppLocalizedStrings.phoneNumberScreen.please}
            />
          )}

          <View>
            <View style={styles.inputMainView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.phoneNumberScreen.number}
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
          </View>
          {error && (
            <Text style={styles.errorText}>
              {AppLocalizedStrings.phoneNumberScreen.pleaseEnter}
            </Text>
          )}
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.submit}
          onPress={onSubmitHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(2),
  },
  accountButton: {
    alignSelf: 'center',
    marginBottom: hp(3),
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  inputMainView: {
    marginVertical: hp(1),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  errorText: {
    color: 'red',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(0.4),
    paddingBottom: hp(3),
  },
});
