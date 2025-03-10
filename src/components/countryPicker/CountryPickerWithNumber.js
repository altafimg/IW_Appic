//import libraries
import React, {useMemo} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import CountryPicker from '../../components/countryPicker/CountryPicker';
import {CallingCode, CountryCode} from 'react-native-country-picker-modal';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';

// Component
const CountryPickerWithNumber = props => {
  const {
    mobileNumber,
    countryCode,
    style,
    placeholderTitle,
    onCountryCodeChange,
    onPhoneNumberChange,
    rightIcon = true,
    onPressRightIcon,
  } = props;

  const mainStyle = useMemo(() => {
    return {...styles.main, ...style};
  }, [style]);

  return (
    <View style={mainStyle}>
      <View style={styles.flagView}>
        <CountryPicker
          countryISOCode={countryCode}
          onValueChange={onCountryCodeChange}
        />
      </View>
      <TextInput
        value={mobileNumber}
        placeholder={placeholderTitle}
        placeholderTextColor={Colors.accent}
        style={styles.textInput}
        maxLength={20}
        onChangeText={onPhoneNumberChange}
        keyboardType="number-pad"
      />
      {rightIcon && (
        <TouchableOpacity
          style={styles.userIconButton}
          onPress={onPressRightIcon}>
          {/* Assuming SVG.User is a valid component */}
          <SVG.User />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = ScaledSheet.create({
  main: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '36@s',
  },
  flagView: {
    // height: 50,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: Colors.Neutral300,
  },
  flahIcon: {
    paddingLeft: wp(3),
    fontSize: '14@s',
    fontWeight: '600',
    color: Colors.Black,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    fontSize: '15@s',
    fontWeight: '400',
    color: Colors.Black,
  },
  userIconButton: {
    paddingHorizontal: wp(3),
    justifyContent: 'center',
  },
});

//export component
export default CountryPickerWithNumber;
