import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, View, Alert} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import AccountManagerTextInput from '../../../components/Auth/AccountManagerTextInput';
import InfluencerAdultPopup from '../../../components/popups/InfluencerAdultPopup';
import ManagerAdultPopup from '../../../components/popups/ManagerAdultPopup';
import {replaceAccountManagerDataStoreAction} from '../../../redux/actions/replaceAccountManagerDataStoreAction';
import moment from 'moment';

const KidAccountManagerScreen = ({navigation, route}) => {
  const {dateOfBirth, firstName, lastName, profileName, userName} =
    route.params.customerFormData || {};
  const {user_role} = route.params || {};

  const {diffCheck} = route?.params || {};

  // console.log(diffCheck);
  const height = useHeaderHeight();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    accountManagerFirstName: '',
    accountManagerLastName: '',
    accountManagerDateOfBirth: '',
    accountManagerRelationship: '',
    accountManagerEmail: '',
  });

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  // user_role: 'government',
  // relationship: 'govtmanager',

  const handleContinue = () => {
    if (
      formData.accountManagerFirstName.trim() === '' ||
      formData.accountManagerLastName.trim() === '' ||
      formData.accountManagerDateOfBirth === '' ||
      formData.accountManagerRelationship.trim() === ''
    ) {
      setError('Please fill in this field');
    } else {
      const age = calculateAge(formData.accountManagerDateOfBirth);
      console.log(age, '<<<age');
      if (age < 18) {
        // setIsVisible(true);
        navigation.navigate('GuardianAgeScreen', {
          customerFormData: route?.params?.customerFormData,
          user_role: user_role,
        });
      } else {
        if (diffCheck === 'replace') {
          // const managerData = {
          //   accountManagerFirstName: formData.accountManagerFirstName,
          //   accountManagerLastName: formData.accountManagerLastName,
          //   accountManagerDateOfBirth: formData.accountManagerDateOfBirth,
          //   accountManagerRelationship: formData.accountManagerRelationship,
          //   accountManagerOccupation: '',
          // };
          const modified = moment(formData?.accountManagerDateOfBirth).format(
            'DD-MM-YYYY',
          );

          const accountManagerData = {
            firstName: formData.accountManagerFirstName,
            lastName: formData.accountManagerLastName,
            dateOfBirth: modified,
            relationship: formData.accountManagerRelationship,
            email: formData.accountManagerEmail,
          };

          dispatch(replaceAccountManagerDataStoreAction(accountManagerData));

          navigation.navigate('UploadGovIDScreen', {
            check: 'replace',
          });
        } else {
          const managerData = {
            accountManagerFirstName: formData.accountManagerFirstName,
            accountManagerLastName: formData.accountManagerLastName,
            accountManagerDateOfBirth: formData.accountManagerDateOfBirth,
            accountManagerRelationship: formData.accountManagerRelationship,
            accountManagerOccupation: '',
          };

          const customerFormData = {
            dateOfBirth: dateOfBirth,
            firstName: firstName,
            lastName: lastName,
            profileName: profileName,
            userName: userName,
            user_role: user_role,
          };

          navigation.navigate('KidInfluencerCredentialScreen', {
            managerData,
            customerFormData,
          });
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

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      AppLocalizedStrings.accountManagerScreen.theParent,
      AppLocalizedStrings.accountManagerScreen.ifYou,
      [
        {
          text: AppLocalizedStrings.accountManagerScreen.goBack,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: AppLocalizedStrings.accountManagerScreen.quitSetup,
          onPress: () => navigation.navigate('WelcomeScreen'),
        },
      ],
    );

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
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
          <AccountManagerTextInput
            formData={formData}
            handleFormData={handleFormData}
            error={error}
            diffCheck={diffCheck}
          />
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={handleContinue}
        />
        <ManagerAdultPopup
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleModal={toggleModal}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default KidAccountManagerScreen;

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
