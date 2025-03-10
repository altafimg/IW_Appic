import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useSelector} from 'react-redux';

const AccountManagerScreen = ({navigation, route}) => {
  const accountManagerData =
    useSelector(state => state.getAccountManagerReducer.data?.data) || {};

  const user_role =
    useSelector(state => state.loginReducer.user?.data?.data?.user_role) || {};

  const accountManagerProfilePicture = accountManagerData[0]?.profile_photo;

  const verifiedCheck = accountManagerData[0]?.Manager_verify_request_Status;

  const check = 'accountManager';

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const replaceManagerHandler = () => {
    const diffCheck = 'replace';
    if (user_role === 'kid_influencer') {
      navigation.navigate('KidAccountManagerScreen', {
        diffCheck: diffCheck,
      });
    } else {
      navigation.navigate('BuisGovAccountManagerScreen', {
        diffCheck: diffCheck,
      });
    }
  };

  console.log(check);

  const verifyAccountManager = () => {
    const check = 'user_verify';
    navigation.navigate('UploadGovIDScreen', {check: check});
  };

  const onProfilePictureHandler = () => {
    navigation.navigate('AccountManagerProfilePictureScreen', {
      check: check,
    });
  };

  // const arrayCheck = ['pending', 'review', 'verified'];

  // const arrayCheck = ['verified', 'rejected', 'pending', 'underreview'];

  // const verifiedCheck = arrayCheck[2];

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={
            accountManagerData[0]?.first_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ') +
            ' ' +
            accountManagerData[0]?.last_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          }
          subTitle="Settings and information"
        />
        <View style={styles.cradView}>
          {accountManagerProfilePicture === null ||
          accountManagerProfilePicture === undefined ? (
            <SVG.ProfilePhoto />
          ) : (
            <Image
              source={{uri: accountManagerProfilePicture}}
              style={styles.profileImage}
            />
          )}
          <View style={styles.textView}>
            <Text style={styles.useNameTitle}>
              {accountManagerData[0]?.first_name
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ') +
                ' ' +
                accountManagerData[0]?.last_name
                  ?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
            </Text>
            <Text style={styles.usePostTitle}>
              {accountManagerData[0]?.relationship
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.cradViewSec}
          onPress={onProfilePictureHandler}>
          <Text style={styles.editTitle}>
            {AppLocalizedStrings.accountManagerScreen.edit}
          </Text>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
        <Text style={styles.usePostTitle}>
          {AppLocalizedStrings.accountManagerScreen.profile}
        </Text>
      </View>

      {verifiedCheck === 'pending' ? (
        <PrimaryButton
          title={AppLocalizedStrings.accountManagerScreen.please}
          onPress={verifyAccountManager}
        />
      ) : verifiedCheck === 'underreview' ? (
        <PrimaryButton
          title={AppLocalizedStrings.accountManagerScreen.review}
          disabled={true}
        />
      ) : verifiedCheck === 'verified' ? (
        user_role === 'kid_influencer' ? (
          <PrimaryButton
            title={AppLocalizedStrings.accountManagerScreen.replaceParent}
            onPress={replaceManagerHandler}
          />
        ) : (
          <PrimaryButton
            title={AppLocalizedStrings.accountManagerScreen.replaceManager}
            onPress={replaceManagerHandler}
          />
        )
      ) : (
        ''
      )}
    </View>
  );
};

export default AccountManagerScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    padding: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  useNameTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    paddingBottom: hp(0.3),
  },
  usePostTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  textView: {
    marginHorizontal: wp(3),
  },
  cradViewSec: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    padding: hp(1.5),
    marginVertical: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    lineHeight: '19@s',
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 25,
  },
});
