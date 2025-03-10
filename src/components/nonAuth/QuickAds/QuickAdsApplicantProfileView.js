import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useNavigation} from '@react-navigation/native';
import userImage from '../../../assets/images/userImage.png';
import {Skeleton} from '@rneui/themed';
import ToDoJobDetailsSkeleton from '../../skeleton/ToDoJobDetailsSkeleton';

const QuickAdsApplicantProfileView = ({data, loading}) => {
  const navigation = useNavigation();

  const jobData = {
    _id: data?.applicants_id?._id,
    profile_name: data?.applicants_id?.profile_name,
    profile_picture: data?.applicants_id?.profile_picture,
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ToDoJobDetailsSkeleton />
      ) : (
        <View style={styles.profileContainer}>
          <View style={styles.profileLeftContainer}>
            <View style={styles.profilePickView}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ApplicantViewProfileScreen', {
                    userData: data,
                  })
                }>
                <View style={styles.profilePickView}>
                  {data?.applicants_id?.profile_picture == null ||
                  data?.applicants_id?.profile_picture == undefined ? (
                    <Image source={userImage} style={styles.profileImage} />
                  ) : (
                    <Image
                      source={{uri: data?.applicants_id?.profile_picture}}
                      style={styles.profileImage}
                    />
                  )}
                  <SVG.OnlinGreenDot style={styles.OnlinGreenDot} />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.onlineTitle}>Online Now</Text>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => {
                navigation.navigate('JobChatScreen', {
                  jobData: jobData,
                });
              }}>
              <Text style={styles.messageTitle}>
                {AppLocalizedStrings.viewProfileScreen.message}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileRightContainer}>
            <View style={styles.userNameView}>
              <Text style={styles.userNameTitle}>
                {data?.applicants_id?.profile_name
                  ?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
              {data?.applicants_id?.user_verify_status === 'verified' ? (
                <SVG.BlueTick />
              ) : (
                ''
              )}
            </View>
            <Text style={styles.baseTitle}>
              {'@' + data?.applicants_id?.user_name}
            </Text>
            <Text style={styles.baseTitle}>
              {data?.applicants_id?.user_role?.charAt(0).toUpperCase() +
                data?.applicants_id?.user_role?.slice(1)}
            </Text>

            {data?.applicants_id?.language?.map((item, index) => {
              return (
                <Text key={index} style={styles.baseTitle}>
                  {'Speaks ' + item?.language}
                </Text>
              );
            })}
            <Text style={styles.baseTitle}>
              {'Based in ' + data?.applicants_id?.country}
            </Text>
            <View style={styles.ratingView}>
              <SVG.Star />
              <Text style={styles.ratingNumber}>4.6</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default QuickAdsApplicantProfileView;

const styles = ScaledSheet.create({
  container: {},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLeftContainer: {
    width: '30%',
    alignItems: 'center',
  },
  profilePickView: {
    width: '83@s',
    height: '83@s',
    borderRadius: '100@s',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.Success500,
  },
  profileImage: {
    width: '78@s',
    height: '78@s',
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
    fontSize: '10@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingTop: hp(0.5),
    paddingBottom: hp(1),
  },
  messageButton: {
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    width: 80,
    height: 26,
  },
  messageTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '23@s',
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
    marginLeft: wp(3),
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
