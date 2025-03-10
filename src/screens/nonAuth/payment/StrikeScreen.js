import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import {ScaledSheet} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const StrikeScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.strikeScreen.strike}
          subTitle={AppLocalizedStrings.strikeScreen.been}
        />
        <View style={styles.cardView}>
          <SVG.Strike />
          <View style={styles.cardTitleView}>
            <Text style={styles.headTitle}>
              {AppLocalizedStrings.strikeScreen.customerName}
            </Text>
            <Text style={styles.subTitle}>
              {AppLocalizedStrings.strikeScreen.title}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <PrimaryButton title={AppLocalizedStrings.strikeScreen.appeal} />
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.strikeScreen.continue}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={[styles.abTitle, styles.logoutTitle]}>
            {AppLocalizedStrings.strikeScreen.logout}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StrikeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(2),
  },
  cardView: {
    backgroundColor: Colors.Neutral50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    marginVertical: hp(1),
  },
  cardTitleView: {
    paddingHorizontal: wp(2.5),
  },
  headTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '22@s',
  },
  subTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '17@s',
  },
  accountButton: {
    alignSelf: 'center',
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  logoutTitle: {
    color: Colors.Destructive500,
  },
});
