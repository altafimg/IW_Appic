import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';

const NeedHelpOtpPopup = props => {
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
            <View style={styles.contentView}>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.otpScreen.needHelp}
              </Text>
              <Text style={styles.headerSubTitle}>
                {AppLocalizedStrings.otpScreen.please}
                <Text style={styles.email}>
                  {' '}
                  support@influencewith.com
                </Text>, {AppLocalizedStrings.otpScreen.wait}
              </Text>
            </View>
            <PrimaryButton
              title={AppLocalizedStrings.button.okay}
              onPress={props.toggleModal}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NeedHelpOtpPopup;

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
    height: '40%',
    paddingTop: hp(4),
  },
  contentView: {
    marginBottom: hp(10),
  },
  headerTitle: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    textAlign: 'center',
  },
  headerSubTitle: {
    textAlign: 'center',
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingVertical: hp(2),
    lineHeight: '18@s',
  },
  email: {
    fontSize: '12@s',
    fontWeight: '600',
    color: Colors.Neutral800,
  },
});
