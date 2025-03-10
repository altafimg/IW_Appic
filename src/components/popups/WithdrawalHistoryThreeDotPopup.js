import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

const WithdrawalHistoryThreeDotPopup = props => {
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
            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>
                  {AppLocalizedStrings.incomeHistoryScreen.ExportAllPDF}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>
                  {AppLocalizedStrings.incomeHistoryScreen.ExportAllCSV}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>
                  {AppLocalizedStrings.incomeHistoryScreen.ChatSupport}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WithdrawalHistoryThreeDotPopup;

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
  button: {
    marginVertical: hp(2),
  },
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '400',
  },
});
