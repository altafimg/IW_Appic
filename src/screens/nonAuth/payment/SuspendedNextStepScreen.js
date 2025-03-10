import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SuspendedNextStepScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Header
          headerTitle={AppLocalizedStrings.suspendedNextStepScreen.account}
          subTitle={AppLocalizedStrings.suspendedNextStepScreen.appeal}
        />
        <View style={styles.textInputView}>
          <TextInput
            placeholder=" "
            multiline
            maxLength={300}
            style={styles.textInput}
          />
        </View>
        <Text style={styles.inputBottomTitle}>0/300</Text>
      </View>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.suspendedNextStepScreen.sendAppeal}
        />
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.suspendedNextStepScreen.cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuspendedNextStepScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '140@s',
  },
  textInput: {
    paddingHorizontal: wp(3),
  },
  inputBottomTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'right',
    paddingTop: hp(1),
  },
  accountButton: {
    alignSelf: 'center',
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
