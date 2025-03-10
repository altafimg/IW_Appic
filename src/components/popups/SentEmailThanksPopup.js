import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';

const SentEmailThanksPopup = props => {
  // console.log(props?.type, '<<<<<<<Asdf'); changeEmail
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={props.isVisible}
      onRequestClose={props.toggleModal}>
      <TouchableWithoutFeedback onPress={props.toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View>
              <Text style={styles.headerTitle}>
                {props?.type === 'changeEmail'
                  ? AppLocalizedStrings.sentEmailThanksScreen.problem
                  : AppLocalizedStrings.sentEmailThanksScreen.helpOptions}
              </Text>
              {props?.type === 'changeEmail' ? (
                <>
                  {/* <Text style={styles.subTitle}>
                    {AppLocalizedStrings.sentEmailThanksScreen.please}
                  </Text> */}
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        marginHorizontal: 30,
                      },
                    ]}>
                    {AppLocalizedStrings.sentEmailThanksScreen.please}
                    <Text
                      style={[
                        styles.emialTitle,
                        // {
                        //   marginHorizontal: 30,
                        // },
                      ]}>
                      {' '}
                      support@influencewith.com
                    </Text>
                    ,{AppLocalizedStrings.sentEmailThanksScreen.response}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.subTitle}>
                    {AppLocalizedStrings.sentEmailThanksScreen.account}
                  </Text>
                  <Text style={styles.subTitle}>
                    {AppLocalizedStrings.sentEmailThanksScreen.alternatively}
                    <Text style={styles.emialTitle}>
                      {' '}
                      support@influencewith.com
                    </Text>
                    ,{AppLocalizedStrings.sentEmailThanksScreen.response}
                  </Text>
                </>
              )}
            </View>
            <PrimaryButton
              title={
                props?.type === 'changeEmail'
                  ? AppLocalizedStrings.sentEmailThanksScreen.return
                  : AppLocalizedStrings.sentEmailThanksScreen.startAgain
              }
              onPress={props.onStartHandler}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SentEmailThanksPopup;

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
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: hp(2),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: hp(5),
    marginHorizontal: wp(5),
    lineHeight: 20,
  },
  emialTitle: {
    color: Colors.Neutral800,
    fontSize: '12@s',
    fontWeight: '600',
  },
});
