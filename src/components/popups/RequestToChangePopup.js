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
// import DetailsTextInput from '../textInput/DetailsTextInput';
// import PrimaryButton from '../buttons/PrimaryButton';
// import {Dropdown} from 'react-native-element-dropdown';
// import {useNavigation} from '@react-navigation/native';

// const RequestToChangePopup = ({
//   isVisible,
//   onRequestClose,
//   reason,
//   setReason,
//   requestData,
// }) => {
//   const navigation = useNavigation();
//   const reasonForChangeData = [
//     {label: 'Correction of Spelling', value: 'Correction of Spelling'},
//     {label: 'Legal Name Change', value: 'Legal Name Change'},
//     {label: 'Preference Change', value: 'Preference Change'},
//     {label: 'Other', value: 'Other'},
//   ];

//   const [newValue, setNewValue] = useState('');
//   const [showError, setShowError] = useState(false);

//   const continueHandler = () => {
//     if (newValue.trim() === '' || reason.trim === '') {
//       setShowError(true);
//     } else {
//       console.log(reason);
//       console.log('New Value:', newValue);

//       setReason('');
//       setNewValue('');

//       // onRequestClose();
//       // navigation.navigate('ToContinueScreen');
//     }
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       isVisible={isVisible}
//       onBackdropPress={onRequestClose} // Close the modal when tapping outside
//       onBackButtonPress={onRequestClose} // Close the modal when pressing the back button on Android
//       onRequestClose={onRequestClose}>
//       <TouchableWithoutFeedback>
//         <View style={styles.container}>
//           <View style={styles.main}>
//             <Text style={styles.heading}>
//               Request to Change {requestData.type}
//             </Text>
//             <View>
//               <DetailsTextInput
//                 title={`Current ${requestData.type}`}
//                 placeholder={requestData.current}
//                 editable={false}
//               />
//             </View>

//             <View>
//               <DetailsTextInput
//                 title={`New ${requestData.type}`}
//                 onChangeText={i => {
//                   setNewValue(i);
//                   setShowError(false);
//                 }}

//                 // placeholder={`Enter new ${requestData.type.toLowerCase()}`}
//               />
//             </View>

//             <View style={styles.dropdownView}>
//               <Text style={styles.textInputTitle}>
//                 Select a reason for the change
//               </Text>
//               <Dropdown
//                 style={styles.dropdown}
//                 placeholderStyle={styles.placeholderStyle}
//                 iconStyle={styles.iconStyle}
//                 itemTextStyle={styles.itemTextStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 data={reasonForChangeData}
//                 maxHeight={300}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select"
//                 value={reason}
//                 onChange={item => {
//                   setReason(item.value);
//                   setShowError(false);
//                 }}
//               />
//               {showError && (
//                 <Text style={{color: 'red'}}>Please fill all fields</Text>
//               )}
//             </View>

//             <PrimaryButton title="Continue" onPress={continueHandler} />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default RequestToChangePopup;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginHorizontal: wp(-5),
//     marginBottom: hp(-2.3),
//     marginTop: '100%',
//   },
//   main: {
//     backgroundColor: Colors.White,
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//     paddingBottom: hp(6),
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(3),
//     height: 500,
//   },
//   heading: {
//     fontWeight: '600',
//     fontSize: '16@s',
//     marginTop: hp(5),
//     marginBottom: hp(2),
//     color: Colors.Neutral900,
//   },
//   dropdownView: {
//     marginBottom: hp(6),
//   },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: Colors.Neutral300,
//     borderRadius: 5,
//     paddingHorizontal: wp(3),
//     paddingVertical: hp(0.9),
//   },
//   placeholderStyle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '400',
//   },
//   iconStyle: {
//     tintColor: Colors.Neutral800,
//   },
//   itemTextStyle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '400',
//   },
//   selectedTextStyle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '400',
//   },
//   textInputTitle: {
//     color: Colors.Neutral900,
//     fontSize: '12@s',
//     fontWeight: '500',
//     paddingBottom: hp(0.6),
//   },
// });

import React, {useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import DetailsTextInput from '../textInput/DetailsTextInput';
import PrimaryButton from '../buttons/PrimaryButton';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {editUserDataStoreAction} from '../../redux/actions/editUserDataStoreAction';

const RequestToChangePopup = ({
  isVisible,
  onRequestClose,
  reason,
  setReason,
  requestData,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reasonForChangeData = [
    {label: 'Correction of Spelling', value: 'Correction of Spelling'},
    {label: 'Legal Name Change', value: 'Legal Name Change'},
    {label: 'Preference Change', value: 'Preference Change'},
    {label: 'Other', value: 'Other'},
  ];

  const [newValue, setNewValue] = useState('');
  const [showError, setShowError] = useState(false);

  const continueHandler = () => {
    if (newValue.trim() === '' || reason.trim() === '') {
      setShowError(true);
    } else {
      console.log('Reason:', reason);
      console.log('New Value:', newValue);
      console.log('old value:', requestData?.type);
      const requestType = requestData?.type;
      const current_value = requestData?.current;

      const data = {
        reason_change: reason,
        new_value: newValue,
        req_name: requestType,
        current_value: current_value,
      };

      dispatch(editUserDataStoreAction(data));
      onRequestClose();
      navigation.navigate('ToContinueScreen');
      setReason('');
      setNewValue('');
      setShowError(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onBackdropPress={onRequestClose} // Close the modal when tapping outside
      onBackButtonPress={onRequestClose} // Close the modal when pressing the back button on Android
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.heading}>
              Request to Change {requestData.title}
            </Text>
            <View>
              <DetailsTextInput
                title={`Current ${requestData.title}`}
                placeholder={
                  requestData?.type === 'user_name'
                    ? '@' + requestData?.current
                    : requestData?.current
                }
                editable={false}
              />
            </View>

            <View>
              <DetailsTextInput
                title={`New ${requestData.title}`}
                value={newValue}
                onChangeText={i => {
                  setNewValue(i);
                  setShowError(false);
                }}
                // placeholder={`Enter new ${requestData.type.toLowerCase()}`}
              />
            </View>

            <View style={styles.dropdownView}>
              <Text style={styles.textInputTitle}>
                Select a reason for the change
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={reasonForChangeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={reason}
                onChange={item => {
                  setReason(item.value);
                  setShowError(false);
                }}
              />
              {showError && (
                <Text style={{color: 'red'}}>Please fill all fields</Text>
              )}
            </View>

            <PrimaryButton title="Continue" onPress={continueHandler} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RequestToChangePopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(-5),
    marginBottom: hp(-2.3),
    marginTop: '100%',
  },
  main: {
    backgroundColor: Colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: hp(6),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    height: 500,
  },
  heading: {
    fontWeight: '600',
    fontSize: '16@s',
    marginTop: hp(5),
    marginBottom: hp(2),
    color: Colors.Neutral900,
  },
  dropdownView: {
    marginBottom: hp(6),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
  },
  placeholderStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  iconStyle: {
    tintColor: Colors.Neutral800,
  },
  itemTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
});
