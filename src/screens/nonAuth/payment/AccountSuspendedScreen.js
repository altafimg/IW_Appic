import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AccountSuspendedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.AccountSuspended style={styles.image} />
        <Text style={styles.headTitle}>
          {AppLocalizedStrings.accountSuspendedScreen.suspended}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.accountSuspendedScreen.account}
        </Text>
      </View>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.accountSuspendedScreen.appeal}
        />
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.accountSuspendedScreen.request}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.logoutTitle, styles.logoutTitle]}>
            {AppLocalizedStrings.accountSuspendedScreen.logout}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountSuspendedScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  image: {
    alignSelf: 'center',
    marginBottom: hp(5),
  },
  headTitle: {
    color: Colors.Neutral900,
    fontWeight: '600',
    fontSize: '22@s',
    lineHeight: '26@s',
    textAlign: 'center',
    paddingBottom: hp(1),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontWeight: '400',
    fontSize: '12@s',
    lineHeight: '20@s',
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
  logoutTitle: {
    color: Colors.Destructive500,
  },
});
