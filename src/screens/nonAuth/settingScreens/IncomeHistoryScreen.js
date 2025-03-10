import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import IncomeHistoryFilterPopup from '../../../components/popups/IncomeHistoryFilterPopup';
import IncomeHistoryDetailsPopup from '../../../components/popups/IncomeHistoryDetailsPopup';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import WithdrawalHistoryThreeDotPopup from '../../../components/popups/WithdrawalHistoryThreeDotPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';

const IncomeHistoryScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSec, setIsVisibleSec] = useState(false);
  const [isVisibleThree, setIsVisibleThree] = useState(false);

  const onDetailsHandler = () => {
    setIsVisible(!isVisible);
  };
  const onFilterHandler = () => {
    setIsVisibleSec(!isVisibleSec);
  };
  const onHelpHandler = () => {
    setIsVisibleThree(!isVisibleThree);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <BackArrow goBack={onGoBackHandler} />
        <SVG.ThreeDot style={styles.icon} onPress={onHelpHandler} />
      </View>
      <Header
        headerTitle={AppLocalizedStrings.incomeHistoryScreen.incomeHistory}
      />
      <View style={styles.searchView}>
        <View style={styles.inPutView}>
          <SVG.Search />
          <TextInput placeholder="Search" />
        </View>
        <SVG.Filter onPress={onFilterHandler} />
      </View>
      <View style={styles.multiFilterView}>
        <View style={styles.filterButton}>
          <Text style={styles.filterTitle}>
            {AppLocalizedStrings.incomeHistoryScreen.filter}
          </Text>
          <SVG.CloseCross width={20} height={20} />
        </View>
      </View>
      <View>
        <Text style={styles.dateTitle}>December 2022</Text>
        <TouchableOpacity style={styles.cardView} onPress={onDetailsHandler}>
          <View>
            <Text style={styles.cardTitle}>$ 100.00</Text>
            <Text style={styles.cardTitle}>Withdrawn to Citibank CC</Text>
            <Text style={styles.cardTitle}>Status: Completed</Text>
            <Text style={styles.cardTitle}>Date completed 02.12.2022</Text>
          </View>
          <SVG.LeftArrow width={24} height={24} />
        </TouchableOpacity>
      </View>
      <IncomeHistoryDetailsPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={onDetailsHandler}
      />
      <IncomeHistoryFilterPopup
        isVisible={isVisibleSec}
        setIsVisible={setIsVisibleSec}
        toggleModal={onFilterHandler}
      />
      <WithdrawalHistoryThreeDotPopup
        isVisible={isVisibleThree}
        setIsVisible={setIsVisibleThree}
        toggleModal={onHelpHandler}
      />
    </View>
  );
};

export default IncomeHistoryScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    transform: [{rotateZ: '90deg'}],
  },
  searchView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    height: '36@s',
    marginTop: hp(-4),
    marginBottom: hp(1),
  },
  inPutView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '83%',
  },
  multiFilterView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  filterButton: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 60,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(2),
  },
  filterTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '400',
  },
  dateTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '700',
    marginTop: hp(1),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    backgroundColor: Colors.White,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    marginVertical: hp(1.5),
  },
  cardTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
  },
});
