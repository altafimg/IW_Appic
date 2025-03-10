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
  Platform,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Auth/Header';
import CameraGallaryPopup from '../../../components/popups/CameraGallaryPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import BackArrow from '../../../components/buttons/BackArrow';
import {profileBuildApiAction} from '../../../redux/actions/profileBuildApiAction';
import {editAccountManagerAction} from '../../../redux/actions/editAccountManagerAction';
import {getAccountManagerAction} from '../../../redux/actions/getAccountManagerAction';
import PleaseWaitPopup from '../../../components/popups/PleaseWaitPopup';

const AccountManagerProfilePictureScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const check = route?.params?.check || '';
  const globalLoading = useSelector(state => state.imageUploadReducer.loading);
  const _id =
    useSelector(state => state.loginReducer.user?.data?.data?._id) || {};

  const accountManagerData =
    useSelector(state => state?.getAccountManagerReducer?.data?.data) || [];

  const userProfilePicture =
    useSelector(
      state =>
        state.getLoggedInUserProfileReducer.data?.data?.data?.profile_picture,
    ) || {};

  const accountManagerProfilePicture =
    accountManagerData.length > 0
      ? accountManagerData[0]?.profile_photo || ''
      : '';

  const manager_Id =
    accountManagerData.length > 0 ? accountManagerData[0]?._id || '' : '';

  const token = useSelector(state => state.loginReducer?.token);

  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(
    check === 'loggedInUserEditProfile'
      ? userProfilePicture
      : accountManagerProfilePicture,
  );
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const profileCheck = 'profileBuild';

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
        if (
          res &&
          res?.data &&
          Array.isArray(res?.data?.imgUrls) &&
          res?.data?.imgUrls?.length > 0
        ) {
          const uploadedImage = res.data.imgUrls[0];

          try {
            let profileRes;
            if (check === 'accountManager') {
              console.log(uploadedImage);
              const data = {
                photo: uploadedImage,
                manager_Id,
                token,
              };

              profileRes = await dispatch(editAccountManagerAction(data));
              if (profileRes?.data?.status) {
                navigation.navigate('AccountManagerScreen');
                dispatch(getAccountManagerAction(_id));
              } else {
                Alert.alert('Something went wrong!! Please try again');
              }
            } else if (check === 'loggedInUserEditProfile') {
              const data = {
                image: uploadedImage,
                profileCheck,
                _id,
              };
              profileRes = await dispatch(profileBuildApiAction(data));
              if (profileRes?.data?.status) {
                navigation.navigate('SettingScreen');
              } else {
                Alert.alert('Something went wrong!! Please try again');
              }
            }
          } catch (profileError) {
            console.error('Profile update error:', profileError);
            Alert.alert(
              'An error occurred during profile update. Please try again.',
            );
          }
        } else {
          console.error(
            'Image upload failed: No valid response or empty image URL array.',
          );
          Alert.alert('Image upload failed. Please try again.');
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        Alert.alert('An error occurred during image upload. Please try again.');
      } finally {
        setIsSaveLoading(false);
      }
    } else {
      setIsSaveLoading(false);
    }
  };

  // const handleSaveExit = async () => {
  //   setIsSaveLoading(true);
  //   if (hasImageChanged) {
  //     const formData = new FormData();
  //     formData.append('imgUrls', {
  //       uri: image,
  //       type: 'image/jpg',
  //       name: 'image.jpg',
  //     });
  //     try {
  //       const res = await dispatch(imageUploadAction(formData));
  //       const uploadedImage = res?.data?.imgUrls?.[0];
  //       if (uploadedImage) {
  //         if (check === 'accountManager') {
  //           console.log(uploadedImage);
  //           const data = {
  //             photo: uploadedImage,
  //             manager_Id,
  //             token,
  //           };

  //           const profileRes = await dispatch(editAccountManagerAction(data));
  //           if (profileRes?.data?.status) {
  //             navigation.navigate('AccountManagerScreen');
  //             dispatch(getAccountManagerAction(_id));
  //           } else {
  //             Alert.alert('Something went wrong!! Please try again');
  //           }
  //         } else if (check === 'loggedInUserEditProfile') {
  //           const data = {
  //             image: uploadedImage,
  //             profileCheck,
  //             _id,
  //           };
  //           const profileRes = await dispatch(profileBuildApiAction(data));
  //           if (profileRes?.data?.status) {
  //             navigation.navigate('SettingScreen');
  //           } else {
  //             Alert.alert('Something went wrong!! Please try again');
  //           }
  //         }
  //       } else {
  //         Alert.alert('Image upload failed. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error('Image upload error:', error);
  //       Alert.alert('An error occurred during image upload. Please try again.');
  //     } finally {
  //       setIsSaveLoading(false);
  //     }
  //   } else {
  //     setIsSaveLoading(false);
  //   }
  // };

  const onGoBackHandler = () => {
    if (check === 'accountManager') {
      navigation.navigate('AccountManagerScreen');
    } else if (check === 'loggedInUserEditProfile') {
      navigation.navigate('SettingScreen');
    } else {
      navigation.goBack();
    }
  };

  const toggleModal = () => setIsVisible(!isVisible);

  const handleRemoveImage = () => {
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

    setShowProcessingModal(true);

    launchFunction(options, response => {
      if (response.didCancel) {
        setShowProcessingModal(false);
      } else if (response.errorCode) {
        setShowProcessingModal(false);
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
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackArrow goBack={onGoBackHandler} />

        <Header
          headerTitle={AppLocalizedStrings.profilePictureScreen.edit}
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
              isSaveLoading ? (
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
            onPress={handleSaveExit}
            disabled={isSaveLoading || globalLoading}
          />
        ) : (
          <View style={styles.disActiveButton}>
            <Text style={styles.disActiveTitle}>
              {AppLocalizedStrings.button.continue}
            </Text>
          </View>
        )}
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

export default AccountManagerProfilePictureScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
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
