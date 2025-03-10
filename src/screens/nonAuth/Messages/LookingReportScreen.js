import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

//images
import looking from '../../../assets/images/looking.png';
import blocked from '../../../assets/images/blocked.png';

const LookingReportScreen = ({navigation, route}) => {
  const {data} = route.params || {};
  const [report, setReport] = useState('');
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: scale(15),
        }}>
        <Image source={looking} style={styles.imageStyle} />
        <Text style={styles.titleStyle}>We’re looking in to your report</Text>
        <Text style={styles.textStyle}>
          Thanks for keeping our platform safe. Our team will take the most
          appropriate action.
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          bottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('BlockedScreen');
          }}
          style={[styles.buttonStyle, {marginBottom: 10}]}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.MessageingScreen.Block_Username}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('MessageScreen');
          }}
          style={[styles.buttonStyle, {backgroundColor: Colors.Primary500}]}>
          <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
            {AppLocalizedStrings.MessageingScreen.return_messages}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LookingReportScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },

  textStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral700,
    marginTop: '10@s',
    textAlign: 'center',
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: '24@s',
    color: Colors.Neutral900,
    marginTop: '20@s',
    textAlign: 'center',
  },
  iconStyle: {width: '24@s', height: '24@s'},

  imageStyle: {
    width: '220@s',
    height: '205@s',
    alignSelf: 'center',
  },

  buttonStyle: {
    borderWidth: 2,
    borderRadius: '5@s',
    borderColor: Colors.Primary500,
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20@s',
  },
  buttonTextStyle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
  },
});
