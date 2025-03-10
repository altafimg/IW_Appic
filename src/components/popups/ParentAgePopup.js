import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';

const ParentAgePopup = props => {
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
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.accountManagerScreen.youSure}
              </Text>
              <Text style={styles.subTitle}>
                {AppLocalizedStrings.accountManagerScreen.cancelSetup}
              </Text>
            </View>
            <PrimaryButton
              title={AppLocalizedStrings.accountManagerScreen.yesSure}
            />
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={props.toggleModal}>
              <Text style={styles.goBackTitle}>
                {AppLocalizedStrings.accountManagerScreen.goBack}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ParentAgePopup;

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
    paddingTop: hp(4),
  },
  headerTitle: {
    color: Colors.Black,
    fontSize: '22@s',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: hp(2),
  },
  subTitle: {
    color: Colors.Black,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: hp(5),
    marginHorizontal: wp(5),
    lineHeight: 20,
  },
  goBackButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Primary500,
    backgroundColor: Colors.White,
    width: wp('95%'),
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
  },
  goBackTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    textAlign: 'center',
  },
});
