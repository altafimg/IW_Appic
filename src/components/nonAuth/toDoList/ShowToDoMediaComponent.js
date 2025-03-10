import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {Image} from 'react-native';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import VideoThumbnail from '../../VideoThumbnail';

import document from '../../../assets/images/document.png';
import speaker from '../../../assets/images/speaker.png';
import links from '../../../assets/images/links.png';
import downloadFileHandler from '../../../DownloadFileHandler';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {global} from '../../../global';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';

const ShowToDoMediaComponent = ({key, media, status, adsId}) => {
  const token = useSelector(state => state.loginReducer?.token);

  const getFileExtension = url => {
    const fileName = url?.split('/')?.pop();
    return fileName?.split('.')?.pop();
  };

  const downloadFile = url => {
    const fileExtension = getFileExtension(url);
    downloadFileHandler(fileExtension, url);
  };

  const openLink = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const [deleteImageLoader, setDeleteImageLoader] = useState(false);
  const [deleteVideoLoader, setDeleteVideoLoader] = useState(false);
  const [deleteAudioLoader, setDeleteAudioLoader] = useState(false);
  const [deleteDocLoader, setDeleteDocLoader] = useState(false);
  const [deleteLinkLoader, setDeleteLinkLoader] = useState(false);

  const apiData = {
    token: token,
    id: adsId,
  };

  const deleteUserVideoHandler = async id => {
    console.log(id, '<<<<<,id');
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
    console.log(adsId, applicant_id, id);
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
    console.log(adsId, applicant_id, id);
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

    console.log(adsId, applicant_id, id);

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

  const renderMedia = () => {
    return (
      <View>
        {media?.image ? (
          <View style={styles.musicAddCard}>
            <View style={styles.videoCard}>
              <Image
                source={{uri: media?.image}}
                style={styles.profileImageStyle}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {'...' + media?.image?.split('/images/')[1]?.slice(-11)}
              </Text>
            </View>
            {status[0] === 'completed' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadFile(media?.image)}>
                <SVG.Download width={21} height={21} />
              </TouchableOpacity>
            ) : status[0] === 'in progress' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => deleteUserImageHandler(media?._id)}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        ) : media?.video ? (
          <View style={styles.musicAddCard}>
            <View style={styles.videoCard}>
              {/* <Video
                source={{uri: media?.video}}
                style={styles.profileImageStyle}
                controls
                muted
              /> */}

              <VideoThumbnail videoUrl={media?.video} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {'...' + media?.video?.split('/Video/')[1]?.slice(-10)}
              </Text>
            </View>
            {status[0] === 'completed' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadFile(media?.video)}>
                <SVG.Download width={21} height={21} />
              </TouchableOpacity>
            ) : status[0] === 'in progress' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => deleteUserVideoHandler(media?._id)}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        ) : media?.documented ? (
          <View style={styles.musicAddCard}>
            <View style={styles.videoCard}>
              <Image
                source={document}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 5,
                  marginLeft: 5,
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {'...' + media?.documented?.split('/Document/')[1]?.slice(-10)}
              </Text>
            </View>
            {status[0] === 'completed' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadFile(media?.documented)}>
                <SVG.Download width={21} height={21} />
              </TouchableOpacity>
            ) : status[0] === 'in progress' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => deleteUserDocHandler(media?._id)}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        ) : media?.link ? (
          <View style={styles.musicAddCard}>
            <View style={styles.videoCard}>
              <Image
                source={links}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 5,
                  marginLeft: 5,
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                {media?.link}
              </Text>
            </View>
            {status[0] === 'completed' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => openLink(media?.link)}>
                <SVG.Download width={21} height={21} />
              </TouchableOpacity>
            ) : status[0] === 'in progress' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => deleteUserLinkHandler(media?._id)}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        ) : media?.audio ? (
          <View style={styles.musicAddCard}>
            <View style={styles.videoCard}>
              <View
                style={{
                  backgroundColor: Colors.Primary100,
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Image
                  source={speaker}
                  x
                  style={{
                    width: scale(24),
                    height: scale(24),
                    marginRight: 6,
                    marginLeft: 6,
                  }}
                />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.Black,
                }}>
                <Text>
                  {'...' + media?.audio?.split('/Audio/')[1]?.slice(-10)}
                </Text>
              </Text>
            </View>
            {status[0] === 'completed' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadFile(media?.audio)}>
                <SVG.Download width={21} height={21} />
              </TouchableOpacity>
            ) : status[0] === 'in progress' ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => deleteUserAudioHandler(media?._id)}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        ) : (
          ''
        )}
      </View>
    );
  };

  return <View>{renderMedia()}</View>;
};

export default ShowToDoMediaComponent;

const styles = ScaledSheet.create({
  musicAddCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1),
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },
});
