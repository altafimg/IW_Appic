import {Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

//images
import blocked from '../../../assets/images/blocked.png';

const BlockedScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: scale(10),
        }}>
        <Image source={blocked} style={styles.imageStyle} />
        <Text style={styles.titleStyle}>Username has been blocked</Text>
        <Text style={styles.textStyle}>
          Your profile will no longer be visible to this user & they will not be
          able to send you any job proposals or messages
        </Text>
        <Text style={[styles.textStyle, {marginTop: scale(40)}]}>
          If you have any active jobs with this user they will get cancelled.
          Check the FAQs or talk to us via live chat if you need more help.
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          bottom: 10,
        }}>
        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('BlockedScreen');
          }}
          style={[styles.buttonStyle, {marginBottom: 10}]}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.MessageingScreen.Block_Username}
          </Text>
        </TouchableOpacity> */}
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

export default BlockedScreen;

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
    bottom: 5,
  },

  buttonStyle: {
    borderWidth: 2,
    borderRadius: '5@s',
    borderColor: Colors.Primary500,
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
  },
});
