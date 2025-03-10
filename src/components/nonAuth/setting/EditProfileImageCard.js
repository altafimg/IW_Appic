import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../buttons/BackArrow';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {useSelector} from 'react-redux';
import userImage from '../../../assets/images/userImage.png';
import {useNavigation} from '@react-navigation/native';
import {AppLocalizedStrings} from '../../../localization/Localization';
const EditProfileImageCard = props => {
  const check = 'loggedInUserEditProfile';
  const navigation = useNavigation();

  const {profile_name, profile_picture, user_verify_status, user_role} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const accountManagerData =
    useSelector(state => state.getAccountManagerReducer.data?.data) || [];

  // console.log(accountManagerData);

  const onProfilePictureHandler = () => {
    navigation.navigate('AccountManagerProfilePictureScreen', {
      check: check,
    });
  };

  return (
    <View style={styles.cardMain}>
      <BackArrow goBack={props.onGoBackHandler} />
      <View style={styles.editButtonView}>
        {profile_picture == null || profile_picture == undefined ? (
          <Image source={userImage} style={styles.image} />
        ) : (
          <Image source={{uri: profile_picture}} style={styles.image} />
        )}
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
        {user_verify_status === 'verified' ? <SVG.BlueTick /> : ''}
      </View>
      {user_role === 'kid_influencer' ? (
        <Text style={styles.manageTitle}>
          {AppLocalizedStrings.editProfileImageCard.managed}
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
    </View>
  );
};

export default EditProfileImageCard;

const styles = ScaledSheet.create({
  cardMain: {
    paddingHorizontal: wp(3),
    backgroundColor: ' rgba(29, 161, 242, 0.1)',
    paddingBottom: hp(3),
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
    alignSelf: 'center',
    marginTop: hp(1.5),
  },
  userName: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '23@s',
    paddingRight: wp(2),
  },
  manageTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '19@s',
  },
});
