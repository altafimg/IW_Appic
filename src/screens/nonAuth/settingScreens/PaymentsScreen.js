import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PaymentHistoryCard from '../../../components/nonAuth/setting/PaymentHistoryCard';
import PaymentWithdrawButtons from '../../../components/nonAuth/setting/PaymentWithdrawButtons';
import WithPaymentMethodsAddedCard from '../../../components/nonAuth/setting/WithPaymentMethodsAddedCard';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PaymentsScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onWithdrawHandler = () => {
    // navigation.navigate('WithdrawFundsScreen');
    navigation.navigate('WithdrawBalanceScreen');
  };
  const onWithdrawHistoryHandler = () => {
    navigation.navigate('WithdrawalHistoryScreen');
  };
  const onIncomeHistoryHandler = () => {
    navigation.navigate('IncomeHistoryScreen');
  };
  const onSpendingHistoryHandler = () => {
    navigation.navigate('SpendingHistoryScreen');
  };
  const onTaxResponsibilityHandler = () => {
    navigation.navigate('TaxResponsibilityScreen');
  };
  const onPaymentMethodsHandler = () => {
    navigation.navigate('PaymentMethodsScreen');
  };
  const onMakePaymentHandler = () => {
    navigation.navigate('WithdrawFundsScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle={AppLocalizedStrings.paymentsScreen.payments} />
        <View style={styles.main}>
          <View style={styles.copyUrlView}>
            <Text style={styles.copyUniqueTitle}>$ 0</Text>
            <Text style={styles.urlTitle}>
              $ 0 {AppLocalizedStrings.paymentsScreen.pending}
            </Text>
          </View>
          <PaymentWithdrawButtons
            onWithdrawHandler={onWithdrawHandler}
            onWithdrawHistoryHandler={onWithdrawHistoryHandler}
          />
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.incomeHistory}
            subTitle={AppLocalizedStrings.paymentsScreen.viewAll}
            onPress={onIncomeHistoryHandler}
          />
          <WithPaymentMethodsAddedCard />
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.spendingHistory}
            subTitle={AppLocalizedStrings.paymentsScreen.viewAll}
            onPress={onSpendingHistoryHandler}
          />
          <WithPaymentMethodsAddedCard />
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.paymentMethods}
            subTitle={AppLocalizedStrings.paymentsScreen.viewAll}
            onPress={onPaymentMethodsHandler}
          />
          <TouchableOpacity
            style={styles.makePaymentView}
            onPress={onMakePaymentHandler}>
            <View>
              <Text style={styles.makeTitle}>
                {AppLocalizedStrings.paymentsScreen.makePayments}
              </Text>
              <Text style={styles.addTitle}>
                {AppLocalizedStrings.paymentsScreen.addPaymentMethod}
              </Text>
              <Text style={styles.addTitle}>Ending in 2049</Text>
            </View>
            <View style={styles.defaultMain}>
              <View style={styles.defaultView}>
                <Text style={styles.defaultTitle}>
                  {AppLocalizedStrings.paymentsScreen.default}
                </Text>
              </View>
              <SVG.ThreeDot />
            </View>
          </TouchableOpacity>
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.withdrawalMethods}
            subTitle={AppLocalizedStrings.paymentsScreen.viewAll}
            onPress={onMakePaymentHandler}
          />
          <View style={styles.makePaymentView}>
            <View>
              <Text style={styles.makeTitle}>
                {AppLocalizedStrings.paymentsScreen.receivePayouts}
              </Text>
              <Text style={styles.addTitle}>
                {AppLocalizedStrings.paymentsScreen.addwithdrawalMethod}
              </Text>
              <Text style={styles.addTitle}>Ending in 2049</Text>
            </View>
            <View style={styles.defaultMain}>
              <View style={styles.defaultView}>
                <Text style={styles.defaultTitle}>
                  {AppLocalizedStrings.paymentsScreen.default}
                </Text>
              </View>
              <SVG.ThreeDot />
            </View>
          </View>
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.taxForms}
            subTitle={AppLocalizedStrings.paymentsScreen.viewDetails}
            onPress={onTaxResponsibilityHandler}
          />
          <PaymentHistoryCard
            title={AppLocalizedStrings.paymentsScreen.currency}
            subTitle="USD"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-2),
    marginBottom: hp(10),
  },
  copyUrlView: {
    backgroundColor: Colors.Primary500,
    height: '73@s',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginTop: hp(-3),
    borderRadius: 5,
    alignItems: 'center',
  },
  copyUniqueTitle: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
  urlTitle: {
    color: Colors.White,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  makePaymentView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    backgroundColor: Colors.Neutral50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginBottom: hp(3),
  },
  makeTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    paddingVertical: hp(0.3),
  },
  addTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    paddingVertical: hp(0.3),
  },
  defaultMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultView: {
    backgroundColor: '#22C55E33',
    marginHorizontal: wp(2),
    borderRadius: 2,
  },
  defaultTitle: {
    color: Colors.Success500,
    fontSize: '11@s',
    fontWeight: '400',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.3),
  },
});
