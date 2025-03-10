import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Image, ScrollView} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {Divider} from 'react-native-elements';
import EnterAppTopThreeButtons from '../../../components/buttons/EnterAppTopThreeButtons';
import QuickDetailComponent from '../../../components/nonAuth/QuickAds/QuickDetailComponent';

// images
import broadcast from '../../../assets/images/broadcast.png';
import image from '../../../assets/images/image.png';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import moment from 'moment';
import EditQuickAdOptionsPopup from '../../../components/popups/EditQuickAdOptionsPopup';
import TimeZone from '../../../components/TimeZone';
import SVG from '../../../assets/svg';
import UtcDateConvert from '../../../components/UtcDateConvert';
import UtcTimeConvert from '../../../components/UtcTimeConvert';
import UtcTimeZoneConvert from '../../../components/UtcTimeZoneConvert';

const DetailScreen = ({navigation, route}) => {
  const ad_post = route?.params;
  const adsData = ad_post?.ad_post;
  const {applicants = []} = route?.params?.ad_post || [];
  const payOffered = adsData?.pay_offered;

  const [selected, setSelected] = useState(0);
  const [lastDate, setLastDate] = useState('');
  const [isOptions, setIsOptions] = useState(false);
  const [profileNames, setProfileNames] = useState([]);

  useEffect(() => {
    if (adsData?.applicants?.length > 0) {
      const profileNamesArray = adsData?.applicants?.map(applicant => {
        return applicant?.applicants_id?.profile_name || 'N/A';
      });

      setProfileNames(profileNamesArray);
    }
  }, []);

  useEffect(() => {
    const calculatedLastDate = getLastDate(adsData?.task_start_date);
    setLastDate(calculatedLastDate);
  }, [adsData?.task_start_date]);

  const getLastDate = startDate => {
    return moment(startDate).add(7, 'days').format('YYYY-MM-DD');
  };

  const onModalOptions = () => {
    setIsOptions(!isOptions);
  };

  const filteredApplicants = applicants.filter(
    applicant => applicant.status !== 'cancel',
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackArrow goBack={() => navigation.goBack()} />
        <Text style={styles.titleStyle}>Details</Text>
      </View>
      <EnterAppTopThreeButtons
        selected={selected}
        setSelected={setSelected}
        title1="Applicants"
        title2="Escrow"
        title3="QuickAd"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(50)}}>
        {/* ---------------------------- applicant start ---------------------------- */}

        {selected == 0 && (
          <>
            <View style={styles.statusView}>
              <Text style={styles.statusViewText}>
                {ad_post?.ad_post?.adsStatus}
              </Text>
              {ad_post?.ad_post?.adsStatus == 'in progress' ? (
                <Text style={styles.statusViewTextSec}>
                  We’ll notify you when influencers accept.
                </Text>
              ) : null}
            </View>

            <View style={{marginTop: scale(15), padding: 3}}>
              {applicants?.length === 0 ? (
                <View>
                  {/* <PrimaryButton
                  title="Cancel Job"
                  onPress={() =>
                    navigation.navigate('CancelQuickadCoustmerScreen', {
                      ad_post: ad_post,
                    })
                  }
                /> */}
                </View>
              ) : (
                <>
                  <View style={styles.cardContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={broadcast}
                        style={{width: scale(38), height: scale(38)}}
                      />
                      <Text
                        style={[
                          styles.buttonTextStyle,
                          {marginHorizontal: 10},
                        ]}>
                        Broadcast message
                      </Text>
                    </View>
                    <Text style={styles.decTextStyle}>
                      Send a broadcast message to all applicants. For privacy,
                      you will see each persons replies in the individual
                      chatroom you have with each user.
                    </Text>
                    <View
                      style={[styles.broadcastStyle, {marginTop: scale(20)}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={image}
                          style={{
                            width: scale(34),
                            height: scale(34),
                            borderRadius: scale(30),
                          }}
                        />
                        <Text
                          style={[
                            styles.decTextStyle,
                            {marginTop: 0, marginHorizontal: 10},
                          ]}>
                          +26 people
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.broadcastButton}>
                        <Text style={styles.buttonTextStyle}>Broadcast</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              {applicants?.length === 0 ? (
                <View>
                  <Text
                    style={[styles.buttonTextStyle, {marginTop: scale(10)}]}>
                    Waiting for {adsData?.apply_limit} more influencers
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#E5E5E5',
                      borderRadius: 8,
                      paddingHorizontal: wp(2),
                      paddingTop: hp(1),
                      paddingBottom: hp(3),
                      marginTop: hp(1),
                    }}>
                    <Text style={styles.decTextStyle}>
                      {AppLocalizedStrings.quickAdsHomescreen.waiting_Dec}
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  <View>
                    <Text style={[styles.decTextStyle, {fontWeight: '600'}]}>
                      Tap an influencer to view the delivery
                    </Text>
                    {filteredApplicants?.map(item => {
                      return (
                        <TouchableOpacity
                          style={styles.broadcastStyle}
                          onPress={() =>
                            navigation.navigate(
                              'QuickAdsApplicantDetailsScreen',
                              {
                                adsId: adsData?._id,
                                check: 'complete',
                                applicants_id: item?.applicants_id,
                              },
                            )
                          }>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{
                                uri: item?.applicants_id?.profile_picture,
                              }}
                              style={{
                                width: scale(42),
                                height: scale(42),
                                borderRadius: scale(3),
                              }}
                            />
                            <Text
                              style={[
                                styles.decTextStyle,
                                {
                                  marginTop: 0,
                                  marginHorizontal: 10,
                                  textTransform: 'capitalize',
                                },
                              ]}>
                              {item?.applicants_id?.profile_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: Colors.Neutral200,
                              borderRadius: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingVertical: 8,
                              paddingHorizontal: 8,
                            }}>
                            <Text
                              style={[
                                styles.buttonTextStyle,
                                {
                                  color: Colors.Success900,
                                  textTransform: 'capitalize',
                                },
                              ]}>
                              {item?.status === 'cancel'
                                ? 'Cancelled'
                                : item?.status}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.buttonTextStyle,
                        {marginTop: scale(10), fontWeight: '600'},
                      ]}>
                      Waiting for {adsData?.apply_limit} more influencers
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#E5E5E5',
                        borderRadius: 8,
                        paddingHorizontal: wp(2),
                        paddingTop: hp(1),
                        paddingBottom: hp(3),
                        marginTop: hp(1),
                      }}>
                      <Text style={styles.decTextStyle}>
                        {AppLocalizedStrings.quickAdsHomescreen.waiting_Dec}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              {/* <View style={{marginTop: scale(20)}}>
              <Text style={styles.buttonTextStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Status}
              </Text>
              <View style={styles.statusContainer}>
                <Text
                  style={[
                    styles.decTextStyle,
                    ad_post?.ad_post?.adsStatus === 'cancel'
                      ? {color: 'red'}
                      : {color: '#818CF8'},
                  ]}>
                  {ad_post?.ad_post?.adsStatus === 'cancel'
                    ? 'Cancelled'
                    : ad_post?.ad_post?.adsStatus}
                </Text>
                <TouchableOpacity onPress={onModalOptions}>
                  <Text
                    style={[
                      styles.decTextStyle,
                      {textDecorationLine: 'underline'},
                    ]}>
                    Need help?
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.decTextStyle, {marginTop: scale(50)}]}>
                Published:{' '}
                <Text style={{color: Colors.Black}}>
                  {UtcDateConvert(adsData?.timestamp)}{' '}
                  {`${UtcTimeConvert(adsData?.timestamp)} ${UtcTimeZoneConvert(
                    adsData?.timestamp,
                  )}`}
                </Text>
              </Text>
              <Text style={styles.decTextStyle}>
                Due date:{' '}
                <Text style={{color: Colors.Black}}>
                  {UtcDateConvert(adsData?.utcTimeDate)}{' '}
                  {`${UtcTimeConvert(
                    adsData?.utcTimeDate,
                  )} ${UtcTimeZoneConvert(adsData?.utcTimeDate)}`}
                </Text>
              </Text>
            </View> */}
              <View style={styles.dueDateMainView}>
                <View style={styles.dueDateMainViewSec}>
                  <Text style={styles.dueDateMainViewSecText}>Published:</Text>
                  <Text style={styles.dateTitleText}>
                    {UtcDateConvert(adsData?.timestamp)}{' '}
                    {`${UtcTimeConvert(
                      adsData?.timestamp,
                    )} ${UtcTimeZoneConvert(adsData?.timestamp)}`}
                  </Text>
                </View>
                <Divider style={styles.Divider} />
                <View style={styles.dueDateMainViewSec}>
                  <Text style={styles.dueDateMainViewSecText}>Due date:</Text>
                  <Text style={styles.dateTitleText}>
                    {UtcDateConvert(adsData?.utcTimeDate)}{' '}
                    {`${UtcTimeConvert(
                      adsData?.utcTimeDate,
                    )} ${UtcTimeZoneConvert(adsData?.utcTimeDate)}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.neddHelpView}
                onPress={onModalOptions}>
                <Text
                  style={[
                    styles.neddHelpViewText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Need help?
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ---------------------------- applicant end ---------------------------- */}

        {/* ---------------------------- escrow start ---------------------------- */}
        {selected == 1 && (
          <>
            <View style={styles.statusView}>
              <Text style={styles.statusViewText}>
                {ad_post?.ad_post?.adsStatus}
              </Text>
              {ad_post?.ad_post?.adsStatus == 'in progress' ? (
                <Text style={styles.statusViewTextSec}>
                  We’ll notify you when influencers accept.
                </Text>
              ) : null}
            </View>
            <View style={{marginTop: scale(15), padding: 3}}>
              {/* {adsData?.applicants?.length <= 0 ? (
              <>
                <Text style={styles.buttonTextStyle}>
                  Waiting for applicants...
                </Text>
                <Text style={styles.decTextStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.Escrow_Doc}
                </Text>
              </>
            ) : adsData?.adsStatus === 'in progress' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.Loader />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  In progress
                </Text>
              </View>
            ) : adsData?.adsStatus === 'Completed' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.CheckCircle />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  Job completed
                </Text>
                <Text style={styles.decTextStyle}>
                  Friday 9 April 2022, 8:30 AM PST = pending from backend
                </Text>
              </View>
            ) : adsData?.adsStatus === 'Partially refunded' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.PartiallyRefund />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                      color: Colors.Destructive500,
                    },
                  ]}>
                  Partial Refund
                </Text>
                <Text
                  style={[
                    styles.decTextStyle,
                    {
                      textAlign: 'center',
                    },
                  ]}>
                  This QuickAd was partially completed
                </Text>
                <Text
                  style={[
                    styles.decTextStyle,
                    {
                      textAlign: 'center',
                    },
                  ]}>
                  We’ve sent you a partial refund
                </Text>
              </View>
            ) : adsData?.adsStatus === 'Full refund' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.PartiallyRefund />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                      color: Colors.Destructive500,
                    },
                  ]}>
                  Full refund
                </Text>
                <Text
                  style={[
                    styles.decTextStyle,
                    {
                      textAlign: 'center',
                    },
                  ]}>
                  You cancelled this job
                </Text>
                <Text
                  style={[
                    styles.decTextStyle,
                    {
                      textAlign: 'center',
                    },
                  ]}>
                  We’ve sent you a full refund
                </Text>
              </View>
            ) : adsData?.adsStatus === 'Failed to Deliver' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.PartiallyRefund />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                      color: Colors.Destructive500,
                    },
                  ]}>
                  Failed to Deliver
                </Text>
                <Text style={styles.decTextStyle}>
                  All influencers failed to deliver We’ve sent you a full refund
                </Text>
              </View>
            ) : adsData?.adsStatus === 'Cancelled by the customer' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.PartiallyRefund />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                      color: Colors.Destructive500,
                    },
                  ]}>
                  Full Refund
                </Text>
                <Text style={styles.decTextStyle}>
                  You cancelled this job We’ve sent you a full refund
                </Text>
                <Text style={styles.decTextStyle}>
                  We’ve sent you a full refund
                </Text>
              </View>
            ) : adsData?.adsStatus === 'No applicants' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.PartiallyRefund />
                <Text
                  style={[
                    styles.buttonTextStyle,
                    {
                      marginVertical: 10,
                      color: Colors.Destructive500,
                    },
                  ]}>
                  Full Refund
                </Text>
                <Text style={styles.decTextStyle}>
                  This QuickAd had 0 applicants
                </Text>
                <Text style={styles.decTextStyle}>
                  We’ve sent you a full refund
                </Text>
              </View>
            ) : (
              ''
            )} */}

              <View style={styles.cardContainer}>
                <View style={styles.receptMainViewCardsIner}>
                  <Text style={styles.buttonTextStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.receipt}
                  </Text>
                  <Text style={[styles.decTextStyle, {fontWeight: '600'}]}>
                    {TimeZone(adsData?.task_start_date)}
                  </Text>
                </View>

                <Divider style={styles.Divider} />

                <View style={styles.receptMainViewCardsIner}>
                  <Text style={styles.buttonTextStyle}>ID:</Text>
                  <Text style={[styles.decTextStyle, {fontWeight: '600'}]}>
                    3250854
                  </Text>
                </View>

                <Divider style={styles.Divider} />

                <View style={styles.receptMainViewCardsIner}>
                  <Text style={styles.buttonTextStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.service}
                  </Text>
                  <Text
                    style={[
                      styles.decTextStyle,
                      {fontWeight: '600', width: '50%'},
                    ]}>
                    {AppLocalizedStrings.quickAdsHomescreen.serviceDec}
                  </Text>
                </View>

                <Divider style={styles.Divider} />

                <View style={styles.receptMainViewCardsIner}>
                  <Text style={[styles.buttonTextStyle]}>
                    {AppLocalizedStrings.quickAdsHomescreen.influencer}:
                  </Text>
                  <Text
                    style={[
                      styles.decTextStyle,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {adsData?.applicants?.length +
                      '/' +
                      adsData?.apply_limit +
                      ' influencers'}
                  </Text>
                </View>

                <Divider style={styles.Divider} />

                <View style={styles.receptMainViewCardsIner}>
                  <Text style={styles.buttonTextStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.paymentEscrow}
                  </Text>
                  <Text style={styles.buttonTextStyle}>
                    {'$ ' + payOffered}
                  </Text>
                </View>

                <Divider style={styles.Divider} />

                <View style={styles.receptMainViewCardsIner}>
                  <Text style={styles.buttonTextStyle}>Status:</Text>
                  <Text style={styles.buttonTextStyle}>Funds in escrow</Text>
                </View>

                <Divider style={styles.Divider} />
                <View
                  style={[
                    styles.receptMainViewCardsIner,
                    {marginBottom: hp(1)},
                  ]}>
                  <Text style={styles.buttonTextStyle}>Account Ending:</Text>
                  <Text style={styles.buttonTextStyle}>**** 2930</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.neddHelpView}
                onPress={onModalOptions}>
                <Text
                  style={[
                    styles.neddHelpViewText,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Need help?
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {/* ---------------------------- escrow end ---------------------------- */}

        {/* ---------------------------- quick ads start ---------------------------- */}

        {selected == 2 && (
          <QuickDetailComponent DetailPage={'DetailPage'} jobData={adsData} />
        )}
        {/* ---------------------------- quick ads start ---------------------------- */}
      </ScrollView>
      <EditQuickAdOptionsPopup
        isOptions={isOptions}
        setIsOptions={setIsOptions}
        onModalOptions={onModalOptions}
        ad_post={ad_post}
        status={ad_post?.ad_post?.adsStatus}
      />
    </View>
  );
};

export default DetailScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: '10@s',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: '18@s',
    fontWeight: '500',
    color: Colors.Neutral900,
    marginHorizontal: '10@s',
    bottom: 3,
  },
  newButtonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  broadcastStyle: {
    height: '65@s',
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    marginTop: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '15@s',
    marginBottom: '10@s',
  },
  broadcastButton: {
    width: '83@s',
    height: '25@s',
    backgroundColor: Colors.Neutral200,
    borderRadius: '3@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: '15@s',
    padding: '10@s',
    borderRadius: '10@s',
    marginBottom: '10@s',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  Divider: {
    marginTop: '10@s',
    marginBottom: '10@s',
  },
  decTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#404040',
    marginTop: '10@s',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#171717',
  },
  statusView: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: '10@s',
    marginTop: hp(3),
  },
  statusViewText: {
    fontWeight: '600',
    fontSize: '14@s',
    color: '#818CF8',
    textAlign: 'center',
    paddingBottom: '10@s',
    justifyContent: 'center',
  },
  statusViewTextSec: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#737373',
    textAlign: 'center',
  },
  dueDateMainView: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginTop: hp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  dueDateMainViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDateMainViewSecText: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#404040',
  },
  dateTitleText: {
    fontWeight: '600',
    fontSize: '13@s',
    color: Colors.Black,
  },
  neddHelpView: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginTop: hp(2),
  },
  neddHelpViewText: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Primary500,
  },
  receptMainViewCardsIner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
