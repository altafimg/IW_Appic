import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../assets/svg';

const UploadingStatusPopup = props => {
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
            <View style={styles.card}>
              <SVG.CheckCircle style={styles.icon} />
              <Text style={styles.uploadTitle}>Uploaded</Text>
              <Text style={styles.uploadTitle}>34.5 KB</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UploadingStatusPopup;

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
  card: {
    marginBottom: hp(4),
  },
  icon: {
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  uploadTitle: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: hp(0.5),
  },
});
