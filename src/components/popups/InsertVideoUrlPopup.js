// import React from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import PrimaryButton from '../buttons/PrimaryButton';
// import {AppLocalizedStrings} from '../../localization/Localization';
// import {hp, wp} from '../../utility/responsive/ScreenResponsive';
// import Colors from '../../theme/Colors';
// import DetailsTextInput from '../textInput/DetailsTextInput';
// import Modal from 'react-native-modal';

// const InsertVideoUrlPopup = props => {
//   const isVisible2 = props.isVisible2;
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       isVisible={isVisible2}
//       onRequestClose={props.toggleModal2}>
//       <TouchableWithoutFeedback onPress={props.toggleModal2}>
//         <View style={styles.container}>
//           <View style={styles.main}>
//             <View style={styles.inputMain}>
//               <DetailsTextInput
//                 placeholder=" "
//                 title={AppLocalizedStrings.addMusicVideosScreen.insertVideo}
//                 editable={true}
//                 // onChangeText={props.setVideoUrl}
//                 onChangeText={props.setVideoLink}
//                 value={props.videoLink}
//               />
//             </View>
//             <View>
//               <TouchableOpacity
//                 style={styles.dontMusicButton}
//                 onPress={props.onVideoHandler}>
//                 <Text style={styles.dontMusicButtonTitle}>
//                   {AppLocalizedStrings.addMusicVideosScreen.import}
//                 </Text>
//               </TouchableOpacity>
//               <PrimaryButton
//                 title={AppLocalizedStrings.button.continue}
//                 onPress={props.handleAddVideo}
//               />
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default InsertVideoUrlPopup;

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
//     marginBottom: hp(2),
//   },
//   dontMusicButton: {
//     borderWidth: 1,
//     borderColor: Colors.Primary500,
//     borderRadius: 5,
//     backgroundColor: Colors.White,
//     height: hp(6),
//     justifyContent: 'center',
//     marginVertical: hp(1.5),
//   },
//   dontMusicButtonTitle: {
//     color: Colors.Primary500,
//     fontSize: '14@s',
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });

// // import {StyleSheet, Text, View} from 'react-native';
// // import React from 'react';

// // const InsertVideoUrlPopup = () => {
// //   return (
// //     <View>
// //       <Text>InsertVideoUrlPopup</Text>
// //     </View>
// //   );
// // };

// // export default InsertVideoUrlPopup;

// // const styles = StyleSheet.create({});

import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Modal from 'react-native-modal';
import DetailsTextInput from '../textInput/DetailsTextInput';

const InsertVideoUrlPopup = props => {
  const {
    isVisible2,
    toggleModal2,
    videoUrl,
    setVideoUrl,
    videoUpload,
    setVideoUpload,
    onVideoHandler,
    handleAddVideo,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible2}
      onRequestClose={toggleModal2}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={toggleModal2}>
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.inputMain}>
                <DetailsTextInput
                  placeholder=" "
                  title={AppLocalizedStrings.addMusicVideosScreen.insertVideo}
                  editable={true}
                  onChangeText={setVideoUrl}
                  value={videoUrl}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.dontMusicButton}
                  onPress={onVideoHandler}>
                  <Text style={styles.dontMusicButtonTitle}>
                    {AppLocalizedStrings.addMusicVideosScreen.import}
                  </Text>
                </TouchableOpacity>
                <PrimaryButton
                  title={AppLocalizedStrings.button.continue}
                  onPress={handleAddVideo}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InsertVideoUrlPopup;

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
    marginBottom: hp(2),
  },
  dontMusicButton: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    marginVertical: hp(1.5),
  },
  dontMusicButtonTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '500',
    textAlign: 'center',
  },
});
