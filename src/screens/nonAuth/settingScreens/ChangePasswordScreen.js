import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordUserAction} from '../../../redux/actions/changePasswordUserAction';
import {ActivityIndicator} from 'react-native-paper';

const ChangePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.changePasswordUserReducer.loading);
  const [errorMessage, setErrorMessage] = useState('');

  const {token, userId} = useSelector(state => ({
    token: state.loginReducer.token,
    userId: state.loginReducer.user.data?.data?._id,
  }));

  const [creaetVisible, setCreaetVisible] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [reEnterPass, setReEnterPass] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
  });

  const handleFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
    setErrorMessage('');
  };
  const onCvHandler = () => {
    setCreaetVisible(!creaetVisible);
  };
  const onRtvHandler = () => {
    setNewPass(!newPass);
  };
  const onRtPHandler = () => {
    setReEnterPass(!reEnterPass);
  };

  const onSubmitHandler = () => {
    if (
      formData.currentPassword === '' ||
      formData.newPassword === '' ||
      formData.reEnterNewPassword === ''
    ) {
      setErrorMessage('Please enter all fields');
    } else if (formData.newPassword !== formData.reEnterNewPassword) {
      setErrorMessage('New password and confirm new password do not match');
    } else if (
      formData.newPassword.length < 8 ||
      formData.newPassword.length > 16
    ) {
      setErrorMessage('Password must be between 8 and 16 characters long');
    } else {
      const data = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        _id: userId,
        token: token,
      };

      dispatch(changePasswordUserAction(data)).then(res => {
        if (res) {
          if (res?.data?.status === true) {
            navigation.navigate('PasswordChangedThanksScreen');
          } else {
            setErrorMessage(res?.data?.message);
          }
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.changePasswordScreen.changePassword}
        />
        <View style={styles.main}>
          <View style={styles.inputMainView}>
            <Text style={styles.textInputTitle}>
              {AppLocalizedStrings.changePasswordScreen.currentPassword}
            </Text>
            <View style={styles.textInputView2}>
              <TextInput
                placeholder=" "
                secureTextEntry={!creaetVisible}
                style={styles.textInput2}
                onChangeText={e => {
                  handleFormData('currentPassword', e);
                }}
                value={formData.currentPassword}
              />
              <TouchableOpacity onPress={onCvHandler}>
                <Text style={styles.showTitle}>
                  {creaetVisible
                    ? AppLocalizedStrings.changePasswordScreen.hide
                    : AppLocalizedStrings.changePasswordScreen.show}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputMainView}>
            <Text style={styles.textInputTitle}>
              {AppLocalizedStrings.changePasswordScreen.newPassword}
            </Text>
            <View style={styles.textInputView2}>
              <TextInput
                placeholder=" "
                secureTextEntry={!newPass}
                style={styles.textInput2}
                onChangeText={e => {
                  handleFormData('newPassword', e);
                }}
                value={formData.newPassword}
              />
              <TouchableOpacity onPress={onRtvHandler}>
                <Text style={styles.showTitle}>
                  {newPass
                    ? AppLocalizedStrings.changePasswordScreen.hide
                    : AppLocalizedStrings.changePasswordScreen.show}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputMainView}>
            <Text style={styles.textInputTitle}>
              {AppLocalizedStrings.changePasswordScreen.reEnter}
            </Text>
            <View style={styles.textInputView2}>
              <TextInput
                placeholder=" "
                secureTextEntry={!reEnterPass}
                style={styles.textInput2}
                onChangeText={e => {
                  handleFormData('reEnterNewPassword', e);
                }}
                value={formData.reEnterNewPassword}
              />
              <TouchableOpacity onPress={onRtPHandler}>
                <Text style={styles.showTitle}>
                  {reEnterPass
                    ? AppLocalizedStrings.changePasswordScreen.hide
                    : AppLocalizedStrings.changePasswordScreen.show}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {errorMessage !== '' && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
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
    </View>
  );
};

export default ChangePasswordScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  main: {
    marginTop: hp(-4),
  },
  inputMainView: {
    marginVertical: hp(1.5),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '36@s',
  },
  textInput2: {
    color: Colors.Neutral900,
    width: wp(80),
  },
  showTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'left',
    marginVertical: hp(2),
  },
});
