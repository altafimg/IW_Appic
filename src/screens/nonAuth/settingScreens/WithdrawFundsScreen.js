import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const WithdrawFundsScreen = ({navigation}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onContinueHandler = () => {
    if (selectedCard === 1) {
      navigation.navigate('AddDebitCreditCardScreen');
    } else if (selectedCard === 2) {
      navigation.navigate('AddBankAccountScreen');
    } else {
      navigation.navigate('AddDebitCreditCardScreen');
    }
  };
  const handleCardClick = cardNumber => {
    setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.withdrawFundsScreen.withdrawFunds}
          subTitle={AppLocalizedStrings.withdrawFundsScreen.inOrder}
        />
        <View style={styles.main}>
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
                {AppLocalizedStrings.withdrawFundsScreen.addDebitCreditCard}
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
                {AppLocalizedStrings.withdrawFundsScreen.addBankAccount}
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
                {AppLocalizedStrings.withdrawFundsScreen.addPayPalAccount}
              </Text>
              {selectedCard === 3 ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {selectedCard ? (
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      ) : null}
    </View>
  );
};

export default WithdrawFundsScreen;

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
  },
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
