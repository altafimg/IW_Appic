import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const CantDeleteAccountScreen = ({navigation}) => {
  const onReturnHandler = () => {
    navigation.navigate('LoginSecurityScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <SVG.DontHaveID style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.cantDeleteAccountScreen.weCant}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.cantDeleteAccountScreen.youCannot}
        </Text>
        <Text style={styles.redTitle}>
          {AppLocalizedStrings.cantDeleteAccountScreen.unfinishedJobs}
        </Text>
        <Text style={styles.redTitle}>
          {AppLocalizedStrings.cantDeleteAccountScreen.withdraw}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.cantDeleteAccountScreen.return}
        onPress={onReturnHandler}
      />
    </View>
  );
};

export default CantDeleteAccountScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    marginTop: hp(13),
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(8),
    textAlign: 'center',
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(1),
    textAlign: 'center',
    lineHeight: '20@s',
  },
  redTitle: {
    color: Colors.Destructive500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(1),
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
});
