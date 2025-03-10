import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch} from 'react-redux';
import BackArrow from '../../components/buttons/BackArrow';
import PleaseWaitPopup from '../../components/popups/PleaseWaitPopup';
import {AppLocalizedStrings} from '../../localization/Localization';

const PhotoVerificationFinalCameraScreen = ({route, navigation}) => {
  const poseImage1 = route?.params?.poseImage1;
  const check = route?.params?.check;

  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false); // Loading state for camera readiness
  const [isCapturing, setIsCapturing] = useState(false); // State to track if capturing is in progress
  const [showPopup, setShowPopup] = useState(false);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  useEffect(() => {
    requestPermission();
  }, []);

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

      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const captureImage = async () => {
    if (cameraRef?.current && isCameraReady && !isCapturing) {
      setIsCapturing(true); // Prevent further captures until this one is complete
      setShowPopup(true); // Show the popup immediately upon capture initiation

      try {
        const options = {quality: 0.5, base64: true};
        const data = await cameraRef?.current?.takePictureAsync(options);

        if (data?.uri) {
          setShowPopup(false); // Hide the popup after successful capture

          navigation.navigate('FinalPoseMatchScreen', {
            poseImage2: data?.uri,
            poseImage1: poseImage1,
            check: check,
          });
        } else {
          console.error('Error: Image data is undefined');
          setShowPopup(false); // Hide the popup even on errors
        }
      } catch (error) {
        console.error('Error capturing image:', error);
        setShowPopup(false); // Hide the popup even on errors
      } finally {
        setIsCapturing(false); // Reset capturing state
      }
    } else {
      console.error('Camera not ready or already capturing');
    }
  };

  return (
    <View style={styles.container}>
      {!isCameraReady && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {AppLocalizedStrings.photoVerificationCameraScreem.loading}
          </Text>
        </View>
      )}
      <RNCamera
        style={{flex: 1}}
        ref={cameraRef}
        type={RNCamera.Constants.Type.front}
        onCameraReady={() => setIsCameraReady(true)} // Set camera ready state
      >
        <View style={styles.backArrowContainer}>
          <BackArrow goBack={onGoBackHandler} />
        </View>
        <View style={styles.overlay}>
          <View style={styles.cameraOverlay}>
            <Image
              source={require('../../assets/images/cameraPose.png')}
              style={styles.poseImage}
            />
            <Text style={styles.poseText}>
              {AppLocalizedStrings.photoVerificationCameraScreem.copy}
            </Text>
          </View>
        </View>
      </RNCamera>
      <TouchableOpacity
        onPress={captureImage}
        style={styles.shutterButton}
        disabled={!isCameraReady || isCapturing}>
        <View style={styles.innerShutterButton} />
      </TouchableOpacity>
      <PleaseWaitPopup visible={showPopup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  backArrowContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Ensure the arrow is above the camera
  },
  overlay: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 100,
  },
  cameraOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    borderRadius: 10,
    padding: 20,
  },
  poseImage: {
    height: 180,
    width: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  poseText: {
    color: '#FAFAFA',
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  shutterButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerShutterButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PhotoVerificationFinalCameraScreen;
