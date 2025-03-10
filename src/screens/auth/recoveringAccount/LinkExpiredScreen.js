import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const LinkExpiredScreen = ({navigation}) => {
  const onStartAganHandler = () => {
    navigation.navigate('SignupScreen');
  };
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.linkExpiredScreen.linkExpired}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.linkExpiredScreen.security}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.linkExpiredScreen.startAgain}
        onPress={onStartAganHandler}
      />
    </View>
  );
};

export default LinkExpiredScreen;

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
});
