import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PaymentSuccessScreen = ({navigation}) => {
  const onBackPaymentHandler = () => {
    navigation.navigate('PaymentsScreen');
  };
  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.PaymentSuccess />
        <Text style={styles.title}>
          {AppLocalizedStrings.paymentSuccessScreen.success}
        </Text>
        <Text style={styles.subTitle}>
          Withdrawn $1234,56 to Citibank **3828
        </Text>
      </View>
      <View>
        <Text style={styles.paragraph}>
          {AppLocalizedStrings.paymentSuccessScreen.lorem}
        </Text>
        <PrimaryButton
          title={AppLocalizedStrings.paymentSuccessScreen.backPayments}
          onPress={onBackPaymentHandler}
        />
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingTop: hp(8),
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '11@s',
    fontWeight: '400',
    color: Colors.Neutral600,
    lineHeight: '19@s',
    paddingVertical: hp(3),
  },
});
