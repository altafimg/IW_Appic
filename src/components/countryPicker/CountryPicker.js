//import libraries
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import FlagButton from './FlagButton';
import RNCountryPicker, {
  CallingCode,
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {
  getCountryCallingCodeAsync,
  getEmojiFlagAsync,
} from 'react-native-country-picker-modal/lib/CountryService';
import {getCountry} from 'react-native-localize';
import Colors from '../../theme/Colors';
import {wp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';

const nodeEmoji = require('node-emoji');

const CountryPicker = props => {
  const {style, countryISOCode = getCountry(), onValueChange} = props;
  const [visible, setVisible] = useState(false);
  const [countryCode, setCountryCode] = useState(countryISOCode);
  const [emoji, setEmoji] = useState();
  const [callingCode, setCallingCode] = useState();

  const mainStyle = useMemo(() => {
    return {...styles.main, ...style};
  }, [style]);

  useEffect(() => {
    updatePickerValues(countryCode);
  }, [countryCode]);

  useEffect(() => {
    setCountryCode(countryISOCode);
  }, [countryISOCode]);

  const renderFlagButton = useCallback(
    () => (
      <FlagButton
        emoji={emoji}
        callingCode={callingCode}
        countryCode={countryCode}
        onPress={() => setVisible(true)}
      />
    ),
    [countryCode, callingCode, countryCode, emoji],
  );

  const updatePickerValues = async code => {
    const callingCode = await getCountryCallingCodeAsync(code);
    const emoji = await getEmojiFlagAsync(code);
    setCallingCode(callingCode);
    setEmoji(nodeEmoji.get(emoji));
    setCountryCode(code);
    setVisible(false);
    onValueChange(code, callingCode);
  };

  const onCountrySelect = async country => {
    await updatePickerValues(country.cca2);
  };

  return (
    <View style={mainStyle}>
      <RNCountryPicker
        visible={visible}
        theme={styles.theme}
        withFilter
        withCallingCodeButton
        withEmoji
        withCallingCode
        countryCode={countryCode}
        onSelect={onCountrySelect}
        containerButtonStyle={styles.containerButtonStyle}
        renderFlagButton={renderFlagButton}
      />
    </View>
  );
};

// Styles
const styles = ScaledSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  theme: {
    fontSize: '13@s',
    onBackgroundTextColor: Colors.Neutral900,
  },
  containerButtonStyle: {
    paddingHorizontal: wp(1),
  },
});

//export component
export default CountryPicker;
