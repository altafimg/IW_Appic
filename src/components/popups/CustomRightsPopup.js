import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';
import { hp, wp } from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';

const CustomRightsPopup = props => {
  const customUserPopup = props.customUserPopup;
  const setCustomUserPopup = props.setCustomUserPopup;
  const data = props.data;

  const onModalOptions = () => {
    setCustomUserPopup(!customUserPopup);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={customUserPopup}
        onRequestClose={onModalOptions}>
        <TouchableWithoutFeedback onPress={onModalOptions}>
          <View style={styles.container}>
            <View style={styles.main}>
              <Text style={styles.header}>Custom rights</Text>
              <View style={styles.paragraphView}>
                <Text style={styles.defaultTitle}>
                  All parties have mutually agreed to the following{' '}
                </Text>
                <Text style={styles.paragraph}>
                  {data}
                </Text>
              </View>

              <PrimaryButton title="I Understand" onPress={onModalOptions} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CustomRightsPopup;

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
    paddingBottom: hp(4),
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingTop: hp(4),
  },
  header: {
    fontSize: '20@s',
    fontWeight: '600',
    color: Colors.Black,
    paddingBottom: hp(2.5),
    marginBottom: hp(2),
  },
  paragraphView: {
    marginBottom: hp(1.5),
  },
  defaultTitle: {
    fontSize: '14@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingBottom: hp(1),
  },
  paragraph: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral800,
    paddingBottom: hp(1),
  },
});
