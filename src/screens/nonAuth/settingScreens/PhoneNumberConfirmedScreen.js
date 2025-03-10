import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PhoneNumberConfirmedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.headTitle}>
          {AppLocalizedStrings.phoneNumberConfirmedScreen.confirmed}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.phoneNumberConfirmedScreen.thanks}
        </Text>
      </View>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.phoneNumberConfirmedScreen.return}
          onPress={() => navigation.navigate('LoginSecurityScreen')}
        />
      </View>
    </View>
  );
};

export default PhoneNumberConfirmedScreen;

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
    marginBottom: hp(15),
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
});
