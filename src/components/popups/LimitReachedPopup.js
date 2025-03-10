import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Overlay} from 'react-native-elements';
import SVG from '../../assets/svg';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';

const LimitReachedPopup = props => {
  const openReached = props.openReached;
  const setOpenReached = props.setOpenReached;

  return (
    <Overlay
      visible={openReached}
      onBackdropPress={() => setOpenReached(false)}
      onRequestClose={() => setOpenReached(false)}
      animationType="slide"
      overlayStyle={styles.overlayStyle}>
      <View style={styles.overlaythumbStyle} />
      <View
        style={{
          alignItems: 'center',
          marginTop: scale(20),
          marginBottom: scale(10),
        }}>
        <SVG.Time />
        <Text style={styles.limitReached}>
          {AppLocalizedStrings.quickAdsHomescreen.limitReached}
        </Text>
        <Text style={styles.mainTextStyle}>Try in 23h 42m</Text>
        <Text
          style={[
            styles.mainTextStyle,
            {
              marginTop: 10,
              textAlign: 'center',
              color: Colors.Neutral700,
            },
          ]}>
          You can only accept 10 QuickAd jobs per day{'\n'} (24 hours)
          {'\n'}
          {'\n'}We do this to ensure that you do not overwhelm yourself with too
          many jobs, which could result in cancellations if you are unable to
          deliver{'\n'}
          {'\n'}We also want to give other influencers a fair chance at applying
          for available jobs too {'\n'}
          {'\n'}Feel free to save jobs for later
        </Text>
      </View>
    </Overlay>
  );
};

export default LimitReachedPopup;

const styles = ScaledSheet.create({
  overlayStyle: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
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
  limitReached: {
    fontSize: '23@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginVertical: hp(1),
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
});
