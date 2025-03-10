import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import PleaseWaitPopup from '../../../components/popups/PleaseWaitPopup';

const VideoRecordScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [isRecording, setRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const {check} = route?.params;

  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    let timer;

    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setElapsedTime(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRecording]);

  const requestPermission = async () => {
    try {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Influence With wants your Camera Permission',
          message: 'Influence With needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      const grantedAudio = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Influence With wants your Audio Permission',
          message: 'Influence With needs access to your audio ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (
        grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedAudio === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera and audio');
      } else {
        console.log('Camera or audio permission denied');
        // showPermissionSettingsDialog();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setRecording(true);
      try {
        const {uri} = await cameraRef.current.recordAsync();

        setRecordedVideoUrl(uri);
      } catch (error) {
        console.error('Failed to record video', error);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setRecording(false); // Move this line here
    }
  };

  // Use effect to navigate when recordedVideoUrl changes
  useEffect(() => {
    if (recordedVideoUrl) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigation.navigate('AddIntroVideo2Screen', {
          fileUrl: recordedVideoUrl,
          check: check,
        });
      }, 500);
    }
  }, [recordedVideoUrl]);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={{flex: 1}}
        ref={cameraRef}
        type={RNCamera.Constants.Type.front}>
        <BackArrow goBack={onGoBackHandler} />
        <View style={styles.overlayTextView}>
          <Text style={styles.overlayText}>
            {`Suggestion on what to say \n \n Hi guys, it’s YOUR NAME \nWelcome to my official InfluenceWith Page\n\nThis is where you’ll be able to work & \ncollaborate with me`}
          </Text>
        </View>
      </RNCamera>
      {isRecording && (
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            top: 10,
            alignSelf: 'center',
          }}>
          Recording Time: {elapsedTime} seconds
        </Text>
      )}

      <TouchableOpacity onPress={toggleRecording} style={styles.toggleButton}>
        <Text style={styles.buttonText}>{isRecording ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <PleaseWaitPopup visible={showPopup} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '15@s',
  },
  overlayTextView: {
    borderRadius: 20,
    top: 10,
    paddingVertical: hp(3),
    paddingHorizontal: wp(7),
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  overlayText: {
    color: Colors.White,
    fontSize: '13@s',
    textAlign: 'center',
    fontVariant: '400',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 70,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  videoUrlText: {
    color: 'white',
    marginTop: 10,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: 200, // You can adjust the height as needed
  },
});
export default VideoRecordScreen;
