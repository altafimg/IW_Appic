import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';

const PaymentHistoryCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.incomeTitle}>{props.title}</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.viewAllTitle}>{props.subTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentHistoryCard;

const styles = ScaledSheet.create({
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
  },
  incomeTitle: {
    color: Colors.Neutral900,
    fontSize: '15@s',
    fontWeight: '600',
  },
  viewAllTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '500',
  },
});
