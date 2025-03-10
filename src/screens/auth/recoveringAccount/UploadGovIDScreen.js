import React, {useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import CameraGallaryPopup from '../../../components/popups/CameraGallaryPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';
import {recoverAccountDataAddAction} from '../../../redux/actions/recoverAccountDataAction';
import {editUserDataStoreAction} from '../../../redux/actions/editUserDataStoreAction';
import {replaceAccountManagerDataStoreAction} from '../../../redux/actions/replaceAccountManagerDataStoreAction';
import PleaseWaitPopup from '../../../components/popups/PleaseWaitPopup';
import NewHeader from '../../../components/NewHeader';

const UploadGovIDScreen = ({navigation, route}) => {
  const loading = useSelector(state => state.imageUploadReducer.loading);
  const editUserData =
    useSelector(state => state.editUserDataStoreReducer.data) || {};
  const replaceAccountManagerData =
    useSelector(state => state.replaceAccountManagerDataStoreReducer.data) ||
    {};
  const recoverAccountData = useSelector(
    state => state.recoverAccountDataReducer.data,
  );
  const check = route?.params?.check || {};

  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const uploadImage = async formData => {
    try {
      const res = await dispatch(imageUploadAction(formData));
      return res?.data?.imgUrls[0];
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleUploadRetry = async formData => {
    let uploadedID = await uploadImage(formData);
    while (!uploadedID) {
      const retry = await new Promise(resolve => {
        Alert.alert(
          'Error',
          'Image upload failed. Would you like to try again?',
          [
            {text: 'Cancel', onPress: () => resolve(false), style: 'cancel'},
            {text: 'Retry', onPress: () => resolve(true)},
          ],
          {cancelable: false},
        );
      });

      if (!retry) {
        return null;
      }

      uploadedID = await uploadImage(formData);
    }
    return uploadedID;
  };

  const onPhotoVeriHandler = async () => {
    if (!image) {
      Alert.alert('Please upload ID');
      return;
    }

    const formData = new FormData();
    formData.append('imgUrls', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    });

    const uploadedID = await handleUploadRetry(formData);
    if (!uploadedID) return;

    const updateData = data => {
      dispatch(data);
      navigation.navigate('PhotoVerificationScreen', {check});
    };

    switch (check) {
      case 'recover_account':
        updateData(
          recoverAccountDataAddAction({...recoverAccountData, uploadedID}),
        );
        break;
      case 'edit_profile':
      case 'user_verify':
        updateData(editUserDataStoreAction({...editUserData, uploadedID}));
        break;
      case 'replace':
        updateData(
          replaceAccountManagerDataStoreAction({
            ...replaceAccountManagerData,
            uploadedID,
          }),
        );
        break;
      default:
        console.warn('Unknown check type:', check);
    }
  };

  const onDontHaveIdHandler = () => {
    navigation.navigate('DontHaveIdScreen');
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take pictures',
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

  const onImageHandler = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Camera permission denied');
        return;
      }
    }

    setShowPopup(true); // Show the popup before image selection

    const cameraOption = {
      mediaType: 'image',
      quality: 1,
    };
    launchCamera(cameraOption, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (response?.assets[0]?.uri) {
        setImage(response?.assets[0]?.uri);
      }
      setShowPopup(false); // Show the popup before image selection
      setIsVisible(false);
    });
  };

  const onGalleryHandler = async () => {
    setShowPopup(true); // Show the popup before image selection

    const galleryOption = {
      mediaType: 'image',
      quality: 1,
    };
    launchImageLibrary(galleryOption, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.error) {
        console.log('Gallery Error: ', response.error);
      } else if (response?.assets[0]?.uri) {
        setImage(response?.assets[0]?.uri);
      }
      setShowPopup(false); // Hide the popup after image selection
      setIsVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <NewHeader
          headerTitle={AppLocalizedStrings.uploadGovIDScreen.uploadGov}
          onPress={onGoBackHandler}
        />
        {/* <BackArrow goBack={onGoBackHandler} /> */}
        {/* <Header
          headerTitle={}
          subTitle={AppLocalizedStrings.uploadGovIDScreen.please}
        /> */}
        <Text style={styles.headerSubTitle}>
          {AppLocalizedStrings.uploadGovIDScreen.please}
        </Text>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <SVG.GovId width={350} height={230} style={styles.image} />
        )}

        <TouchableOpacity
          onPress={onDontHaveIdHandler}
          style={styles.dontIdButton}>
          <Text style={styles.title}>
            {AppLocalizedStrings.uploadGovIDScreen.id}
          </Text>
        </TouchableOpacity>
      </View>

      {image ? (
        <View>
          <PrimaryButton
            title={
              loading ? (
                <View style={{width: wp('93%'), justifyContent: 'center'}}>
                  <ActivityIndicator
                    color={Colors.White}
                    size={'small'}
                    style={{marginTop: hp(1)}}
                  />
                </View>
              ) : (
                AppLocalizedStrings.uploadGovIDScreen.submitGov
              )
            }
            onPress={onPhotoVeriHandler}
          />
          <TouchableOpacity onPress={toggleModal} style={styles.previousButton}>
            <Text style={styles.previousTitle}>
              {AppLocalizedStrings.uploadGovIDScreen.reupload}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <PrimaryButton
          title={AppLocalizedStrings.uploadGovIDScreen.upload}
          onPress={toggleModal}
        />
      )}

      <CameraGallaryPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onImageHandler={onImageHandler}
        onGalleryHandler={onGalleryHandler}
      />
      <PleaseWaitPopup visible={showPopup} />
    </View>
  );
};

export default UploadGovIDScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: hp(3),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  image: {
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: hp(5),
    width: 350,
    height: 230,
  },
  dontIdButton: {
    alignSelf: 'center',
    paddingVertical: hp(4),
  },
  title: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    marginTop: hp(1),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#404040',
    fontSize: '14@s',
    fontWeight: '400',
    marginTop: hp(3),
  },
});
