import React, {useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import WithdrawalHistoryNeedHelpPopup from './WithdrawalHistoryNeedHelpPopup';
import {AppLocalizedStrings} from '../../localization/Localization';

const WithdrawalHistoryDetailsPopup = props => {
  const isVisible = props.isVisible;
  const [isVisibleOne, setIsVisibleOne] = useState(false);

  const onHelpHandler = () => {
    setIsVisibleOne(!isVisibleOne);
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
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.withdrawalHistoryScreen.details}
            </Text>
            <View style={styles.copyUrlView}>
              <Text style={styles.copyUniqueTitle}>$ 100.00</Text>
            </View>
            <Text style={styles.bankTitle}>
              Withdrawn to Citibank CC ending in ****3989
            </Text>
            <View style={styles.detailsMain}>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.withdrawal}
                </Text>
                <Text style={styles.withdrawalTitle}>1 Dec 2023 01:01am</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.withdrawalType}
                </Text>
                <Text style={styles.withdrawalTitle}>3-5 business days</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.stripeFee}
                </Text>
                <Text style={styles.withdrawalTitle}>$3.00</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.paidYou}
                </Text>
                <Text style={styles.withdrawalTitle}>$97.00</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.status}
                </Text>
                <Text style={styles.withdrawalTitle}>Completed</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.withdrawalHistoryScreen.transactionDate}
                </Text>
                <Text style={styles.withdrawalTitle}>3 Dec 2023 17:06pm </Text>
              </View>
              <View style={styles.buttonView}>
                <PrimaryButton
                  title={AppLocalizedStrings.withdrawalHistoryScreen.exportPDF}
                />
              </View>
              <PrimaryButton
                title={AppLocalizedStrings.withdrawalHistoryScreen.iNeedHelp}
                onPress={onHelpHandler}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <WithdrawalHistoryNeedHelpPopup
        isVisible={isVisibleOne}
        setIsVisible={setIsVisibleOne}
        toggleModal={onHelpHandler}
      />
    </Modal>
  );
};

export default WithdrawalHistoryDetailsPopup;

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
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    paddingBottom: hp(2),
  },
  copyUrlView: {
    backgroundColor: ' rgba(29, 161, 242, 0.1)',
    height: '73@s',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    borderRadius: 5,
    alignItems: 'center',
  },
  copyUniqueTitle: {
    color: Colors.Primary500,
    fontSize: '22@s',
    fontWeight: '700',
  },
  bankTitle: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  detailsMain: {
    marginVertical: hp(2),
  },
  detailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(0.7),
  },
  withdrawalTitle: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
  },
  buttonView: {
    marginBottom: hp(1),
    marginTop: hp(8),
  },
});
