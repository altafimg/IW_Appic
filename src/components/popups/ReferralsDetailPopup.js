import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg';
import SecPrimaryButton from '../buttons/SecPrimaryButton';
import ReferralsNeedHelpPopup from './ReferralsNeedHelpPopup';
import {AppLocalizedStrings} from '../../localization/Localization';

const ReferralsDetailPopup = props => {
  const isVisible = props.isVisible;
  const [isVisibleSec, setIsVisibleSec] = useState(false);

  const toggleModalSec = () => {
    setIsVisibleSec(!isVisibleSec);
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
            <View style={styles.profileView}>
              <Image
                source={require('../../assets/images/rr.png')}
                style={styles.image}
              />
              <View style={styles.viewProfile}>
                <Text style={styles.headerTitle}>Nolan Kenter</Text>
                <TouchableOpacity style={styles.profileButton}>
                  <Text>
                    {AppLocalizedStrings.referralsListScreen.viewProfile}
                  </Text>
                  <SVG.LeftArrow />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.paymentInfoView}>
              <View style={styles.payView}>
                <Text style={styles.date}>30 January 2021</Text>
                <Text style={styles.date}>$ 100.00</Text>
              </View>
              <View style={styles.payView}>
                <Text style={styles.date}>30 April 2021</Text>
                <Text style={styles.date}>$ 100.00</Text>
              </View>
              <View style={styles.payView}>
                <Text style={styles.date}>30 January 2021</Text>
                <Text style={styles.date}>$ 100.00</Text>
              </View>
            </View>
            <SecPrimaryButton
              title={AppLocalizedStrings.referralsListScreen.iNeedHelp}
              onPress={toggleModalSec}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ReferralsNeedHelpPopup
        isVisible={isVisibleSec}
        setIsVisible={setIsVisibleSec}
        toggleModal={toggleModalSec}
      />
    </Modal>
  );
};

export default ReferralsDetailPopup;

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
  profileView: {
    flexDirection: 'row',
  },
  image: {
    width: '44@s',
    height: '44@s',
    borderRadius: 100,
  },
  viewProfile: {
    marginLeft: wp(3),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentInfoView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    marginVertical: hp(3),
  },
  payView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  date: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
  },
});
