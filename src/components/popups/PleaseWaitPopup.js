import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Modal, View, StyleSheet, Text} from 'react-native';
import {LinearProgress} from 'react-native-elements';

const PleaseWaitPopup = ({visible}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}} // Optional: handle close action
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Processing..</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PleaseWaitPopup;
