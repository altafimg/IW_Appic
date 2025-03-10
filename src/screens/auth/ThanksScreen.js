import {Text, View} from 'react-native';
import React from 'react';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';

const ThanksScreen = ({navigation}) => {
  const onThanksHandler = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Thanks />
        <Text style={styles.title}>
          {AppLocalizedStrings.thanksScreen.wooo}
        </Text>
        <Text style={styles.subTitle}>Lorem ipsum</Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.thanksScreen.login}
        onPress={onThanksHandler}
      />
    </View>
  );
};

export default ThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
  title: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingTop: hp(8),
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
  },
});
