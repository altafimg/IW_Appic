import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RejectDeleteAccountScreen = ({navigation}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('RejectRequestScreen');
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <SVG.Sorry style={styles.image} />
      <Text style={styles.title}>
        {AppLocalizedStrings.rejectDeleteAccountScreen.sorry}
      </Text>
      <Text style={styles.subTitle}>
        {AppLocalizedStrings.rejectDeleteAccountScreen.create}
      </Text>
      <Text style={styles.subTitle}>
        {AppLocalizedStrings.rejectDeleteAccountScreen.funds}
      </Text>
      <Text style={styles.subTitle}>
        {AppLocalizedStrings.rejectDeleteAccountScreen.provide}
      </Text>
    </View>
  );
};

export default RejectDeleteAccountScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  title: {
    fontSize: '22@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingTop: hp(8),
    textAlign: 'center',
    marginTop: hp(5),
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
  },
});
