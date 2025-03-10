import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SettingTopProfileCard from '../../../components/nonAuth/setting/SettingTopProfileCard';
import SettingBottomCards from '../../../components/nonAuth/setting/SettingBottomCards';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import LogoutPopup from '../../../components/popups/LogoutPopup';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import SettingScreenInforPopup from '../../../components/popups/SettingScreenInforPopup';
import {getAccountManagerAction} from '../../../redux/actions/getAccountManagerAction';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SettingScreen = ({navigation}) => {
  const check = 'loggedInUserEditProfile';
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const token = useSelector(state => state.loginReducer?.token) || {};
  const {profile_name, profile_picture, user_verify_status, user_role, _id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const accountManagerData =
    useSelector(state => state.getAccountManagerReducer.data?.data) || [];

  const Manager_verify_request_Status =
    accountManagerData.length > 0
      ? accountManagerData[0]?.Manager_verify_request_Status
      : null;

  const [settingInfoVisible, setSettingInfoVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  useEffect(() => {
    if (
      user_role === 'government' ||
      user_role === 'business' ||
      user_role === 'kid_influencer'
    ) {
      getAccountManagerDataHandler();
    }
  }, []);

  const getAccountManagerDataHandler = () => {
    dispatch(getAccountManagerAction(_id));
  };

  useEffect(() => {
    if (isFocused) {
      const data = {
        _id: _id,
        token: token,
      };
      dispatch(getLoggedInUserProfileAction(data));
    }
  }, [isFocused, dispatch]);

  const onProfilePictureHandler = () => {
    navigation.navigate('AccountManagerProfilePictureScreen', {
      check: check,
    });
  };
  const onClickHandler = () => {
    navigation.navigate('LoggedInUserProfileScreen');
  };
  const onAccManageHandler = () => {
    navigation.navigate('AccountManagerScreen');
  };

  const onToStepHandler = () => {
    if (user_verify_status === 'pending' || user_verify_status === 'rejected') {
      if (user_role === 'kid_influencer') {
        const check = 'user_verify';
        navigation.navigate('TwoStepVerificationScreen', {
          check: check,
        });
      } else {
        const check = 'user_verify';
        navigation.navigate('UploadGovIDScreen', {check: check});
      }
    }
  };

  const onEditProfileHandler = () => {
    navigation.navigate('EditProfileScreen');
  };

  const onReferralsHandler = () => {
    navigation.navigate('ReferralsScreen');
  };
  const onPaymentHandler = () => {
    navigation.navigate('PaymentsScreen');
  };
  const onAnalyticsHandler = () => {
    navigation.navigate('AnalyticsScreen');
  };
  const onManageServicesHandler = () => {
    navigation.navigate('ManageYourServicesScreen');
  };
  const onLoginSecurityHandler = () => {
    navigation.navigate('LoginSecurityScreen');
  };
  const onAccountHandler = () => {
    navigation.navigate('ConnectSocialAccountsScreen');
  };
  const onLanguageHandler = () => {
    navigation.navigate('SelectLanguageScreen');
  };
  const onHelpAndFaqHandler = () => {
    navigation.navigate('HelpCenterScreen');
  };

  const handleHelp = () => {
    // setSettingInfoVisible(!settingInfoVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          // start={{x: 0, y: 0}}
          // end={{x: 1, y: 0}}
          colors={['#B3E5FC', '#D5F8CC']}
          style={styles.containerSec}>
          <View style={styles.headerView}>
            <BackArrow goBack={onGoBackHandler} />
            <View style={styles.headerNotificationMain}>
              <TouchableOpacity
                style={[
                  styles.headerNotificationView,
                  {
                    backgroundColor:
                      user_verify_status === 'rejected' ||
                      Manager_verify_request_Status === 'rejected'
                        ? Colors.Destructive700
                        : Colors.Primary500,
                  },
                ]}
                onPress={onToStepHandler}>
                <Text style={styles.headerNotificationTitle}>
                  {user_role === 'kid_influencer'
                    ? user_verify_status === 'pending'
                      ? '2 verifications needed'
                      : user_verify_status === 'underreview'
                      ? 'Under review'
                      : user_verify_status === 'rejected'
                      ? 'Rejected'
                      : user_verify_status === 'verified'
                      ? 'Verification'
                      : ''
                    : user_verify_status === 'pending'
                    ? 'Verify now'
                    : user_verify_status === 'underreview'
                    ? 'Under review'
                    : user_verify_status === 'rejected'
                    ? 'Rejected'
                    : user_verify_status === 'verified'
                    ? 'Verification'
                    : ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleHelp}>
                <SVG.IButton />
              </TouchableOpacity>
            </View>
          </View>
          <SettingTopProfileCard
            onClickHandler={onClickHandler}
            onProfilePictureHandler={onProfilePictureHandler}
            profile_name={profile_name}
            profile_picture={profile_picture}
          />
        </LinearGradient>
        <View style={styles.bottomMain}>
          <SettingBottomCards
            onAccManageHandler={onAccManageHandler}
            onToStepHandler={onToStepHandler}
            onEditProfileHandler={onEditProfileHandler}
            onReferralsHandler={onReferralsHandler}
            onPaymentHandler={onPaymentHandler}
            onAnalyticsHandler={onAnalyticsHandler}
            onManageServicesHandler={onManageServicesHandler}
            onLoginSecurityHandler={onLoginSecurityHandler}
            onAccountHandler={onAccountHandler}
            onLanguageHandler={onLanguageHandler}
            onHelpAndFaqHandler={onHelpAndFaqHandler}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
            <Text style={styles.logTitle}>
              {AppLocalizedStrings.settingScreen.logout}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LogoutPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />

      {settingInfoVisible ? (
        <SettingScreenInforPopup
          settingInfoVisible={settingInfoVisible}
          setSettingInfoVisible={setSettingInfoVisible}
          handleHelp={handleHelp}
        />
      ) : null}
    </View>
  );
};

export default SettingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(29, 161, 242, 0.1)',
  },
  containerSec: {
    paddingBottom: '30@s',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  headerNotificationMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerNotificationView: {
    // backgroundColor: Colors.Primary500,
    borderRadius: 50,
    marginHorizontal: wp(2),
  },
  headerNotificationTitle: {
    color: Colors.Neutral50,
    fontSize: '10@s',
    fontWeight: '500',
    lineHeight: '20@s',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
  bottomMain: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: hp(3),
  },
  logoutButton: {
    marginTop: hp(2.5),
    marginBottom: hp(3),
  },
  logTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
  },
});
