import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';

const SecPrimaryButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.title}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecPrimaryButton;

const styles = ScaledSheet.create({
  button: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  title: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
});
