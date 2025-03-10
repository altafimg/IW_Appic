import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import userImage from '../../../assets/images/userImage.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';
const LoggedInUserProfileCard = props => {
  const dispatch = useDispatch();
  const loggedInUserData =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  //   const handleMessage = () => {
  //     const status = 'quick';

  //     if (status === 'job') {
  //       navigation.navigate('JobChatScreen', {
  //         jobData: jobData,
  //       });
  //     } else if (status === 'quick') {
  //       navigation.navigate('QuickChatScreen');
  //     }
  //   };

  const languagesOnly = loggedInUserData?.language?.map(item => item.language);

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.profileLeftContainer}>
          <View style={styles.profilePickView}>
            <View style={styles.profilePickView}>
              {loggedInUserData?.profile_picture == null ||
              loggedInUserData?.profile_picture == null ? (
                <Image source={userImage} style={styles.profileImage} />
              ) : (
                <Image
                  source={{uri: loggedInUserData?.profile_picture}}
                  style={styles.profileImage}
                />
              )}
            </View>
            <SVG.OnlinGreenDot style={styles.OnlinGreenDot} />
          </View>
          <Text style={styles.onlineTitle}>
            {AppLocalizedStrings.aboutProfileCard.online}
          </Text>

          <TouchableOpacity style={styles.messageButton} disabled>
            <Text style={styles.messageTitle}>
              {AppLocalizedStrings.viewProfileScreen.message}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileRightContainer}>
          <View style={styles.userNameView}>
            <Text style={styles.userNameTitle}>
              {loggedInUserData?.profile_name
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
            {/* <SVG.BlueTick /> */}
            {loggedInUserData?.user_verify_status === 'verified' && (
              <SVG.BlueTick />
            )}
          </View>
          <Text style={styles.baseTitle}>
            {'@' + loggedInUserData?.user_name}
          </Text>
          {/* customer   business   government    influencer   kid_influencer */}
          <Text style={styles.baseTitle}>
            {loggedInUserData?.user_role === 'customer'
              ? 'Customer'
              : loggedInUserData?.user_role === 'business'
              ? 'Business'
              : loggedInUserData?.user_role === 'government'
              ? 'Government Account'
              : loggedInUserData?.user_role === 'influencer'
              ? 'Influencer'
              : loggedInUserData?.user_role === 'kid_influencer'
              ? 'Kid Influencer'
              : ''}
          </Text>
          <Text style={styles.baseTitle}>{'Speaks ' + languagesOnly}</Text>
          {loggedInUserData?.country ? (
            <Text style={styles.baseTitle}>
              Based in {loggedInUserData?.country}
            </Text>
          ) : (
            ''
          )}
          <View style={styles.ratingView}>
            <SVG.Star />
            <Text style={styles.ratingNumber}>4.6</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoggedInUserProfileCard;

const styles = ScaledSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLeftContainer: {
    width: '30%',
    alignItems: 'center',
  },
  profilePickView: {
    // backgroundColor: Colors.Success500,
    width: '80@s',
    height: '80@s',
    borderRadius: '100@s',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.Success500,
    borderWidth: 2,
  },
  profileImage: {
    width: '75@s',
    height: '75@s',
    borderRadius: '100@s',
    alignSelf: 'center',
    marginLeft: wp(-0.7),
  },
  OnlinGreenDot: {
    marginBottom: hp(-6),
    alignSelf: 'center',
    marginLeft: wp(-3),
  },
  onlineTitle: {
    color: Colors.Success500,
    fontSize: '11@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingTop: hp(0.5),
    paddingBottom: hp(1),
  },
  messageButton: {
    backgroundColor: Colors.Neutral200,
    borderRadius: 5,
    width: 80,
    height: '24@s',
    justifyContent: 'center',
  },
  messageTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
    // lineHeight: '23@s',
    textAlign: 'center',
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '22@s',
    paddingRight: wp(3),
  },
  baseTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingVertical: hp(0.3),
  },
  profileRightContainer: {
    width: '55%',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    color: Colors.Warning500,
    fontSize: '12@s',
    fontWeight: '600',
    lineHeight: '19@s',
  },
});
