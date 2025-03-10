import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const AboutSubmitVideoPopup = props => {
  const isVisible = props.isVisible;
  const uploadLoader = useSelector(state => state.videoUploadReducer.loading);

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
              {AppLocalizedStrings.addIntroVideo2Screen.you}
            </Text>
            <Text style={styles.headerSubTitle}>
              {AppLocalizedStrings.addIntroVideo2Screen.review}
            </Text>
            <View>
              <PrimaryButton
                title={
                  uploadLoader ? (
                    <View
                      style={{
                        width: wp('93%'),
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator
                        color={Colors.White}
                        size={'small'}
                        style={{marginTop: hp(1)}}
                      />
                    </View>
                  ) : (
                    <Text>{AppLocalizedStrings.addIntroVideo2Screen.it}</Text>
                  )
                }
                onPress={props.onLooksGoodHandler}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AboutSubmitVideoPopup;

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
    paddingVertical: hp(2),
    lineHeight: '18@s',
    paddingBottom: hp(6),
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
