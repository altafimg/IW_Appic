import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PaymentWithdrawButtons = props => {
  return (
    <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} onPress={props.onWithdrawHandler}>
        <Text style={styles.title}>
          {AppLocalizedStrings.paymentsScreen.withdraw}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onWithdrawHistoryHandler}>
        <Text style={styles.title}>
          {AppLocalizedStrings.paymentsScreen.withdrawalHistory}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentWithdrawButtons;

const styles = ScaledSheet.create({
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  button: {
    flex: 1,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
    marginHorizontal: wp(1),
  },
  title: {
    color: Colors.Primary500,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
});
