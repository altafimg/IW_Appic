import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {imageUploadAction} from '../../redux/actions/imageUploadAction';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {addToDoListImageAction} from '../../redux/actions/addToDoListImageAction';
import PleaseWaitPopup from './PleaseWaitPopup';
import {getJobsByAdsIdAction} from '../../redux/actions/getJobsByAdsIdAction';
import {videoUploadAction} from '../../redux/actions/videoUploadAction';
import {addToDoListVideoAction} from '../../redux/actions/addToDoListVideoAction';
import {audioUploadAction} from '../../redux/actions/audioUploadAction';
import {addToDoListAudioAction} from '../../redux/actions/addToDoListAudioAction';
import {documentUploadAction} from '../../redux/actions/documentUploadAction';
import {addToDoListPdfAction} from '../../redux/actions/addToDoListPdfAction';

const ToDoAddMediaFilesPopup = ({
  imageVisible,
  setImageVisible,
  adsId,
  type,
  setDocsFiles,
  setShowError,
  getJobsByAdsIdLoader,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token);

  const apiData = {
    token: token,
    id: adsId,
  };

  const {_id} = useSelector(
    state => state.getLoggedInUserProfileReducer.data?.data?.data,
  );

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const selectImage = () => {
    const options = {
      title: type === 'image' ? 'Select Image' : 'Select Video',
      mediaType: type === 'image' ? 'photo' : 'video',
      quality: 1,
      maxWidth: 800,
      maxHeight: 800,
      selectionLimit: 50,
      includeBase64: false,
    };

    setShowProcessingModal(true); // Show processing modal before image selection

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setShowProcessingModal(false); // Hide processing modal on error
        setImageVisible(false);
      } else if (response.error) {
        setShowProcessingModal(false); // Hide processing modal on error
        setImageVisible(false);
      } else {
        const imageURIs = response?.assets?.map(asset => asset?.uri);
        setShowProcessingModal(false);

        setImageVisible(false);

        if (type === 'image') {
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
              if (res && res?.data) {
                const imageData = res?.data?.imgUrls;

                const mediaFilesImage = imageData?.map(url => ({image: url}));

                const data = {
                  id: adsId,
                  applicant_id: _id,
                  mediaFilesImage: mediaFilesImage,
                };

                dispatch(addToDoListImageAction(data))
                  .then(res => {
                    console.log(res?.data, '<<<<<<Data');
                    dispatch(getJobsByAdsIdAction(apiData));
                  })
                  .catch(err => {
                    console.log(err, '<<<<<<<errr');
                  });
              } else {
                Alert.alert('Please try again.');
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (type === 'video') {
          let videoFormData = new FormData();

          imageURIs.map((video, index) => {
            videoFormData.append('videoUrls', {
              uri: video,
              type: 'video/mp4',
              name: `video_${index}.mp4`,
            });
          });

          dispatch(videoUploadAction(videoFormData))
            .then(res => {
              if (res && res?.data) {
                const videoData = res?.data?.videoUrls;

                const mediaFilesImage = videoData?.map(url => ({video: url}));

                const data = {
                  id: adsId,
                  applicant_id: _id,
                  mediaFilesVideo: mediaFilesImage,
                };

                dispatch(addToDoListVideoAction(data))
                  .then(res => {
                    console.log(res?.data, '<<<<<<Data');
                    dispatch(getJobsByAdsIdAction(apiData));
                  })
                  .catch(err => {
                    console.log(err, '<<<<<<<errr');
                  });
              } else {
                Alert.alert('Please try again.');
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          Alert.alert('no data');
        }
      }
    });
  };

  const selectFile = async () => {
    try {
      setShowProcessingModal(true);

      let fileTypes = [];
      switch (type) {
        case 'image':
          fileTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
          ];
          break;
        case 'video':
          fileTypes = ['video/mp4'];
          break;
        case 'audio':
          fileTypes = ['audio/mpeg', 'audio/wav'];
          break;
        case 'document':
          fileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
          ];
          break;
        default:
          fileTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
            'video/mp4',
            'audio/mpeg',
            'audio/wav',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
          ];
          break;
      }

      const results = await DocumentPicker.pick({
        type: fileTypes,
      });

      const allData = results?.map(result => result?.uri);

      setShowProcessingModal(false);
      setImageVisible(false);

      if (type === 'image') {
        let imageFormData = new FormData();

        allData.map((image, index) => {
          imageFormData.append('imgUrls', {
            uri: image,
            type: 'image/jpg',
            name: `image_${index}.jpg`,
          });
        });

        dispatch(imageUploadAction(imageFormData))
          .then(res => {
            if (res && res?.data) {
              const imageData = res?.data?.imgUrls;

              const mediaFilesImage = imageData?.map(url => ({image: url}));

              const data = {
                id: adsId,
                applicant_id: _id,
                mediaFilesImage: mediaFilesImage,
              };

              dispatch(addToDoListImageAction(data))
                .then(res => {
                  console.log(res?.data, '<<<<<<Data');
                  dispatch(getJobsByAdsIdAction(apiData));
                })
                .catch(err => {
                  console.log(err?.response, '<<<<<<<errr');
                });
            } else {
              Alert.alert('Please try again.');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (type === 'video') {
        let videoFormData = new FormData();

        allData.map((video, index) => {
          videoFormData.append('videoUrls', {
            uri: video,
            type: 'video/mp4',
            name: `video_${index}.mp4`,
          });
        });

        dispatch(videoUploadAction(videoFormData))
          .then(res => {
            if (res && res?.data) {
              const videoData = res?.data?.videoUrls;

              const mediaFilesImage = videoData?.map(url => ({video: url}));

              const data = {
                id: adsId,
                applicant_id: _id,
                mediaFilesVideo: mediaFilesImage,
              };

              dispatch(addToDoListVideoAction(data))
                .then(res => {
                  console.log(res?.data, '<<<<<<Data');
                  dispatch(getJobsByAdsIdAction(apiData));
                })
                .catch(err => {
                  console.log(err, '<<<<<<<errr');
                });
            } else {
              Alert.alert('Please try again.');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (type === 'audio') {
        const audioFiles = results?.map(result => ({
          uri: result.uri,
          type: result.type,
          name: result.name,
        }));

        const audioFormData = new FormData();
        audioFiles.forEach((file, index) => {
          audioFormData.append('audioUrls', {
            uri: file.uri,
            type: file.type,
            name: file.name || `audio_${index}`,
          });
        });

        dispatch(audioUploadAction(audioFormData))
          .then(res => {
            if (res && res?.data) {
              const audioData = res?.data?.audioUrls;
              const audioFiles = audioData?.map(url => ({audio: url}));
              const data = {
                id: adsId,
                applicant_id: _id,
                mediaFilesAudio: audioFiles,
              };

              dispatch(addToDoListAudioAction(data))
                .then(res => {
                  console.log(res?.data, '<<<<<<Data audio');
                  dispatch(getJobsByAdsIdAction(apiData));
                })
                .catch(err => {
                  console.log(err?.response, '<<<<<<<errr');
                });
            } else {
              Alert.alert('Please try again.');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (type === 'document') {
        setShowError(false);
        const docsFiles = results?.map(result => ({
          uri: result.uri,
          type: result.type,
          name: result.name,
        }));

        setDocsFiles(docsFiles);
      } else {
        console.log('no type');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
        setShowProcessingModal(false);
      } else {
        console.log('DocumentPicker Error:', err);
        setShowProcessingModal(false);
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
        {type === 'audio' || type === 'document' ? (
          ''
        ) : (
          <TouchableOpacity onPress={selectImage} activeOpacity={0.6}>
            <Text style={styles.overlayTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Browse_gallery}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={selectFile} activeOpacity={0.6}>
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
      <PleaseWaitPopup visible={showProcessingModal} />
    </Overlay>
  );
};

export default ToDoAddMediaFilesPopup;

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
