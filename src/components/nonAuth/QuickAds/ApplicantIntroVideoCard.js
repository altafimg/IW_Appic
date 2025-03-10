import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Video from 'react-native-video';
import {TouchableOpacity} from 'react-native';
import SVG from '../../../assets/svg';
import moment from 'moment';

const ApplicantIntroVideoCard = props => {
  const {
    gender,
    _id,
    category,
    tag,
    bio,
    language,
    intro_video,
    country,
    dob,
    city,
    state,
  } = props?.introData;

  const [paused, setPaused] = useState(true);

  const handlePause = () => {
    setPaused(prevPaused => !prevPaused); // Functional update
  };

  const calculateAge = dob => {
    const birthDate = moment(dob); // No need to specify format, moment can parse ISO 8601 automatically
    const today = moment();

    let age = today.year() - birthDate.year();
    const monthDiff = today.month() - birthDate.month();

    if (monthDiff < 0 || (monthDiff === 0 && today.date() < birthDate.date())) {
      age--;
    }

    if (age < 10) return '0 - 10';
    if (age < 20) return '10 - 20';
    if (age < 30) return '20 - 30';
    if (age < 40) return '30 - 40';
    if (age < 50) return '40 - 50';
    if (age < 60) return '50 - 60';
    if (age < 70) return '60 - 70';
    if (age < 80) return '70 - 80';
    if (age < 90) return '80 - 90';
    if (age < 100) return '90 - 100';
    return '100+';
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.introTitle}>
          {AppLocalizedStrings.viewProfileScreen.introVideo}
        </Text>
        <View>
          <Video
            source={{uri: intro_video}}
            style={styles.backgroundVideo}
            paused={paused}
            resizeMode="cover"
            repeat={true}
          />
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            {paused ? (
              <SVG.PlayCircle />
            ) : (
              <View
                style={{
                  backgroundColor: 'transparent',
                  height: 30,
                  width: 30,
                  borderRadius: 25,
                }}></View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.ageBracket}
        </Text>
        <Text style={styles.ageNumber}>{calculateAge(dob) + ' years old'}</Text>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.bio}
        </Text>
        <Text style={styles.ageNumber}>{bio}</Text>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.gender}
        </Text>
        <Text style={styles.ageNumber}>{gender}</Text>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.basedIn}
        </Text>
        <Text style={styles.ageNumber}>{city}</Text>
        <Text style={styles.ageNumber}>{state}</Text>
        <Text style={styles.ageNumber}>{country}</Text>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.languages}
        </Text>

        {language?.map((item, index) => {
          return (
            <View style={styles.categoryMain} key={index}>
              <View
                style={[
                  styles.languageView,
                  {
                    flexDirection: 'row',
                  },
                ]}>
                <Text style={styles.languageTitle}>
                  {item?.language + ' -'}
                </Text>
                <Text style={styles.languageTitle}>
                  {' Dialect: ' + item?.dialect}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.category}
        </Text>
        <View>
          {category?.map((item, index) => {
            return (
              <View style={styles.categoryMain} key={index}>
                <View style={styles.categoryView}>
                  <Text style={styles.categoryCardTitle}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.ageView}>
        <Text style={styles.ageTitle}>
          {AppLocalizedStrings.viewProfileScreen.tags}
        </Text>
        <View>
          {tag?.map((item, index) => {
            return (
              <View style={styles.categoryMain} key={index}>
                <View style={styles.categoryView}>
                  <Text style={styles.categoryCardTitle}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ApplicantIntroVideoCard;

const styles = ScaledSheet.create({
  container: {},
  main: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingHorizontal: wp(3),
  },
  introTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '22@s',
    paddingVertical: hp(1),
  },
  image: {
    width: '100%',
    borderRadius: 10,
    marginBottom: hp(2),
  },
  ageView: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  ageTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '22@s',
    paddingBottom: hp(0.5),
  },
  ageNumber: {
    color: Colors.Neutral600,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  categoryMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  categoryView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  languageView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    // marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  languageTitle: {
    color: Colors.Neutral600,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(1),
  },
  categoryCardTitle: {
    color: Colors.Neutral600,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(2),
  },
  // backgroundVideo: {
  //   height: 200,
  //   width: '100%',
  //   marginBottom: 10,
  // },
  backgroundVideo: {
    width: '100%',
    height: 180,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  pauseButton: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    borderRadius: 25,
  },
});
