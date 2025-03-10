import React from 'react';
import {Platform, PermissionsAndroid, Text, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';

const UploadMediaScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: scale(10)}}>
        <BackArrow goBack={() => navigation.goBack()} />
        <View style={styles.directionStyle}>
          <Header
            style={{backgourndColor: 'red'}}
            headerTitle={' Upload media'}
          />
          <Text style={styles.selectedText}>4 Selected</Text>
        </View>
      </View>
    </View>
  );
};

export default UploadMediaScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    color: Colors.Primary500,
    bottom: 30,
    fontWeight: '500',
    fontSize: '14@s',
  },
});
