import React, {useState} from 'react';
import Colors from '../../../theme/Colors';
import {ScrollView, View} from 'react-native';
import Header from '../../../components/Auth/Header';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PaymentTypeCard from '../../../components/nonAuth/PaymentTypeCard';

const PaymentMethodsScreen = ({navigation, route}) => {
  const {depositFundes} = route.params;
  const [selectedCard, setSelectedCard] = useState(null);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onContinueHandler = () => {
    if (selectedCard === 1) {
      navigation.navigate('AddDebitCreditCardScreen', {
        depositFundes: depositFundes,
      });
    } else if (selectedCard === 2) {
      navigation.navigate('AddBankAccountScreen');
    } else {
      null;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.paymentMethodsScreen.paymentMethods}
          subTitle={AppLocalizedStrings.paymentMethodsScreen.in}
        />
        <View style={styles.main}>
          <PaymentTypeCard
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        </View>
      </ScrollView>
      {selectedCard ? (
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      ) : null}
    </View>
  );
};

export default PaymentMethodsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
  main: {
    marginTop: hp(-2),
  },
});
