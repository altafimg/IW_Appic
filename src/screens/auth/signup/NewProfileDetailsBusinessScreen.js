import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Platform,
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
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {checkExistingAction} from '../../../redux/actions/checkExistingAction';
import SVG from '../../../assets/svg';
import {TextInput} from 'react-native';

const NewProfileDetailsBusinessScreen = ({navigation, route}) => {
  const {user_role, relationship} = route.params || {};
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    companyName: '',
    userName: '',
    profileName: '',
  });
  const toast = useToast();
  const [userEmailError, setUserEmailError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    profileName: '',
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

  const resetFormData = () => {
    setFormData({
      companyName: '',
      userName: '',
      profileName: '',
    });
    setErrors({
      companyName: '',
      userName: '',
      profileName: '',
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkExisting();
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.userName]);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onBuisGovAccountHandler = async () => {
    const newErrors = {};
    let hasError = false;

    if (formData.companyName.trim() === '') {
      newErrors.companyName = 'Please fill in this field';
      hasError = true;
    }
    if (formData.userName.trim() === '') {
      newErrors.userName = 'Please fill in this field';
      hasError = true;
    }
    if (formData.profileName.trim() === '') {
      newErrors.profileName = 'Please fill in this field';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else if (userEmailError) {
      // If username already exists, set the error
      setUserEmailError('This username is already in use');
    } else {
      const formDataNew = {
        ...formData,
        user_role: user_role,
        relationship: relationship,
      };
      navigation.navigate('BuisGovAccountManagerScreen', {
        formData: formDataNew,
      });
      resetFormData();
    }
  };

  // const onBuisGovAccountHandler = () => {
  //   const newErrors = {};
  //   let hasError = false;

  //   if (formData.companyName.trim() === '') {
  //     newErrors.companyName = 'Please fill in this field';
  //     hasError = true;
  //   }
  //   if (formData.userName.trim() === '') {
  //     newErrors.userName = 'Please fill in this field';
  //     hasError = true;
  //   }
  //   if (formData.profileName.trim() === '') {
  //     newErrors.profileName = 'Please fill in this field';
  //     hasError = true;
  //   }

  //   if (hasError) {
  //     setErrors(newErrors);
  //   } else {
  //     const formDataNew = {
  //       ...formData,
  //       user_role: user_role,
  //     };
  //     navigation.navigate('BuisGovAccountManagerScreen', {
  //       formData: formDataNew,
  //     });
  //     resetFormData();
  //   }
  // };

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
          setUserEmailError('');
        } else {
          setUserEmailError('This username is already in use');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUserEmailError('');
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
          <Header
            headerTitle={
              AppLocalizedStrings.newProfileDetailsBusinessScreen.account
            }
            subTitle={
              AppLocalizedStrings.newProfileDetailsBusinessScreen.little
            }
          />
          <DetailsTextInput
            title={
              user_role == 'business'
                ? AppLocalizedStrings.newProfileDetailsBusinessScreen.newCompany
                : AppLocalizedStrings.newProfileDetailsBusinessScreen.company
            }
            editable={true}
            onChangeText={e => {
              handleFormData('companyName', e);
            }}
            value={formData.companyName}
          />
          {errors.companyName ? (
            <Text style={styles.errorText}>{errors.companyName}</Text>
          ) : (
            ''
          )}

          {/* <DetailsTextInput
            title={AppLocalizedStrings.newProfileDetailsBusinessScreen.username}
            editable={true}
            onChangeText={e => {
              handleFormData('userName', e);
            }}
            value={formData.userName}
          /> */}

          <Text
            style={{
              color: Colors.Neutral900,
              fontSize: 14,
              fontWeight: '500',
              paddingBottom: 1,

              // textInputTitle: {
              //   color: Colors.Neutral900,
              //   fontSize: '12@s',
              //   fontWeight: '500',
              //   paddingBottom: hp(0.6),
              // },
            }}>
            {AppLocalizedStrings.newProfileDetailsBusinessScreen.username}
          </Text>
          <View style={styles.textInputView}>
            <View style={styles.textInputAddrateView}>
              <Text style={styles.addrateTitle}>@</Text>
              <TextInput
                placeholder=""
                editable={true}
                style={styles.textInput}
                onChangeText={e => {
                  handleFormData('userName', e);
                }}
                autoCapitalize="none" // Disable auto capitalization
                value={formData.userName}
              />
            </View>
          </View>
          {errors.userName ? (
            <Text style={styles.errorText}>{errors.userName}</Text>
          ) : (
            ''
          )}

          {formData.userName.trim() === '' ? (
            ''
          ) : !userEmailError ? (
            <View style={styles.existError}>
              <SVG.ExistError color="green" />
              <Text style={[styles.usernameError, {color: Colors.Success500}]}>
                {AppLocalizedStrings.newProfileDetailsBusinessScreen.available}
              </Text>
            </View>
          ) : (
            <View style={styles.existError}>
              <SVG.ExistError color="red" />
              <Text
                style={[styles.usernameError, {color: Colors.Destructive500}]}>
                {userEmailError}
              </Text>
            </View>
          )}

          {/* {userEmailError ? (
            <View style={styles.existError}>
              <SVG.ExistError color="red" />
              <Text
                style={[styles.usernameError, {color: Colors.Destructive500}]}>
                {userEmailError}
              </Text>
            </View>
          ) : null} */}

          <DetailsTextInput
            title={
              AppLocalizedStrings.newProfileDetailsBusinessScreen.profileName
            }
            // frountTitle={
            //   AppLocalizedStrings.newProfileDetailsBusinessScreen.characters
            // }
            frountTitle={
              formData.profileName.length > 0
                ? 26 - formData.profileName.length + ` characters remaining`
                : 26 - formData.profileName.length + ` characters max.`
            }
            editable={true}
            onChangeText={e => {
              handleFormData('profileName', e);
            }}
            value={formData.profileName}
            maxLength={26}
          />
          <Text style={styles.bottomTitle}>
            {AppLocalizedStrings.newProfileDetailsBusinessScreen.displayed}
          </Text>
          {errors.profileName ? (
            <Text style={styles.errorText}>{errors.profileName}</Text>
          ) : (
            ''
          )}
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onBuisGovAccountHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewProfileDetailsBusinessScreen;

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
  bottomTitle: {
    color: Colors.Neutral500,
    fontSize: '10@s',
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  existError: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameError: {
    fontWeight: '400',
    fontSize: 12,
    paddingLeft: 3,
  },
  textInputView: {
    height: '43@s',
  },
  addrateTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
  },
  frountTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  textInputAddrateView: {
    // flex: 1,
    color: Colors.Neutral900,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '43@s',
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
});
