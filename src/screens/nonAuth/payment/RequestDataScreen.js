import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RequestDataScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle={AppLocalizedStrings.requestDataScreen.request} />
        <Text style={[styles.paragraph, styles.paragraphTop]}>
          {AppLocalizedStrings.requestDataScreen.take}
        </Text>
        <Text style={[styles.paragraph, styles.paragraphMiddel]}>
          {AppLocalizedStrings.requestDataScreen.notice}
        </Text>
        <Text style={[styles.paragraph, styles.paragraphBottom]}>
          {AppLocalizedStrings.requestDataScreen.following}
        </Text>
        <Text style={styles.paragraphSec}>
          {AppLocalizedStrings.requestDataScreen.information}
        </Text>
        <Text style={styles.paragraphSec}>
          {AppLocalizedStrings.requestDataScreen.jobs}
        </Text>
        <Text style={styles.paragraphSec}>
          {AppLocalizedStrings.requestDataScreen.record}
        </Text>
        <Text style={styles.paragraphSec}>
          {AppLocalizedStrings.requestDataScreen.chat}
        </Text>
        <View style={styles.textinput}>
          <DetailsTextInput
            title={AppLocalizedStrings.requestDataScreen.enter}
            editable={true}
          />
        </View>
      </View>
      <PrimaryButton title={AppLocalizedStrings.button.submit} />
    </View>
  );
};

export default RequestDataScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },
  paragraph: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  paragraphTop: {
    paddingBottom: hp(5),
  },
  paragraphMiddel: {
    paddingBottom: hp(3),
  },
  paragraphBottom: {
    paddingBottom: hp(3),
  },
  paragraphSec: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '600',
    lineHeight: '19@s',
    paddingVertical: hp(0.7),
  },
  textinput: {
    marginTop: hp(4),
  },
});
