import React, {useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../textInput/DetailsTextInput';
import {useHeaderHeight} from '@react-navigation/elements';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {recoverAccountDataAddAction} from '../../redux/actions/recoverAccountDataAction';

const RecoveringAccount3 = props => {
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const recoverAccountData = useSelector(
    state => state.recoverAccountDataReducer.data,
  );
  const [otherEmail, setOtherEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    otherEmail: '',
    phoneNumber: '',
  });

  const buttonHandler = () => {
    const errors = {};
    if (!otherEmail.trim()) {
      errors.otherEmail = 'Please fill in this field';
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Please fill in this field';
    }
    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (buttonHandler()) {
      const updatedRecoverData = {
        ...recoverAccountData,
        otherEmail,
        phoneNumber,
      };
      dispatch(recoverAccountDataAddAction(updatedRecoverData));
      props.onSubmitHandler();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.recoveringAccountScreen.provide}
          </Text>
          <View style={styles.main}>
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.phoneNumber}
              editable={true}
              onChangeText={e => {
                setPhoneNumber(e);
              }}
            />
            {errorMessages.phoneNumber ? (
              <Text style={styles.errorText}>{errorMessages.phoneNumber}</Text>
            ) : null}
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.email}
              editable={true}
              onChangeText={e => {
                setOtherEmail(e);
              }}
            />
            {errorMessages.otherEmail ? (
              <Text style={styles.errorText}>{errorMessages.otherEmail}</Text>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            onPress={props.onPreviousHandler}
            style={styles.previousButton}>
            <Text style={styles.previousTitle}>
              {AppLocalizedStrings.recoveringAccountScreen.previous}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.nextButton}>
            <Text style={styles.nextTitle}>
              {AppLocalizedStrings.recoveringAccountScreen.submit}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RecoveringAccount3;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingBottom: hp(2),
  },
  main: {
    marginTop: hp(3),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  nextButton: {
    backgroundColor: Colors.Primary500,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginLeft: wp(1),
  },
  nextTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    flex: 1,
    marginRight: wp(1),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
  },
});
