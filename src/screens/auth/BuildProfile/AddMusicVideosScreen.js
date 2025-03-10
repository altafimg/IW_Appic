import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Modal} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import AddMusicView from '../../../components/Auth/AddMusicView';
import {useDispatch, useSelector} from 'react-redux';
import {buildProfileDataAction} from '../../../redux/actions/buildProfileDataAction';
import {completeSteps} from '../../../redux/actions/completeStepsAction';
import {videoUploadAction} from '../../../redux/actions/videoUploadAction';
import {musicVideoDataAction} from '../../../redux/actions/musicVideoDataAction';
import {ActivityIndicator} from 'react-native';

const AddMusicVideosScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const uploadLoader = useSelector(state => state.videoUploadReducer.loading);
  const check = 'profileBuild';

  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );

  // music states
  const [musicItems, setMusicItems] = useState([]);
  const [musicUrl, setMusicUrl] = useState('');

  // video states url
  const [videoUrl, setVideoUrl] = useState('');
  const [videoUrlItems, setVideoUrlItems] = useState([]);

  // video states upload
  const [videoUpload, setVideoUpload] = useState('');
  const [videoUploadItems, setVideoUploadItems] = useState([]);

  // video upload name
  const [videoUploadName, setVideoUploadName] = useState();

  // local loading states
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const onDontHaveMusicHandler = () => {
    navigation.navigate('AddIntroVideoScreen', {
      check: check,
    });
  };

  const onContinueHandler = async () => {
    setIsContinueLoading(true);
    const hasVideoContent = videoUploadItems?.length || videoUrlItems?.length;

    if (!hasVideoContent && !musicItems?.length) {
      setIsContinueLoading(false);
      navigation.navigate('AddIntroVideoScreen', {
        check: check,
      });
      return;
    }

    const videoFormData = new FormData();

    videoUploadItems?.map((video, index) => {
      videoFormData.append('videoUrls', {
        uri: video?.url,
        type: 'video/mp4',
        name: `video_${index}.mp4`,
      });
    });

    try {
      const res = await dispatch(videoUploadAction(videoFormData));
      const videoUploadUrls = res?.data?.videoUrls || []; // Handle potential absence of videoUrls in response

      // Extract music and video link URLs
      const musicUrls = musicItems?.map(item => item.url) || [];
      const videoLinkUrls = videoUrlItems?.map(item => item.url) || [];

      const videoUrls = [...videoLinkUrls, ...videoUploadUrls]; // Combine video URLs

      dispatch(completeSteps(3));
      const updatedProfileData = {
        ...profileBuildingData,
        musicUrls,
        videoUrls,
      };

      dispatch(buildProfileDataAction(updatedProfileData));

      navigation.navigate('AddIntroVideoScreen', {
        check: check,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsContinueLoading(false);
    }
  };

  const onSaveExitHandler = async () => {
    setIsSaveLoading(true);
    const hasVideoContent = videoUploadItems?.length || videoUrlItems?.length;

    if (!hasVideoContent && !musicItems?.length) {
      setIsSaveLoading(false);
      navigation.navigate('BuildProfileScreen');
      return;
    }
    let videoFormData = new FormData();
    videoUploadItems?.map((video, index) => {
      videoFormData.append('videoUrls', {
        uri: video?.url,
        type: 'video/mp4',
        name: `video_${index}.mp4`,
      });
    });

    try {
      const res = await dispatch(videoUploadAction(videoFormData));
      const videoUploadUrls = res?.data?.videoUrls || [];
      const musicUrls = musicItems?.map(item => item.url) || [];
      const videoLinkUrls = videoUrlItems?.map(item => item.url) || [];

      const videoUrls = [...videoLinkUrls, ...videoUploadUrls];

      dispatch(completeSteps(3));
      const updatedProfileData = {
        ...profileBuildingData,
        musicUrls,
        videoUrls,
      };

      dispatch(buildProfileDataAction(updatedProfileData));
      navigation.navigate('BuildProfileScreen');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.topHeadTitle}>
          {AppLocalizedStrings.profilePictureScreen.step} 4 of 4
        </Text>
        <Header headerTitle={AppLocalizedStrings.addMusicVideosScreen.add} />
        <AddMusicView
          // music
          musicItems={musicItems}
          setMusicItems={setMusicItems}
          musicUrl={musicUrl}
          setMusicUrl={setMusicUrl}
          // video upload
          videoUpload={videoUpload}
          setVideoUpload={setVideoUpload}
          videoUploadItems={videoUploadItems}
          setVideoUploadItems={setVideoUploadItems}
          // video url
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          videoUrlItems={videoUrlItems}
          setVideoUrlItems={setVideoUrlItems}
          // video upload names
          videoUploadName={videoUploadName}
          setVideoUploadName={setVideoUploadName}
        />
      </ScrollView>
      <View>
        <View>
          {musicItems.length === 0 &&
          videoUploadItems.length === 0 &&
          videoUrlItems.length === 0 ? (
            <TouchableOpacity
              style={styles.dontMusicButton}
              onPress={onDontHaveMusicHandler}>
              <Text style={styles.dontMusicButtonTitle}>
                {AppLocalizedStrings.addMusicVideosScreen.have}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <PrimaryButton
          title={
            isContinueLoading ? (
              <View
                style={{
                  width: wp('93%'),
                  justifyContent: 'center',
                }}>
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
          onPress={onContinueHandler}
          disabled={uploadLoader || isContinueLoading}
        />
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={onSaveExitHandler}
          disabled={uploadLoader || isSaveLoading}>
          {isSaveLoading ? (
            <ActivityIndicator
              color={Colors.Neutral700}
              size={'small'}
              style={{marginTop: hp(1)}}
            />
          ) : (
            <Text style={styles.buttonTitle}>
              {AppLocalizedStrings.addMusicVideosScreen.save}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMusicVideosScreen;

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
  dontMusicButton: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    marginVertical: hp(1.5),
  },
  dontMusicButtonTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '500',
    textAlign: 'center',
  },
});
