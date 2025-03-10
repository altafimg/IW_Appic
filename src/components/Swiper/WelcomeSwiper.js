import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

const WelcomeSwiper = () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={2.5}
      autoplayLoop
      showPagination
      paginationStyle={styles.pagination}
      paginationStyleItemInactive={styles.paginationStyleII}
      paginationStyleItemActive={styles.paginationStyleIA}>
      {/* First Slide */}
      <View style={styles.swiperContainer}>
        <SVG.Welcome1 width={'100%'} height={'40%'} style={styles.icon} />
        <View style={styles.cradView}>
          <Text style={styles.swiperText}>
            {AppLocalizedStrings.welcomeScreen.influencers}
          </Text>
          <Text style={styles.swiperText1}>
            {AppLocalizedStrings.welcomeScreen.influencersParagraph}
          </Text>
        </View>
      </View>
      {/* Second Slide */}
      <View style={styles.swiperContainer}>
        <SVG.Welcome2 width={'100%'} height={'40%'} style={styles.icon} />
        <View style={styles.cradView}>
          <Text style={styles.swiperText}>
            {AppLocalizedStrings.welcomeScreen.chat}
          </Text>
          <Text style={styles.swiperText1}>
            {AppLocalizedStrings.welcomeScreen.chatParagraph}
          </Text>
        </View>
      </View>
      {/* Third Slide */}
      <View style={styles.swiperContainer}>
        <SVG.Welcome3 width={'100%'} height={'40%'} style={styles.icon} />
        <View style={styles.cradView}>
          <Text style={styles.swiperText}>
            {AppLocalizedStrings.welcomeScreen.quickAds}
          </Text>
          <Text style={styles.swiperText1}>
            {AppLocalizedStrings.welcomeScreen.quickAdsParagraph}
          </Text>
        </View>
      </View>
    </SwiperFlatList>
  );
};

export default WelcomeSwiper;

const styles = ScaledSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  dotStyle: {
    width: 15,
    height: 8,
  },
  paginationStyleII: {
    backgroundColor: Colors.Neutral300,
    width: scale(15),
    height: scale(4),
    borderRadius: scale(54),
  },
  paginationStyleIA: {
    backgroundColor: Colors.Primary500,
    width: scale(15),
    height: scale(4),
    borderRadius: scale(54),
  },
  pagination: {
    bottom: '120@s',
    width: '50@s',
  },
  swiperContainer: {
    marginTop: '30@s',
    width: Dimensions.get('window').width,
  },
  cradView: {
    marginTop: scale(100),
  },
  icon: {
    alignSelf: 'center',
    marginVertical: hp(5),
  },
  swiperText: {
    fontSize: '21@s',
    fontWeight: '600',
    marginHorizontal: '10@s',
    textAlign: 'center',
    color: Colors.Neutral900,
  },
  swiperText1: {
    fontSize: '12@s',
    fontWeight: '400',
    marginHorizontal: '10@s',
    textAlign: 'center',
    color: Colors.Neutral700,
    marginTop: '10@s',
  },
});
