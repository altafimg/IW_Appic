import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import DeleteBankPopup from './DeleteBankPopup';
import {AppLocalizedStrings} from '../../localization/Localization';
import {TouchableWithoutFeedback} from 'react-native';

const DefaultBankEditPopup = props => {
  const isVisible = props.isVisible;
  const [isBankDelete, setIsBankDelete] = useState(false);

  const onDeleteHandler = () => {
    setIsBankDelete(!isBankDelete);
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
            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>
                  {AppLocalizedStrings.makePaymentsScreen.setDefault}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>
                  {AppLocalizedStrings.makePaymentsScreen.edit}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onDeleteHandler}>
                <Text style={styles.deleteTitle}>
                  {AppLocalizedStrings.makePaymentsScreen.delete}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <DeleteBankPopup
        isVisible={isBankDelete}
        setIsVisible={setIsBankDelete}
        toggleModal={onDeleteHandler}
      />
    </Modal>
  );
};

export default DefaultBankEditPopup;

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
  crossIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: wp(3),
    marginVertical: hp(1.5),
    width: 20,
    height: 20,
  },
  button: {
    marginVertical: hp(2),
  },
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '400',
  },
  deleteTitle: {
    color: Colors.Destructive500,
    fontSize: '15@s',
    fontWeight: '400',
  },
});
