import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';

const IncomeHistoryFilterPopup = props => {
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
            <View style={styles.headerView}>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.incomeHistoryScreen.filterIncome}
              </Text>
              <TouchableOpacity>
                <Text style={styles.headerSubTitle}>
                  {AppLocalizedStrings.incomeHistoryScreen.resetFilters}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.perTitle}>
                {AppLocalizedStrings.incomeHistoryScreen.period}
              </Text>
              <View style={styles.multiFilterView}>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>All</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Day</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Week</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Month</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Year</Text>
                </View>
              </View>
            </View>
            <View style={styles.secView}>
              <Text style={styles.perTitle}>
                {AppLocalizedStrings.incomeHistoryScreen.incometype}
              </Text>
              <View style={styles.multiFilterView}>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>All</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>QuickAds</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Bookings</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Music</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Licensing Deals</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Sponsorships</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Advertisements</Text>
                </View>
                <View style={styles.filterButton}>
                  <Text style={styles.filterTitle}>Acting services</Text>
                </View>
              </View>
            </View>
            <PrimaryButton
              title={AppLocalizedStrings.incomeHistoryScreen.apply}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default IncomeHistoryFilterPopup;

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
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: Colors.Destructive500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  secView: {
    marginTop: hp(-3),
    marginBottom: hp(3),
  },
  perTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '500',
    paddingTop: hp(3),
    paddingBottom: hp(1),
  },
  multiFilterView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: hp(3),
  },
  filterButton: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 60,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(4),
    marginRight: wp(2),
    marginBottom: hp(2),
  },
  filterTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '400',
  },
});
