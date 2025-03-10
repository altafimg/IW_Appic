import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const DetailsReceiptComponent = props => {
  const navigation = useNavigation('');

  return (
    <View style={styles.container}>
      <View style={styles.cradView}>
        <Text style={styles.cardHeaderTitle}>Receipt</Text>
        <Text style={styles.dateTitle}>15 August 2020 06:00 AM PST</Text>
        <Text style={styles.dateTitle}>ID: 3250854</Text>
      </View>
      <View style={styles.cradView}>
        <Text style={styles.cardHeaderTitle}>Service: QuickAds</Text>
        <Text style={styles.dateTitle}>
          Advertise the new apple watch series 6 which is available on cellular
          plants...
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewTitle}>View</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.cradView}>
        <Text style={styles.cardHeaderTitle}>Customer</Text>
        <Text style={styles.appleTitle}>Apple Inc</Text>
      </View>
      <View style={styles.cradView}>
        <View style={styles.cradHeaderView}>
          <Text style={styles.cardHeaderTitle}>Earnings</Text>
          <Text style={styles.cardHeaderTitle}>$100</Text>
        </View>
        <Text style={styles.dateTitle}>
          {`Status: Funds in Escrow\nYou will get paid upon delivery`}
        </Text>
      </View>
      <View style={styles.cradViewSec}>
        <Text style={styles.cardHeaderTitle}>Need help?</Text>
        <Text style={styles.appleTitle}>Contact support</Text>
      </View>
    </View>
  );
};

export default DetailsReceiptComponent;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.Neutral100,
    borderRadius: 10,
    marginVertical: hp(1),
  },
  cradView: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  cradViewSec: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  cradHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '15@s',
    fontWeight: '500',
    lineHeight: '24@s',
  },
  dateTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  viewButton: {
    marginBottom: hp(-0.3),
  },
  viewTitle: {
    color: Colors.Primary500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  appleTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    textDecorationLine: 'underline',
  },
});
