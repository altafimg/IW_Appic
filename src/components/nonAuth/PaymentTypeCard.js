import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

const PaymentTypeCard = props => {
  const selectedCard = props.selectedCard;
  const setSelectedCard = props.setSelectedCard;

  const handleCardClick = cardNumber => {
    setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  };

  return (
    <View>
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
            {AppLocalizedStrings.paymentMethodsScreen.debitCredit}
          </Text>
          {selectedCard === 1 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
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
            {AppLocalizedStrings.paymentMethodsScreen.bankAccount}
          </Text>
          {selectedCard === 2 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
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
            {AppLocalizedStrings.paymentMethodsScreen.paypal}
          </Text>
          {selectedCard === 3 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentTypeCard;

const styles = ScaledSheet.create({
  cardView: {
    borderWidth: 1.5,
    borderColor: Colors.Neutral200,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginVertical: hp(1),
  },
  cradHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
});
