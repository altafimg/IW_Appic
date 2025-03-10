import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ThanksLogoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.ThanksLogout style={styles.image} />
        <Text style={styles.headTitle}>
          {AppLocalizedStrings.thanksLogoutScreen.thanks}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.thanksLogoutScreen.review}
        </Text>
      </View>
      <View>
        <PrimaryButton title={AppLocalizedStrings.thanksLogoutScreen.logout} />
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.thanksLogoutScreen.request}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThanksLogoutScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
  },
  headTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '26@s',
    textAlign: 'center',
    marginTop: hp(5),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    textAlign: 'center',
  },
  accountButton: {
    alignSelf: 'center',
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
