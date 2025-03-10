import React from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useHeaderHeight} from '@react-navigation/elements';

const AddBankAccountScreen = ({navigation}) => {
  const height = useHeaderHeight();

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onSaveHandler = () => {
    navigation.navigate('CardAddedScreen');
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={AppLocalizedStrings.addBankAccountScreen.addBack}
          />
          <View style={styles.spacer}></View>
          <DetailsTextInput
            title={AppLocalizedStrings.addBankAccountScreen.fullName}
          />
          <DetailsTextInput
            title={AppLocalizedStrings.addBankAccountScreen.sortCode}
          />
          <DetailsTextInput
            title={AppLocalizedStrings.addBankAccountScreen.routingNumber}
          />

          <DetailsTextInput
            title={AppLocalizedStrings.addBankAccountScreen.accountNumber}
          />
          <DetailsTextInput
            title={AppLocalizedStrings.addBankAccountScreen.confirmAccount}
          />
        </ScrollView>
        <PrimaryButton
          title={AppLocalizedStrings.button.save}
          onPress={onSaveHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddBankAccountScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(1.5),
    justifyContent: 'space-between',
    paddingBottom: hp(1),
  },
  spacer: {
    marginTop: hp(-5),
  },
});
