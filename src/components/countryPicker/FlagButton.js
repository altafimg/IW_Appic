//import libraries
import React, {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {CountryCode} from 'react-native-country-picker-modal';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';

// Component
const FlagButton = props => {
  const {emoji = '', callingCode = '', style, countryCode, onPress} = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...style};
  }, [style]);

  return (
    <TouchableOpacity style={mainStyle} onPress={onPress}>
      <Text style={styles.emoji} allowFontScaling={false}>
        {emoji}
      </Text>
      {callingCode.length > 0 && (
        <Text style={styles.callingCode}>{`+${callingCode}`}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles
const styles = ScaledSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '100%',
  },
  emoji: {
    fontSize: '23@s',
  },
  callingCode: {
    color: Colors.Neutral500,
    marginLeft: 4,
    fontSize: '12@s',
    fontWeight: '400',
  },
});

//export component
export default FlagButton;
