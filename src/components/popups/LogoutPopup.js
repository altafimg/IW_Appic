import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';
import {UseDispatch, useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {logoutAction} from '../../redux/actions/logoutAction';
import {buildProfileDataRemoveAction} from '../../redux/actions/buildProfileDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mobileNumberDataRemoveAction} from '../../redux/actions/mobileNumberStoreAction';
import {editUserDataRemoveAction} from '../../redux/actions/editUserDataStoreAction';
import {recoverAccountDataRemoveAction} from '../../redux/actions/recoverAccountDataAction';
import {replaceAccountManagerDataRemoveAction} from '../../redux/actions/replaceAccountManagerDataStoreAction';
import {resetSteps} from '../../redux/actions/completeStepsAction';

const LogoutPopup = props => {
  const navigation = useNavigation();
  const userId = useSelector(state => state.loginReducer.user.data?.data?._id);
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const dispatch = useDispatch();
  const clearSpecificFields = async () => {
    try {
      await AsyncStorage.removeItem('savedFormData');
      await AsyncStorage.removeItem('savedLanguageComponents');
      await AsyncStorage.removeItem('savedLanguagesData');
      await AsyncStorage.removeItem('savedDialectsData');
      await AsyncStorage.removeItem('savedMusicItems');
      await AsyncStorage.removeItem('savedVideoUploadItems');
      await AsyncStorage.removeItem('savedVideoUrlItems');
      console.log('Specific fields cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing specific fields from AsyncStorage:', error);
    }
  };
  const logoutHandler = () => {
    dispatch(logoutAction(userId)).then(res => {
      if (res?.data?.status === true) {
        setIsVisible(false);
        navigation.replace('AuthStack');
        dispatch(buildProfileDataRemoveAction());
        dispatch(mobileNumberDataRemoveAction());
        dispatch(editUserDataRemoveAction());
        dispatch(recoverAccountDataRemoveAction());
        dispatch(replaceAccountManagerDataRemoveAction());
        dispatch(resetSteps());
        clearSpecificFields();
      } else {
        console.log('Something went wrong');
      }
    });
  };
  return (
    <Modal
      // animationType="slide"
      animationType="none"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={props.toggleModal}>
      <TouchableWithoutFeedback onPress={props.toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.logoutPopup.doYou}
              </Text>
              <Text style={styles.subTitle}>
                {AppLocalizedStrings.logoutPopup.areYou}
              </Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Text style={styles.noTitle}>
                  {AppLocalizedStrings.logoutPopup.no}
                </Text>
              </TouchableOpacity>
              <Text style={styles.space}></Text>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={logoutHandler}>
                <Text style={styles.yesTitle}>
                  {AppLocalizedStrings.logoutPopup.yes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LogoutPopup;

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
    paddingHorizontal: wp(2),
    paddingTop: hp(4),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '27@s',
    textAlign: 'center',
    paddingTop: hp(2),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingTop: hp(1),
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  noButton: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    flex: 1,
  },
  noTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
  yesButton: {
    backgroundColor: Colors.Primary500,
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
  },
  yesTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  space: {
    paddingHorizontal: wp(2),
  },
});
