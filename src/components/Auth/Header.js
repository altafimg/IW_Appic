import {Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';

const Header = props => {
  return (
    <View>
      <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      <Text style={styles.headerSubTitle}>{props.subTitle}</Text>
    </View>
  );
};

export default Header;

const styles = ScaledSheet.create({
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(0.4),
  },
  headerSubTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(0.5),
    marginBottom: hp(5),
    lineHeight: 20,
  },
});
