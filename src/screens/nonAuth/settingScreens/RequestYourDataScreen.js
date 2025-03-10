import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RequestYourDataScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onRequestDataThanks = () => {
    navigation.navigate('RequestDataThanksScreen');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={AppLocalizedStrings.requestYourDataScreen.requestData}
          />
          <View style={styles.main}>
            <View>
              <Text style={styles.topParagrf}>
                {AppLocalizedStrings.requestYourDataScreen.weTake}
              </Text>
              <Text style={styles.middelPeragraph}>
                {AppLocalizedStrings.requestYourDataScreen.soYou}
              </Text>
              <Text style={styles.topParagrf}>
                {AppLocalizedStrings.requestYourDataScreen.following}
              </Text>
            </View>
            <View style={styles.bottomCardView}>
              <Text style={styles.title}>
                {AppLocalizedStrings.requestYourDataScreen.userInformation}
              </Text>
              <Text style={styles.title}>
                {AppLocalizedStrings.requestYourDataScreen.recordJobs}
              </Text>
              <Text style={styles.title}>
                {AppLocalizedStrings.requestYourDataScreen.record}
              </Text>
              <Text style={styles.title}>
                {AppLocalizedStrings.requestYourDataScreen.chatLogs}
              </Text>
            </View>
            <DetailsTextInput
              title={AppLocalizedStrings.requestYourDataScreen.enterPass}
            />
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        title={AppLocalizedStrings.button.submit}
        onPress={onRequestDataThanks}
      />
    </View>
  );
};

export default RequestYourDataScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },
  main: {
    marginTop: hp(-3),
  },
  topParagrf: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  middelPeragraph: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingVertical: hp(2.3),
  },
  bottomCardView: {
    marginVertical: hp(3),
  },
  title: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '600',
    lineHeight: '25@s',
  },
});
