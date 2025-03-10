import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useDispatch} from 'react-redux';
import {buildProfileDataRemoveAction} from '../../redux/actions/buildProfileDataAction';
import {useNavigation} from '@react-navigation/native';
import {
  completeSteps,
  resetSteps,
} from '../../redux/actions/completeStepsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mobileNumberDataRemoveAction} from '../../redux/actions/mobileNumberStoreAction';
import {editUserDataRemoveAction} from '../../redux/actions/editUserDataStoreAction';
import {recoverAccountDataRemoveAction} from '../../redux/actions/recoverAccountDataAction';
import {replaceAccountManagerDataRemoveAction} from '../../redux/actions/replaceAccountManagerDataStoreAction';

const CancelBuildingProfilePopup = props => {
  const isVisible = props.isVisible;
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const deleteMyAccount = () => {
    navigation.navigate('WelcomeScreen');
    dispatch(buildProfileDataRemoveAction());
    dispatch(mobileNumberDataRemoveAction());
    dispatch(editUserDataRemoveAction());
    dispatch(recoverAccountDataRemoveAction());
    dispatch(replaceAccountManagerDataRemoveAction());
    clearSpecificFields();
    dispatch(resetSteps());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={props.toggleModal}>
      <TouchableWithoutFeedback onPress={props.toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.dontHaveIdScreen.sure}
            </Text>
            <Text style={styles.headerSubTitle}>
              Are you sure you want to cancel the setup and delete your account?
            </Text>
            <View>
              <PrimaryButton
                title={'Yes. Delete my account'}
                onPress={deleteMyAccount}
              />
              <TouchableOpacity
                style={styles.previousButton}
                onPress={props.toggleModal}>
                <Text style={styles.previousTitle}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CancelBuildingProfilePopup;

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
    paddingTop: hp(4),
  },
  headerTitle: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    textAlign: 'center',
  },
  headerSubTitle: {
    textAlign: 'center',
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingVertical: hp(2),
    lineHeight: '18@s',
    marginBottom: hp(5),
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    marginTop: hp(1),
    marginHorizontal: wp(3),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
