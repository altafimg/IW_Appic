import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {Divider, Overlay} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {jobDetailsAction} from '../../../redux/actions/jobDetailsAction';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import JobDetailsProfileView from '../../../components/nonAuth/toDoList/JobDetailsProfileView';
import SVG from '../../../assets/svg';
// import moment from 'moment';
import moment from 'moment-timezone';
import {acceptJobsAction} from '../../../redux/actions/acceptJobAction';
import UtcDateConvert from '../../../components/UtcDateConvert';

// images
import downArrow from '../../../assets/images/downArrow.png';
import upArrow from '../../../assets/images/upArrow.png';
import time from '../../../assets/images/time.png';
import image from '../../../assets/images/image.png';
import noticeIcon from '../../../assets/images/noticeIcon.png';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import dot from '../../../assets/images/dot.png';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {getJobByDateTimeAction} from '../../../redux/actions/getJobByDateTimeAction';
import OverRideConflictsPopup from '../../../components/popups/OverRideConflictsPopup';
import {ActivityIndicator} from 'react-native-paper';
import UtcTimeConvert from '../../../components/UtcTimeConvert';
import UtcTimeZoneConvert from '../../../components/UtcTimeZoneConvert';

const StandardQuickAdsScreen = ({navigation, route}) => {
  const {id, user_id} = route?.params || {};
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token);

  const getJobByDateTimeData =
    useSelector(state => state.getJobByDateTimeReducer.data?.data) || [];

  const {dob, user_role} =
    useSelector(state => state.loginReducer?.user?.data?.data) || {};

  const [quickTitle, setQuickTitle] = useState('');
  const [expend, setExpend] = useState(false);
  const [platfromExpend, setPlatformExpend] = useState(false);
  const [dateTimeExpend, setDateTimeExpend] = useState(false);
  const [paymentExpend, setPaymentExpend] = useState(false);
  const [targetExpend, setTargetExpend] = useState(false);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [vibeExpend, setVibeExpend] = useState(false);
  const [conflict, setConflict] = useState(true);
  const [toggleBurnOut, setToggleBurnOut] = useState(false);
  const [toggleConflict, setToggleConflict] = useState(false);
  const [conflictFilteredData, setConflictFilteredData] = useState([]);
  const [overrideConflict, setOverrideConflict] = useState([]);
  const [toggleOverrideConflict, setToggleOverrideConflict] = useState(false);

  const onViewJobsHandler = () => {
    dispatch(jobDetailsAction({token, id}));
  };

  useEffect(() => {
    onViewJobsHandler();
  }, []);

  const userData = useSelector(
    state => state.jobDetailsReducer?.data?.data?.data,
  );

  const jobsData = userData || [];

  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const startDate = jobsData?.task_start_date || '';
  const convertFormateDate = moment(startDate).format('YYYY-MM-D');

  const conflictDataFilterHandler = () => {
    const currentJobTime = jobsData?.time;
    const filteredData = getJobByDateTimeData?.filter(item => {
      return item?.time === currentJobTime;
    });

    setConflictFilteredData(filteredData);
  };

  const getJobByDateTimeHandler = () => {
    const data = {
      applicantsId: _id,
      postDate: convertFormateDate,
      token,
    };
    dispatch(getJobByDateTimeAction(data));
  };

  useEffect(() => {
    getJobByDateTimeHandler();
    conflictDataFilterHandler();
  }, []);

  const applicants_id = useSelector(
    state => state.loginReducer?.user?.data?.data?._id,
  );

  const ads_id = jobsData?._id;

  const jobAcceptLoading = useSelector(
    state => state.acceptJobReducer?.loading,
  );

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const onAcceptJobHandler = () => {
    if (
      conflictFilteredData?.length !== 0 ||
      getJobByDateTimeData?.length >= 5
    ) {
      setToggleOverrideConflict(!toggleOverrideConflict);
      Alert.alert('You have already applied for this job');
    } else {
      const acceptJobData = {
        applicants_id: applicants_id,
        ads_id: ads_id,
        token: token,
        date: convertFormateDate,
        overrideConflict: overrideConflict,
        status: 'in progress',
      };

      const age = calculateAge(dob);
      if (age < jobsData?.set_age_for_applicants) {
        navigation.navigate('NotEligibleScreen', {
          id,
          user_id,
        });
      } else {
        dispatch(acceptJobsAction(acceptJobData))
          .then(res => {
            console.log(res, '++++++++++++++++');
            if (res?.status === 200) {
              navigation.navigate('AcceptedJobScreen');
              setScheduleVisible(false);
            } else {
              if (res === 'You have already applied for this job') {
                setScheduleVisible(false);
              } else {
                Alert.alert('No spaces remaining. Ad apply limit is full.');
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const userProfileName = jobsData?.user_id?.profile_name;
  const userProfilePicture = jobsData?.user_id?.profile_picture;

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
      name: 'Twitter',
      svg: <SVG.XS width={20} height={20} />,
    },
    {
      id: 6,
      name: 'Snapchat',
      svg: <SVG.SnapchatS width={20} height={20} />,
    },
    {
      id: 7,
      name: 'Linkdin',
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

  const user_verify_status =
    useSelector(
      state =>
        state.getLoggedInUserProfileReducer.data?.data?.data
          ?.user_verify_status,
    ) || {};

  const getUserDataHandler = () => {
    const data = {
      token: token,
      _id: id,
    };
    dispatch(getUserProfileAction(data));
  };

  useEffect(() => {
    getUserDataHandler();
  }, []);

  const date = moment(jobsData?.task_start_date).format('YYYY-MM-DD');

  const proposedDate = {key: 'proposed', color: 'green'};
  const conflictDate = {key: 'conflict', color: 'red'};

  const marked = {
    [date]: {
      dots: conflict.length > 0 ? [conflictDate, proposedDate] : [proposedDate],
    },
  };

  const skipButtonHandler = () => {
    navigation.replace('MainScreen');
    setScheduleVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BackArrow
          goBack={() => {
            navigation.goBack();
          }}
        />
        <SVG.Share />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: scale(50), marginTop: hp(1)}}>
        <JobDetailsProfileView
          user_id={user_id}
          userProfileName={userProfileName}
          userProfilePicture={userProfilePicture}
          userData={jobsData}
        />
        <View
          style={{
            height: 190,
            backgroundColor: Colors.Neutral50,
            marginTop: hp(2),
          }}>
          <View>
            <Image
              source={require('../../../assets/images/fastPayout.png')}
              style={{alignSelf: 'center', marginTop: hp(1)}}
            />
            <View style={{alignSelf: 'center', marginTop: hp(2.7)}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: Colors.Neutral900,
                  textAlign: 'center',
                }}>
                Fast payout guaranteed
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Neutral600,
                  textAlign: 'center',
                  paddingTop: hp(1),
                }}>
                {`Deliver this job by ${UtcDateConvert(jobsData?.utcTimeDate)}`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Neutral600,
                  textAlign: 'center',
                  paddingTop: hp(0.5),
                }}>
                {`${UtcTimeConvert(jobsData?.utcTimeDate)} ${UtcTimeZoneConvert(
                  jobsData?.timeZone,
                )}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cardMainContainer}>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.quick_title}
            </Text>
            <TextInput
              placeholder={jobsData?.quick_ads_title}
              value={quickTitle}
              onChangeText={t => setQuickTitle(t)}
              multiline={true}
              editable={false}
              placeholderTextColor={Colors.Neutral900}
              style={[
                styles.inputStyle,
                {
                  height: scale(60),
                  backgroundColor: Colors.Neutral100,
                  textAlignVertical: 'top',
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.Neutral500,
                },
              ]}
            />
            <Image
              source={{uri: jobsData.thumbnail_picture_ads}}
              style={styles.backgroundImage}
            />

            <View
              style={[
                styles.mainBoxStyle,
                {backgroundColor: Colors.Neutral100},
              ]}>
              {jobsData?.category?.map(i => {
                return (
                  <Text numberOfLines={1} style={[styles.boxTextStyle]}>
                    {i}
                  </Text>
                );
              })}
            </View>
            <View
              style={[
                styles.mainBoxStyle,
                {backgroundColor: Colors.Neutral100},
              ]}>
              <Text numberOfLines={1} style={[styles.boxTextStyle]}>
                Applicants must be {jobsData?.set_age_for_applicants} years
              </Text>
            </View>
          </View>
        </View>

        {/* ------------------------------------- the quickAds module --------------- */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setExpend(!expend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.The_QuickAd}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: expend ? Colors.Primary500 : null,
                transform: expend ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {expend && (
              <View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.Short_brief}
                </Text>
                <Text
                  style={[
                    styles.inputStyle,
                    {
                      height: scale(178),
                      backgroundColor: Colors.Neutral100,
                      color: Colors.Neutral600,
                      paddingVertical: hp(1),
                    },
                  ]}>
                  {jobsData?.bio}
                </Text>

                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.Website_link}
                </Text>
                <TextInput
                  placeholder={jobsData?.website_link}
                  placeholderTextColor={Colors.Neutral900}
                  style={[
                    styles.inputStyle,
                    {backgroundColor: Colors.Neutral100},
                  ]}
                  editable={false}
                />
                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.Media_Files}
                </Text>

                {jobsData?.images?.map(i => {
                  const urlParts = i.split(`/`);
                  const imageName = urlParts[urlParts.length - 1];
                  return (
                    <View style={styles.browseContainer}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={{uri: i}}
                            borderRadius={scale(5)}
                            style={{
                              width: scale(50),
                              height: scale(50),
                            }}
                          />
                          <Text
                            style={[
                              styles.messageStyle,
                              {color: Colors.Neutral700, left: scale(10)},
                            ]}>
                            {imageName}
                          </Text>
                        </View>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                          <Image
                            source={download}
                            style={{width: 20, height: 20}}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 12,
                              color: Colors.Neutral600,
                            }}>
                            1.6 MB
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
                {jobsData?.video?.map(i => {
                  return (
                    <View style={styles.browseContainer}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <ImageBackground
                            source={image}
                            borderRadius={scale(5)}
                            style={{
                              width: scale(50),
                              height: scale(50),
                            }}
                          />
                          <Text
                            style={[
                              styles.messageStyle,
                              {color: Colors.Neutral700, left: scale(10)},
                            ]}>
                            {i}
                          </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <Image
                            source={download}
                            style={{width: 20, height: 20}}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 12,
                              color: Colors.Neutral600,
                            }}>
                            1.6 MB
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
                {jobsData?.audio?.map(i => {
                  return (
                    <View style={styles.browseContainer}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              width: scale(50),
                              height: scale(50),
                              backgroundColor: Colors.PrimaryLight,
                              borderRadius: 5,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={speaker}
                              style={{height: scale(24), width: scale(24)}}
                            />
                          </View>

                          <Text
                            style={[
                              styles.messageStyle,
                              {color: Colors.Neutral700, left: scale(10)},
                            ]}>
                            {i}
                          </Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <Image
                            source={download}
                            style={{width: 20, height: 20}}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 12,
                              color: Colors.Neutral600,
                            }}>
                            1.6 MB
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}

                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.Disclosure_notices}
                </Text>
                <View
                  style={[
                    styles.mainBoxStyle,
                    {
                      height: scale(36),
                      bottom: 10,
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={[styles.boxTextStyle, {height: scale(20)}]}>
                    This job includes 1 notices
                  </Text>
                </View>
                <View style={styles.rightCardStyle}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={noticeIcon}
                      style={{width: scale(24), height: scale(24)}}
                    />
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {fontSize: scale(16), marginHorizontal: 10},
                      ]}>
                      Alcohol
                    </Text>
                  </View>
                  <Text style={[styles.quickTitleStyle, {marginTop: 10}]}>
                    Note added by the advertiser:
                  </Text>
                  <Text
                    style={[
                      styles.quickTitleStyle,
                      {marginTop: 3, fontWeight: '400'},
                    ]}>
                    We are a licensed liquor distributor with licencenumber
                    12345678
                  </Text>
                </View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.Content_usage}
                </Text>
                <View
                  style={[
                    styles.mainBoxStyle,
                    {
                      height: scale(36),
                      bottom: 10,
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <Text
                    numberOfLines={1}
                    style={[styles.boxTextStyle, {height: scale(20)}]}>
                    {jobsData?.content_right}
                  </Text>
                </View>
                {jobsData?.customUserRights == 'Social media license' ? null : (
                  <View style={styles.rightCardStyle}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={noticeIcon}
                        style={{width: scale(24), height: scale(24)}}
                      />
                      <Text
                        style={[
                          styles.quickTitleStyle,
                          {fontSize: scale(16), marginHorizontal: 10},
                        ]}>
                        Custom usage rights
                      </Text>
                    </View>
                    <Text style={[styles.quickTitleStyle, {marginTop: 10}]}>
                      Explained by the advertiser:
                    </Text>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {marginTop: 3, fontWeight: '400'},
                      ]}>
                      {jobsData?.customUserRights}
                    </Text>
                  </View>
                )}

                <Text style={[styles.quickTitleStyle, {marginTop: 10}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.influencers_promote}
                </Text>
                <Text
                  style={[
                    styles.inputStyle,
                    {
                      marginBottom: scale(15),
                      backgroundColor: Colors.Neutral100,
                      paddingTop: hp(1.2),
                    },
                  ]}>
                  {jobsData?.apply_limit}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* ------------------------------------- Platform module --------------- */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setPlatformExpend(!platfromExpend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.The_platform}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: platfromExpend ? Colors.Primary500 : null,
                transform: platfromExpend
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {platfromExpend && (
              <View>
                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  The platforms to advertise on
                </Text>
                {jobsData?.platform?.map((i, index) => {
                  return (
                    <View style={styles.platformInputStyle}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 6,
                        }}>
                        <View style={{paddingRight: 5}} key={index}>
                          {renderPlatformLogo(i.platform_name)}
                        </View>
                        <Text
                          style={[styles.messageStyle, {color: Colors.Black}]}>
                          {i?.platform_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            styles.messageStyle,
                            {
                              color: Colors.Neutral500,
                              paddingTop: 6,
                            },
                          ]}>
                          Service:
                        </Text>
                        {jobsData?.platform?.map(sName => (
                          <Text
                            style={[
                              styles.messageStyle,
                              {
                                color: Colors.Black,
                                paddingLeft: 5,
                                marginTop: 6,
                              },
                            ]}>
                            {sName?.service_name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  );
                })}

                <Text style={[styles.quickTitleStyle, {marginTop: scale(15)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.follower_number}
                </Text>

                <View
                  style={[
                    styles.followerContainer,
                    {
                      marginBottom: scale(15),
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <Text
                    style={{
                      width: 200,
                      paddingHorizontal: 10,
                      color: Colors.Neutral500,
                      fontSize: 14,
                      fontWeight: '400',
                    }}>
                    {jobsData?.minimum_number_follower_influencer_each}+
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: scale(14),
                      color: Colors.Neutral500,
                      right: 10,
                    }}>
                    {AppLocalizedStrings.quickAdsHomescreen.minimum}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        {/* ----------------------------- date and time module ------------------ */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setDateTimeExpend(!dateTimeExpend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Date_time}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: dateTimeExpend ? Colors.Primary500 : null,
                transform: dateTimeExpend
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {dateTimeExpend && (
              <View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.When_to_post}
                </Text>
                <View
                  style={[
                    styles.inputStyle,
                    {backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.dateTextStyle}>
                      {moment(startDate).format('dddd, D MMMM YYYY')}
                    </Text>
                    <Image
                      source={date}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.inputStyle,
                    {
                      marginTop: scale(15),
                      marginBottom: scale(15),
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <View style={[styles.directionRowStyle]}>
                    <Text style={styles.dateTextStyle}>
                      {`${UtcTimeConvert(
                        jobsData?.utcTimeDate,
                      )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                    </Text>
                    <Image
                      source={time}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        {/* ----------------------------- the vibes module ------------------ */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setVibeExpend(!vibeExpend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.the_vibe}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: vibeExpend ? Colors.Primary500 : null,
                transform: vibeExpend
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {vibeExpend && (
              <View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.which_languange}
                </Text>
                <View
                  style={[
                    styles.inputStyle,
                    {backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.language?.map(i => {
                      return <Text style={styles.dateTextStyle}>{`${i}`}</Text>;
                    })}
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.set_mood}
                </Text>
                <View
                  style={[
                    styles.inputStyle,
                    {backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.dateTextStyle}>{jobsData?.mood}</Text>
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.Swearing_language}
                </Text>
                <View
                  style={[
                    styles.inputStyle,
                    {
                      marginBottom: scale(15),
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.swearing?.map(i => {
                      return <Text style={styles.dateTextStyle}>{i}</Text>;
                    })}

                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        {/* ----------------------------- Target audience module ------------------ */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setTargetExpend(!targetExpend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Target_audience}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: targetExpend ? Colors.Primary500 : null,
                transform: targetExpend
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10}}>
            {targetExpend && (
              <View>
                <View
                  style={[
                    styles.inputStyle,
                    {backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={[styles.dateTextStyle]}>
                      {jobsData?.country}
                    </Text>
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.inputStyle,
                    {marginTop: scale(15), backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={[styles.dateTextStyle]}>
                      {jobsData?.state}
                    </Text>
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.inputStyle,
                    {marginTop: scale(15), backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={[styles.dateTextStyle]}>{jobsData?.city}</Text>
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.inputStyle,
                    {
                      marginTop: scale(15),
                      marginBottom: scale(15),
                      backgroundColor: Colors.Neutral100,
                    },
                  ]}>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.target?.map(i => {
                      return (
                        <Text style={styles.dateTextStyle}>{i} year olds</Text>
                      );
                    })}
                    {/* <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    /> */}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        {/* ----------------------------- Payment module ------------------ */}
        <View style={[styles.mainBoxStyle1]}>
          <TouchableOpacity
            onPress={() => {
              setPaymentExpend(!paymentExpend);
            }}
            activeOpacity={0.6}
            style={styles.expendButton}>
            <Text style={styles.mainTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.payment}
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: paymentExpend ? Colors.Primary500 : null,
                transform: paymentExpend
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}
            />
          </TouchableOpacity>

          <View style={{marginTop: 10, paddingBottom: paymentExpend ? 40 : 0}}>
            {paymentExpend && (
              <View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.Payment_offered}
                </Text>
                <View style={styles.paymentContainer}>
                  <Text
                    style={[
                      styles.boxTextStyle,
                      {bottom: 3, paddingTop: hp(0.7)},
                    ]}>
                    $
                  </Text>
                  <Text
                    style={{
                      height: scale(36),
                      width: scale(235),
                      fontSize: scale(15),
                      color: Colors.Neutral900,
                      paddingTop: hp(1),
                    }}>
                    {jobsData?.particularPrice}
                  </Text>
                  <Text
                    style={[
                      styles.boxTextStyle,
                      {
                        color: Colors.Neutral500,
                        fontWeight: '400',
                      },
                    ]}>
                    USD
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setScheduleVisible(true);
          }}
          activeOpacity={0.6}
          style={[
            styles.buttonStyle,
            {marginTop: scale(40), marginBottom: scale(15)},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image
              source={date}
              style={{
                width: scale(24),
                height: scale(24),
                tintColor: Colors.White,
              }}
            /> */}
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.my_schedule}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReportScreenQuickAd', {type: 'Standard'});
          }}
          style={{marginBottom: hp(3)}}>
          <Text style={styles.allCompleteText}>
            {AppLocalizedStrings.quickAdsHomescreen.report_proposal}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --------------------------------- calendar overlay SECTION START --------------------------- */}

      <Overlay
        visible={scheduleVisible}
        onRequestClose={() => setScheduleVisible(false)}
        overlayStyle={styles.overlayStyle}>
        {/* <View style={styles.overlaythumbStyle} /> */}
        <View>
          <View style={styles.containerSec}>
            <TouchableOpacity onPress={() => setScheduleVisible(false)}>
              <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Schedule</Text>
            <Text style={styles.headerSubTitle}>kk</Text>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={{marginTop: hp(2)}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 50}}>
            {/* <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markedDates={{
                // [selected]: {
                //   selected: true,
                //   disableTouchEvent: true,
                // },
                [convertFormateDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#00adf5',
                },
              }}
              // sdlkfnkjsa
              current={convertFormateDate}
            /> */}
            <Calendar markedDates={marked} markingType="multi-dot" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: scale(10),
                gap: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                  borderRadius: 50,
                  paddingVertical: hp(0.6),
                  paddingHorizontal: wp(2),
                }}>
                <Image source={dot} style={{width: 8, height: 8}} />
                <Text
                  style={[
                    styles.quickTitleStyle,
                    {
                      fontSize: scale(12),
                      marginHorizontal: 5,
                    },
                  ]}>
                  Proposed
                </Text>
              </View>
              {conflict && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#EBEBEB',
                    borderRadius: 50,
                    paddingVertical: hp(0.6),
                    paddingHorizontal: wp(2),
                  }}>
                  <Image
                    source={dot}
                    style={{
                      width: 8,
                      height: 8,
                      tintColor: 'red',
                    }}
                  />
                  <Text
                    style={[
                      styles.quickTitleStyle,
                      {
                        fontSize: scale(12),
                        marginHorizontal: 5,
                      },
                    ]}>
                    Conflict
                  </Text>
                </View>
              )}
            </View>
            {/* --------------------------------- CONFLICT SECTION START --------------------------- */}

            <View
              style={[
                styles.mainBoxStyle1,
                {
                  minHeight: scale(54),
                  justifyContent: 'space-between',
                  // flexDirection: 'row',
                  // alignItems: 'center',
                },
              ]}>
              <View
                style={{
                  minHeight: scale(54),
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.mainTextStyle, {fontSize: scale(15)}]}>
                  Date and time:{' '}
                  <Text style={{color: conflict ? 'red' : Colors.Black}}>
                    {conflictFilteredData
                      ? conflictFilteredData?.length === 0
                        ? 'No conflicts found'
                        : conflictFilteredData?.length + ' conflicts found'
                      : 'No data available'}
                  </Text>
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => setToggleConflict(!toggleConflict)}>
                    <Image
                      source={toggleConflict === true ? upArrow : downArrow}
                      style={{width: scale(24), height: scale(24)}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {toggleConflict ? (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={[
                      styles.burnOutData,
                      {
                        color: Colors.Black,
                      },
                    ]}>
                    {`Current job proposed for ${UtcDateConvert(
                      jobsData?.utcTimeDate,
                    )}`}
                  </Text>
                  <View>
                    <View
                      style={{
                        backgroundColor: '#F5F5F5',
                        padding: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: Colors.Warning500,
                          fontSize: 14,
                          fontWeight: '500',
                          justifyContent: 'space-around',
                          marginBottom: 10,
                        }}>
                        Current QuickAd
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Image
                            source={{uri: jobsData?.thumbnail_picture_ads}}
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 10,
                              marginRight: 20,
                            }}
                          />
                        </View>
                        <View style={{paddingBottom: 10, width: scale(200)}}>
                          <Text style={styles.currentJobText}>
                            {jobsData?.quick_ads_title}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {`Date: ${UtcDateConvert(jobsData?.utcTimeDate)}`}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {`Time: ${UtcTimeConvert(
                              jobsData?.utcTimeDate,
                            )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {jobsData?.city +
                              ', ' +
                              jobsData?.state +
                              ', ' +
                              jobsData?.country}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.burnOutData,
                      {
                        color: Colors.Black,
                      },
                    ]}>
                    {`You’ve  ${conflictFilteredData?.length} scheduled jobs on ` +
                      UtcDateConvert(jobsData?.utcTimeDate)}
                  </Text>
                  {conflictFilteredData?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#F5F5F5',
                          padding: 10,
                          borderRadius: 10,
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            color: Colors.Success500,
                            fontSize: 14,
                            fontWeight: '500',
                            justifyContent: 'space-around',
                            marginBottom: 10,
                          }}>
                          Already confirmed
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Image
                              source={{
                                uri: item?.thumbnail_picture_ads,
                              }}
                              style={{
                                height: 60,
                                width: 60,
                                borderRadius: 10,
                                marginRight: 20,
                              }}
                            />
                          </View>
                          <View style={{paddingBottom: 10}}>
                            <Text style={styles.currentJobText}>
                              {item?.quick_ads_title}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {`Date: ${UtcDateConvert(jobsData?.utcTimeDate)}`}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {`Time: ${UtcTimeConvert(
                                jobsData?.utcTimeDate,
                              )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {item?.city +
                                ', ' +
                                item?.state +
                                ', ' +
                                item?.country}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                ''
              )}
            </View>

            {/* --------------------------------- CONFLICT SECTION end --------------------------- */}

            {/* --------------------------------- Burnout SECTION START --------------------------- */}
            <View style={styles.mainBoxStyle1}>
              <View
                style={{
                  minHeight: scale(54),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.burnOutData}> Burnout limit: </Text>
                  <Text
                    style={[
                      styles.burnOutData,
                      {
                        color:
                          getJobByDateTimeData?.length < 3
                            ? Colors.Success900
                            : getJobByDateTimeData?.length >= 3 &&
                              getJobByDateTimeData?.length < 5
                            ? Colors.Warning400
                            : getJobByDateTimeData?.length >= 5
                            ? Colors.Destructive600
                            : '',
                      },
                    ]}>
                    {/* {getJobByDateTimeData?.length < 3
                      ? 'Low'
                      : getJobByDateTimeData?.length >= 3 &&
                        getJobByDateTimeData?.length < 5
                      ? 'Medium'
                      : getJobByDateTimeData?.length >= 5
                      ? 'High'
                      : ''} */}
                    {getJobByDateTimeData?.length <= 5
                      ? 'Low'
                      : getJobByDateTimeData?.length > 5
                      ? 'High'
                      : 'High'}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => setToggleBurnOut(!toggleBurnOut)}>
                    <Image
                      source={toggleBurnOut === true ? upArrow : downArrow}
                      style={{width: scale(24), height: scale(24)}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* -----------------------burn out content start  -----------------------*/}
              {toggleBurnOut ? (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={[
                      styles.burnOutData,
                      {
                        color: Colors.Black,
                      },
                    ]}>
                    {`Current job proposed for ` +
                      UtcDateConvert(jobsData?.utcTimeDate)}
                  </Text>
                  <View>
                    <View
                      style={{
                        backgroundColor: '#F5F5F5',
                        padding: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: Colors.Warning500,
                          fontSize: 14,
                          fontWeight: '500',
                          justifyContent: 'space-around',
                          marginBottom: 10,
                        }}>
                        Current QuickAd
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <Image
                            source={{uri: jobsData?.thumbnail_picture_ads}}
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 10,
                              marginRight: 20,
                            }}
                          />
                        </View>
                        <View style={{paddingBottom: 10}}>
                          <Text style={styles.currentJobText}>
                            {jobsData?.quick_ads_title}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {`Date: ${UtcDateConvert(jobsData?.utcTimeDate)}`}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {`Time: ${UtcTimeConvert(
                              jobsData?.utcTimeDate,
                            )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                          </Text>
                          <Text style={styles.currentJobText}>
                            {jobsData?.city +
                              ', ' +
                              jobsData?.state +
                              ', ' +
                              jobsData?.country}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.burnOutData,
                      {
                        color: Colors.Black,
                      },
                    ]}>
                    {`You’ve  ${conflictFilteredData?.length} scheduled jobs on ` +
                      UtcDateConvert(jobsData?.utcTimeDate)}
                  </Text>

                  {getJobByDateTimeData?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: '#F5F5F5',
                          padding: 10,
                          borderRadius: 10,
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            color: Colors.Success500,
                            fontSize: 14,
                            fontWeight: '500',
                            justifyContent: 'space-around',
                            marginBottom: 10,
                          }}>
                          Already confirmed
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <View>
                            <Image
                              source={{
                                uri: item?.thumbnail_picture_ads,
                              }}
                              style={{
                                height: 60,
                                width: 60,
                                borderRadius: 10,
                                marginRight: 20,
                              }}
                            />
                          </View>
                          <View style={{paddingBottom: 10}}>
                            <Text style={styles.currentJobText}>
                              {item?.quick_ads_title}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {`Date: ${UtcDateConvert(jobsData?.utcTimeDate)}`}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {`Time: ${UtcTimeConvert(
                                jobsData?.utcTimeDate,
                              )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                            </Text>
                            <Text style={styles.currentJobText}>
                              {item?.city +
                                ', ' +
                                item?.state +
                                ', ' +
                                item?.country}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                ''
              )}

              {/* -----------------------burn out content end  ----------------------- */}
            </View>
            {/* --------------------------------- Burnout SECTION end --------------------------- */}

            {/* --------------------------------- accept job skip job button SECTION start --------------------------- */}
            <>
              {/* {user_verify_status == 'verified' ? ( */}
              <TouchableOpacity
                onPress={onAcceptJobHandler}
                activeOpacity={0.6}
                style={[styles.buttonStyle, {marginTop: scale(30)}]}>
                {jobAcceptLoading ? (
                  <ActivityIndicator size={'small'} color={Colors.White} />
                ) : (
                  <Text style={styles.buttonTextStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.accept_Job}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={skipButtonHandler}
                activeOpacity={0.6}
                style={[
                  styles.buttonStyle,
                  {
                    marginTop: scale(15),
                    backgroundColor: Colors.White,
                    borderWidth: 2,
                    borderColor: Colors.Primary500,
                  },
                ]}>
                <Text
                  style={[styles.buttonTextStyle, {color: Colors.Primary500}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.skip_Job}
                </Text>
              </TouchableOpacity>
            </>
            {/* --------------------------------- accept job skip job button SECTION end --------------------------- */}
          </ScrollView>
        </View>
      </Overlay>
      {/* --------------------------------- calendar overlay SECTION end --------------------------- */}

      {toggleOverrideConflict ? (
        <OverRideConflictsPopup
          isVisible={toggleOverrideConflict}
          setIsVisible={setToggleOverrideConflict}
          conflictFilteredData={conflictFilteredData}
          getJobByDateTimeData={getJobByDateTimeData}
          setScheduleVisible={setScheduleVisible}
          applicants_id={applicants_id}
          ads_id={ads_id}
          token={token}
          date={convertFormateDate}
          id={id}
          user_id={user_id}
          jobsData={jobsData}
        />
      ) : (
        ''
      )}
    </SafeAreaView>
  );
};

export default StandardQuickAdsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: '#fff',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareImageStyle: {
    width: '24@s',
    height: '24@s',
  },
  profileStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '50@s',
  },
  overlayStyle: {
    // height: Dimensions.get('window').height - StatusBar.currentHeight - 20,
    height: '100%',
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    marginTop: '30@s',
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  burnOutData: {
    fontWeight: '400',
    fontSize: '14@s',
    fontSize: scale(15),
  },
  dropDownContainerStyle: {
    backgroundColor: Colors.Neutral100,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 0,
    elevation: 5,
    marginTop: 2,
  },
  userDetailStyle: {
    marginHorizontal: '20@s',
  },
  userNameStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral900,
  },
  subTitleStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
    marginTop: '3@s',
  },
  verifyImage: {
    width: '16@s',
    height: '16@s',
    marginHorizontal: '7@s',
  },
  verifyImageBorder: {
    width: '85@s',
    height: '85@s',
    borderRadius: '50@s',
    borderWidth: 3,
    borderColor: Colors.Success500,
  },
  successText: {
    fontWeight: '400',
    fontSize: '12@s',
    color: Colors.Success500,
    marginTop: '8@s',
  },
  onlineStyle: {
    fontSize: '60@s',
    position: 'absolute',
    zIndex: 999,
    bottom: -30,
    right: 0,
    color: Colors.Success500,
  },
  messageContainer: {
    marginTop: '10@s',
    width: '80@s',
    height: '25@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Neutral200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '36@s',
    borderWidth: 1,
    borderRadius: '5@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
    marginTop: '10@s',
    marginBottom: '10@s',
    backgroundColor: Colors.Neutral100,
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  allCompleteText: {
    fontWeight: '500',
    fontSize: '12@s',
    color: Colors.Neutral500,
    textAlign: 'center',
    marginBottom: '10@s',
  },
  cardMainContainer: {
    borderWidth: 1,
    marginTop: '15@s',
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingBottom: '10@s',
  },
  inputStyle: {
    // height: '36@s',
    paddingVertical: '5@s',
    marginTop: '6@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: 10,
    color: Colors.Black,
  },
  platformInputStyle: {
    marginTop: '8@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    backgroundColor: Colors.Neutral50,
    paddingHorizontal: 10,
    paddingVertical: hp(1),
  },
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '-5@s',
    paddingVertical: '3@s',
  },
  dateTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
    top: '5@s',
  },
  timeInputStyle: {
    height: '39@s',
    width: '150@s',
    paddingHorizontal: '10@s',
    borderRadius: '5@s',
    borderWidth: 1,
    fontSize: '14@s',
    fontWeight: '400',
  },
  mainBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
    paddingVertical: '14@s',
  },
  mainBoxStyle1: {
    marginTop: '15@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
  },
  expendButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 5,
    height: '44@s',
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
    paddingRight: wp(1),
  },
  rightCardStyle: {
    backgroundColor: Colors.Neutral100,
    padding: '15@s',
    borderRadius: '5@s',
    marginBottom: '10@s',
  },
  ageTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Black,
    marginTop: '10@s',
  },
  backgroundImage: {
    height: '140@s',
    marginTop: '15@s',
    borderRadius: '3@s',
  },
  crossImageStyle: {
    position: 'absolute',
    backgroundColor: Colors.White,
    width: '24@s',
    height: '24@s',
    borderRadius: '50@s',
    right: 10,
    top: 10,
  },
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '180@s',
    backgroundColor: Colors.White,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '200@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },
  categoryTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '15@s',
    marginTop: '10@s',
  },
  browseButton: {
    borderWidth: 1,
    borderRadius: 5,
    height: '36@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    marginTop: '6@s',
  },
  browseContainer: {
    marginTop: '10@s',
    borderColor: Colors.Neutral300,
    borderWidth: 1,
    borderRadius: '4@s',
  },
  followerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    height: '40@s',
    borderRadius: '5@s',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
  },
  currentJobText: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Black,
    lineHeight: '20@s',
  },
  containerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
