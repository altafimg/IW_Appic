import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AddDebitCreditCardScreen = ({navigation, route}) => {
  const {depositFundes} = route.params;
  const [active, setActive] = useState(false);

  const onDefaultHandler = () => {
    setActive(!active);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onSaveHandler = () => {
    navigation.navigate('CardAddedScreen');
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView showsVerticalScrollIndicator={false}>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={
              AppLocalizedStrings.addDebitCreditCardScreen.addDebitCard
            }
          />
          <View style={styles.main}>
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.cardNumber}
              frountTitle={
                AppLocalizedStrings.addDebitCreditCardScreen.scanCard
              }
            />
            <DetailsTextInput
              title={
                AppLocalizedStrings.addDebitCreditCardScreen.cardholderName
              }
            />
            <View style={styles.twoInputView}>
              <View style={[styles.inputMainView, styles.inputMainFirst]}>
                <View style={styles.titleView}>
                  <Text style={styles.textInputTitle}>
                    {
                      AppLocalizedStrings.addDebitCreditCardScreen
                        .expirationDate
                    }
                  </Text>
                </View>
                <View style={styles.textInputView}>
                  <TextInput placeholder=" " style={styles.textInput} />
                </View>
              </View>
              <View style={styles.inputMainView}>
                <View style={styles.titleView}>
                  <Text style={styles.textInputTitle}>
                    {AppLocalizedStrings.addDebitCreditCardScreen.cvv}
                  </Text>
                </View>
                <View style={styles.textInputView}>
                  <TextInput placeholder=" " style={styles.textInput} />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={onDefaultHandler}
              style={styles.checkboxView}>
              {active ? <SVG.CheckboxFill /> : <SVG.Checkbox />}
              <Text style={styles.defaultTitle}>
                {AppLocalizedStrings.addDebitCreditCardScreen.setDefault}
              </Text>
            </TouchableOpacity>
            <Text style={styles.billingTitle}>
              {AppLocalizedStrings.addDebitCreditCardScreen.billingAddress}
            </Text>
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.address}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.addressLine}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.city}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.country}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.addDebitCreditCardScreen.zip}
            />
          </View>
          <PrimaryButton
            title={AppLocalizedStrings.button.save}
            onPress={() =>
              depositFundes
                ? navigation.navigate('DepositFundsScreen')
                : onSaveHandler()
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddDebitCreditCardScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  main: {
    marginTop: hp(-4.5),
    marginBottom: hp(3),
  },
  twoInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputMainView: {
    flex: 1,
    marginVertical: hp(1),
  },
  inputMainFirst: {
    marginRight: wp(3),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    height: '36@s',
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  defaultTitle: {
    color: Colors.Black,
    fontSize: '11@s',
    fontWeight: '400',
    paddingHorizontal: wp(2),
  },
  billingTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '500',
    marginTop: hp(3),
    marginBottom: hp(1),
  },
});
