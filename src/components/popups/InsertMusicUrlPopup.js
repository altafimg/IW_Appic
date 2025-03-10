import React from 'react';
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
import {useSelector} from 'react-redux';

const InsertMusicUrlPopup = ({
  isVisible,
  toggleModal,
  musicUrl,
  setMusicUrl,
  handleAddMusic,
}) => {
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
                  title={AppLocalizedStrings.addMusicVideosScreen.insertMusic}
                  editable={true}
                  onChangeText={setMusicUrl}
                  value={musicUrl}
                />
              </View>
              <PrimaryButton
                title={AppLocalizedStrings.button.continue}
                onPress={handleAddMusic}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InsertMusicUrlPopup;

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
