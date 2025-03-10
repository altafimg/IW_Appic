import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';

const AccountTypeCrad = props => {
  const selectedCard = props.selectedCard;
  const setSelectedCard = props.setSelectedCard;

  const handleCardClick = cardNumber => {
    setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleCardClick(1)}
        style={[
          styles.cardView,
          {
            borderColor:
              selectedCard === 1 ? Colors.Primary500 : Colors.Neutral200,
          },
        ]}>
        <View style={styles.cradHeaderView}>
          <Text style={styles.cardHeaderTitle}>
            {AppLocalizedStrings.signupScreen.customerAccount}
          </Text>
          {selectedCard === 1 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
        <Text style={styles.cardSubTitle}>
          {AppLocalizedStrings.signupScreen.accountEx}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleCardClick(2)}
        style={[
          styles.cardView,
          {
            borderColor:
              selectedCard === 2 ? Colors.Primary500 : Colors.Neutral200,
          },
        ]}>
        <View style={styles.cradHeaderView}>
          <Text style={styles.cardHeaderTitle}>
            {AppLocalizedStrings.signupScreen.influencerAccount}
          </Text>
          {selectedCard === 2 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
        <Text style={styles.cardSubTitle}>
          {AppLocalizedStrings.signupScreen.accountEx}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleCardClick(3)}
        style={[
          styles.cardView,
          {
            borderColor:
              selectedCard === 3 ? Colors.Primary500 : Colors.Neutral200,
          },
        ]}>
        <View style={styles.cradHeaderView}>
          <Text style={styles.cardHeaderTitle}>
            {AppLocalizedStrings.signupScreen.govermentAccount}
          </Text>
          {selectedCard === 3 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
        <Text style={styles.cardSubTitle}>
          {AppLocalizedStrings.signupScreen.accountEx}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountTypeCrad;

const styles = ScaledSheet.create({
  container: {
    marginTop: hp(-2),
  },
  cardView: {
    borderWidth: 1.5,
    borderColor: Colors.Neutral200,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
    height: '85@s',
    justifyContent: 'center',
  },
  cradHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '600',
  },
  cardSubTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(0.5),
    paddingBottom: hp(0.5),
  },
});
