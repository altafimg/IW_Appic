import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
  Alert,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Overlay} from 'react-native-elements';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import ToDoAddMediaFilesPopup from '../../../components/popups/ToDoAddMediaFilesPopup';
import {useDispatch, useSelector} from 'react-redux';
import SVG from '../../../assets/svg';
import axios from 'axios';
import {global} from '../../../global';
import {useIsFocused} from '@react-navigation/native';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';
import VideoThumbnail from '../../../components/VideoThumbnail';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {addToDoListLinkAction} from '../../../redux/actions/addToDoListLinkAction';
import {ActivityIndicator} from 'react-native-paper';
import {documentUploadAction} from '../../../redux/actions/documentUploadAction';
import {addToDoListPdfAction} from '../../../redux/actions/addToDoListPdfAction';
import {Linking} from 'react-native';
import downloadFileHandler from '../../../DownloadFileHandler';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import document from '../../../assets/images/document.png';
import links from '../../../assets/images/links.png';
import NewHeader from '../../../components/NewHeader';

const ToDoAllMediaScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {adsId, check} = route?.params || {};
  const imageLoader = useSelector(state => state.imageUploadReducer.loading);
  const videoLoader = useSelector(state => state.videoUploadReducer.loading);
  const audioLoader = useSelector(state => state.audioUploadReducer.loading);

  const addToDoImageLoader = useSelector(
    state => state.addToDoListImageReducer.loading,
  );
  const addToDoVideoLoader = useSelector(
    state => state.addToDoListVideoReducer.loading,
  );
  const addToDoDocLoader = useSelector(
    state => state.addToDoListPdfReducer.loading,
  );
  const documentLoader = useSelector(
    state => state.documentUploadReducer.loading,
  );
  const addToDoLinkLoader = useSelector(
    state => state.addToDoListLinkReducer.loading,
  );
  const addToDoAudioLoader = useSelector(
    state => state.addToDoListAudioReducer.loading,
  );
  const {_id} = useSelector(
    state => state.getLoggedInUserProfileReducer.data?.data?.data,
  );
  const applicant_id = useSelector(
    state => state.loginReducer?.user?.data?.data?._id,
  );
  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );
  const getJobsByAdsIdLoader = useSelector(
    state => state.getJobsByAdsIdReducer.loading,
  );

  const applicantData = data?.applicants;
  const matchingItems = applicantData?.filter(
    item => item?.applicants_id?._id === _id,
  );
  const token = useSelector(state => state.loginReducer?.token);

  const apiData = {
    token: token,
    id: adsId,
  };

  const [selected, setSelected] = useState('1');
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [disableAdd, setDisableAdd] = useState(true);
  const [type, setType] = useState('');
  const [deleteImageLoader, setDeleteImageLoader] = useState(false);
  const [deleteVideoLoader, setDeleteVideoLoader] = useState(false);
  const [deleteAudioLoader, setDeleteAudioLoader] = useState(false);
  const [deleteLinkLoader, setDeleteLinkLoader] = useState(false);
  const [deleteDocLoader, setDeleteDocLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [docsFiles, setDocsFiles] = useState([]);

  const userAudios =
    matchingItems?.flatMap(item => item?.mediaFilesAudio) || [];
  const userImages =
    matchingItems?.flatMap(item => item?.mediaFilesImage) || [];
  const userLinks = matchingItems?.flatMap(item => item?.mediaFilesLink) || [];
  const userPdfs = matchingItems?.flatMap(item => item?.mediaFilesPdf) || [];
  const userVideos =
    matchingItems?.flatMap(item => item?.mediaFilesVideo) || [];

  const deleteUserVideoHandler = async id => {
    setDeleteVideoLoader(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      global.BASE_URL + 'quickAds/deleteVideo',
      {
        id: adsId,
        applicant_id: applicant_id,
        videoId: id,
      },
      config,
    );
    console.log(res?.data, '<<<<<<<data');
    if (response?.status === 200) {
      setDeleteVideoLoader(false);
      dispatch(getJobsByAdsIdAction(apiData));
    } else {
      setDeleteVideoLoader(false);
    }
  };

  const deleteUserImageHandler = async id => {
    try {
      setDeleteImageLoader(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        global.BASE_URL + 'quickAds/deleteImages',
        {
          id: adsId,
          applicant_id: applicant_id,
          imageId: id,
        },
        config,
      );
      if (response?.status === 200) {
        setDeleteImageLoader(false); // Turn off loader here
        dispatch(getJobsByAdsIdAction(apiData));
      } else {
        setDeleteImageLoader(false);
      }
    } catch (error) {
      console.log(error, '<<<<<<<<err');
      setDeleteImageLoader(false); // Turn off loader in case of error
    }
  };

  const deleteUserAudioHandler = async id => {
    setDeleteAudioLoader(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      global.BASE_URL + 'quickAds/deleteAudio',
      {
        id: adsId,
        applicant_id: applicant_id,
        audioId: id,
      },
      config,
    );

    if (response?.status === 200) {
      setDeleteAudioLoader(false);
      dispatch(getJobsByAdsIdAction(apiData));
    } else {
      setDeleteAudioLoader(false);
    }
  };

  const deleteUserLinkHandler = async id => {
    setDeleteLinkLoader(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      global.BASE_URL + 'quickAds/deleteLinks',
      {
        id: adsId,
        applicant_id: applicant_id,
        linkId: id,
      },
      config,
    );

    if (response?.status === 200) {
      setDeleteLinkLoader(false);
      dispatch(getJobsByAdsIdAction(apiData));
    } else {
      setDeleteLinkLoader(false);
    }
  };

  const deleteUserDocHandler = async id => {
    setDeleteDocLoader(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      global.BASE_URL + 'quickAds/deleteDocuments',
      {
        id: adsId,
        applicant_id: applicant_id,
        docId: id,
      },
      config,
    );

    if (response?.status === 200) {
      setDeleteDocLoader(false);
      dispatch(getJobsByAdsIdAction(apiData));
    } else {
      setDeleteDocLoader(false);
    }
  };

  const getFileExtension = url => {
    const fileName = url?.split('/')?.pop();
    return fileName?.split('.')?.pop();
  };

  const downloadUserImageHandler = imagePath => {
    const fileExtension = getFileExtension(imagePath);
    downloadFileHandler(fileExtension, imagePath);
  };

  const downloadUserVideoHandler = async videoUrl => {
    const fileExtension = getFileExtension(videoUrl);
    downloadFileHandler(fileExtension, videoUrl);
  };

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        console.log('Permission check result:', granted);

        if (granted) {
          console.log('Permission granted');
        } else {
          console.log('Permission not granted. Requesting permission...');
          const requestResult = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.W,
            {
              title: 'Storage Permission',
              message: 'App needs storage permission to save  the file',
              buttonNeutral: 'Ask me later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission granted');
          } else if (requestResult === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Permission denied');
          } else if (
            requestResult === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
          ) {
            console.log("Permission denied with Don't ask again");
            Alert.alert(
              'Permission Needed',
              'This app requires storage permission to function properly. Please go to settings and enable it.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: () => Linking.openSettings()},
              ],
              {cancelable: true},
            );
          }
        }
      } catch (err) {
        console.warn(err, '<<<<<<<<check Permission err');
        return false;
      }
    } else {
      return true;
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log('requestPermission FUnction', hasPermission);

      if (hasPermission) {
        return true; // Permission already granted
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs storage permission to save  the file',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      console.log(granted, '<<<<<<<<<<<<<requiest permission granted variable');

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS doesn't require explicit permission
  };

  const downloadUserAudioHandler = audioUrl => {
    const fileExtension = getFileExtension(audioUrl);
    downloadFileHandler(fileExtension, audioUrl);
  };

  const downloadUserDocHandler = docUrl => {
    const fileExtension = getFileExtension(docUrl);
    downloadFileHandler(fileExtension, docUrl);
  };

  const downloadUserLinkHandler = async linkUrl => {
    try {
      const supported = await Linking.canOpenURL(linkUrl);
      if (supported) {
        await Linking.openURL(linkUrl);
      } else {
        Alert.alert(`Cannot open this URL: ${linkUrl}`);
      }
    } catch (error) {
      console.error('An error occurred while trying to open the URL:', error);
      Alert.alert('Error', 'An error occurred while trying to open the URL.');
    }
  };

  const renderImageView = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: item?.image}}
              style={styles.profileImageStyle}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              {item?.image?.split('/images/')[1]}
            </Text>
          </View>
          {check === 'notComplete' ? (
            <TouchableOpacity onPress={() => deleteUserImageHandler(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => downloadUserImageHandler(item?.image)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Image source={download} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderAudioView = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.Primary100,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 10,
              }}>
              <Image
                source={speaker}
                style={{height: scale(24), width: scale(24)}}
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              {item?.audio?.split('/Audio/')[1]?.slice(-10).padStart(10, '.')}
            </Text>
          </View>
          {check === 'notComplete' ? (
            <TouchableOpacity onPress={() => deleteUserAudioHandler(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => downloadUserAudioHandler(item?.audio)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Image source={download} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderVideoView = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <VideoThumbnail videoUrl={item?.video} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              {item?.video?.split('/Video/')[1]}
            </Text>
          </View>
          {check === 'notComplete' ? (
            <TouchableOpacity onPress={() => deleteUserVideoHandler(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => downloadUserVideoHandler(item?.video)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Image source={download} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderLinkView = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.Primary100,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 10,
                marginRight: 10,
              }}>
              <Image
                source={links}
                style={{height: scale(24), width: scale(24)}}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.Black,
                }}>
                {item?.title}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {item?.link}
              </Text>
            </View>
          </View>
          {check === 'notComplete' ? (
            <TouchableOpacity onPress={() => deleteUserLinkHandler(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => downloadUserLinkHandler(item?.link)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Image source={download} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderDocumentView = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.Primary100,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 10,
                marginRight: 10,
              }}>
              <Image
                source={document}
                style={{height: scale(24), width: scale(24)}}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '500',
                  color: Colors.Black,
                }}>
                {item?.title}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {item?.documented?.split('/Document/')[1]}
              </Text>
            </View>
          </View>
          {check === 'notComplete' ? (
            <TouchableOpacity onPress={() => deleteUserDocHandler(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => downloadUserDocHandler(item?.documented)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <Image source={download} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderQuickChat = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={1}
        style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {selected == '3' || selected == '4' || selected == '5' ? (
              <View
                style={[
                  styles.profileImageStyle,
                  {
                    backgroundColor: Colors.PrimaryLight,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image
                  source={item.image}
                  style={{height: scale(24), width: scale(24)}}
                />
              </View>
            ) : (
              <Image source={item.image} style={styles.profileImageStyle} />
            )}
            <View
              style={{
                marginHorizontal: scale(15),
                width: scale(170),
              }}>
              <Text numberOfLines={1} style={styles.nameTextStyle}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Image source={download} style={styles.iconStyle} />

            <Text style={[styles.countStyle]}>{item.download_size} MB</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddLink = () => {
    const data = {
      id: adsId,
      applicant_id: _id,
      mediaFilesLink: [
        {
          title: title,
          link: link,
        },
      ],
    };
    dispatch(addToDoListLinkAction(data))
      .then(res => {
        if (res?.status === 200) {
          dispatch(getJobsByAdsIdAction(apiData));
          setLink('');
          setTitle('');
        } else {
          Alert.alert('pelase try again');
        }
      })
      .catch(err => {
        console.log(err, '<<<<<err');
      });
  };

  const handleAddDocs = () => {
    if (docsFiles?.length === 0 || title.trim() === '') {
      setShowError(true);
    } else {
      let documentFormData = new FormData();

      docsFiles.forEach((file, index) => {
        documentFormData.append('documentUrls', {
          uri: file.uri,
          type: file.type,
          name: file.name || `document_${index}`,
        });
      });
      setDownloadVisible(true);

      dispatch(documentUploadAction(documentFormData))
        .then(res => {
          if (res && res?.data) {
            const docsData = res?.data?.fileUrls;
            const documentData = docsData[0];
            const data = {
              id: adsId,
              applicant_id: _id,
              mediaFilesPdf: [
                {
                  title: title,
                  documented: documentData,
                },
              ],
            };

            dispatch(addToDoListPdfAction(data))
              .then(res => {
                setTitle('');
                dispatch(getJobsByAdsIdAction(apiData));
                setDocsFiles([]);
              })
              .catch(err => {
                console.log(err, '<<<<<<<errr');
              });
          } else {
            Alert.alert('Please try again.');

            setTitle('');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setDisableAdd(title.trim() === '' || link.trim() === '');
  }, [title, link]);

  const handleTitleChange = text => {
    setTitle(text);
    setShowError(false);
  };

  const downloadAllImages = () => {
    // // Function to get the file extension from the URL
    // const getFile = url => {
    //   const fileName = url.split('/').pop();
    //   return fileName.split('.').pop();
    // };
    // // Extracting the image URLs and determining their extensions
    // userImages?.forEach(item => {
    //   const imageUrl = item?.image;
    //   const fileExtension = getFile(imageUrl);
    //   // Call the download function for each image with its respective extension
    //   downloadMultipleFilesHandler(fileExtension, [imageUrl]);
    // });
  };

  const downloadAllVideos = () => {};

  const downloadAllAudios = () => {};

  const downloadAllLinks = () => {};

  const downloadAllDocs = () => {};

  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle={
          check === 'notComplete'
            ? AppLocalizedStrings.toDoAllMediaScreen.media
            : AppLocalizedStrings.toDoAllMediaScreen.all
        }
        onPress={() => navigation.goBack()}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('1')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '1' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '1' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.images}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('2')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '2' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '2' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.video}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('3')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '3' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '3' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.audio}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('4')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '4' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '4' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.links}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('5')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '5' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '5' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.docs}
          </Text>
        </TouchableOpacity>
      </View>

      {selected == '1' && (
        <>
          {check === 'notComplete' ? (
            <>
              <Text style={styles.uploadText}>
                {AppLocalizedStrings.toDoAllMediaScreen.uplaod}
              </Text>
              <TouchableOpacity
                style={styles.cradView}
                onPress={() => {
                  setImageVisible(true);
                  setType('image');
                }}>
                <Text style={styles.cradTitle}>
                  {AppLocalizedStrings.MessageingScreen.browse}
                </Text>
              </TouchableOpacity>
              <Text style={styles.titleStyle}>
                {AppLocalizedStrings.toDoAllMediaScreen.images}
              </Text>
            </>
          ) : (
            <Text style={styles.uploadText}>
              {AppLocalizedStrings.toDoAllMediaScreen.singleImages}
            </Text>
          )}

          {addToDoImageLoader ||
          imageLoader ||
          deleteImageLoader ||
          getJobsByAdsIdLoader ? (
            <>
              {/* <AddMediaFilesSkeleton />
              <AddMediaFilesSkeleton />
              <AddMediaFilesSkeleton />
              <AddMediaFilesSkeleton /> */}
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp(10),
                }}>
                <ActivityIndicator size={'small'} color={Colors.Primary500} />
              </View>
            </>
          ) : (
            <FlatList
              data={userImages}
              keyExtractor={item => item.id}
              renderItem={renderImageView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(20),
              }}
            />
          )}
          {check === 'complete' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <PrimaryButton
                title={
                  <Text>
                    {AppLocalizedStrings.toDoAllMediaScreen.downloadImages}
                  </Text>
                }
                onPress={downloadAllImages}
              />
            </View>
          ) : (
            ''
          )}
        </>
      )}
      {selected == '2' && (
        <>
          {check === 'complete' ? (
            <Text style={styles.uploadText}>
              {AppLocalizedStrings.toDoAllMediaScreen.singleVideos}
            </Text>
          ) : (
            <>
              <Text style={styles.uploadText}>
                {AppLocalizedStrings.toDoAllMediaScreen.uploadVIdeo}
              </Text>
              <TouchableOpacity
                style={styles.cradView}
                onPress={() => {
                  setImageVisible(true);
                  setType('video');
                }}>
                <Text style={styles.cradTitle}>
                  {AppLocalizedStrings.MessageingScreen.browse}
                </Text>
              </TouchableOpacity>
              <Text style={styles.titleStyle}>
                {AppLocalizedStrings.toDoAllMediaScreen.video}
              </Text>
            </>
          )}

          {addToDoVideoLoader ||
          videoLoader ||
          deleteVideoLoader ||
          getJobsByAdsIdLoader ? (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp(10),
                }}>
                <ActivityIndicator size={'small'} color={Colors.Primary500} />
              </View>
            </>
          ) : (
            <FlatList
              data={userVideos}
              keyExtractor={item => item?.id}
              renderItem={renderVideoView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(20),
              }}
            />
          )}
          {check === 'complete' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <PrimaryButton
                title={
                  <Text>
                    {AppLocalizedStrings.toDoAllMediaScreen.downloadVideos}
                  </Text>
                }
                onPress={downloadAllVideos}
              />
            </View>
          ) : (
            ''
          )}
        </>
      )}
      {selected == '3' && (
        <>
          {check === 'complete' ? (
            <Text style={styles.uploadText}>
              {AppLocalizedStrings.toDoAllMediaScreen.singleAudios}
            </Text>
          ) : (
            <>
              <Text style={styles.uploadText}>
                {AppLocalizedStrings.toDoAllMediaScreen.uploadAudio}
              </Text>
              <TouchableOpacity
                style={styles.cradView}
                onPress={() => {
                  setImageVisible(true);
                  setType('audio');
                }}>
                <Text style={styles.cradTitle}>
                  {AppLocalizedStrings.MessageingScreen.browse}
                </Text>
              </TouchableOpacity>
              <Text style={styles.titleStyle}>
                {AppLocalizedStrings.toDoAllMediaScreen.audio}
              </Text>
            </>
          )}

          {addToDoAudioLoader ||
          audioLoader ||
          deleteAudioLoader ||
          getJobsByAdsIdLoader ? (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp(10),
                }}>
                <ActivityIndicator size={'small'} color={Colors.Primary500} />
              </View>
            </>
          ) : (
            <FlatList
              data={userAudios}
              keyExtractor={item => item.id}
              renderItem={renderAudioView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(20),
              }}
            />
          )}
          {check === 'complete' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <PrimaryButton
                title={
                  <Text>
                    {AppLocalizedStrings.toDoAllMediaScreen.downloadAudios}
                  </Text>
                }
                onPress={downloadAllAudios}
              />
            </View>
          ) : (
            ''
          )}
        </>
      )}
      {selected == '4' && (
        <>
          {check === 'complete' ? (
            <Text style={styles.uploadText}>
              {AppLocalizedStrings.toDoAllMediaScreen.singleLinks}
            </Text>
          ) : (
            <>
              <Text style={styles.linkTitle}>
                {AppLocalizedStrings.toDoAllMediaScreen.title}
              </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={title}
                onChangeText={setTitle}
              />
              <Text style={styles.uploadText}>
                {AppLocalizedStrings.toDoAllMediaScreen.link}
              </Text>
              <TextInput
                style={[styles.textInput]}
                autoCapitalize="none"
                value={link}
                onChangeText={setLink}
              />
              <View style={{marginVertical: 15}}>
                <PrimaryButton
                  title={
                    addToDoLinkLoader ? (
                      <ActivityIndicator color={Colors.White} size={'small'} />
                    ) : (
                      <Text>{AppLocalizedStrings.toDoAllMediaScreen.add}</Text>
                    )
                  }
                  onPress={handleAddLink}
                  disabled={disableAdd}
                />
              </View>

              <Text style={styles.titleStyle}>
                {AppLocalizedStrings.toDoAllMediaScreen.links}
              </Text>
            </>
          )}

          {addToDoLinkLoader || deleteLinkLoader || getJobsByAdsIdLoader ? (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp(10),
                }}>
                <ActivityIndicator size={'small'} color={Colors.Primary500} />
              </View>
            </>
          ) : (
            <FlatList
              data={userLinks}
              keyExtractor={item => item.id}
              renderItem={renderLinkView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(20),
              }}
            />
          )}

          {check === 'complete' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <PrimaryButton
                title={
                  <Text>
                    {AppLocalizedStrings.toDoAllMediaScreen.downloadLinks}
                  </Text>
                }
                onPress={downloadAllLinks}
              />
            </View>
          ) : (
            ''
          )}
        </>
      )}
      {selected == '5' && (
        <>
          {check === 'complete' ? (
            <Text style={styles.uploadText}>
              {AppLocalizedStrings.toDoAllMediaScreen.singleDocs}
            </Text>
          ) : (
            <>
              <Text style={styles.linkTitle}>
                {AppLocalizedStrings.toDoAllMediaScreen.title}
              </Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={title}
                onChangeText={handleTitleChange}
              />
              <Text style={styles.uploadText}>
                {AppLocalizedStrings.toDoAllMediaScreen.document}
              </Text>
              <TouchableOpacity
                style={styles.cradView}
                onPress={() => {
                  setImageVisible(true);
                  setType('document');
                }}>
                <Text style={styles.cradTitle}>
                  {AppLocalizedStrings.MessageingScreen.browse}
                </Text>
              </TouchableOpacity>

              {showError && (
                <Text style={{color: Colors.Destructive400}}>
                  Please fill required field
                </Text>
              )}

              <View style={{marginVertical: 15}}>
                <PrimaryButton
                  title={
                    addToDoDocLoader ? (
                      <ActivityIndicator color={Colors.White} size={'small'} />
                    ) : (
                      <Text>{AppLocalizedStrings.toDoAllMediaScreen.add}</Text>
                    )
                  }
                  onPress={handleAddDocs}
                />
              </View>
            </>
          )}

          {docsFiles?.length !== 0 ? (
            <View
              style={{
                borderColor: Colors.Primary500,
                borderWidth: 1,
                padding: 10,
                borderRadius: 25,
                flexDirection: 'row',
                alignContent: 'center',
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: Colors.Primary500,
                  marginRight: 10,
                }}>
                {docsFiles[0]?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDocsFiles([]);
                }}>
                <View>
                  <SVG.CloseCross
                    width={21}
                    height={21}
                    color={Colors.Primary500}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            ''
          )}

          {addToDoDocLoader ||
          deleteDocLoader ||
          documentLoader ||
          getJobsByAdsIdLoader ? (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: hp(10),
                }}>
                <ActivityIndicator size={'small'} color={Colors.Primary500} />
              </View>
            </>
          ) : (
            <FlatList
              data={userPdfs}
              keyExtractor={item => item.id}
              renderItem={renderDocumentView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(20),
              }}
            />
          )}

          {check === 'complete' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <PrimaryButton
                title={
                  <Text>
                    {AppLocalizedStrings.toDoAllMediaScreen.downloadDocuments}
                  </Text>
                }
                onPress={downloadAllDocs}
              />
            </View>
          ) : (
            ''
          )}
        </>
      )}

      <ToDoAddMediaFilesPopup
        imageVisible={imageVisible}
        setImageVisible={setImageVisible}
        adsId={adsId}
        type={type}
        setDocsFiles={setDocsFiles}
        setShowError={setShowError}
        getJobsByAdsIdLoader={getJobsByAdsIdLoader}
      />

      <Overlay
        overlayStyle={{
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: scale(200),
          width: Dimensions.get('window').width,
        }}
        visible={downloadVisible}>
        <TouchableOpacity onPress={() => setDownloadVisible(false)}>
          <Image
            style={{width: scale(24), height: scale(24), alignSelf: 'flex-end'}}
            source={require('../../../assets/images/close.png')}
          />
        </TouchableOpacity>
        {addToDoDocLoader || documentLoader ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size={'small'} color={Colors.Primary500} />
            <Text style={styles.downloadText}>Uploading</Text>
          </View>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image
              style={{width: scale(34), height: scale(33.7), marginBottom: 10}}
              source={require('../../../assets/images/done.png')}
            />
            <Text style={styles.downloadText}>Uploaded</Text>
          </View>
        )}
      </Overlay>
    </View>
  );
};

export default ToDoAllMediaScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  iconStyle: {
    width: '18@s',
    height: '18@s',
    alignSelf: 'center',
  },
  backContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: '5@s',
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    padding: 10,
  },
  downloadText: {
    fontWeight: '400',
    color: Colors.Neutral800,
    fontSize: '16@s',
    marginVertical: '20@s',
  },
  divider: {
    bottom: '20@s',
    top: '20@s',
  },
  searchInputStyle: {
    backgroundColor: 'red',
    width: '300@s',
  },
  imageStyle: {
    width: '221@s',
    height: '228@s',
    alignSelf: 'center',
    marginTop: '70@s',
  },
  titleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '10@s',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomTextStyle: {
    marginBottom: '80@s',
    top: '5@s',
    color: Colors.Neutral700,
    fontWeight: '400',
    fontSize: '14@s',
  },
  buttonContainer: {
    backgroundColor: Colors.Neutral100,
    height: '36@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '3@s',
    marginTop: '25@s',
  },

  newButtonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  buttonStyle: {
    height: '28@s',
    width: '65@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3@s',
  },

  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral50,
  },
  buttonStyle1: {
    // borderWidth: 2,
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    alignSelf: 'center',
  },
  buttonTextStyle1: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
  },
  mainContainer: {
    height: '80@s',
    paddingVertical: '10@s',
    backgroundColor: Colors.White,
  },
  profileImageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },
  nameTextStyle: {
    fontSize: '14@s',
    fontWeight: '500',
    color: Colors.Neutral900,
  },
  countStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral400,
    marginHorizontal: 2,
  },

  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    // height: '180@s',
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
  overlayTitleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '10@s',
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: hp(1),
  },
  cradTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(1.4),
  },
  uploadText: {
    fontWeight: '500',
    fontSize: '12@s',
    marginTop: hp(1),
    color: Colors.Black,
  },
  linkTitle: {
    fontWeight: '500',
    fontSize: '12@s',
    marginTop: hp(1),
    color: Colors.Black,
  },
  thumbnailContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  },
  textInput: {
    marginVertical: '5@s',
    color: Colors.Neutral900,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '43@s',
    paddingHorizontal: wp(2),
    paddingVertical: 15,
  },
});
