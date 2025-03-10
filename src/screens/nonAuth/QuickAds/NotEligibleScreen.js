import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';

const NotEligibleScreen = ({navigation, route}) => {
  const {id, user_id} = route?.params || {};

  return (
    <View style={styles.container}>
      <SVG.JobCancelled style={styles.imageStyle} />

      <View style={styles.mainTextStyle}>
        <Text style={styles.TextStyle}>
          You are not eligible to apply to this QuickAd
        </Text>
      </View>

      <Text style={[styles.TextStyle1, {marginTop: scale(190)}]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui tellus
        pretium at nisi proing.
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('StandardQuickAdsScreen', {
            id,
            user_id,
          });
        }}
        activeOpacity={0.6}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotEligibleScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  imageStyle: {
    marginTop: '100@s',
    alignSelf: 'center',
  },
  imageStyle1: {
    width: '210@s',
    height: '220@s',
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
    marginHorizontal: 30,
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
    bottom: '10@s',
    width: '100%',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
});
