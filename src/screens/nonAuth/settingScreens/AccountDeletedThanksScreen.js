import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AccountDeletedThanksScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onDoneHandler = () => {
    // navigation.navigate('CantDeleteAccountScreen');
    navigation.navigate('WelcomeScreen');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <View>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.accountDeletedThanksScreen.account}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.accountDeletedThanksScreen.please}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.button.done}
        onPress={onDoneHandler}
      />
    </View>
  );
};

export default AccountDeletedThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingBottom: wp(5),
    paddingHorizontal: wp(3),
  },
  image: {
    alignSelf: 'center',
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
});
