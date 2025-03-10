import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AboutProfileCard from '../../../components/nonAuth/profile/AboutProfileCard';
import ViewSponsorshipCards from '../../../components/nonAuth/profile/ViewSponsorshipCards';
import MyMusicCard from '../../../components/nonAuth/profile/MyMusicCard';
import ReviewsCard from '../../../components/nonAuth/profile/ReviewsCard';
import MyVideoCard from '../../../components/nonAuth/profile/MyVideoCard';
import {AppLocalizedStrings} from '../../../localization/Localization';
import ApplicantIntroVideoCard from '../../../components/nonAuth/QuickAds/ApplicantIntroVideoCard';
import ApplicantMyMusicCard from '../../../components/nonAuth/QuickAds/ApplicantMyMusicCard';

const ApplicantViewProfileScreen = ({route, navigation}) => {
  const jobCreatorUserData = route.params?.userData?.applicants_id;

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

    my_music,
    my_video,
  } = jobCreatorUserData || {};

  const introData = {
    gender,
    _id,
    category,
    tag,
    bio,
    language,
    intro_video,
    country,
    dob,
  };

  const onSeeAllMusicHandler = () => {
    navigation.navigate('ApplicantAllMusicScreen', {
      my_music: my_music,
    });
  };
  const onSeeAllVideoHandler = () => {
    navigation.navigate('ApplicantAllVideoScreen', {
      my_video: my_video,
    });
  };
  const onAllReviewsHandler = () => {
    navigation.navigate('ApplicantAllReviewsScreen');
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <SVG.Share />
        </View>
        <View>
          <AboutProfileCard jobCreatorUserData={jobCreatorUserData} />

          <View style={styles.bottomCradView}>
            <View style={styles.bottomPerCradView}>
              <View style={styles.cradprosesView}>
                <Text style={styles.millionsTitle}>19.3M</Text>
                <SVG.Increase />
                <Text style={styles.pershantTitle}>3%</Text>
              </View>
              <Text style={styles.midiaTitle}>Youtube</Text>
            </View>
            <View style={styles.bottomPerCradView}>
              <View style={styles.cradprosesView}>
                <Text style={styles.millionsTitle}>6.2M</Text>
                <SVG.Decrease />
                <Text style={styles.pershantTitle}>1%</Text>
              </View>
              <Text style={styles.midiaTitle}>Instagram</Text>
            </View>
            <View style={styles.bottomPerCradView}>
              <View style={styles.cradprosesView}>
                <Text style={styles.millionsTitle}>12.2M</Text>
                <SVG.Decrease />
                <Text style={styles.pershantTitle}>4%</Text>
              </View>
              <Text style={styles.midiaTitle}>TikTok</Text>
            </View>
          </View>
        </View>
        <View style={styles.sponsorshipCardView}>
          <ViewSponsorshipCards
            title="View sponsorship packages"
            price="1000"
          />
          <ViewSponsorshipCards title="Advertise with username" price="1500" />
          <ViewSponsorshipCards title="Acting services" price="100" />
          <ViewSponsorshipCards title="Book Username" price="300" />
          <ViewSponsorshipCards title="Music rights and features" price="500" />
          <ViewSponsorshipCards title="Licensing deals" price="500" />
        </View>

        <ApplicantIntroVideoCard introData={introData} />
        <ApplicantMyMusicCard
          onSeeAllMusicHandler={onSeeAllMusicHandler}
          seeAll={AppLocalizedStrings.viewProfileScreen.seeAll}
          my_music={my_music}
        />
        <MyVideoCard
          onSeeAllVideoHandler={onSeeAllVideoHandler}
          seeAll={AppLocalizedStrings.viewProfileScreen.seeAll}
          my_video={my_video}
        />
        <ReviewsCard onAllReviewsHandler={onAllReviewsHandler} />
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportTitle}>
            {AppLocalizedStrings.viewProfileScreen.report}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ApplicantViewProfileScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  reportButton: {
    marginVertical: hp(5),
    marginBottom: hp(7),
  },
  reportTitle: {
    color: Colors.Destructive500,
    fontSize: '12@s',
    fontWeight: '400',
    alignSelf: 'center',
  },
  sponsorshipCardView: {
    paddingBottom: hp(2),
  },
  // []
  bottomCradView: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.Neutral200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    height: '76@s',
    marginTop: hp(2.3),
    marginBottom: hp(2),
    marginLeft: wp(1),
  },
  bottomPerCradView: {
    width: '30%',
  },
  cradprosesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  millionsTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    lineHeight: '19@s',
  },
  pershantTitle: {
    color: Colors.Neutral600,
    fontSize: '11@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  midiaTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
