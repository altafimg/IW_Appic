import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SupportInboxScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onStartHandler = () => {
    navigation.navigate('DescribeIssueScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <SVG.Translate />
        </View>
        <Header
          headerTitle={AppLocalizedStrings.supportInboxScreen.supportInbox}
        />
        <View style={styles.topView}>
          <DetailsTextInput placeholder="Search" />
          <View style={styles.twoButtonView}>
            <TouchableOpacity style={styles.leftButtonView}>
              <Text style={styles.openTitle}>
                {AppLocalizedStrings.supportInboxScreen.openCases}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButtonView}>
              <Text style={styles.closedTitle}>
                {AppLocalizedStrings.supportInboxScreen.closedCases}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.supportInboxScreen.startNewChat}
        onPress={onStartHandler}
      />
    </View>
  );
};

export default SupportInboxScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topView: {
    marginTop: hp(-8),
  },
  twoButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    backgroundColor: Colors.Neutral100,
    height: '45@s',
    borderRadius: 5,
  },
  leftButtonView: {
    backgroundColor: Colors.Primary500,
    width: '50%',
    alignItems: 'center',
    marginLeft: wp(1.5),
    borderRadius: 5,
  },
  openTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '500',
    paddingVertical: hp(1),
  },
  rightButtonView: {
    // backgroundColor: Colors.Neutral100,
    width: '50%',
    alignItems: 'center',
    borderRadius: 5,
  },
  closedTitle: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '500',
    paddingVertical: hp(0.7),
  },
});
