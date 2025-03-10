// import React from 'react';
// import {TouchableWithoutFeedback, View} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import PrimaryButton from '../buttons/PrimaryButton';
// import {AppLocalizedStrings} from '../../localization/Localization';
// import {hp, wp} from '../../utility/responsive/ScreenResponsive';
// import Colors from '../../theme/Colors';
// import DetailsTextInput from '../textInput/DetailsTextInput';
// import Modal from 'react-native-modal';
// import {useSelector} from 'react-redux';

// const EditMusicUrlSecPopup = ({
//   isVisible,
//   toggleModal,
//   musicUrl,
//   setMusicUrl,
//   handleAddMusic,
//   index,
// }) => {
//   const name = useSelector(state => state.musicVideoDataReducer.data);
//   console.log(index?.item, '<<<<');
//   const url = index?.item;
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       isVisible={isVisible}
//       onRequestClose={toggleModal}>
//       <TouchableWithoutFeedback onPress={toggleModal}>
//         <View style={styles.container}>
//           <View style={styles.main}>
//             <View style={styles.inputMain}>
//               <DetailsTextInput
//                 placeholder=""
//                 title={AppLocalizedStrings.addMusicVideosScreen.insertMusic}
//                 editable={true}
//                 onChangeText={url}
//                 // value={url}
//               />
//             </View>
//             <PrimaryButton
//               title={AppLocalizedStrings.button.continue}
//               onPress={handleAddMusic}
//             />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default EditMusicUrlSecPopup;

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
//     paddingHorizontal: wp(3),
//     justifyContent: 'space-between',
//     paddingTop: hp(4),
//   },
//   inputMain: {
//     marginBottom: hp(3),
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import DetailsTextInput from '../textInput/DetailsTextInput';
import Modal from 'react-native-modal';

const EditMusicUrlSecPopup = ({
  isVisible,
  toggleModal,
  musicUrl,
  setMusicUrl,
  handleEditMusicUrl,
}) => {
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    setNewUrl(musicUrl);
  }, [musicUrl]);

  const handleSave = () => {
    handleEditMusicUrl(newUrl);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={toggleModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.inputMain}>
                <DetailsTextInput
                  placeholder=""
                  title={AppLocalizedStrings.addMusicVideosScreen.editMusic}
                  editable={true}
                  onChangeText={setNewUrl}
                  value={newUrl}
                />
              </View>
              <PrimaryButton
                title={AppLocalizedStrings.button.continue}
                onPress={handleSave}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditMusicUrlSecPopup;

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
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingTop: hp(4),
  },
  inputMain: {
    marginBottom: hp(3),
  },
});
