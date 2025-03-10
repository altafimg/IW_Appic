import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
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

const EditVideoUrlSecPopup = ({
  isVisible,
  setIsVisible,
  toggleModal,
  videoUrl,
  setVideoUrl,
  handleEditVideoUrl,
}) => {
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    setNewUrl(videoUrl);
  }, [videoUrl]);

  const handleSave = () => {
    handleEditVideoUrl(newUrl);
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
                  placeholder=" "
                  title={AppLocalizedStrings.addMusicVideosScreen.insertVideo}
                  editable={true}
                  onChangeText={setNewUrl}
                  value={newUrl}
                />
              </View>
              <View>
                <PrimaryButton
                  title={AppLocalizedStrings.button.continue}
                  onPress={handleSave}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditVideoUrlSecPopup;

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
