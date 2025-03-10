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

const BrowsePopup = props => {
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
            <TouchableOpacity>
              <Text style={styles.openTitle}>Browse gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.openTitle}>Browse files</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.toggleModal}>
              <Text style={styles.cancelTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BrowsePopup;

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
