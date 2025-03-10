import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import ErrorImage from '../../../assets/images/ErrorImage.png';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ErrorComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={ErrorImage} style={styles.imageStyle} />
      <View style={styles.mainTextStyle}>
        <Text style={styles.TextStyle}>
          {/* Sorry, but you cannot{'\n'} apply to this QuickAd */}
          {AppLocalizedStrings.errorComponent.sorry}
        </Text>
      </View>
      <Text style={[styles.TextStyle1, {marginTop: scale(150)}]}>
        {AppLocalizedStrings.errorComponent.lorem}
      </Text>
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.6}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{'back'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorComponent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  imageStyle: {
    width: '220@s',
    height: '230@s',
    marginTop: '100@s',
    alignSelf: 'center',
  },
  mainTextStyle: {
    marginTop: '50@s',
    alignItems: 'center',
  },
  TextStyle: {
    fontWeight: '600',
    fontSize: '24@s',
    color: Colors.Neutral900,
    textAlign: 'center',
  },
  TextStyle1: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral700,
    marginTop: '10@s',
    textAlign: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    width: '100%',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
});
