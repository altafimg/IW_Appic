import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';

import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {Thumbnail} from 'react-native-thumbnail-video';
import {createThumbnail} from 'react-native-create-thumbnail';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

// images
import image from '../../../assets/images/image.png';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import document from '../../../assets/images/document.png';
import links from '../../../assets/images/links.png';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useSelector} from 'react-redux';
import VideoThumbnail from '../../../components/VideoThumbnail';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {Linking} from 'react-native';
import downloadFileHandler from '../../../DownloadFileHandler';

const ApplicantsAllMediaScreen = ({route, navigation}) => {
  const {applicant_id} = route?.params || {};

  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );

  const applicantData = data?.applicants;

  const matchingItems = applicantData?.filter(
    item => item?.applicants_id?._id === applicant_id,
  );

  const [selected, setSelected] = useState('1');

  const userAudios =
    matchingItems?.flatMap(item => item?.mediaFilesAudio) || [];

  const userImages =
    matchingItems?.flatMap(item => item?.mediaFilesImage) || [];

  const userLinks = matchingItems?.flatMap(item => item?.mediaFilesLink) || [];

  const userPdfs = matchingItems?.flatMap(item => item?.mediaFilesPdf) || [];

  const userVideos =
    matchingItems?.flatMap(item => item?.mediaFilesVideo) || [];

  const getFileExtension = url => {
    const fileName = url?.split('/')?.pop();
    return fileName?.split('.')?.pop();
  };

  const downloadUserImageHandler = imagePath => {
    const fileExtension = getFileExtension(imagePath);
    downloadFileHandler(fileExtension, imagePath);
  };

  const downloadUserVideoHandler = async videoUrl => {
    console.log(videoUrl);
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
      // Check if the URL can be opened
      const supported = await Linking.canOpenURL(linkUrl);

      if (supported) {
        // Open the URL in the default browser
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
          <TouchableOpacity
            onPress={() => downloadUserImageHandler(item?.image)}>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Image source={download} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => downloadUserAudioHandler(item?.audio)}>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Image source={download} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => downloadUserVideoHandler(item?.video)}>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Image source={download} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
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
          {/* <TouchableOpacity onPress={() => downloadUserLinkHandler(item?.link)}>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Image source={download} style={styles.iconStyle} />
            </View>
          </TouchableOpacity> */}
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
          <TouchableOpacity
            onPress={() => downloadUserDocHandler(item?.documented)}>
            <View style={{alignItems: 'flex-end', marginRight: 5}}>
              <Image source={download} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
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
      <BackArrow goBack={() => navigation.goBack()} />

      <Header
        headerTitle={AppLocalizedStrings.toDoAllMediaScreen.all}
        subTitle={null}
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
          <Text style={styles.uploadText}>
            {AppLocalizedStrings.toDoAllMediaScreen.singleImages}
          </Text>

          <FlatList
            data={userImages}
            keyExtractor={item => item.id}
            renderItem={renderImageView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
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
        </>
      )}
      {selected == '2' && (
        <>
          <Text style={styles.uploadText}>
            {AppLocalizedStrings.toDoAllMediaScreen.singleVideos}
          </Text>

          <FlatList
            data={userVideos}
            keyExtractor={item => item?.id}
            renderItem={renderVideoView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
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
        </>
      )}
      {selected == '3' && (
        <>
          <Text style={styles.uploadText}>
            {AppLocalizedStrings.toDoAllMediaScreen.singleAudios}
          </Text>

          <FlatList
            data={userAudios}
            keyExtractor={item => item.id}
            renderItem={renderAudioView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
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
        </>
      )}
      {selected == '4' && (
        <>
          <Text style={styles.uploadText}>
            {AppLocalizedStrings.toDoAllMediaScreen.singleLinks}
          </Text>

          <FlatList
            data={userLinks}
            keyExtractor={item => item.id}
            renderItem={renderLinkView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />

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
        </>
      )}
      {selected == '5' && (
        <>
          <Text style={styles.uploadText}>
            {AppLocalizedStrings.toDoAllMediaScreen.singleDocs}
          </Text>

          <FlatList
            data={userPdfs}
            keyExtractor={item => item.id}
            renderItem={renderDocumentView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />

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
        </>
      )}
    </View>
  );
};

export default ApplicantsAllMediaScreen;

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
    fontWeight: '600',
    fontSize: '16@s',
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
