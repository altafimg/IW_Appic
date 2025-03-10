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
import PrimaryButton from '../buttons/PrimaryButton';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useNavigation} from '@react-navigation/native';
const UnfortunatelyDeletePopup = props => {
  const isVisible = props.isVisible;
  const navigation = useNavigation();
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
              {AppLocalizedStrings.dontHaveIdScreen.sure}
            </Text>
            <Text style={styles.headerSubTitle}>
              {'Are you sure you want to cancel the setup? '}
            </Text>

            <Text style={styles.headerSubTitle}>
              {'Your data won’t be saved if you wish to do so.'}
            </Text>

            <View>
              <PrimaryButton
                title={'Confirm'}
                onPress={() => {
                  navigation.navigate('WelcomeScreen');
                }}
              />
              <TouchableOpacity
                style={styles.previousButton}
                onPress={props.onGoBackHandler}>
                <Text style={styles.previousTitle}>
                  {AppLocalizedStrings.dontHaveIdScreen.go}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UnfortunatelyDeletePopup;

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
    paddingVertical: hp(0.8),
    lineHeight: '18@s',
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    marginTop: hp(1),
    marginHorizontal: wp(3),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
