import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';

const PrimaryButton = props => {
  return (
    <View>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          styles.button,
          {
            backgroundColor: props.disabled
              ? Colors.Neutral400
              : Colors.Primary500,
          },
        ]}>
        <Text style={styles.buttonTitle}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const styles = ScaledSheet.create({
  button: {
    width: wp('93%'),
    height: '48@s',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
