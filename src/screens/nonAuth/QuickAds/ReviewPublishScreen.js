import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {Divider, LinearProgress} from 'react-native-elements';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const ReviewPublishScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle="Review and publish" />
        <View style={styles.dataCardContainer}>
          <View style={{width: scale(300)}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../assets/images/fastPayout.png')}
                style={styles.cardPhotoStyle}
              />
              <View
                style={{
                  marginHorizontal: 10,
                  width: scale(215),
                }}>
                <Text style={[styles.cardNameStyle, {fontSize: scale(16)}]}>
                  quick ads title
                </Text>
                <Text
                  numberOfLines={3}
                  style={[
                    styles.cardDecStyle,
                    {color: Colors.Neutral500, paddingTop: hp(1)},
                  ]}>
                  bio
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
              <Text style={styles.cardNameStyle}>10</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>Due date</Text>
              <Text style={styles.cardNameStyle}>26 Aug 21 6:30pm BST</Text>
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
              {/* {createJob.language?.length > 1 ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.cardNameStyle}>
                    {createJob?.language[0]}
                  </Text>
                  <Text style={{color: Colors.Neutral500}}> More...</Text>
                </View>
              ) : ( */}
              <Text style={styles.cardNameStyle}>English</Text>
              {/* {/ )} /} */}
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Platform}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* {createJob?.platform.map((item, index) => ( */}
                <View
                  style={{paddingRight: 5}}
                  // key={index}
                >
                  {/* {renderPlatformLogo(item.platform_name)} */}
                  <Text>instagram</Text>
                </View>
                {/* ))} */}
              </View>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Followers}
              </Text>
              <Text style={styles.cardNameStyle}>2111111+</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Target}
              </Text>
              <Text style={styles.cardNameStyle}>100+</Text>
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
                $25 per influencer
              </Text>
            </View>
            <TouchableOpacity
              style={styles.cardButtonStyle}
              onPress={() => navigation.goBack('')}>
              <Text style={styles.cardButtonTextStyle}>View</Text>
            </TouchableOpacity>
            <View style={{marginTop: scale(15)}}>
              <LinearProgress
                trackColor={Colors.Primary500}
                value={0.5}
                style={{height: scale(10), borderRadius: 5}}
                color={Colors.Primary500}
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
        <View>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={{marginTop: hp(1)}}>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>$25.00 x 10 influencers</Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>$250.00</Text>
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
                <Text style={styles.cardNameStyle}>$300.00</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                Previous deposits for this QuickAd{'\n'}
                <Text
                  style={[
                    styles.cardDecStyle,
                    {color: Colors.Neutral400, fontSize: 14},
                  ]}>
                  24 August 2021 6:50 PM PST
                </Text>
              </Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>$600.00</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: hp(3)}}>
            <Text style={styles.summaryTitle}>Payment method</Text>
            <View style={styles.addTitleView}>
              <Text style={styles.plaeseTitle}>Card ending in 1009</Text>

              {/* {paymentMethods ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PaymentMethodsScreen', {
                      depositFundes: 'DepositFundsScreen',
                    })
                  }>
                  <Text style={styles.addTitle}>Add new</Text>
                </TouchableOpacity>
              ) : ( */}
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('ChangePaymentMethodsScreen')
              // }
              >
                <Text style={styles.addTitle}>Change</Text>
              </TouchableOpacity>
              {/* )} */}
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: '#D1EBFA',
                },
              ]}>
              <Text style={styles.buttonTitle}>We’ll refund you: $300.00</Text>
            </TouchableOpacity>
            <PrimaryButton
              title={
                // loading ? (
                //   <View
                //     style={{
                //       width: wp('93%'),
                //       justifyContent: 'center',
                //     }}>
                //     <ActivityIndicator
                //       color={Colors.White}
                //       size={'small'}
                //       style={{marginTop: hp(1)}}
                //     />
                //   </View>
                // ) : (
                'Publish'
                // )
              }
              //   onPress={handleCreateJob}
            />
            <Text
              style={[
                styles.cardDecStyle,
                {marginTop: 20, color: Colors.Neutral500, fontSize: 15},
              ]}>
              Please wait up to 7 days for your refund
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewPublishScreen;

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
    marginTop: hp(-5),
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
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '400',
  },
  button: {
    width: wp('93%'),
    height: '48@s',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: '10@s',
  },
  buttonTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
