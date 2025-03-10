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
import {AppLocalizedStrings} from '../../localization/Localization';

const ReferralsNeedHelpPopup = props => {
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
            <TouchableOpacity>
              <Text style={styles.title}>
                {AppLocalizedStrings.referralsListScreen.viewFAQs}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.title}>
                {AppLocalizedStrings.referralsListScreen.chatWith}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReferralsNeedHelpPopup;

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
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '400',
    lineHeight: '24@s',
    paddingVertical: hp(1.4),
  },
});
