import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RealAccountHolderScreen = ({navigation}) => {
  const onContinueHandler = () => {
    navigation.navigate('LinkExpiredScreen');
  };
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.realAccountHolderScreen.goodNews}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.realAccountHolderScreen.able}
        </Text>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.realAccountHolderScreen.access}
        </Text>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      </View>
    </View>
  );
};

export default RealAccountHolderScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.White,
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
  bottomTitle: {
    fontSize: '12@s',
    fontWeight: '700',
    color: Colors.Neutral700,
    textAlign: 'center',
    paddingTop: hp(4),
    paddingBottom: hp(8),
  },
});
