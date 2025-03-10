import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import Header from '../../../components/Auth/Header';
import {ScaledSheet} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CameraGallaryPopup from '../../../components/popups/CameraGallaryPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {buildProfileDataAction} from '../../../redux/actions/buildProfileDataAction';
import {completeSteps} from '../../../redux/actions/completeStepsAction';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PleaseWaitPopup from '../../../components/popups/PleaseWaitPopup';

const ProfilePictureScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const globalLoading = useSelector(state => state.imageUploadReducer.loading);
  const profileData = useSelector(
    state => state.buildProfileDataReducer.data?.image,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  useEffect(() => {
    setImage(profileData || '');
  }, [profileData]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.goBack()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleContinue = async () => {
    setIsContinueLoading(true);
    if (hasImageChanged) {
      const formData = new FormData();
      formData.append('imgUrls', {
        uri: image,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      try {
        const res = await dispatch(imageUploadAction(formData));
        const uploadedImage = res?.data?.imgUrls[0];
        if (!uploadedImage) {
          throw new Error('Image upload failed');
        }
        const profileBuildingData = {image: uploadedImage};
        dispatch(buildProfileDataAction(profileBuildingData));
        dispatch(completeSteps(0));
        navigation.navigate('AddAdditionalDetailsScreen');
      } catch (error) {
        console.log(error, 'err');
        Alert.alert('Error', 'Image upload failed. Please try again.');
      } finally {
        setIsContinueLoading(false);
      }
    } else {
      setIsContinueLoading(false);
      navigation.navigate('AddAdditionalDetailsScreen');
    }
  };

  const handleSaveExit = async () => {
    setIsSaveLoading(true);
    if (hasImageChanged) {
      const formData = new FormData();
      formData.append('imgUrls', {
        uri: image,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      try {
        const res = await dispatch(imageUploadAction(formData));
        const uploadedImage = res?.data?.imgUrls[0];
        if (!uploadedImage) {
          throw new Error('Image upload failed');
        }
        const profileBuildingData = {image: uploadedImage};
        dispatch(buildProfileDataAction(profileBuildingData));
        dispatch(completeSteps(0));
        navigation.goBack('BuildProfileScreen');
      } catch (error) {
        console.log(error, 'err');
        Alert.alert('Error', 'Image upload failed. Please try again.');
      } finally {
        setIsSaveLoading(false);
      }
    } else {
      setIsSaveLoading(false);
      navigation.goBack('BuildProfileScreen');
    }
  };

  const toggleModal = () => setIsVisible(!isVisible);

  const handleRemoveImage = () => {
    dispatch(buildProfileDataAction({image: ''}));
    setImage('');
    setHasImageChanged(true);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleImageSelection = async launchFunction => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Camera permission is required');
        return;
      }
    }

    let options = {
      mediaType: 'photo',
    };

    setShowProcessingModal(true); // Show processing modal before image selection

    launchFunction(options, response => {
      if (response.didCancel) {
        setShowProcessingModal(false); // Hide processing modal on cancel
      } else if (response.errorCode) {
        setShowProcessingModal(false); // Hide processing modal on error
      } else {
        const selectedImage = response.assets?.[0]?.uri;
        if (selectedImage) {
          setImage(selectedImage);
          setHasImageChanged(true);
          setShowProcessingModal(false);
          setIsVisible(false);
        } else {
          Alert.alert('Error', 'Could not select the image. Please try again.');
        }
      }
    });
    // setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.topHeadTitle}>
          {AppLocalizedStrings.profilePictureScreen.step} 1 of 4
        </Text>
        <Header
          headerTitle={AppLocalizedStrings.profilePictureScreen.profile}
          subTitle={AppLocalizedStrings.profilePictureScreen.upload}
        />
        <View>
          {image ? (
            <View>
              <View style={styles.editButtonView}>
                <Image source={{uri: image}} style={styles.image} />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={toggleModal}>
                  <SVG.EditPhoto style={styles.editIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleRemoveImage}>
                <Text style={[styles.addTitle, styles.removeTitle]}>
                  {AppLocalizedStrings.profilePictureScreen.remove}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.cameraButton}>
                <SVG.Camera style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.addTitle}>
                {AppLocalizedStrings.profilePictureScreen.add}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View>
        {image ? (
          <PrimaryButton
            title={
              isContinueLoading ? (
                <View style={{width: wp('93%'), justifyContent: 'center'}}>
                  <ActivityIndicator
                    color={Colors.White}
                    size={'small'}
                    style={{marginTop: hp(1)}}
                  />
                </View>
              ) : (
                AppLocalizedStrings.button.continue
              )
            }
            onPress={handleContinue}
            disabled={globalLoading || isContinueLoading}
          />
        ) : (
          <View style={styles.disActiveButton}>
            <Text style={styles.disActiveTitle}>
              {AppLocalizedStrings.button.continue}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleSaveExit}
          disabled={globalLoading || isSaveLoading}>
          {isSaveLoading ? (
            <ActivityIndicator
              color={Colors.Neutral700}
              size={'small'}
              style={{marginTop: hp(1)}}
            />
          ) : (
            <Text style={styles.buttonTitle}>
              {AppLocalizedStrings.profilePictureScreen.save}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <CameraGallaryPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onImageHandler={() => handleImageSelection(launchCamera)}
        onGalleryHandler={() => handleImageSelection(launchImageLibrary)}
      />
      <PleaseWaitPopup visible={showProcessingModal} />
    </View>
  );
};

export default ProfilePictureScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  topHeadTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingBottom: hp(1),
  },
  cameraButton: {
    backgroundColor: Colors.Neutral100,
    alignSelf: 'center',
    borderRadius: '100@s',
    height: '165@s',
    width: '165@s',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: '165@s',
    width: '165@s',
    borderRadius: '100@s',
  },
  editButton: {
    shadowColor: Colors.Neutral400,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    width: '30@s',
    height: '30@s',
    marginLeft: wp(-15),
    borderRadius: 100,
  },
  editIcon: {
    marginLeft: wp(-2.2),
    marginTop: hp(-1),
  },
  addTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: hp(4),
  },
  removeTitle: {
    color: Colors.Destructive600,
    fontWeight: '400',
  },
  bottomButton: {
    marginTop: hp(2.3),
  },
  buttonTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
  },
  disActiveButton: {
    backgroundColor: Colors.Neutral300,
    width: wp('95%'),
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  disActiveTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  editButtonView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginLeft: wp(-10),
  },
});
