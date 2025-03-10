import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useHeaderHeight} from '@react-navigation/elements';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordAction} from '../../../redux/actions/resetPasswordAction';
import {useToast} from 'react-native-toast-notifications';

const ResetPasswordScreen = ({route, navigation}) => {
  const height = useHeaderHeight();
  const toast = useToast();
  const {email} = route.params;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.resetPasswordReducer.loading);
  const [creaetVisible, setCreaetVisible] = useState(false);
  const [retypeVisible, setRetypeVisible] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onThanksHandler = () => {
    if (!formData.password) {
      toast.show('Enter new password', {
        type: 'danger',
      });
    } else if (!formData.confirmPassword) {
      toast.show('Re-enter new password', {
        type: 'danger',
      });
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      toast.show('Password must be between 8 and 16 characters', {
        type: 'danger',
      });
    } else if (formData.password !== formData.confirmPassword) {
      toast.show('Passwords do not match', {
        type: 'danger',
      });
    } else {
      const updatedFormData = {
        ...formData,
        email: email,
      };

      dispatch(resetPasswordAction(updatedFormData))
        .then(res => {
          if (res?.data?.status === true) {
            toast.show(res?.data?.message, {
              type: 'success',
            });
            navigation.navigate('ThanksScreen');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onCvHandler = () => {
    setCreaetVisible(!creaetVisible);
  };

  const onRtvHandler = () => {
    setRetypeVisible(!retypeVisible);
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
            headerTitle={AppLocalizedStrings.resetPasswordScreen.resetPassword}
          />
          <View>
            <View style={styles.inputMainView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.resetPasswordScreen.newPassword}
              </Text>
              <View style={styles.textInputView2}>
                <TextInput
                  placeholder=" "
                  secureTextEntry={!creaetVisible}
                  style={styles.textInput2}
                  onChangeText={e => handleChange('password', e)}
                />
                <TouchableOpacity onPress={onCvHandler}>
                  <Text style={styles.showTitle}>
                    {AppLocalizedStrings.resetPasswordScreen.show}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputMainView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.resetPasswordScreen.renterPassword}
              </Text>
              <View style={styles.textInputView2}>
                <TextInput
                  placeholder=" "
                  secureTextEntry={!retypeVisible}
                  style={styles.textInput2}
                  onChangeText={e => handleChange('confirmPassword', e)}
                />
                <TouchableOpacity onPress={onRtvHandler}>
                  <Text style={styles.showTitle}>
                    {AppLocalizedStrings.resetPasswordScreen.show}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
              <Text>{AppLocalizedStrings.button.continue}</Text>
            )
          }
          onPress={onThanksHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    paddingBottom: hp(3),
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
    fontSize: '11@s',
    fontWeight: '400',
  },
});
