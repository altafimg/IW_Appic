import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AnalyticsScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={AppLocalizedStrings.analyticsScreen.analytics}
            subTitle="1 October - 7 October 2022"
          />
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.title}>
                {AppLocalizedStrings.analyticsScreen.previous}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.title}>
                {AppLocalizedStrings.analyticsScreen.next}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weekView}>
            <Text style={styles.weekTitle}>Week</Text>
            <Text style={styles.dateTitle}>23 Jul 2021 - 30 Jul 2021</Text>
            <Text style={styles.dateTitle}>
              {AppLocalizedStrings.analyticsScreen.discovered}
            </Text>
            <View style={styles.stateMainView}>
              <View>
                <View style={styles.stateView}>
                  <Text style={styles.stateTitle}>United Kingdom</Text>
                  <Text style={styles.cityTitle}>London</Text>
                  <Text style={styles.cityTitle}>Manchester</Text>
                </View>
                <View>
                  <Text style={styles.stateTitle}>United Arab Emirates</Text>
                  <Text style={styles.cityTitle}>Dubai</Text>
                  <Text style={styles.cityTitle}>Abu Dhabi</Text>
                </View>
              </View>
              <View>
                <View style={styles.stateView}>
                  <Text style={styles.stateTitle}>Category</Text>
                  <Text style={styles.cityTitle}>Gaming</Text>
                  <Text style={styles.cityTitle}>Sports</Text>
                </View>
                <View>
                  <Text style={styles.stateTitle}>Category</Text>
                  <Text style={styles.cityTitle}>Fashion</Text>
                  <Text style={styles.cityTitle}>Hair and Beauty</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.chartMainView}>
            <View style={styles.chartHeaderView}>
              <Text style={styles.dataTitle}>
                {AppLocalizedStrings.analyticsScreen.dataAnalytics}:
              </Text>
              <Text style={styles.profileTitle}>
                {AppLocalizedStrings.analyticsScreen.profileViews}
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/chart.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.chartMainView}>
            <View style={styles.chartHeaderView}>
              <Text style={styles.dataTitle}>
                {AppLocalizedStrings.analyticsScreen.dataAnalytics}:
              </Text>
              <Text style={styles.profileTitle}>
                {AppLocalizedStrings.analyticsScreen.profileViews}
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/chart2.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.totalTitle}>
              {AppLocalizedStrings.analyticsScreen.total}
            </Text>
            <Text style={styles.purchasedTitle}>
              You purchased 8 jobs this week
            </Text>
            <View style={styles.bookingMainView}>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>
                  {AppLocalizedStrings.analyticsScreen.bookings}
                </Text>
                <Text style={styles.purchasedTitle}>2</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>
                  {AppLocalizedStrings.analyticsScreen.advertisements}
                </Text>
                <Text style={styles.purchasedTitle}>3</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>
                  {AppLocalizedStrings.analyticsScreen.musicServices}
                </Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>
                  {AppLocalizedStrings.analyticsScreen.actingServices}
                </Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingViewSec}>
                <Text style={styles.purchasedTitle}>
                  {AppLocalizedStrings.analyticsScreen.totalValue}
                </Text>
                <Text style={styles.totalTitle}>$8,200.00</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.totalTitle}>
              {AppLocalizedStrings.analyticsScreen.proposalsReceived}
            </Text>
            <Text style={styles.purchasedTitle}>
              You purchased 8 jobs this week
            </Text>
            <View style={styles.bookingMainView}>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Bookings</Text>
                <Text style={styles.purchasedTitle}>2</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Advertisements</Text>
                <Text style={styles.purchasedTitle}>3</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Music services</Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Acting services</Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingViewSec}>
                <Text style={styles.purchasedTitle}>Total value</Text>
                <Text style={styles.totalTitle}>$8,200.00</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.totalTitle}>
              Proposals received during boost
            </Text>
            <Text style={styles.purchasedTitle}>
              You purchased 8 jobs this week
            </Text>
            <View style={styles.bookingMainView}>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Bookings</Text>
                <Text style={styles.purchasedTitle}>2</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Advertisements</Text>
                <Text style={styles.purchasedTitle}>3</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Music services</Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingView}>
                <Text style={styles.purchasedTitle}>Acting services</Text>
                <Text style={styles.purchasedTitle}>1</Text>
              </View>
              <View style={styles.bookingViewSec}>
                <Text style={styles.purchasedTitle}>Total value</Text>
                <Text style={styles.totalTitle}>$8,200.00</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.totalTitle}>
              {AppLocalizedStrings.analyticsScreen.returnInvestment}
            </Text>
            <Text style={styles.successTitle}>
              {AppLocalizedStrings.analyticsScreen.success}
            </Text>
            <Text style={styles.spendTitle}>
              Your total spend was $12.00 on boosts this week You received 22
              job proposals thanks to this boost
            </Text>
            <Text style={[styles.combinedTitle, styles.combinedTitleSec]}>
              Combined value of $19,200.00
            </Text>
            <Text style={styles.combinedTitle}>
              That’s a 183x return on your investment
            </Text>
            <Text style={styles.spendTitle}>
              {AppLocalizedStrings.analyticsScreen.goodLuck}
            </Text>
            <Text style={styles.InfluenceWithTitle}>
              {AppLocalizedStrings.analyticsScreen.influenceWith}
            </Text>
          </View>
        </View>
        <PrimaryButton title={AppLocalizedStrings.analyticsScreen.boost} />
      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(-3),
  },
  button: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    height: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    width: '158@s',
  },
  title: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
  weekView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginVertical: hp(2),
  },
  weekTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    lineHeight: '22@s',
  },
  dateTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  stateMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
  },
  stateView: {
    marginRight: wp(20),
    marginBottom: hp(2),
  },
  stateTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  cityTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  chartMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginBottom: hp(2),
  },
  chartHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dataTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '600',
    lineHeight: '20@s',
  },
  profileTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  image: {
    alignSelf: 'center',
    marginTop: hp(4),
  },
  bottomView: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    marginBottom: hp(2),
  },
  totalTitle: {
    color: Colors.Neutral700,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '24@s',
    paddingBottom: hp(0.4),
  },
  purchasedTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  bookingMainView: {
    marginTop: hp(2),
  },
  bookingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
    marginBottom: hp(1),
  },
  successTitle: {
    color: Colors.Success500,
    fontSize: '16@s',
    fontWeight: '500',
    lineHeight: '28@s',
  },
  spendTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(2),
  },
  combinedTitle: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '20@s',
  },
  combinedTitleSec: {
    paddingTop: hp(2),
  },
  InfluenceWithTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(2),
    paddingBottom: hp(7),
  },
});
