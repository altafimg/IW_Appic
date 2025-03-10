import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';
import NewProfileTextInput from '../../../components/Auth/NewProfileTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch} from 'react-redux';
import {checkExistingAction} from '../../../redux/actions/checkExistingAction';
import NewProfileKidsTextInput from '../../../components/Auth/NewProfileKidsTextInput';
import moment from 'moment';

const KidsDetailsScreen = ({navigation, route}) => {
  const {user_role} = route.params || {};
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [adultAge, setAdultAge] = useState(false);

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

  const calculateAge = birthdate => {
    const birthDate = moment(birthdate);
    const currentDate = moment();
    const age = currentDate.diff(birthDate, 'years');

    setAdultAge(age >= 18);
  };

  const handleDateChange = selectedDate => {
    // const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
    const modified = moment(selectedDate).format('YYYY-MM-DD');

    setFormData({
      ...formData,
      dateOfBirth: modified,
    });
    calculateAge(modified);
  };

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const checkExisting = async () => {
    if (formData.userName.trim() !== '') {
      try {
        const type = 'user_name';
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

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onAccountManagerHandler = () => {
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.userName.trim() === '' ||
      formData.dateOfBirth.trim() === '' ||
      formData.profileName.trim() === ''
    ) {
      setError('Please fill in this field');
    } else if (adultAge) {
      setError('You must be less than 18 years old');
    } else {
      navigation.navigate('KidAccountManagerScreen', {
        customerFormData: formData,
        user_role: user_role,
      });
    }
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
            headerTitle={AppLocalizedStrings.kidsDetailsScreen.kidDetails}
            subTitle={AppLocalizedStrings.kidsDetailsScreen.lets}
          />
          <NewProfileKidsTextInput
            formData={formData}
            handleFormData={handleFormData}
            onDateChange={handleDateChange}
            error={error}
            usernameError={usernameError}
            // calculateAge={calculateAge}
            adultAge={adultAge}
            // setAdultAge={setAdultAge}
          />
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onAccountManagerHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default KidsDetailsScreen;

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
