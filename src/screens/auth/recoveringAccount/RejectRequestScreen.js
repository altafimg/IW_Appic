import React from 'react';
import {Text, View} from 'react-native';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RejectRequestScreen = ({navigation}) => {
  const onSorryHandler = () => {
    // navigation.replace('BadActorScreen');
    navigation.replace('LoginSecurityScreen');
  };
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Sorry style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.rejectRequestScreen.urgent}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.rejectRequestScreen.received}
        </Text>
        <Text style={styles.SecSubTitle}>
          {AppLocalizedStrings.rejectRequestScreen.ensure}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.rejectRequestScreen.login}
        onPress={onSorryHandler}
      />
    </View>
  );
};

export default RejectRequestScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
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
  SecSubTitle: {
    fontSize: '12@s',
    fontWeight: '700',
    color: Colors.Neutral700,
    paddingTop: hp(2),
    textAlign: 'center',
  },
});
