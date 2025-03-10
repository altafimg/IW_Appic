import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PasswordChangedThanksScreen = ({navigation}) => {
  const onReturnHandler = () => {
    navigation.navigate('LoginSecurityScreen');
  };
  return (
    <View style={styles.container}>
      <Text></Text>
      <View style={styles.main}>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.passwordChangedThanksScreen.passwordChanged}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.passwordChangedThanksScreen.return}
        onPress={onReturnHandler}
      />
    </View>
  );
};

export default PasswordChangedThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingBottom: wp(5),
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-5),
  },
  helpButton: {
    alignSelf: 'flex-end',
  },
  helpTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
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
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(5),
  },
  receiveTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  resendTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
