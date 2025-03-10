import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import BackArrow from '../../../components/buttons/BackArrow';
import {useSelector} from 'react-redux';

const VerifyLittleTimmyScreen = ({navigation, route}) => {
  const check = route?.params?.check;

  const onContinueHandler = () => {
    navigation.navigate('UploadGovIDScreen', {check: check});
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <View>
        <SVG.VerifyLittleTimmy style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.verifyLittleTimmyScreen.last}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.verifyLittleTimmyScreen.lorem}
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.button.continue}
        onPress={onContinueHandler}
      />
    </View>
  );
};

export default VerifyLittleTimmyScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
    lineHeight: '20@s',
  },
  image: {
    alignSelf: 'flex-start',
    marginLeft: wp(-5),
  },
});
