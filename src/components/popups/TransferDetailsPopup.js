import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import SecPrimaryButton from '../buttons/SecPrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';

const TransferDetailsPopup = props => {
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
            <View style={styles.cardMainView}>
              <TouchableOpacity style={styles.cardView}>
                <View style={styles.cradHeaderView}>
                  <View>
                    <Text style={styles.bankTitle}>Citibank</Text>
                    <Text style={styles.bankTitle}>**** **** **** 1842</Text>
                  </View>
                  <View style={styles.defaultView}>
                    <Text style={styles.defaultTitle}>Default</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardView}>
                <View style={styles.cradHeaderView}>
                  <View>
                    <Text style={styles.bankTitle}>Paypal account</Text>
                    <Text style={styles.bankTitle}>johndoe@gmail.com</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <SecPrimaryButton
              title={AppLocalizedStrings.withdrawBalanceScreen.addNew}
              onPress={props.onaddNewHandler}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TransferDetailsPopup;

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
    paddingHorizontal: wp(2),
    paddingTop: hp(4),
  },
  cardMainView: {
    marginBottom: hp(5),
  },
  cardView: {
    borderWidth: 1.5,
    borderColor: Colors.Neutral200,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginVertical: hp(0.6),
  },
  cradHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
  defaultView: {
    backgroundColor: '#22C55E33',
    marginHorizontal: wp(2),
    borderRadius: 3,
  },
  defaultTitle: {
    color: Colors.Success500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
});
