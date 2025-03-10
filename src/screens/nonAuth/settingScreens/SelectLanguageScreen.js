import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SelectLanguageScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.selectLanguageScreen.selectLanguage}
          subTitle={'We will translate all messages into your chosen language.'}
        />
        <View style={styles.main}>
          <View style={styles.cradView}>
            <SVG.RadioButtonFill style={styles.radioIcon} />
            <View style={styles.flagView}>
              <SVG.UsFlag />
              <Text style={styles.title}>English (US)</Text>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.cradView}>
            <SVG.RadioButton style={styles.radioIcon} />
            <View style={styles.flagView}>
              <SVG.UsFlag />
              <Text style={styles.title}>Spanish</Text>
            </View>
          </View>
        </View>
      </View>
      <PrimaryButton title={AppLocalizedStrings.button.save} />
    </View>
  );
};

export default SelectLanguageScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  main: {
    marginTop: hp(-3),
    marginVertical: hp(3.5),
  },
  cradView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  radioIcon: {
    marginRight: wp(5),
  },
  flagView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '600',
    paddingLeft: wp(3),
  },
});
