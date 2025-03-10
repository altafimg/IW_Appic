// import React, {useState} from 'react';
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
// import InsertMusicUrlPopup from './InsertMusicUrlPopup';
// import EditMusicUrlSecPopup from './EditMusicUrlSecPopup';

// const EditMusicUrlPopup = ({
//   isVisible4,
//   toggleModal4,
//   handleDeleteMusic,
//   index,
//   toggleModal,
//   setIsVisible,
//   handleEditMusic,
// }) => {
//   const handle = () => {
//     handleDeleteMusic(index);
//     toggleModal4();
//   };

//   const [open, setOpen] = useState(false);

//   const handelInsertMusicUrl = () => {
//     setOpen(!open);
//   };

//   return (
//     <>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         isVisible={isVisible4}
//         onRequestClose={toggleModal}>
//         <TouchableWithoutFeedback onPress={toggleModal4}>
//           <View style={styles.container}>
//             <View style={styles.main}>
//               <TouchableOpacity onPress={handelInsertMusicUrl}>
//                 <Text style={styles.openTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.editMusic}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handle}>
//                 <Text style={styles.cancelTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.deleteMusic}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//         {/* <InsertMusicUrlPopup
//           isVisible={open}
//           setIsVisible={setOpen}
//           toggleModal={handelInsertMusicUrl}
//         /> */}
//         <EditMusicUrlSecPopup
//           isVisible={open}
//           setIsVisible={setOpen}
//           toggleModal={handelInsertMusicUrl}
//         />
//       </Modal>
//     </>
//   );
// };

// export default EditMusicUrlPopup;

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
//     paddingBottom: hp(5),
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(3),
//     paddingVertical: wp(6),
//   },
//   openTitle: {
//     color: Colors.Neutral800,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//     lineHeight: '22@s',
//   },
//   cancelTitle: {
//     color: Colors.Destructive500,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//     lineHeight: '22@s',
//   },
// });

// import React, {useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import {ScaledSheet} from 'react-native-size-matters';
// import {AppLocalizedStrings} from '../../localization/Localization';
// import {hp, wp} from '../../utility/responsive/ScreenResponsive';
// import Colors from '../../theme/Colors';
// import EditMusicUrlSecPopup from './EditMusicUrlSecPopup';

// const EditMusicUrlPopup = ({
//   isVisible4,
//   toggleModal4,
//   handleDeleteMusic,
//   handleEditMusic,
//   musicUrl,
//   setMusicUrl,
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleEditMusicUrl = newUrl => {
//     handleEditMusic(newUrl);
//     toggleModal4();
//   };

//   return (
//     <>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         isVisible={isVisible4}
//         onRequestClose={toggleModal4}>
//         <TouchableWithoutFeedback onPress={toggleModal4}>
//           <View style={styles.container}>
//             <View style={styles.main}>
//               <TouchableOpacity onPress={() => setOpen(true)}>
//                 <Text style={styles.openTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.editMusic}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDeleteMusic}>
//                 <Text style={styles.cancelTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.deleteMusic}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//         <EditMusicUrlSecPopup
//           isVisible={open}
//           setIsVisible={setOpen}
//           toggleModal={() => setOpen(false)}
//           musicUrl={musicUrl}
//           setMusicUrl={setMusicUrl}
//           handleEditMusicUrl={handleEditMusicUrl}
//         />
//       </Modal>
//     </>
//   );
// };

// export default EditMusicUrlPopup;

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
//     paddingBottom: hp(5),
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(3),
//     paddingVertical: wp(6),
//   },
//   openTitle: {
//     color: Colors.Neutral800,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//     lineHeight: '22@s',
//   },
//   cancelTitle: {
//     color: Colors.Destructive500,
//     fontSize: '14@s',
//     fontWeight: '400',
//     paddingVertical: hp(2),
//     lineHeight: '22@s',
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
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import EditMusicUrlSecPopup from './EditMusicUrlSecPopup';

const EditMusicUrlPopup = ({
  isVisible4,
  toggleModal4,
  handleDeleteMusic,
  handleEditMusic,
  musicUrl,
  setMusicUrl,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false); // State to manage the visibility of the Edit Music URL secondary popup

  const handleEditMusicUrl = newUrl => {
    handleEditMusic(newUrl);
    setMusicUrl(''); // Reset music URL after editing
    setIsEditOpen(false); // Close the Edit Music URL secondary popup after successful edit
    toggleModal4(); // Close the main Edit Music URL popup
  };

  const toggleEditPopup = () => {
    setIsEditOpen(!isEditOpen); // Toggle the visibility of the Edit Music URL secondary popup
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isVisible4}
        onRequestClose={toggleModal4}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={toggleModal4}>
            <View style={styles.container}>
              <View style={styles.main}>
                <TouchableOpacity onPress={toggleEditPopup}>
                  <Text style={styles.openTitle}>
                    {AppLocalizedStrings.addMusicVideosScreen.editMusic}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteMusic}>
                  <Text style={styles.cancelTitle}>
                    {AppLocalizedStrings.addMusicVideosScreen.deleteMusic}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit Music URL secondary popup */}
      <EditMusicUrlSecPopup
        isVisible={isEditOpen}
        setIsVisible={setIsEditOpen}
        toggleModal={toggleEditPopup}
        musicUrl={musicUrl}
        setMusicUrl={setMusicUrl}
        handleEditMusicUrl={handleEditMusicUrl}
      />
    </>
  );
};

export default EditMusicUrlPopup;

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
    paddingBottom: hp(5),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: wp(6),
  },
  openTitle: {
    color: Colors.Neutral800,
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: hp(2),
    lineHeight: '22@s',
  },
  cancelTitle: {
    color: Colors.Destructive500,
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: hp(2),
    lineHeight: '22@s',
  },
});
