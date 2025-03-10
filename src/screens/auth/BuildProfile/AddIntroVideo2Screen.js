import React, {useEffect, useState, useCallback} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import AboutSubmitVideoPopup from '../../../components/popups/AboutSubmitVideoPopup';
import {useDispatch, useSelector} from 'react-redux';
import {videoUploadAction} from '../../../redux/actions/videoUploadAction';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native-paper';
import {buildProfileDataAction} from '../../../redux/actions/buildProfileDataAction';
import AddedCustomToast from '../../../utility/AddedCustomToast';
import SVG from '../../../assets/svg';
import BackArrow from '../../../components/buttons/BackArrow';
import {editProfileAction} from '../../../redux/actions/editProfileAction';
import {profileBuildApiAction} from '../../../redux/actions/profileBuildApiAction';

const AddIntroVideo2Screen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  const _id =
    useSelector(state => state.loginReducer?.user?.data?.data?._id) || {};
  const token = useSelector(state => state.loginReducer?.token) || {};
  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );
  const {fileUrl, check} = route?.params;

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTogglePlayPause = () => {
    setVideoPaused(prevPaused => !prevPaused);
  };

  const toggleModal = () => {
    if (fileUrl) {
      setIsVisible(!isVisible);
    } else {
      Alert.alert('Something went wrong, please try again!');
    }
  };

  const handleRetake = () => {
    navigation.navigate('VideoRecordScreen', {fileUrl, check});
  };

  const onGoBackHandler = () => {
    navigation.replace('ConnectSocialAccountsScreen');
  };

  const uploadVideo = useCallback(async () => {
    const videoFormData = new FormData();
    videoFormData.append('videoUrls', {
      uri: fileUrl,
      type: 'video/mp4',
      name: 'video.mp4',
    });
    const res = await dispatch(videoUploadAction(videoFormData));
    return res?.data?.videoUrls[0];
  }, [dispatch, fileUrl]);

  const handleProfileBuild = async uploadedVideoUrl => {
    const data = {profileCheck: '', _id, fileUrl: uploadedVideoUrl};
    const res = await dispatch(profileBuildApiAction(data));
    if (res?.status === 200) {
      navigation.navigate('SettingScreen');
    } else {
      Alert.alert('Please try again!');
    }
  };

  const handleProfileUpdate = async uploadedVideoUrl => {
    const updatedProfileData = {
      ...profileBuildingData,
      fileUrl: uploadedVideoUrl,
    };
    await dispatch(buildProfileDataAction(updatedProfileData));
    setIsVisible(false);
    navigation.navigate('SignupSuccessScreen');
  };

  const onLooksGoodHandler = async () => {
    try {
      const uploadedVideoUrl = await uploadVideo();
      if (!uploadedVideoUrl) throw new Error('Video upload failed');

      if (check === 'editIntroVideo') {
        await handleProfileBuild(uploadedVideoUrl);
      } else {
        await handleProfileUpdate(uploadedVideoUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Video upload failed. Please try again.');
      console.error(error);
    }
  };

  const backHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {check === 'editIntroVideo' ? (
          <BackArrow goBack={backHandler} />
        ) : (
          <Text
            style={
              styles.topHeadTitle
            }>{`${AppLocalizedStrings.profilePictureScreen.step} 4 of 4`}</Text>
        )}

        <Header
          headerTitle={
            check === 'editIntroVideo'
              ? AppLocalizedStrings.addIntroVideo2Screen.edit
              : AppLocalizedStrings.addIntroVideo2Screen.add
          }
        />

        <View>
          <Video
            source={{uri: fileUrl}}
            style={styles.video}
            paused={videoPaused}
            resizeMode="cover"
            onEnd={() => setVideoPaused(true)}
          />
          {!videoPaused ? (
            <View style={styles.transparentView}></View>
          ) : (
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={handleTogglePlayPause}>
              <SVG.PlayCircle />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={handleRetake} style={styles.bottomButton}>
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.addIntroVideo2Screen.retake}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {showToast && (
        <View style={styles.toastContainer}>
          <AddedCustomToast
            message={AppLocalizedStrings.addIntroVideo2Screen.success}
            backgroundColor="rgba(220, 252, 231, 1)"
            color="rgba(23, 23, 23, 1)"
          />
        </View>
      )}

      <PrimaryButton
        title={AppLocalizedStrings.button.submit}
        onPress={toggleModal}
      />

      {check !== 'editIntroVideo' && (
        <TouchableOpacity style={styles.bottomButton} onPress={onGoBackHandler}>
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.addIntroVideo2Screen.to}
          </Text>
        </TouchableOpacity>
      )}

      <AboutSubmitVideoPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onLooksGoodHandler={onLooksGoodHandler}
      />
    </View>
  );
};

export default AddIntroVideo2Screen;

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
  bottomButton: {
    marginTop: hp(2.3),
  },
  buttonTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
  },
  video: {
    marginRight: wp(3),
    width: '90%',
    borderRadius: 15,
    height: 200,
    borderWidth: 1,
    alignSelf: 'center',
  },
  pauseButton: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    borderRadius: 25,
    backgroundColor: 'gray',
  },
  transparentView: {
    backgroundColor: 'transparent',
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  toastContainer: {
    marginBottom: 10,
  },
});
