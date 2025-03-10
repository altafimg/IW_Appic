import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {Divider} from 'react-native-elements';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {createJobAction} from '../../../redux/actions/createJobAction';
import SVG from '../../../assets/svg';
import {depositFundsRemoveAction} from '../../../redux/actions/depositFundsAction';
import moment from 'moment-timezone';
import * as Progress from 'react-native-progress';
import NewHeader from '../../../components/NewHeader';

const DepositFundsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.createJobReducer.loading);
  const createJob = useSelector(
    state => state.depositFundsReducer?.funds?.depositFundesState,
  );

  const resetStateObject = useSelector(
    state => state.depositFundsReducer?.funds?.resetStateObject,
  );

  const resetState = () => {
    resetStateObject?.setQuickTitle('');
    resetStateObject?.setThumbnailImage(null);
    resetStateObject?.setAgeLimit('');
    resetStateObject?.setSelectedCategories([]);
    resetStateObject?.setAbout('');
    resetStateObject?.setWebsite('');
    resetStateObject?.setImagesLink([]);
    resetStateObject?.setVideosLink([]);
    resetStateObject?.setAudiosLink([]);
    resetStateObject?.setContentRight('');
    resetStateObject?.setNumber('');
    resetStateObject?.setInfluencer('');
    resetStateObject?.setSelectedPlatform([]);
    resetStateObject?.setSelectedDate('');
    resetStateObject?.setSelectedTime('');
    resetStateObject?.setLanguage([]);
    resetStateObject?.setMood('Any');
    resetStateObject?.setSwear('Not Allowed');
    resetStateObject?.setSelectedCity('');
    resetStateObject?.setSelectedCountry('');
    resetStateObject?.setSelectedState([]);
    resetStateObject?.setTargetAge([]);
    resetStateObject?.setPrice('');
    resetStateObject?.setCurrency('USD - United states dollar');
    resetStateObject?.setSelectedAge(null);
    resetStateObject?.setMarkedDates('');
    resetStateObject?.setTimezone([]);
    resetStateObject?.setItems([]);
    resetStateObject?.setPickerVisibility(false);
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const [paymentMethods, setPaymentMethods] = useState(true);

  const handleCreateJob = () => {
    console.log(createJob, '<<<<<<<<<<<data');
    dispatch(createJobAction(createJob))
      .then(res => {
        console.log(res, '<<<<<<<<<<<<<response');
        if (loading === false) {
          navigation.replace('JobLivePaymentSuccessScreen');
          resetState();
          dispatch(depositFundsRemoveAction());
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
  };

  const platformName = [
    {
      id: 1,
      name: 'TikTok',
      svg: <SVG.TikTokS width={20} height={20} />,
    },
    {
      id: 2,
      name: 'Youtube',
      svg: <SVG.YoutubeS width={20} height={20} />,
    },
    {
      id: 3,
      name: 'Instagram',
      svg: <SVG.InstagramS width={20} height={20} />,
    },
    {
      id: 4,
      name: 'Twitch',
      svg: <SVG.TwitchS width={20} height={20} />,
    },
    {
      id: 5,
      name: 'X (Formerly Twitter)',
      svg: <SVG.XS width={20} height={20} />,
    },
    {
      id: 6,
      name: 'Snapchat',
      svg: <SVG.SnapchatS width={20} height={20} />,
    },
    {
      id: 7,
      name: 'Linkedin',
      svg: <SVG.LinkdinS width={20} height={20} />,
    },
    {
      id: 8,
      name: 'Facebook',
      svg: <SVG.FacebookS width={20} height={20} />,
    },
  ];

  const renderPlatformLogo = platform => {
    const platformInfo = platformName?.find(
      item => item?.name?.toLowerCase() === platform?.toLowerCase(),
    );

    if (platformInfo) {
      return platformInfo?.svg;
    } else {
      return <Text>No Logo Found</Text>;
    }
  };

  const formattedDate = moment(createJob?.task_start_date).format('DD MMM YY');

  const timeZoneAbbreviations = {
    'America/Los_Angeles': 'PT',
    'Europe/London': 'GMT',
    'Europe/London': 'GMT',
    'Asia/Kolkata': 'IST',
    'Asia/Dhaka': 'BST',
  };
  const abbreviation = timeZoneAbbreviations[createJob?.timeZone];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewHeader headerTitle="Deposit funds" onPress={onGoBackHandler} />
        {/* <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle="Deposit funds" /> */}
        <View style={styles.dataCardContainer}>
          <View style={{width: scale(300)}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: createJob?.thumbnail_picture_ads}}
                style={styles.cardPhotoStyle}
              />
              <View
                style={{
                  marginHorizontal: 10,
                  width: scale(215),
                }}>
                <Text style={[styles.cardNameStyle, {fontSize: scale(16)}]}>
                  {createJob?.quick_ads_title}
                </Text>
                <Text
                  numberOfLines={3}
                  style={[
                    styles.cardDecStyle,
                    {color: Colors.Neutral500, paddingTop: hp(1)},
                  ]}>
                  {createJob?.bio}
                </Text>
              </View>
            </View>
            <Divider
              style={{
                paddingVertical: scale(7),
                borderColor: Colors.Neutral400,
              }}
            />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>Influencers required</Text>
              <Text style={styles.cardNameStyle}>{createJob?.apply_limit}</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>Due date</Text>
              <Text style={styles.cardNameStyle}>
                {formattedDate +
                  ' ' +
                  createJob?.time +
                  ' ' +
                  // createJob?.amPm +
                  // ' ' +
                  abbreviation}
              </Text>
            </View>
            <Divider
              style={{
                paddingVertical: scale(7),
                borderColor: Colors.Neutral400,
              }}
            />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Language}
              </Text>
              <Text style={styles.cardNameStyle}>{createJob?.language}</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Platform}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {createJob?.platform.map((item, index) => (
                  <View style={{paddingRight: 5}} key={index}>
                    {renderPlatformLogo(item.platform_name)}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Followers}
              </Text>
              <Text style={styles.cardNameStyle}>
                {createJob?.minimum_number_follower_influencer_each}+
              </Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Target}
              </Text>
              <Text style={styles.cardNameStyle}>{createJob?.country}</Text>
            </View>
            <Divider
              style={{
                paddingVertical: scale(7),
                borderColor: Colors.Neutral400,
              }}
            />

            <View style={styles.cardDetailContainer1}>
              <Text style={styles.cardDecStyle1}>
                {AppLocalizedStrings.quickAdsHomescreen.pay_offer}
              </Text>
              <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
                {createJob?.particularPrice} per influencer
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cardButtonStyle}
              onPress={() => navigation.navigate('CreateNewScreen')}>
              <Text style={styles.cardButtonTextStyle}>View</Text>
            </TouchableOpacity>
            <View style={{marginTop: scale(15)}}>
              <Progress.Bar
                progress={0.1}
                width={scale(300)}
                height={8}
                color={Colors.Primary500}
                style={{borderWidth: 0, backgroundColor: '#1DA1F21A'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: scale(7),
                }}>
                <Text>{AppLocalizedStrings.quickAdsHomescreen.payDeposit}</Text>
                <Text>{AppLocalizedStrings.quickAdsHomescreen.processing}</Text>
                <Text>{AppLocalizedStrings.quickAdsHomescreen.Completed}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomParaView}>
          <Text style={styles.bottomParagraph}>
            {`We will hold the funds in escrow and automatically pay out Influencers once they have delivered your QuickAd \n`}
          </Text>
          <Text style={styles.bottomParagraph}>
            You will receive a full refund if you do not get any applicants or
            if applicants fail to deliver your QuickAd
          </Text>
        </View>
        <View style={{marginTop: scale(10)}}>
          <View style={styles.usdButtonMainView}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <TouchableOpacity
              style={styles.usdButton}
              onPress={() => navigation.navigate('SelectCurrencyScreen')}>
              <Text>{`USD`}</Text>
              <SVG.LeftArrow width={23} height={23} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: hp(1)}}>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                ${createJob?.particularPrice} x {createJob?.apply_limit}{' '}
                influencers
              </Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>
                  ${createJob?.particularPrice * createJob?.apply_limit}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>Taxes</Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>$100.00</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>Total</Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>
                  ${createJob?.particularPrice * createJob?.apply_limit + 100}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: hp(3)}}>
            <Text style={styles.summaryTitle}>Payment method</Text>
            <View style={styles.addTitleView}>
              <Text style={styles.plaeseTitle}>
                Please add a payment method
              </Text>

              {paymentMethods ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PaymentMethodsScreen', {
                      depositFundes: 'DepositFundsScreen',
                    })
                  }>
                  <Text style={styles.addTitle}>Add new</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChangePaymentMethodsScreen')
                  }>
                  <Text style={styles.addTitle}>Change</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.totalAmountView}>
              <Text style={styles.totalAmountTitle}>
                Total due: $
                {createJob?.particularPrice * createJob?.apply_limit + 100}
              </Text>
            </View>
            <PrimaryButton
              title={
                loading ? (
                  <View
                    style={{
                      width: wp('93%'),
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator
                      color={Colors.White}
                      size={'small'}
                      style={{marginTop: hp(1)}}
                    />
                  </View>
                ) : (
                  <Text>Pay Now</Text>
                )
              }
              onPress={handleCreateJob}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DepositFundsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(2),
  },
  //   {}
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    paddingHorizontal: '12@s',
    borderRadius: '5@s',
    alignSelf: 'center',
    paddingTop: '15@s',
    paddingBottom: '15@s',
    alignItems: 'center',
    width: '100%',
    marginTop: hp(3),
  },
  cardPhotoStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '15@s',
  },
  cardNameStyle: {
    color: Colors.Neutral800,
    fontWeight: '600',
    fontSize: '14@s',
  },
  cardDecStyle: {
    color: Colors.Neutral600,
    fontWeight: '400',
    fontSize: '14@s',
  },
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5@s',
    marginVertical: '8@s',
  },
  cardDetailContainer1: {
    backgroundColor: '#D1EBFA',
    marginTop: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5@s',
    height: '36@s',
    borderRadius: '5@s',
    marginBottom: hp(1.5),
  },
  cardDecStyle1: {
    color: Colors.Neutral800,
    fontWeight: '400',
    fontSize: '16@s',
  },
  cardButtonStyle: {
    height: '54@s',
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    justifyContent: 'center',
  },
  numberTextStyle: {
    backgroundColor: Colors.Primary500,
    height: '20@s',
    width: '20@s',
    borderRadius: '100@s',
    color: Colors.White,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  cardButtonTextStyle: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomParaView: {
    marginVertical: hp(2),
  },
  bottomParagraph: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
  },
  summaryTitle: {
    color: Colors.Black,
    fontSize: '23@s',
    fontWeight: '600',
  },
  divider: {
    paddingVertical: scale(3),
    borderColor: Colors.Neutral400,
  },
  addTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    marginBottom: hp(5),
  },
  addTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '500',
  },
  plaeseTitle: {
    color: Colors.red,
    fontSize: '14@s',
    fontWeight: '400',
  },
  totalAmountView: {
    backgroundColor: '#1DA1F21A',
    paddingVertical: hp(2),
    marginBottom: hp(2),
    borderRadius: 8,
  },
  totalAmountTitle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  usdButtonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usdButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
