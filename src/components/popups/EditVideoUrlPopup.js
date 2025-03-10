// import React from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import {hp, wp} from '../../utility/responsive/ScreenResponsive';
// import Colors from '../../theme/Colors';
// import {ScaledSheet} from 'react-native-size-matters';
// import {AppLocalizedStrings} from '../../localization/Localization';

// const EditVideoUrlPopup = ({
//   toggleEditVideoModal,
//   isEditVideoVisible,
//   handleDeleteVideo,
//   onImageHandler,
//   isUploadVideo,
// }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       isVisible={isEditVideoVisible}
//       onRequestClose={toggleEditVideoModal}>
//       <TouchableWithoutFeedback onPress={toggleEditVideoModal}>
//         <View style={styles.container}>
//           <View style={styles.main}>
//             {!isUploadVideo && (
//               <TouchableOpacity onPress={onImageHandler}>
//                 <Text style={styles.openTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.edit}
//                 </Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity onPress={handleDeleteVideo}>
//               <Text style={styles.cancelTitle}>
//                 {AppLocalizedStrings.addMusicVideosScreen.deleteVideo}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default EditVideoUrlPopup;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginHorizontal: wp(-5),
//     marginBottom: hp(-2.3),
//   },
//   main: {
//     backgroundColor: Colors.White,
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,
//     paddingBottom: hp(2),
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(3),
//   },
//   openTitle: {
//     color: Colors.Neutral800,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//   },
//   cancelTitle: {
//     color: Colors.Destructive500,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//   },
// });

import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import EditVideoUrlSecPopup from './EditVideoUrlSecPopup';

const EditVideoUrlPopup = ({
  toggleEditVideoModal,
  isEditVideoVisible,
  handleDeleteVideo,
  isUploadVideo,
  handleEditVideo,
  videoUrl,
  setVideoUrl,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditVideoUrl = newUrl => {
    handleEditVideo(newUrl);
    setVideoUrl('');
    setIsEditOpen(false);
    toggleEditVideoModal();
  };

  const toggleEditPopup = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isEditVideoVisible}
        onRequestClose={toggleEditVideoModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={toggleEditVideoModal}>
            <View style={styles.container}>
              <View style={styles.main}>
                {!isUploadVideo && (
                  <TouchableOpacity onPress={toggleEditPopup}>
                    <Text style={styles.openTitle}>
                      {AppLocalizedStrings.addMusicVideosScreen.edit}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleDeleteVideo}>
                  <Text style={styles.cancelTitle}>
                    {AppLocalizedStrings.addMusicVideosScreen.deleteVideo}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      <EditVideoUrlSecPopup
        isVisible={isEditOpen}
        setIsVisible={setIsEditOpen}
        toggleModal={toggleEditPopup}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        handleEditVideoUrl={handleEditVideoUrl}
      />
    </>
  );
};

export default EditVideoUrlPopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(-5),
    marginBottom: hp(-2.3),
  },
  main: {
    backgroundColor: Colors.White,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: hp(2),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  openTitle: {
    color: Colors.Neutral800,
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: hp(2),
  },
  cancelTitle: {
    color: Colors.Destructive500,
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: hp(2),
  },
});
