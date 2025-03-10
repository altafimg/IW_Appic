import React, {useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../textInput/DetailsTextInput';
import CountryPickerWithNumber from '../countryPicker/CountryPickerWithNumber';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useHeaderHeight} from '@react-navigation/elements';
import {useDispatch} from 'react-redux';
import {recoverAccountDataAddAction} from '../../redux/actions/recoverAccountDataAction';

const RecoveringAccount1 = props => {
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lastPurchase: '',
    lastJob: '',
    currentJob: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    lastPurchase: '',
    lastJob: '',
    currentJob: '',
    email: '',
    mobileNumber: '',
  });
  const [countryCode, setCountryCode] = useState();
  const [callingCode, setCallingCode] = useState();
  const [mobileNumber, setMobileNumber] = useState('');

  const onCountryCodeChange = (countCode, callCode) => {
    setCountryCode(countCode);
    setCallingCode(callCode);
  };
  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const buttonHandler = () => {
    const newErrors = {...errors};
    let isValid = true; // Track overall validity

    const fields = ['lastPurchase', 'lastJob', 'currentJob', 'email']; // Remove 'mobileNumber' from validation
    fields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Please fill in this field';
        isValid = false; // Mark as invalid if any field is empty
      } else {
        newErrors[field] = '';
      }
    });

    // Handle mobileNumber separately
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please fill in this field';
      isValid = false; // Mark as invalid if mobileNumber is empty
    } else {
      newErrors.mobileNumber = '';
    }

    setErrors(newErrors);

    if (isValid) {
      const modifiedMobileNumber = '+' + callingCode + mobileNumber;
      const {currentJob, email, lastJob, lastPurchase} = formData;
      const recoverData = {
        currentJob,
        email,
        lastJob,
        lastPurchase,
        modifiedMobileNumber,
      };
      dispatch(recoverAccountDataAddAction(recoverData));
      props.onNextButtonHandler();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.recoveringAccountScreen.sure}
          </Text>
          <View style={styles.main}>
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.purchase}
              editable={true}
              value={formData.lastPurchase}
              onChangeText={e => {
                handleFormData('lastPurchase', e);
              }}
            />
            {errors.lastPurchase ? (
              <Text style={styles.errorText}>{errors.lastPurchase}</Text>
            ) : null}
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.job}
              editable={true}
              value={formData.lastJob}
              onChangeText={e => {
                handleFormData('lastJob', e);
              }}
            />
            {errors.lastJob ? (
              <Text style={styles.errorText}>{errors.lastJob}</Text>
            ) : null}

            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.progress}
              editable={true}
              value={formData.currentJob}
              onChangeText={e => {
                handleFormData('currentJob', e);
              }}
            />
            {errors.currentJob ? (
              <Text style={styles.errorText}>{errors.currentJob}</Text>
            ) : null}

            <Text style={styles.bottomTitle}>
              {AppLocalizedStrings.recoveringAccountScreen.access}
            </Text>
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
            {errors.mobileNumber ? (
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>
            ) : null}

            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.email}
              editable={true}
              value={formData.email}
              onChangeText={e => {
                handleFormData('email', e);
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={props.onPreviousHandler}
            style={styles.previousButton}>
            <Text style={styles.previousTitle}>
              {AppLocalizedStrings.recoveringAccountScreen.previous}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={props.onNextButtonHandler}
            onPress={buttonHandler}
            style={styles.nextButton}>
            <Text style={styles.nextTitle}>
              {AppLocalizedStrings.recoveringAccountScreen.next}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RecoveringAccount1;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    paddingBottom: hp(2),
  },
  main: {
    marginTop: hp(3),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },
  bottomTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    lineHeight: '18@s',
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
    marginTop: hp(1.5),
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  nextButton: {
    backgroundColor: Colors.Primary500,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginLeft: wp(1),
  },
  nextTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    flex: 1,
    marginRight: wp(1),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
  },
});
