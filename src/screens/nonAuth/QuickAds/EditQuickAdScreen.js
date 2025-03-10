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
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import JobDetailsProfileView from '../../../components/nonAuth/toDoList/JobDetailsProfileView';
import SVG from '../../../assets/svg';
import moment from 'moment';

// images
import downArrow from '../../../assets/images/downArrow.png';
import date from '../../../assets/images/date.png';
import time from '../../../assets/images/time.png';
import image from '../../../assets/images/image.png';
import noticeIcon from '../../../assets/images/noticeIcon.png';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import dot from '../../../assets/images/dot.png';
import {Divider} from 'react-native-paper';
import CreateNewPaymentPopup from '../../../components/popups/CreateNewPaymentPopup';

const EditQuickAdScreen = ({navigation}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [expend, setExpend] = useState(false);
  const [platfromExpend, setPlatformExpend] = useState(false);
  const [dateTimeExpend, setDateTimeExpend] = useState(false);
  const [paymentExpend, setPaymentExpend] = useState(false);
  const [targetExpend, setTargetExpend] = useState(false);
  const [vibeExpend, setVibeExpend] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [currency, setCurrency] = useState('USD - United states dollar');

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
        //   user_id={user_id}
        //   userProfileName={userProfileName}
        //   userProfilePicture={userProfilePicture}
        //   userData={jobsData}
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
                Deliver this job by Friday 9 April 2002
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Neutral600,
                  textAlign: 'center',
                  paddingTop: hp(0.5),
                }}>
                8.22am Pacific time
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
              placeholder="BIO"
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
              source={require('../../../assets/images/fastPayout.png')}
              style={styles.backgroundImage}
            />

            <View
              style={[
                styles.mainBoxStyle,
                {backgroundColor: Colors.Neutral100},
              ]}>
              {/* {jobsData?.category?.map(i => { */}
              {/* return ( */}
              <Text numberOfLines={1} style={[styles.boxTextStyle]}>
                category
              </Text>
              {/* ); */}
              {/* })} */}
            </View>
            <View
              style={[
                styles.mainBoxStyle,
                {backgroundColor: Colors.Neutral100},
              ]}>
              <Text numberOfLines={1} style={[styles.boxTextStyle]}>
                Applicants must be 21+ years
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
                  bio
                </Text>

                <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
                  {AppLocalizedStrings.quickAdsHomescreen.Website_link}
                </Text>
                <TextInput
                  placeholder="website_link"
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

                {/* {jobsData?.images?.map(i => { */}
                {/* const urlParts = i.split(`/`); */}
                {/* const imageName = urlParts[urlParts.length - 1]; */}
                {/* return ( */}
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
                        // source={{uri: i}}
                        source={require('../../../assets/images/fastPayout.png')}
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
                        image Name
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
                {/* ); */}
                {/* })} */}
                {/* {jobsData?.video?.map(i => { */}
                {/* return ( */}
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
                        source={require('../../../assets/images/fastPayout.png')}
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
                        video url
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
                {/* ); */}
                {/* })} */}

                {/* {jobsData?.audio?.map(i => { */}
                {/* return ( */}
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
                        audio
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
                {/* ); */}
                {/* })} */}

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
                    Custom rights
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
                    custom User Rights
                  </Text>
                </View>
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
                  apply limit
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
                {/* {jobsData?.platform?.map((i, index) => { */}
                {/* return ( */}
                <View style={styles.platformInputStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 6,
                    }}>
                    <View style={{paddingRight: 5}}>
                      {/* {renderPlatformLogo(i.platform_name)} */}
                    </View>
                    <Text style={[styles.messageStyle, {color: Colors.Black}]}>
                      {/* {i?.platform_name} */}
                      instagram
                    </Text>
                  </View>
                  {/* {i?.service_name?.map(sName => { */}
                  {/* return ( */}
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
                          paddingLeft: 10,
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
                      {/* {sName} */}
                      story
                    </Text>
                  </View>
                  {/* ); */}
                  {/* })} */}
                </View>
                {/* ); */}
                {/* })} */}
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
                      color: Colors.Neutral900,
                      fontSize: 14,
                      fontWeight: '400',
                    }}>
                    {/* {jobsData?.minimum_number_follower_influencer_each}+ */}
                    10000000 +
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
                      {moment().format('dddd, D MMMM YYYY')}
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
                      {/* {moment(endtime).format('LT')} {''}
                        {moment(endtime).locale()} */}
                      time
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
                    {/* {jobsData?.language?.map(i => { */}
                    {/* return  */}
                    <Text style={styles.dateTextStyle}>language</Text>
                    {/* })} */}
                    <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    />
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
                    <Text style={styles.dateTextStyle}>mood</Text>
                    <Image
                      source={downArrow}
                      style={{
                        width: scale(23),
                        height: scale(23),
                        top: scale(5),
                      }}
                    />
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
                    {/* {jobsData?.swearing?.map(i => { */}
                    {/* return  */}
                    <Text style={styles.dateTextStyle}>swearing</Text>
                    {/* })} */}

                    <Image
                      source={downArrow}
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
                    <Text style={[styles.dateTextStyle]}>country</Text>
                    <Image
                      source={downArrow}
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
                    {marginTop: scale(15), backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={[styles.dateTextStyle]}>state</Text>
                    <Image
                      source={downArrow}
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
                    {marginTop: scale(15), backgroundColor: Colors.Neutral100},
                  ]}>
                  <View style={styles.directionRowStyle}>
                    <Text style={[styles.dateTextStyle]}>city</Text>
                    <Image
                      source={downArrow}
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
                  <View style={styles.directionRowStyle}>
                    {/* {jobsData?.target?.map(i => { */}
                    {/* return ( */}
                    <Text style={styles.dateTextStyle}>2122 year olds</Text>
                    {/* ); */}
                    {/* })} */}
                    <Image
                      source={downArrow}
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

          <View style={{marginTop: 10}}>
            {paymentExpend && (
              <View>
                <Text style={styles.quickTitleStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.Payment_offered}
                </Text>
                <View style={styles.paymentContainer}>
                  <Text style={[styles.boxTextStyle, {right: 3}]}>$</Text>
                  <TextInput
                    placeholder="50.00"
                    onChangeText={p => {
                      setPrice(p);
                    }}
                    // value={price}
                    keyboardType="number-pad"
                    placeholderTextColor={Colors.Neutral500}
                    style={{
                      height: scale(36),
                      width: scale(250),
                      fontSize: scale(15),
                      color: Colors.Neutral900,
                    }}
                  />
                  <Text
                    onPress={() => {
                      setCurrencyVisible(true);
                    }}
                    style={[
                      styles.boxTextStyle,
                      {color: Colors.Neutral500, fontWeight: '400'},
                    ]}>
                    {currency?.split('-')?.[0]}
                  </Text>
                </View>

                <Text
                  style={
                    (styles.messageStyle,
                    {
                      color: Colors.Neutral500,
                      marginBottom: scale(15),
                    })
                  }>
                  {AppLocalizedStrings.quickAdsHomescreen.Per_Influencer}
                </Text>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: Colors.Neutral100,
                    padding: scale(10),
                    marginBottom: scale(15),
                  }}>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.quickTitleStyle}>
                      {AppLocalizedStrings.quickAdsHomescreen.summary}
                    </Text>
                    <Text style={{color: Colors.Neutral400}}>
                      {AppLocalizedStrings.quickAdsHomescreen.only_you}
                    </Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {color: Colors.Neutral500},
                      ]}>
                      {/* {price ? `$ ${price} ` : 'Payment'} x */}
                      100 x 10 influencers
                      {/* {influencer
                        ? ` ${influencer} influencers`
                        : ' Infuencers'} */}
                    </Text>
                    <Text style={styles.quickTitleStyle}>$1000</Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {color: Colors.Neutral500},
                      ]}>
                      {AppLocalizedStrings.quickAdsHomescreen.taxes}
                    </Text>
                    <Text style={styles.quickTitleStyle}>${100}</Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[styles.quickTitleStyle, {fontSize: scale(16)}]}>
                      {AppLocalizedStrings.quickAdsHomescreen.total_price}
                    </Text>
                    <Text
                      style={[styles.quickTitleStyle, {fontSize: scale(16)}]}>
                      $1100
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ReviewPublishScreen')}
          activeOpacity={0.6}
          style={[
            styles.buttonStyle,
            {marginTop: scale(40), marginBottom: scale(15)},
          ]}>
          <Text style={styles.buttonTextStyle}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.allCompleteText}>
          complete all of the fields above to continue
        </Text>
      </ScrollView>
      <CreateNewPaymentPopup
        currencyVisible={currencyVisible}
        setCurrencyVisible={setCurrencyVisible}
        currency={currency}
        setCurrency={setCurrency}
      />
    </SafeAreaView>
  );
};

export default EditQuickAdScreen;

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
    color: Colors.Neutral400,
    textAlign: 'center',
    marginBottom: '20@s',
  },
  cardMainContainer: {
    borderWidth: 1,
    marginTop: '15@s',
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingBottom: '10@s',
  },
  inputStyle: {
    height: '36@s',
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
});
