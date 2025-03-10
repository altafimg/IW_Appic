import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {SearchBar} from 'react-native-elements';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Demo from '../../../components/popups/Demo';
import ReferralsDetailPopup from '../../../components/popups/ReferralsDetailPopup';

const ReferralsListScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSec, setIsVisibleSec] = useState(false);

  const toggleModalSec = () => {
    setIsVisibleSec(!isVisibleSec);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle={AppLocalizedStrings.referralsListScreen.referrals} />
      {/* <SearchBar placeholder="Type Here..." /> */}
      <View style={styles.main}>
        <TextInput placeholder="Search" style={styles.serchBar} />
        <TouchableOpacity style={styles.cardView} onPress={toggleModal}>
          <View>
            <Text style={styles.cardTitle}>Tim Brennan</Text>
            <Text style={styles.date}>Begins 23 January 2021</Text>
            <Text style={styles.date}>Ends 23 January 2021</Text>
          </View>
          <View>
            <Text style={styles.amount}>$340.00</Text>
            <View style={styles.activeView}>
              <Text style={styles.activeTitle}>
                {AppLocalizedStrings.referralsListScreen.active}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardView} onPress={toggleModal}>
          <View>
            <Text style={styles.cardTitle}>Tim Brennan</Text>
            <Text style={styles.date}>Begins 23 January 2021</Text>
            <Text style={styles.date}>Ends 23 January 2021</Text>
          </View>
          <View>
            <Text style={styles.amount}>$340.00</Text>
            <View style={styles.ExpiredView}>
              <Text style={styles.activeTitle}>
                {AppLocalizedStrings.referralsListScreen.expired}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <ReferralsDetailPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        isVisibleSec={isVisibleSec}
        setIsVisibleSec={setIsVisibleSec}
        toggleModalSec={toggleModalSec}
      />
    </View>
  );
};

export default ReferralsListScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-4),
  },
  serchBar: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
  },
  cardView: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    marginVertical: hp(1.5),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },
  amount: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  date: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    paddingVertical: hp(0.3),
  },
  activeView: {
    backgroundColor: Colors.Success500,
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: hp(1),
  },
  activeTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: hp(0.4),
    paddingVertical: hp(0.4),
    lineHeight: '20@s',
    paddingHorizontal: wp(1.5),
    height: '28@s',
  },
  ExpiredView: {
    backgroundColor: Colors.Destructive500,
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: hp(1),
    paddingHorizontal: wp(1),
  },
});
