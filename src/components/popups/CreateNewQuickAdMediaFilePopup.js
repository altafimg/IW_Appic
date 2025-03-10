import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {imageUploadAction} from '../../redux/actions/imageUploadAction';
import {videoUploadAction} from '../../redux/actions/videoUploadAction';
import {audioUploadAction} from '../../redux/actions/audioUploadAction';

const CreateNewQuickAdMediaFilePopup = ({
  imagesLink,
  setImagesLink,
  videosLink,
  setVideosLink,
  audiosLink,
  setAudiosLink,
  imageVisible,
  setImageVisible,
  type,
  ...props
}) => {
  const dispatch = useDispatch();

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 800,
      selectionLimit: 50,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setImageVisible(false);
      } else if (response.error) {
        setImageVisible(false);
      } else {
        const imageURIs = response?.assets?.map(asset => asset?.uri);
        setImageVisible(false);

        let imageFormData = new FormData();

        imageURIs.map((image, index) => {
          imageFormData.append('imgUrls', {
            uri: image,
            type: 'image/jpg',
            name: `image_${index}.jpg`,
          });
        });

        dispatch(imageUploadAction(imageFormData))
          .then(res => {
            if (res && res?.data && res?.data?.imgUrls) {
              setImagesLink(prevImages => [
                ...prevImages,
                ...res?.data?.imgUrls,
              ]);
            } else {
              console.log('Image URLs not found in response');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const selectVideo = () => {
    const options = {
      title: 'Select Video',
      mediaType: 'video',
      quality: 1,
      selectionLimit: 50,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const videoURIs = response.assets.map(asset => asset.uri);

        let videoFormData = new FormData();

        videoURIs.map((video, index) => {
          videoFormData.append('videoUrls', {
            uri: video,
            type: 'video/mp4',
            name: `video_${index}.mp4`,
          });
        });

        dispatch(videoUploadAction(videoFormData))
          .then(res => {
            console.log(res);
            if (res && res.data && res.data.videoUrls) {
              setVideosLink(res.data.videoUrls);
            } else {
              console.log('Video URLs not found in response');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  const selectAudio = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      const audioURIs = results.map(result => result.uri);

      let audioFormData = new FormData();

      audioURIs.map((audio, index) => {
        audioFormData.append('audioUrls', {
          uri: audio,
          type: 'audio/mp3',
          name: `audio_${index}.mp3`,
        });
      });
      dispatch(audioUploadAction(audioFormData))
        .then(res => {
          console.log(res);
          if (res && res.data && res.data.audioUrls) {
            setAudiosLink(res.data.audioUrls);
          } else {
            console.log('Audio URLs not found in response');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled audio picker');
      } else {
        console.log('DocumentPicker Error:', err);
      }
    }
  };

  return (
    <Overlay
      onRequestClose={() => setImageVisible(false)}
      onBackdropPress={() => setImageVisible(false)}
      isVisible={imageVisible}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.overlaythumbStyle} />
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={selectImage} activeOpacity={0.6}>
          <Text style={styles.overlayTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Browse_images}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={selectVideo} activeOpacity={0.6}>
          <Text style={styles.overlayTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Browse_videos}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={selectAudio} activeOpacity={0.6}>
          <Text style={styles.overlayTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Browse_files}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setImageVisible(false)}
          activeOpacity={0.6}>
          <Text style={[styles.overlayTextStyle, {color: 'red'}]}>
            {AppLocalizedStrings.quickAdsHomescreen.Cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CreateNewQuickAdMediaFilePopup;

const styles = ScaledSheet.create({
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
});
