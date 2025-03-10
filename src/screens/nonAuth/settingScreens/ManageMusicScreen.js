import React, {useState, useEffect} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import BackArrow from '../../../components/buttons/BackArrow';
import InsertMusicUrlPopup from '../../../components/popups/InsertMusicUrlPopup';
import {useDispatch, useSelector} from 'react-redux';
import {profileBuildApiAction} from '../../../redux/actions/profileBuildApiAction';
// import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import EditMusicUrlPopup from '../../../components/popups/EditMusicUrlPopup';
import AddedCustomToast from '../../../utility/AddedCustomToast';
import FailedAddedToast from '../../../utility/FailedAddedToast';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';

const ManageMusicScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token);

  const {my_music, _id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  // Add IDs to each music item if they don't already have one
  const initialMusicItems = (my_music || []).map((url, index) => ({
    id: index,
    url,
  }));

  // music states
  const [musicItems, setMusicItems] = useState(initialMusicItems);
  const [musicUrl, setMusicUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [deleteShowToast, setDeleteShowToast] = useState(false);
  const [failedShowToast, setFailedShowToast] = useState(false);
  const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
  const [isEditMusicVisible, setIsEditMusicVisible] = useState(false);
  const [isAddMusicVisible, setIsAddMusicVisible] = useState(false);

  useEffect(() => {
    // Reset showToast after 3 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
      setDeleteShowToast(false);
      setFailedShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showToast, deleteShowToast, failedShowToast]);

  const saveMusicHandler = async () => {
    const filteredData = musicItems?.map(item => item.url);
    const data = {
      _id,
      musicUrls: filteredData,
    };

    console.log(data);

    const res = await dispatch(profileBuildApiAction(data));
    if (res?.status === 200) {
      navigation.navigate('SettingScreen');
    } else {
      Alert.alert('Please try again!');
    }

    // dispatch(profileBuildApiAction(data)).then(res => {
    //   console.log(res);

    // });

    const getProfileData = {
      _id,
      token,
    };
    dispatch(getLoggedInUserProfileAction(getProfileData));

    // navigation.navigate("EditProfileScreen")
  };

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

  const toggleEditMusicModal = () => {
    setIsEditMusicVisible(!isEditMusicVisible);
  };

  const toggleAddMusicModal = () => {
    setIsAddMusicVisible(!isAddMusicVisible);
    setMusicUrl(''); // Reset music URL when closing the modal
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

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const getLastPartOfUrl = url => {
    const lastSlashIndex = url.lastIndexOf('/');
    let lastPart = url.substring(lastSlashIndex + 1);
    const truncatedPart =
      lastPart.length > 30 ? lastPart.substring(0, 30) : lastPart;
    return `...${truncatedPart}`;
  };

  const lastParts = musicItems?.map(item => getLastPartOfUrl(item.url));

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackArrow goBack={onGoBackHandler} />
        <View>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.manageMusicScreen.manageMusic}
          </Text>
        </View>
        <TouchableOpacity style={styles.cradView} onPress={toggleAddMusicModal}>
          <Text style={styles.cradTitle}>
            {AppLocalizedStrings.addMusicVideosScreen.music}
          </Text>
        </TouchableOpacity>

        <>
          {lastParts?.map((part, index) => (
            <View style={styles.musicAddCard} key={index}>
              <Text
                style={[
                  styles.musicAddCardTitle,
                  {
                    width: '15%',
                  },
                ]}>
                {'Music : '}
              </Text>
              <Text
                style={{
                  width: '80%',
                  color: Colors.Neutral900,
                  fontSize: 12,
                  fontWeight: '400',
                  paddingVertical: hp(1.5),
                }}>
                {part}
              </Text>

              <TouchableOpacity onPress={() => openEditMusicModal(index)}>
                <SVG.ThreeDot />
              </TouchableOpacity>
            </View>
          ))}
        </>
      </ScrollView>
      <View style={styles.fixedFooter}>
        <PrimaryButton
          title={AppLocalizedStrings.button.save}
          onPress={saveMusicHandler}
        />
      </View>
      <InsertMusicUrlPopup
        isVisible={isAddMusicVisible}
        toggleModal={toggleAddMusicModal}
        setMusicUrl={setMusicUrl}
        handleAddMusic={handleAddMusic}
        musicUrl={musicUrl}
      />

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

export default ManageMusicScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  scrollContent: {
    paddingBottom: hp(10), // to make space for the button
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
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(0.4),
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: Colors.White,
    // borderTopWidth: 1,
    // borderTopColor: Colors.Neutral200,
  },
});

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.White,
//     paddingHorizontal: wp(3),
//     paddingVertical: hp(3),
//   },
//   cradView: {
//     borderWidth: 1,
//     borderColor: Colors.Neutral500,
//     borderRadius: 5,
//     borderStyle: 'dashed',
//     marginVertical: hp(1),
//   },
//   cradTitle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '400',
//     textAlign: 'center',
//     paddingVertical: hp(1.4),
//   },
//   musicAddCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: Colors.White,
//     shadowColor: '#ccc',
//     shadowOffset: {width: 0, height: 0},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//     paddingHorizontal: wp(2),
//     marginVertical: hp(1),
//   },
//   musicAddCardTitle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '400',
//     paddingVertical: hp(1.5),
//   },
//   headerTitle: {
//     color: Colors.Neutral900,
//     fontSize: '21@s',
//     fontWeight: '600',
//     paddingTop: hp(0.4),
//   },
// });
