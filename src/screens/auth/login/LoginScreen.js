import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import {clearLoginError, loginAction} from '../../../redux/actions/loginAction';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const errorMessage = useSelector(state => state.loginReducer.error);
  const loading = useSelector(state => state.loginReducer.loading);

  const [formData, setFormData] = useState({
    email: 'Kyle@yopmail.com',
    // email: 'Ethan@yopmail.com',
    // email: 'jack@yopmail.com',
    // email: 'olivia@yopmail.com',
    // email: 'chris@yopmail.com',
    password: '12345678',
  });

  const [createVisible, setCreateVisible] = useState(false);

  const onCvHandler = () => {
    setCreateVisible(!createVisible);
  };
  const handleFormData = (field, value) => {
    if (field === 'email') {
      setEmailError('');
    } else if (field === 'password') {
      setPasswordError('');
    }
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const resetForm = () => {
    setFormData({email: '', password: ''});
  };

  const onLoginHandler = () => {
    if (formData.email.trim() === '') {
      setEmailError('Please fill in this field');
    } else {
      setEmailError('');
    }

    if (formData.password.trim() === '') {
      setPasswordError('Please fill in this field');
    } else {
      setPasswordError('');
    }

    if (formData.email.trim() !== '' && formData.password.trim() !== '') {
      const modifiedEmail = formData.email?.toLowerCase();
      const data = {
        email: modifiedEmail,
        password: formData.password,
      };
      dispatch(loginAction(data))
        .then(res => {
          if (res?.data?.status === true) {
            if (res?.data?.data?.two_factor_auth === true) {
              navigation.navigate('OTPScreen', {
                type: 'login',
                email: formData.email,
                title: AppLocalizedStrings.otpScreen.verifyAccount,
                subTitle: AppLocalizedStrings.otpScreen.pleaseConfirm,
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'ToDoBottomNavigation'}],
              });
              resetForm();
              // navigation.navigate('AddAdditionalDetailsScreen');
            }
          }
          // } else {
          // setEmailError(errorMessage || 'Login failed');
          // setPasswordError(errorMessage || 'Login failed');
          // }
        })
        .catch(err => {
          setEmailError(errorMessage || 'Login failed');
          setPasswordError(errorMessage || 'Login failed');
        });
    }
  };

  const onForgotHandler = () => {
    navigation.navigate('ForgotCredentialsScreen');
  };

  const onGoBackHandler = () => {
    navigation.replace('WelcomeScreen');
    dispatch(clearLoginError());
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <BackArrow goBack={onGoBackHandler} />
          <Header headerTitle={AppLocalizedStrings.loginScreen.login} />
          <DetailsTextInput
            title={AppLocalizedStrings.loginScreen.userName}
            placeholder=""
            editable={true}
            onChangeText={e => {
              handleFormData('email', e);
            }}
            value={formData.email}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : ''}

          <View style={styles.inputMainView}>
            <Text style={styles.textInputTitle}>
              {AppLocalizedStrings.loginScreen.password}
            </Text>
            <View style={styles.textInputView2}>
              <TextInput
                placeholder=" "
                secureTextEntry={!createVisible}
                style={styles.textInput2}
                onChangeText={e => {
                  handleFormData('password', e);
                }}
                value={formData.password}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={onCvHandler}>
                <Text style={styles.showTitle}>
                  {createVisible
                    ? AppLocalizedStrings.CredentialsScreen.hide
                    : AppLocalizedStrings.CredentialsScreen.show}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.errorText}>{passwordError}</Text>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <Text style={styles.mtText}> </Text>
          )}

          <TouchableOpacity
            onPress={onForgotHandler}
            style={styles.forgotButton}>
            <Text style={styles.forgotTitle}>
              {AppLocalizedStrings.loginScreen.forgot}
            </Text>
          </TouchableOpacity>
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
              <Text>{AppLocalizedStrings.loginScreen.login}</Text>
            )
          }
          onPress={onLoginHandler}
        />

        <TouchableOpacity
          onPress={onGoBackHandler}
          style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.loginScreen.anyAccount}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
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
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: hp(1),
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
  errorText: {
    color: 'red',
  },
  mtText: {
    marginTop: hp(-6),
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '43@s',
  },
  textInput2: {
    color: Colors.Neutral900,
    width: wp(80),
    height: '43@s',
  },
  showTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
  },
});
