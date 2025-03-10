import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import NewProfileTextInput from '../../../components/Auth/NewProfileTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch} from 'react-redux';
import {checkExistingAction} from '../../../redux/actions/checkExistingAction';
import {signUpAction} from '../../../redux/actions/signupAction';
import InfluencerAdultPopup from '../../../components/popups/InfluencerAdultPopup';
import CustomerAgePopup from '../../../components/popups/CustomerAgePopup';
import moment from 'moment';

const NewProfileDetailsCustomerScreen = ({navigation, route}) => {
  const {user_role} = route.params;
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    userName: '',
    profileName: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      checkExisting();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.userName]);

  const handleDateChange = selectedDate => {
    // const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
    const modified = moment(selectedDate).format('YYYY-MM-DD');
    setFormData({
      ...formData,
      dateOfBirth: modified,
    });
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

  // Function to check for existing username
  const checkExisting = async () => {
    if (formData.userName.trim() !== '') {
      try {
        const existDataCheck = {
          type: 'user_name',
          data: formData.userName,
        };
        const res = await dispatch(checkExistingAction(existDataCheck));
        if (res.data.status === true) {
          setUsernameError('');
        } else {
          setUsernameError('This username is already in use');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsernameError('');
    }
  };

  // const type = 'company';
  const handleContinue = () => {
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.userName.trim() === '' ||
      formData.dateOfBirth.trim() === '' ||
      formData.profileName.trim() === ''
    ) {
      setError('Please fill in this field');
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        setIsVisible(true);
      } else {
        navigation.navigate('NoBusinessCredentialScreen', {
          customerFormData: formData,
          user_role: user_role,
        });
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={AppLocalizedStrings.newProfileDetailsScreen.newProfile}
            subTitle={AppLocalizedStrings.newProfileDetailsScreen.letGet}
          />
          <NewProfileTextInput
            formData={formData}
            handleFormData={handleFormData}
            onDateChange={handleDateChange}
            error={error}
            usernameError={usernameError}
            check="customer"
          />
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={handleContinue}
        />
      </KeyboardAvoidingView>
      <CustomerAgePopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export default NewProfileDetailsCustomerScreen;

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
});
