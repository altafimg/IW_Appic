import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import BirthdayDatePicker from '../../../components/textInput/BirthdayDatePicker';
import {useToast} from 'react-native-toast-notifications';
import ManagerAdultPopup from '../../../components/popups/ManagerAdultPopup';
import {useDispatch} from 'react-redux';
import {replaceAccountManagerDataStoreAction} from '../../../redux/actions/replaceAccountManagerDataStoreAction';
import moment from 'moment';

const BuisGovAccountManagerScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {companyName, profileName, userName, user_role, relationship} =
    route.params.formData || {};

  const {diffCheck} = route?.params || {};

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    occupation: '',
  });
  const height = useHeaderHeight();
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  // console.log(route.params.formData);
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    occupation: '',
    email: '',
  });

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: '', // Clear error message for this field
    });
  };

  const handleDateChange = selectedDate => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
    setFormData({
      ...formData,
      dateOfBirth: formattedDate,
    });
    setErrors({
      ...errors,
      dateOfBirth: '', // Clear error message for dateOfBirth field
    });
  };

  const resetFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      occupation: '',
      email: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      occupation: '',
      email: '',
    });
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onContinueHandler = () => {
    const newErrors = {};
    let hasError = false;

    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'Please fill in this field';
      hasError = true;
    }
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Please fill in this field';
      hasError = true;
    }
    if (formData.dateOfBirth.trim() === '') {
      newErrors.dateOfBirth = 'Please fill in this field';
      hasError = true;
    }
    if (formData.occupation.trim() === '') {
      newErrors.occupation = 'Please fill in this field';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        // setIsVisible(true);
        navigation.navigate('BusinessManagerAgeScreen', {
          formData: route?.params?.formData,
          check: 'govt',
        });
      } else {
        if (diffCheck === 'replace') {
          // const accountManagerData = {
          //   ...formData,
          //   relationship: 'govtmanager',
          //   check: 'replace',
          // };

          const modified = moment(formData?.dateOfBirth).format('DD-MM-YYYY');

          const accountManagerData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: modified,
            relationship: 'govtmanager',
            email: formData.email,
          };

          dispatch(replaceAccountManagerDataStoreAction(accountManagerData));

          navigation.navigate('UploadGovIDScreen', {
            check: 'replace',
          });
        } else {
          const companyData = {
            companyName: companyName,
            profileName: profileName,
            userName: userName,
            user_role: user_role,
          };
          const accountManagerData = {
            ...formData,
            relationship: relationship,
          };
          navigation.navigate('GovtAccountCredentialScreen', {
            accountManagerData: accountManagerData,
            companyData: companyData,
          });
          resetFormData();
        }
      }
    }
  };

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
              AppLocalizedStrings.accountManagerScreen.accountManager
            }
            subTitle={AppLocalizedStrings.accountManagerScreen.letGet}
          />
          <DetailsTextInput
            title={AppLocalizedStrings.accountManagerScreen.firstName}
            editable={true}
            value={formData.firstName}
            onChangeText={e => {
              handleFormData('firstName', e);
            }}
          />
          {errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : (
            ''
          )}

          <DetailsTextInput
            title={AppLocalizedStrings.accountManagerScreen.lastName}
            editable={true}
            value={formData.lastName}
            onChangeText={e => {
              handleFormData('lastName', e);
            }}
          />
          {errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : (
            ''
          )}

          <BirthdayDatePicker
            title={AppLocalizedStrings.accountManagerScreen.dateOfBirth}
            value={formData.dateOfBirth}
            onDateChange={handleDateChange}
          />
          {errors.dateOfBirth ? (
            <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
          ) : (
            ''
          )}

          {diffCheck === 'replace' ? (
            <DetailsTextInput
              title={AppLocalizedStrings.accountManagerScreen.email}
              editable={true}
              value={formData.email}
              onChangeText={e => {
                handleFormData('email', e);
              }}
            />
          ) : (
            ''
          )}

          <DetailsTextInput
            title={AppLocalizedStrings.accountManagerScreen.occupation}
            editable={true}
            value={formData.occupation}
            onChangeText={e => {
              handleFormData('occupation', e);
            }}
          />
          {errors.occupation ? (
            <Text style={styles.errorText}>{errors.occupation}</Text>
          ) : (
            ''
          )}
          <Text
            style={{
              fontWeight: 400,
              fontSize: 12,
              color: 'rgba(115, 115, 115, 1)',
            }}>
            {AppLocalizedStrings.accountManagerScreen.change}
          </Text>
        </ScrollView>

        <Text style={styles.bottomText}>
          {AppLocalizedStrings.accountManagerScreen.clicking}
          <Text style={styles.termsTitle}>
            {AppLocalizedStrings.accountManagerScreen.termsConditions}
          </Text>
        </Text>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      </KeyboardAvoidingView>
      <ManagerAdultPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export default BuisGovAccountManagerScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: hp(3),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  bottomText: {
    color: Colors.Black,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(2),
  },
  termsTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
