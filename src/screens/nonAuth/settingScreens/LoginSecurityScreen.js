import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useSelector} from 'react-redux';

const LoginSecurityScreen = ({navigation}) => {
  const user_role =
    useSelector(state => state.loginReducer.user?.data?.data?.user_role) || {};

  const data = useSelector(state => state.loginReducer.user?.data?.data) || {};

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onChangeEmailAddresHandler = () => {
    navigation.navigate('ChangeEmailAddressScreen');
  };
  const onChangePasswordHandler = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const onChangePhoneHandler = () => {
    navigation.navigate('PhoneNumberScreen', {
      check: 'edit',
    });
  };
  const onTwoFAHandler = () => {
    navigation.navigate('TwoFactorAuthenticationScreen');
  };
  const onChangeDOBHandler = () => {
    navigation.navigate('ChangeDOBScreen');
  };
  const onRequestYourDataHandler = () => {
    navigation.navigate('RequestYourDataScreen');
  };
  const onDeleteMyAccountHandler = () => {
    navigation.navigate('DeleteMyAccountScreen');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={AppLocalizedStrings.loginSecurityScreen.loginSecurity}
      />
      <View style={styles.cradMainView}>
        {/* <TouchableOpacity
          style={styles.cradView}
          // onPress={onChangeEmailAddresHandler}
        >
          <Text style={styles.cradTitle}>Account verification</Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.cradView}
          onPress={onChangeEmailAddresHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.change}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cradView}
          onPress={onChangePasswordHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.changePassword}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cradView}
          onPress={onChangePhoneHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.changePhoneNumber}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cradView} onPress={onTwoFAHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.authentication}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
        {user_role == 'business' || user_role == 'government' ? (
          ''
        ) : user_role == 'customer' || user_role == 'influencer' ? (
          <TouchableOpacity
            style={styles.cradView}
            onPress={onChangeDOBHandler}>
            <Text style={styles.cradTitle}>
              {AppLocalizedStrings.loginSecurityScreen.yourDOB}
            </Text>
            <SVG.LeftArrow width={20} height={20} />
          </TouchableOpacity>
        ) : user_role == 'kid_influencer' ? (
          <TouchableOpacity
            style={styles.cradView}
            onPress={onChangeDOBHandler}>
            <Text style={styles.cradTitle}>
              {AppLocalizedStrings.loginSecurityScreen.timmy}
            </Text>
            <SVG.LeftArrow width={20} height={20} />
          </TouchableOpacity>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={styles.cradView}
          onPress={onRequestYourDataHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.requestData}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cradView}
          onPress={onDeleteMyAccountHandler}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.loginSecurityScreen.deleteAccount}
          </Text>
          <SVG.LeftArrow width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginSecurityScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  cradMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginTop: hp(-4),
  },
  cradView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
  },
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
  },
});
