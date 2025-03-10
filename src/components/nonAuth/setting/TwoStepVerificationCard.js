import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const TwoStepVerificationCard = props => {
  let selectedCard = props.selectedCard;
  let setSelectedCard = props.setSelectedCard;
  const handleCardClick = cardNumber => {
    setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  };
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.cardView,
          {
            borderColor:
              selectedCard === 1 ? Colors.Primary500 : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(1)}>
        <SVG.Step1
          color={selectedCard === 1 ? Colors.Primary500 : Colors.Neutral400}
        />
        <Text
          style={[
            styles.cardTitle,
            {color: selectedCard === 1 ? Colors.Neutral900 : Colors.Neutral500},
          ]}>
          {AppLocalizedStrings.twoStepVerificationScreen.parent}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.cardView,
          {
            borderColor:
              selectedCard === 2 ? Colors.Primary500 : Colors.Neutral300,
          },
        ]}
        onPress={() => handleCardClick(2)}>
        <SVG.Step2
          color={selectedCard === 2 ? Colors.Primary500 : Colors.Neutral400}
        />
        <Text
          style={[
            styles.cardTitle,
            {color: selectedCard === 2 ? Colors.Neutral900 : Colors.Neutral500},
          ]}>
          {AppLocalizedStrings.twoStepVerificationScreen.little}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwoStepVerificationCard;

const styles = ScaledSheet.create({
  cardView: {
    borderColor: Colors.Primary500,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    paddingLeft: wp(5),
  },
  cardView2: {
    borderColor: Colors.Neutral400,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginVertical: hp(0.8),
  },
  cardTitle2: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '600',
    paddingLeft: wp(5),
  },
});
