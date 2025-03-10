import React, {useState} from 'react';
import {
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
import {scale, ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import UtcDateConvert from '../../UtcDateConvert';
import UtcTimeConvert from '../../UtcTimeConvert';
import UtcTimeZoneConvert from '../../UtcTimeZoneConvert';

// images
import downArrow from '../../../assets/images/downArrow.png';
import date from '../../../assets/images/date.png';
import time from '../../../assets/images/time.png';
import image from '../../../assets/images/image.png';
import noticeIcon from '../../../assets/images/noticeIcon.png';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import SVG from '../../../assets/svg';

const DetailsViewJobComponent = props => {
  const {jobsData, loading, jobstatus} = props;

  const [expend, setExpend] = useState(false);
  const [platfromExpend, setPlatformExpend] = useState(false);
  const [dateTimeExpend, setDateTimeExpend] = useState(false);
  const [paymentExpend, setPaymentExpend] = useState(false);
  const [targetExpend, setTargetExpend] = useState(false);
  const [vibeExpend, setVibeExpend] = useState(false);

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

  const capitalizeFirstLetter = text => {
    return text?.charAt(0)?.toUpperCase() + text?.slice(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderMainView}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : jobstatus}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.loaderMainView}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'completed'
                ? 'Job completed'
                : jobstatus === 'cancel'
                ? 'Cancelled by the Influencer'
                : jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'cancelByCustomer'
                ? 'This job was cancelled by the customer'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : ''}
            </Text>
          </View>
          <View>
            <View style={styles.dueDateView}>
              <Text style={styles.dueTitle}>Due Date:</Text>
              <Text style={styles.dueTitleSec}>
                {`${UtcDateConvert(jobsData?.utcTimeDate)} ${UtcTimeConvert(
                  jobsData?.utcTimeDate,
                )} ${UtcTimeZoneConvert(jobsData?.timeZone)}`}
              </Text>
            </View>
          </View>
        </>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: scale(50), marginTop: hp(1)}}>
        <View style={styles.cardMainContainer}>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <Image
              source={{uri: jobsData?.thumbnail_picture_ads}}
              style={styles.backgroundImage}
            />
            <View style={{marginTop: hp(2)}}>
              <Text style={[styles.quickTitleStyle, {fontWeight: '600'}]}>
                Title
              </Text>
              <Text style={styles.infoText}>{jobsData?.quick_ads_title}</Text>
            </View>
            <View style={{marginTop: hp(2)}}>
              <Text style={[styles.quickTitleStyle, {fontWeight: '600'}]}>
                Categories
              </Text>
              <View style={{flexDirection: 'row'}}>
                {jobsData?.category?.map(i => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#D4D4D4',
                        borderRadius: 50,
                        padding: hp(1),
                        marginTop: hp(1),
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          color: '#171717',
                          fontSize: 14,
                        }}>
                        {i}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={{marginTop: hp(2)}}>
              <Text style={[styles.quickTitleStyle, {fontWeight: '600'}]}>
                Age Limit
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#D4D4D4',
                    borderRadius: 50,
                    padding: hp(1),
                    marginTop: hp(1),
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: '#171717',
                      fontSize: 14,
                    }}>
                    Applicants must be {jobsData?.set_age_for_applicants}+ years
                  </Text>
                </View>
              </View>
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
                <View
                  style={[
                    styles.infoView,
                    {
                      marginTop: 5,
                    },
                  ]}>
                  <Text style={styles.quickTitleStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.Short_brief}
                  </Text>
                  <Text style={styles.infoText}>
                    {capitalizeFirstLetter(jobsData?.bio)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.infoView,
                    {
                      marginTop: 20,
                    },
                  ]}>
                  <Text style={[styles.quickTitleStyle]}>
                    {AppLocalizedStrings.quickAdsHomescreen.Website_link}
                  </Text>
                  <Text style={styles.infoText}>{jobsData?.website_link}</Text>
                </View>

                {jobsData?.images?.map(i => {
                  // const urlParts = i.split(`/`);
                  // const imageName = urlParts[urlParts.length - 1];
                  return (
                    <View style={styles.browseContainer}>
                      <Text
                        style={[
                          styles.quickTitleStyle,
                          {marginTop: scale(10), paddingHorizontal: wp(2)},
                        ]}>
                        {AppLocalizedStrings.quickAdsHomescreen.Media_Files}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                          borderWidth: 1,
                          borderColor: Colors.Neutral200,
                          borderRadius: 8,
                          marginHorizontal: wp(2),
                          marginVertical: hp(1),
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
                              {
                                color: Colors.Neutral700,
                                left: scale(10),
                                width: scale(165),
                              },
                            ]}>
                            {'...' + i?.split('/images/')[1]?.slice(-11)}
                          </Text>
                        </View>
                        {/* <TouchableOpacity style={{alignItems: 'center'}}>
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
                        </TouchableOpacity> */}
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
                        {/* <View style={{alignItems: 'center'}}>
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
                        </View> */}
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

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    borderRadius: 8,
                    marginVertical: hp(2),
                    paddingHorizontal: wp(2),
                  }}>
                  <Text
                    style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                    {AppLocalizedStrings.quickAdsHomescreen.Disclosure_notices}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      color: Colors.Neutral900,
                      paddingVertical: hp(1),
                    }}>
                    This job includes 3 notices
                  </Text>
                  <View
                    style={[
                      styles.mainBoxStyle,
                      {
                        height: scale(36),
                        bottom: 10,
                      },
                    ]}>
                    <SVG.IButton />
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.boxTextStyle,
                        {
                          height: scale(20),
                          paddingLeft: wp(2),
                          paddingTop: hp(0.2),
                        },
                      ]}>
                      This job includes 1 notices
                    </Text>
                  </View>
                  <View style={styles.rightCardStyle}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SVG.IButton />
                      <Text
                        style={[
                          styles.quickTitleStyle,
                          {fontSize: scale(16), marginHorizontal: 10},
                        ]}>
                        Alcohol
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {marginTop: 10, color: Colors.Primary500},
                      ]}>
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
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    borderRadius: 8,
                    paddingHorizontal: wp(2),
                    paddingVertical: hp(1),
                  }}>
                  <Text style={styles.quickTitleStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.Content_usage}
                  </Text>
                  <View
                    style={[
                      styles.mainBoxStyle,
                      {
                        height: scale(36),
                        bottom: 10,
                        // backgroundColor: Colors.Neutral100,
                      },
                    ]}>
                    <Text
                      numberOfLines={1}
                      style={[styles.boxTextStyle, {height: scale(20)}]}>
                      {jobsData?.content_right}
                    </Text>
                  </View>

                  {jobsData?.customUserRights ==
                  'Social media license' ? null : (
                    <View style={[styles.rightCardStyle, {marginTop: hp(1)}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SVG.IButton />
                        {/* <Image
                          source={noticeIcon}
                          style={{width: scale(24), height: scale(24)}}
                        /> */}
                        <Text
                          style={[
                            styles.quickTitleStyle,
                            {fontSize: scale(16), marginHorizontal: 10},
                          ]}>
                          Custom usage rights
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.quickTitleStyle,
                          {marginTop: 10, color: Colors.Primary500},
                        ]}>
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
                </View>

                <View
                  style={[
                    styles.infoView,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  <Text style={[styles.quickTitleStyle]}>
                    {AppLocalizedStrings.quickAdsHomescreen.influencers_promote}
                  </Text>
                  <Text style={styles.infoText}>{jobsData?.apply_limit}</Text>
                </View>
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
          <View>
            {platfromExpend && (
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 8,
                  paddingHorizontal: wp(2),
                }}>
                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  Platforms to advertise on
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
                      {i?.service_name?.map(sName => {
                        return (
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
                            <Text
                              style={[
                                styles.messageStyle,
                                {
                                  color: Colors.Black,
                                  paddingLeft: 5,
                                  marginTop: 6,
                                },
                              ]}>
                              {sName}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
                <Text style={[styles.quickTitleStyle, {marginTop: scale(20)}]}>
                  Minimum required followers on this platform to accept this job
                </Text>

                <View
                  style={[
                    styles.followerContainer,
                    {
                      marginBottom: scale(15),
                    },
                  ]}>
                  <Text
                    style={[
                      styles.infoText,
                      {
                        paddingHorizontal: 10,
                      },
                    ]}>
                    {jobsData?.minimum_number_follower_influencer_each}
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

          <View>
            {dateTimeExpend && (
              <View
                style={{
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 8,
                  paddingHorizontal: wp(3),
                  paddingTop: hp(2),
                }}>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.When_to_post}
                </Text>
                <View style={[styles.inputStyle]}>
                  <View
                    style={[
                      styles.directionRowStyle,
                      {
                        alignItems: 'center',
                      },
                    ]}>
                    <Text style={[styles.infoText]}>
                      {UtcDateConvert(jobsData?.utcTimeDate)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.inputStyle,
                    {
                      marginBottom: scale(6),
                    },
                  ]}>
                  <View style={[styles.directionRowStyle]}>
                    <Text style={styles.infoText}>
                      {`${UtcTimeConvert(jobsData?.utcTimeDate)}`}
                    </Text>
                  </View>
                  <Text style={[styles.infoText, {marginTop: hp(1)}]}>
                    {`${UtcTimeZoneConvert(jobsData?.timeZone)}`}
                  </Text>
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
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 8,
                  padding: hp(1.6),
                }}>
                <View>
                  <Text style={styles.quickTitleStyle}>
                    {AppLocalizedStrings.quickAdsHomescreen.which_languange}
                  </Text>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.language?.map(i => {
                      return <Text style={styles.infoText}>{i}</Text>;
                    })}
                  </View>
                </View>

                <View
                  style={[
                    {
                      marginTop: 20,
                    },
                  ]}>
                  <Text style={[styles.quickTitleStyle]}>
                    {AppLocalizedStrings.quickAdsHomescreen.set_mood}
                  </Text>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.infoText}>{jobsData?.mood}</Text>
                  </View>
                </View>

                <View
                  style={[
                    {
                      marginTop: 20,
                    },
                  ]}>
                  <Text style={[styles.quickTitleStyle]}>
                    {AppLocalizedStrings.quickAdsHomescreen.Swearing_language}
                  </Text>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.swearing?.map(i => {
                      return <Text style={styles.infoText}>{i}</Text>;
                    })}
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

          <View>
            {targetExpend && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 8,
                  paddingHorizontal: wp(2),
                  paddingBottom: hp(2),
                  marginTop: hp(2),
                }}>
                <View>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.infoText}>{jobsData?.country}</Text>
                  </View>
                </View>
                {jobsData?.state ? (
                  <View>
                    <View style={styles.directionRowStyle}>
                      <Text style={styles.infoText}>{jobsData?.state}</Text>
                    </View>
                  </View>
                ) : (
                  ''
                )}

                {jobsData?.city ? (
                  <View>
                    <View style={styles.directionRowStyle}>
                      <Text style={styles.infoText}>{jobsData?.city}</Text>
                    </View>
                  </View>
                ) : (
                  ''
                )}

                <View>
                  <View style={styles.directionRowStyle}>
                    {jobsData?.target?.map(i => {
                      return <Text style={styles.infoText}>{i} year olds</Text>;
                    })}
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
                <View style={styles.paymentContainer}>
                  <Text style={[styles.infoText, {bottom: 3}]}>$</Text>
                  <Text
                    style={{
                      fontSize: scale(15),
                      color: Colors.Neutral800,
                      paddingTop: hp(0.5),
                      paddingLeft: wp(2),
                    }}>
                    {jobsData?.particularPrice} USD
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsViewJobComponent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
    height: Dimensions.get('window').height - StatusBar.currentHeight - 20,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    // justifyContent: 'space-between',
    width: '100%',
    height: '46@s',
    borderWidth: 1,
    borderRadius: '5@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
    marginTop: '10@s',
    marginBottom: '10@s',
    // backgroundColor: Colors.Neutral100,
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '18@s',
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
    marginTop: '6@s',
    // // height: '30@s',
    // marginTop: '6@s',
    // marginVertical: '6@s',
    // borderWidth: 1,
    // borderRadius: '3@s',
    // borderColor: Colors.Neutral300,
    // paddingHorizontal: '10@s',
    // color: Colors.Neutral500,
  },
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignContent: 'center',
    // paddingVertical: '10@s',
  },
  dateTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
    // top: '5@s',
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
    // borderWidth: 1,
    // borderRadius: '3@s',
    // borderColor: Colors.Neutral300,
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
    padding: '15@s',
    borderRadius: 8,
    marginBottom: '10@s',
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
  },
  platformInputStyle: {
    marginTop: '8@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: hp(1),
  },

  loaderMainView: {
    marginTop: hp(2),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    paddingVertical: hp(1),
  },
  progressTitle: {
    color: Colors.Primary400,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  dueDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderRadius: 7,
    marginTop: hp(1),
  },
  dueTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '400',
  },
  dueTitleSec: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '600',
  },
  infoText: {
    fontWeight: '400',
    color: '#171717',
    fontSize: '14@s',
    paddingTop: '10@s',
  },
  infoView: {
    paddingVertical: '10@s',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
  },
});
