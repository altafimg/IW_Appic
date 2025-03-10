import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import userImage from '../../../assets/images/userImage.png';
import {getAccountManagerAction} from '../../../redux/actions/getAccountManagerAction';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';
const SettingTopProfileCard = route => {
  const dispatch = useDispatch();

  const {
    onClickHandler,
    onProfilePictureHandler,
    profile_name,
    profile_picture,
  } = route;

  const {user_verify_status, user_role} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const accountManagerData =
    useSelector(state => state.getAccountManagerReducer.data?.data) || [];

  return (
    <View style={styles.cardMain}>
      <View style={styles.editButtonView}>
        <View>
          {profile_picture == null || profile_picture == undefined ? (
            <Image source={userImage} style={styles.image} />
          ) : (
            <Image source={{uri: profile_picture}} style={styles.image} />
          )}
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={onProfilePictureHandler}>
          <SVG.EditPhoto style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.userNameView}>
        <Text style={styles.userName}>
          {profile_name
            ?.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Text>

        {user_verify_status === 'verified' && <SVG.BlueTick />}
      </View>

      {user_role === 'kid_influencer' ? (
        <Text style={styles.manageTitle}>
          {AppLocalizedStrings.settingTopProfileCard.managed}
        </Text>
      ) : user_role === 'business' || user_role === 'government' ? (
        <Text style={styles.manageTitle}>
          {'Managed by ' +
            accountManagerData[0]?.first_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ') +
            ' ' +
            accountManagerData[0]?.last_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
        </Text>
      ) : (
        ''
      )}
      <TouchableOpacity
        style={styles.viewProfileButton}
        onPress={onClickHandler}>
        <Text style={styles.manageTitle}>
          {AppLocalizedStrings.settingTopProfileCard.view}
        </Text>
        <SVG.LeftArrow />
      </TouchableOpacity>
    </View>
  );
};

export default SettingTopProfileCard;

const styles = ScaledSheet.create({
  cardMain: {
    paddingHorizontal: wp(3),
  },
  cameraButton: {
    backgroundColor: Colors.Neutral100,
    alignSelf: 'center',
    borderRadius: '100@s',
    height: '165@s',
    width: '165@s',
    justifyContent: 'center',
  },
  editButtonView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
    height: '98@s',
    width: '98@s',
    borderRadius: '100@s',
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  editButton: {
    shadowColor: Colors.Neutral400,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    width: '30@s',
    height: '30@s',
    marginLeft: wp(-9),
    borderRadius: 100,
  },
  editIcon: {
    marginLeft: wp(-2.2),
    marginTop: hp(-1),
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(0.6),
  },
  userName: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '23@s',
    paddingRight: wp(2),
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  manageTitle: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
    // paddingTop: hp(1),
    lineHeight: '19@s',
  },
  profileImageStyle: {
    width: '34@s',
    height: '34@s',
    borderRadius: '60@s',
    alignSelf: 'center',
  },
});
