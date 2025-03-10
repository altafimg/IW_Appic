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
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';

const CameraGallaryPopup = props => {
  const isVisible = props.isVisible;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={props.toggleModal}>
      <TouchableWithoutFeedback onPress={props.toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <TouchableOpacity onPress={props.onImageHandler}>
              <Text style={styles.openTitle}>
                {AppLocalizedStrings.uploadGovIDScreen.openCamera}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onGalleryHandler}>
              <Text style={styles.openTitle}>
                {AppLocalizedStrings.uploadGovIDScreen.chooseGallery}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.toggleModal}>
              <Text style={styles.cancelTitle}>
                {AppLocalizedStrings.uploadGovIDScreen.cancel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CameraGallaryPopup;

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
    paddingTop: hp(4),
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
