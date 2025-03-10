import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg';
import InsertMusicUrlPopup from '../popups/InsertMusicUrlPopup';
import EditMusicUrlPopup from '../popups/EditMusicUrlPopup';
import {AppLocalizedStrings} from '../../localization/Localization';
import CustomToast from '../../utility/CustomToast';
import AddedCustomToast from '../../utility/AddedCustomToast';
import FailedAddedToast from '../../utility/FailedAddedToast';
import InsertVideoUrlPopup from '../popups/InsertVideoUrlPopup';
import {launchImageLibrary} from 'react-native-image-picker';
import EditVideoUrlPopup from '../popups/EditVideoUrlPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMusicView = ({
  musicItems,
  setMusicItems,
  musicUrl,
  setMusicUrl,

  videoUpload,
  setVideoUpload,
  videoUploadItems,
  setVideoUploadItems,

  videoUrl,
  setVideoUrl,
  videoUrlItems,
  setVideoUrlItems,

  videoUploadName,
  setVideoUploadName,
}) => {
  // Modal states
  const [isAddMusicVisible, setIsAddMusicVisible] = useState(false);
  const [isAddVideoVisible, setIsAddVideoVisible] = useState(false);
  const [isEditMusicVisible, setIsEditMusicVisible] = useState(false);
  const [isEditVideoVisible, setIsEditVideoVisible] = useState(false);

  // Music and video indices
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedVideoType, setSelectedVideoType] = useState('');

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [deleteShowToast, setDeleteShowToast] = useState(false);
  const [failedShowToast, setFailedShowToast] = useState(false);

  // Modal functions
  const toggleAddMusicModal = () => {
    setIsAddMusicVisible(!isAddMusicVisible);
    setMusicUrl(''); // Reset music URL when closing the modal
  };

  const toggleEditMusicModal = () => {
    setIsEditMusicVisible(!isEditMusicVisible);
  };

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

  const handleAddMusic = () => {
    if (musicUrl.trim() !== '') {
      setMusicItems(prevItems => [
        ...prevItems,
        {id: Date.now(), url: musicUrl},
      ]);
      setShowToast(true);
      setMusicUrl('');
      setIsAddMusicVisible(false);
    } else {
      setFailedShowToast(true);
      setIsAddMusicVisible(false);
    }
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

  const handleDeleteMusic = id => {
    setMusicItems(prevItems => prevItems.filter(item => item.id !== id));
    setDeleteShowToast(true);
    setIsEditMusicVisible(false);
  };

  const handleEditMusic = (index, newUrl) => {
    const updatedItems = [...musicItems];
    updatedItems[index].url = newUrl;
    setMusicItems(updatedItems);
  };

  const openEditMusicModal = index => {
    setSelectedMusicIndex(index);
    setIsEditMusicVisible(true);
    setMusicUrl(musicItems[index].url);
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

  const handleEditVideo = (index, newUrl) => {
    const updatedUrlItems = [...videoUrlItems];
    updatedUrlItems[index].url = newUrl;
    setVideoUrlItems(updatedUrlItems);
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

  useEffect(() => {
    loadSelectedValues();
  }, []);

  useEffect(() => {
    saveSelectedValues();
  }, [musicItems, videoUploadItems, videoUploadName, videoUrlItems]);

  const loadSelectedValues = async () => {
    try {
      const savedMusicItems = await AsyncStorage.getItem('savedMusicItems');
      if (savedMusicItems) {
        setMusicItems(JSON.parse(savedMusicItems));
      }
      const savedVideoUploadItems = await AsyncStorage.getItem(
        'savedVideoUploadItems',
      );
      if (savedVideoUploadItems) {
        setVideoUploadItems(JSON.parse(savedVideoUploadItems));
      }

      const savedVideoUrlItems = await AsyncStorage.getItem(
        'savedVideoUrlItems',
      );
      if (savedVideoUrlItems) {
        setVideoUrlItems(JSON.parse(savedVideoUrlItems));
      }
      // const savedVideoUploadName = await AsyncStorage.getItem(
      //   'savedVideoUploadName',
      // );
    } catch (error) {
      console.error('Error loading saved values:', error);
    }
  };

  const saveSelectedValues = async () => {
    try {
      await AsyncStorage.setItem('savedMusicItems', JSON.stringify(musicItems));
      await AsyncStorage.setItem(
        'savedVideoUploadItems',
        JSON.stringify(videoUploadItems),
      );
      await AsyncStorage.setItem(
        'savedVideoUrlItems',
        JSON.stringify(videoUrlItems),
      );
      // await AsyncStorage.setItem(
      //   'savedVideoUploadName',
      //   JSON.stringify(videoUploadName),
      // );
    } catch (error) {
      console.error('Error saving values:', error);
    }
  };

  return (
    <View style={styles.cardMainView}>
      <TouchableOpacity style={styles.cradView} onPress={toggleAddMusicModal}>
        <Text style={styles.cradTitle}>
          {AppLocalizedStrings.addMusicVideosScreen.music}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cradView} onPress={toggleAddVideoModal}>
        <Text style={styles.cradTitle}>
          {AppLocalizedStrings.addMusicVideosScreen.video}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={musicItems}
        renderItem={({item, index}) => (
          <View key={item.id} style={styles.musicAddCard}>
            <Text style={styles.musicAddCardTitle}>
              {'Music : ' + item.url}
            </Text>
            <TouchableOpacity onPress={() => openEditMusicModal(index)}>
              <SVG.ThreeDot />
            </TouchableOpacity>
          </View>
        )}
      />
      <FlatList
        data={videoUrlItems}
        renderItem={({item, index}) => (
          <View key={item.id} style={styles.musicAddCard}>
            <Text style={styles.musicAddCardTitle}>{item.url}</Text>
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
          <View key={item.id} style={styles.musicAddCard}>
            <Text style={styles.musicAddCardTitle}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                openEditVideoModal(index, item.type);
              }}>
              <SVG.ThreeDot />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* -------- Insert music popup ---------*/}
      <InsertMusicUrlPopup
        isVisible={isAddMusicVisible}
        toggleModal={toggleAddMusicModal}
        setMusicUrl={setMusicUrl}
        handleAddMusic={handleAddMusic}
        musicUrl={musicUrl}
      />

      {/* -------- Edit and delete music popup ---------*/}
      <EditMusicUrlPopup
        isVisible4={isEditMusicVisible}
        setIsVisible4={setIsEditMusicVisible}
        toggleModal4={toggleEditMusicModal}
        handleDeleteMusic={() =>
          handleDeleteMusic(musicItems[selectedMusicIndex]?.id)
        }
        handleEditMusic={newUrl => {
          handleEditMusic(selectedMusicIndex, newUrl);
          setIsEditMusicVisible(false);
        }}
        musicUrl={musicUrl}
        setMusicUrl={setMusicUrl}
      />

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

      {/* ------------------------ Music video success failure toast ----------------- */}
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

export default AddMusicView;

const styles = ScaledSheet.create({
  cardMainView: {
    marginTop: hp(-3),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral500,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: hp(1),
  },
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(1.4),
  },
  musicAddCard: {
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
  musicAddCardTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1),
  },
});
