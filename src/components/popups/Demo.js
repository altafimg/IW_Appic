import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';

const Demo = props => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={props.open}
        onRequestClose={props.aa}>
        <TouchableWithoutFeedback onPress={props.aa}>
          <View style={{backgroundColor: '#fff'}}>
            <Text>Teri bhan ki tn tna tn</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Demo;

const styles = ScaledSheet.create({});
