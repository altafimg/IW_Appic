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
import {AppLocalizedStrings} from '../../localization/Localization';

const DeleteBankPopup = props => {
  const isVisible = props.isVisible;

  return (
    <View>
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
                  {AppLocalizedStrings.makePaymentsScreen.areSure}
                </Text>
                <Text style={styles.subTitle}>
                  {AppLocalizedStrings.makePaymentsScreen.lorem}
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonSec}>
                  <Text style={styles.title}>
                    {AppLocalizedStrings.makePaymentsScreen.noGoBack}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonTitle}>
                    {AppLocalizedStrings.makePaymentsScreen.remove}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DeleteBankPopup;

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
  crossIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: wp(3),
    marginVertical: hp(1.5),
    width: 20,
    height: 20,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    paddingBottom: hp(1.5),
    lineHeight: '26@s',
  },
  subTitle: {
    color: Colors.Neutral600,
    fontSize: '14@s',
    fontWeight: '400',
    paddingBottom: hp(1.5),
    lineHeight: '24@s',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  button: {
    backgroundColor: Colors.Primary500,
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginLeft: wp(3),
  },
  buttonTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  buttonSec: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
    flex: 1,
  },
  title: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
});
