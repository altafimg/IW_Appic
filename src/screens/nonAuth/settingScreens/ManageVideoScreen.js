import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import BackArrow from '../../../components/buttons/BackArrow';
import InsertVideoUrlPopup from '../../../components/popups/InsertVideoUrlPopup';
import {Thumbnail} from 'react-native-thumbnail-video';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import AddedCustomToast from '../../../utility/AddedCustomToast';
import FailedAddedToast from '../../../utility/FailedAddedToast';
import EditVideoUrlPopup from '../../../components/popups/EditVideoUrlPopup';
import {videoUploadAction} from '../../../redux/actions/videoUploadAction';
import {profileBuildApiAction} from '../../../redux/actions/profileBuildApiAction';
// import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {ActivityIndicator} from 'react-native-paper';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';

const ManageVideoScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token);

  const {my_video, _id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const [isContinueLoading, setIsContinueLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const uploadedVideos = my_video?.filter(video =>
    video.includes('https://iw-images.s3.amazonaws.com/'),
  );

  const modifiedUploadedVideos = uploadedVideos?.map(video => ({
    id: Date.now(),
    url: video,
    name: video,
    type: 'upload',
  }));

  const urlVideos = my_video?.filter(
    video => !video.includes('https://iw-images.s3.amazonaws.com/'),
  );

  const modifiedUrlVideos = urlVideos?.map(url => ({
    id: Date.now(),
    url: url,
    name: url,
    type: 'url',
  }));

  // video states url
  const [videoUrl, setVideoUrl] = useState('');
  // const [videoUrlItems, setVideoUrlItems] = useState(modifiedUrlVideos);
  const [videoUrlItems, setVideoUrlItems] = useState(modifiedUrlVideos || []);

  // video states upload
  const [videoUpload, setVideoUpload] = useState('');
  // const [videoUploadItems, setVideoUploadItems] = useState(
  //   modifiedUploadedVideos,
  // );

  const [videoUploadItems, setVideoUploadItems] = useState(
    modifiedUploadedVideos || [],
  );

  // video upload name
  const [videoUploadName, setVideoUploadName] = useState();

  const [isAddVideoVisible, setIsAddVideoVisible] = useState(false);
  const [isEditVideoVisible, setIsEditVideoVisible] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedVideoType, setSelectedVideoType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [deleteShowToast, setDeleteShowToast] = useState(false);
  const [failedShowToast, setFailedShowToast] = useState(false);
  const [isEditMusicVisible, setIsEditMusicVisible] = useState(false);

  const toggleAddVideoModal = () => setIsAddVideoVisible(!isAddVideoVisible);

  const toggleEditVideoModal = () => {
    setIsEditVideoVisible(!isEditVideoVisible);
  };

  useEffect(() => {
    // Reset showToast after 3 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
      setDeleteShowToast(false);
      setFailedShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showToast, deleteShowToast, failedShowToast]);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onVideoHandler = () => {
    let options = {
      mediaType: 'video',
    };
    launchImageLibrary(options, response => {
      if (response?.assets) {
        setVideoUpload(response?.assets[0]?.uri);
        setVideoUploadName(response?.assets[0]?.fileName);
      } else {
        setVideoUpload('');
      }
    });
  };

  const handleAddVideo = () => {
    if (videoUrl.trim() !== '') {
      setVideoUrlItems(prevItems => [
        ...prevItems,
        {id: Date.now(), url: videoUrl, name: videoUrl, type: 'url'},
      ]);
      setShowToast(true);
      setVideoUrl('');
      setIsAddVideoVisible(false);
    } else if (videoUpload.trim() !== '') {
      setVideoUploadItems(prevItems => [
        ...prevItems,
        {
          id: Date.now(),
          url: videoUpload,
          name: videoUploadName,
          type: 'upload',
        },
      ]);
      setShowToast(true);
      setVideoUpload('');
      setVideoUploadName(''); // Clear the video upload name
      setIsAddVideoVisible(false);
    } else {
      setFailedShowToast(true);
      setIsAddVideoVisible(false);
    }
  };

  const handleDeleteVideo = (id, type) => {
    if (type === 'upload') {
      setVideoUploadItems(prevItems =>
        prevItems.filter(item => item.id !== id),
      );
    } else if (type === 'url') {
      setVideoUrlItems(prevItems => prevItems.filter(item => item.id !== id));
    }
    setDeleteShowToast(true);
    setIsEditVideoVisible(false);
  };

  // const handleEditVideo = (index, newUrl) => {
  //   const updatedUrlItems = [...videoUrlItems];
  //   updatedUrlItems[index].url = newUrl;
  //   setVideoUrlItems(updatedUrlItems);
  // };

  const handleEditVideo = (index, newUrl) => {
    if (selectedVideoType === 'url') {
      const updatedUrlItems = [...videoUrlItems];
      if (updatedUrlItems[index]) {
        updatedUrlItems[index].url = newUrl;
        setVideoUrlItems(updatedUrlItems);
      }
    } else if (selectedVideoType === 'upload') {
      const updatedUploadItems = [...videoUploadItems];
      if (updatedUploadItems[index]) {
        updatedUploadItems[index].url = newUrl;
        setVideoUploadItems(updatedUploadItems);
      }
    }
  };

  const openEditVideoModal = (index, type) => {
    setSelectedVideoIndex(index);
    setSelectedVideoType(type);
    if (type === 'url') {
      setVideoUrl(videoUrlItems[index]?.url);
    } else if (type === 'upload') {
      setVideoUpload(videoUploadItems[index]?.url);
    }
    setIsEditVideoVisible(true);
  };

  const getLastPartOfUrl = url => {
    const lastSlashIndex = url.lastIndexOf('/');
    let lastPart = url.substring(lastSlashIndex + 1);
    const truncatedPart =
      lastPart.length > 30 ? lastPart.substring(0, 30) : lastPart;
    return `...${truncatedPart}`;
  };

  const renderVideoThumbnail = (url, index) => {
    return (
      <View style={styles.thumbnailContainer}>
        <Thumbnail
          url={url}
          style={styles.thumbnailStyle}
          showPlayIcon={false}
          containerStyle={styles.thumbnailInnerContainer}
          onError={error => handleThumbnailError(error, url)}
        />
        <View style={styles.placeholderView} />
      </View>
    );
  };

  const handleThumbnailError = (error, url) => {
    console.log(`Error loading thumbnail for ${url}:`, error.nativeEvent);
    // Handle error as needed (e.g., show placeholder or retry loading)
  };

  const onContinueHandler = async () => {
    setIsContinueLoading(true);

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

      const videoLinkUrls = videoUrlItems?.map(item => item.url) || [];

      const videoUrls = [...videoLinkUrls, ...videoUploadUrls]; // Combine video URLs

      console.log(videoUrls);

      const data = {
        _id,
        videoUrls: videoUrls,
      };

      // console.log(data);

      const response = await dispatch(profileBuildApiAction(data));
      console.log(response);
      if (response?.status === 200) {
        navigation.navigate('SettingScreen');
      } else {
        Alert.alert('Please try again!');
      }

      const getProfileData = {
        _id,
        token,
      };
      dispatch(getLoggedInUserProfileAction(getProfileData));
    } catch (err) {
      console.log(err);
    } finally {
      setIsContinueLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackArrow goBack={onGoBackHandler} />

        <View>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.manageVideoScreen.manageVideos}
          </Text>
        </View>
        <TouchableOpacity style={styles.cardView} onPress={toggleAddVideoModal}>
          <Text style={styles.cardTitle}>
            {AppLocalizedStrings.addMusicVideosScreen.video}
          </Text>
        </TouchableOpacity>
        <>
          <FlatList
            data={videoUrlItems}
            renderItem={({item, index}) => (
              <View key={item.id} style={styles.videoCard}>
                {renderVideoThumbnail(item?.url, index)}
                <Text style={styles.videoCardText}>
                  {getLastPartOfUrl(item.url)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    openEditVideoModal(index, item.type);
                  }}>
                  <SVG.ThreeDot />
                </TouchableOpacity>
              </View>
            )}
          />
          <FlatList
            data={videoUploadItems}
            renderItem={({item, index}) => (
              <View key={item.id} style={styles.videoCard}>
                {renderVideoThumbnail(item?.url, index)}

                <Text style={styles.videoCardText}>
                  {getLastPartOfUrl(item.name)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    openEditVideoModal(index, item.type);
                  }}>
                  <SVG.ThreeDot />
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      </ScrollView>
      {/* <PrimaryButton
        title={AppLocalizedStrings.button.save}
        onPress={onContinueHandler}
      /> */}
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
            AppLocalizedStrings.button.save
          )
        }
        onPress={onContinueHandler}
        // disabled={uploadLoader || isContinueLoading}
      />
      {/* <InsertVideoUrlPopup
      //   isVisible2={isVisible}
      //   setIsVisible2={setIsVisible}
      //   toggleModal2={toggleModal}
      // /> */}
      {/* ------------------- Insert video popup ----------------- */}
      <InsertVideoUrlPopup
        isVisible2={isAddVideoVisible}
        setIsVisible2={setIsAddVideoVisible}
        toggleModal2={toggleAddVideoModal}
        setVideoUrl={setVideoUrl}
        setVideoUpload={setVideoUpload}
        videoUrl={videoUrl}
        videoUpload={videoUpload}
        handleAddVideo={handleAddVideo}
        onVideoHandler={onVideoHandler}
      />

      {/* ------------------- Edit video popup ----------------- */}

      <EditVideoUrlPopup
        toggleEditVideoModal={toggleEditVideoModal}
        isEditVideoVisible={isEditVideoVisible}
        handleDeleteVideo={() => {
          handleDeleteVideo(
            selectedVideoType === 'upload'
              ? videoUploadItems[selectedVideoIndex]?.id
              : videoUrlItems[selectedVideoIndex]?.id,
            selectedVideoType,
          );
        }}
        handleEditVideo={newUrl => {
          setIsEditMusicVisible(false);
          handleEditVideo(selectedVideoIndex, newUrl);
          setIsEditMusicVisible(false);
        }}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        videoUpload={videoUpload}
        setVideoUpload={setVideoUpload}
        videoType={selectedVideoType}
        isUploadVideo={selectedVideoType === 'upload'}
      />
      {showToast && (
        <AddedCustomToast
          message={'Successfully added music/video'}
          backgroundColor="#DCFCE7"
          color="#171717"
        />
      )}
      {deleteShowToast && (
        <AddedCustomToast
          message={'Successfully deleted music/video'}
          backgroundColor="#DCFCE7"
          color="#171717"
        />
      )}
      {failedShowToast && (
        <FailedAddedToast
          message={'Failed to add music/video'}
          backgroundColor="#FEE2E2"
          color="#EF4444"
        />
      )}
    </View>
  );
};

export default ManageVideoScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  cardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral500,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: hp(1),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(1.4),
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
  },
  thumbnailStyle: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  thumbnailInnerContainer: {
    flex: 1,
  },
  videoCardText: {
    flex: 1,
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(1.5),
    marginLeft: wp(2),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(0.4),
  },
  placeholderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: 'black',
  },
});
