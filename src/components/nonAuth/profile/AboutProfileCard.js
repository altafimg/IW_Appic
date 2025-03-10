import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import userImage from '../../../assets/images/userImage.png';
import {useNavigation} from '@react-navigation/native';

const AboutProfileCard = props => {
  const {
    profile_name,
    profile_picture,
    user_name,
    language,
    _id,
    country,
    user_role,
  } = props?.jobCreatorUserData || {};

  const jobData = {
    _id: _id,
    profile_name: profile_name,
    profile_picture: profile_picture,
  };

  const navigation = useNavigation();

  const handleMessage = () => {
    // const status = 'quick';

    // if (status === 'job') {
    navigation.navigate('JobChatScreen', {
      jobData: jobData,
    });
    // } else if (status === 'quick') {
    //   navigation.navigate('QuickChatScreen');
    // }
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.profileLeftContainer}>
          <View style={styles.profilePickView}>
            {profile_picture == null || profile_picture == undefined ? (
              <Image source={userImage} style={styles.profileImage} />
            ) : (
              <Image
                source={{uri: profile_picture}}
                style={styles.profileImage}
              />
            )}

            <SVG.OnlinGreenDot style={styles.OnlinGreenDot} />
          </View>
          <Text style={styles.onlineTitle}>
            {AppLocalizedStrings.aboutProfileCard.online}
          </Text>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={handleMessage}>
            <Text style={styles.messageTitle}>
              {AppLocalizedStrings.viewProfileScreen.message}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileRightContainer}>
          <View style={styles.userNameView}>
            <Text style={styles.userNameTitle}>
              {profile_name
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
            <SVG.BlueTick />
          </View>
          <Text style={styles.baseTitle}>{'@' + user_name}</Text>
          <Text style={styles.baseTitle}>
            {user_role
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Text>
          <Text style={styles.baseTitle}>
            {'Speaks ' + language?.map(i => i?.language)}
          </Text>
          <Text style={styles.baseTitle}> {'Based in ' + country}</Text>
          <View style={styles.ratingView}>
            <SVG.Star />
            <Text style={styles.ratingNumber}>4.6</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutProfileCard;

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
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    width: 80,
    height: '24@s',
    justifyContent: 'center',
  },
  messageTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
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
