import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const ViewSponsorshipCards = props => {
  return (
    <View>
      <View style={styles.button}>
        <Text style={styles.cradTitle}>{props.title}</Text>
        <Text style={styles.cradTitleSec}>from ${props.price}</Text>
      </View>
    </View>
  );
};

export default ViewSponsorshipCards;

const styles = ScaledSheet.create({
  button: {
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    alignItems: 'center',
    height: '64@s',
    justifyContent: 'center',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
  },
  cradTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '700',
    lineHeight: '19@s',
  },
  cradTitleSec: {
    color: Colors.White,
    fontSize: '11@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
