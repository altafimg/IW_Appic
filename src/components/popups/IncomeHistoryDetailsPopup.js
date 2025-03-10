import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {AppLocalizedStrings} from '../../localization/Localization';

const IncomeHistoryDetailsPopup = props => {
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
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.incomeHistoryScreen.details}
            </Text>
            <View style={styles.copyUrlView}>
              <Text style={styles.copyUniqueTitle}>$ 100.00</Text>
            </View>
            <View style={styles.detailsMain}>
              <View style={styles.detailsView}>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.incomeHistoryScreen.title}
                </Text>
                <Text style={styles.withdrawalTitle}>
                  {AppLocalizedStrings.incomeHistoryScreen.advertise}
                </Text>
              </View>
              <View style={styles.cardView}>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.serviceType}
                  </Text>
                  <Text style={styles.withdrawalTitle}>QuickAds</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.customersName}
                  </Text>
                  <Text style={styles.withdrawalTitle}>Apple Inc</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.totalEarned}
                  </Text>
                  <Text style={styles.withdrawalTitle}>$100.00</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.iWCommission}
                  </Text>
                  <Text style={styles.withdrawalTitle}>$20</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.stripeFee}
                  </Text>
                  <Text style={styles.withdrawalTitle}>$3.00</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.paidYou}
                  </Text>
                  <Text style={styles.withdrawalTitle}>$77.00</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.status}
                  </Text>
                  <Text style={styles.withdrawalTitle}>Completed</Text>
                </View>
                <View style={styles.detailsView}>
                  <Text style={styles.withdrawalTitle}>
                    {AppLocalizedStrings.incomeHistoryScreen.dateCompleted}
                  </Text>
                  <Text style={styles.withdrawalTitle}>3 Dec 2023 17:06pm</Text>
                </View>
              </View>
              <PrimaryButton
                title={AppLocalizedStrings.incomeHistoryScreen.exportPDF}
              />
              <View style={styles.buttonView}>
                <PrimaryButton
                  title={AppLocalizedStrings.incomeHistoryScreen.iNeedHelp}
                />
              </View>
              <PrimaryButton
                title={AppLocalizedStrings.incomeHistoryScreen.viewJob}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default IncomeHistoryDetailsPopup;

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
  detailsMain: {
    marginVertical: hp(2),
  },
  cardView: {
    marginBottom: hp(4),
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
    marginVertical: hp(1),
  },
});
