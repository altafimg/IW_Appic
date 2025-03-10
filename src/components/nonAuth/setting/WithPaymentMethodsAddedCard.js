import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';

const WithPaymentMethodsAddedCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View>
          <Text style={styles.amountTitle}>$120.00</Text>
          <Text style={styles.fromTitle}>From ABC Studios</Text>
        </View>
        <SVG.LeftArrow width={22} height={22} />
      </View>
      <View style={styles.cardView}>
        <View>
          <Text style={styles.amountTitle}>$120.00</Text>
          <Text style={styles.fromTitle}>From ABC Studios</Text>
        </View>
        <SVG.LeftArrow width={22} height={22} />
      </View>
      <View style={styles.cardView}>
        <View>
          <Text style={styles.amountTitle}>$120.00</Text>
          <Text style={styles.fromTitle}>From ABC Studios</Text>
        </View>
        <SVG.LeftArrow width={22} height={22} />
      </View>
    </View>
  );
};

export default WithPaymentMethodsAddedCard;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.Neutral50,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginBottom: hp(3),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.4),
  },
  amountTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
  fromTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
  },
});
