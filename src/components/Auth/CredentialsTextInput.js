import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';

const CredentialsTextInput = ({
  formData,
  handleFormData,
  handleError,
  error,
  user_role,
}) => {
  const [createVisible, setCreateVisible] = useState(false);
  const [retypeVisible, setRetypeVisible] = useState(false);

  const onCvHandler = () => {
    setCreateVisible(!createVisible);
  };

  const onRtvHandler = () => {
    setRetypeVisible(!retypeVisible);
  };

  return (
    <View>
      <View style={styles.inputMainView}>
        <Text style={styles.textInputTitle}>
          {user_role == 'government'
            ? AppLocalizedStrings.CredentialsScreen.govt
            : AppLocalizedStrings.CredentialsScreen.email}
        </Text>
        <View style={styles.textInputView}>
          <TextInput
            placeholder=" "
            style={styles.textInput}
            onChangeText={e => {
              handleFormData('email', e);
              handleError('emailError', '');
            }}
            value={formData.email}
            autoCapitalize="none"
          />
        </View>
        {error.emailError ? (
          <Text style={styles.errorText}>{error.emailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputMainView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.CredentialsScreen.confirmEmail}
        </Text>
        <View style={styles.textInputView}>
          <TextInput
            placeholder=" "
            style={styles.textInput}
            onChangeText={e => {
              handleFormData('confirmEmail', e);
              handleError('confirmEmailError', '');
            }}
            value={formData.confirmEmail}
            autoCapitalize="none"
          />
        </View>
        {error.confirmEmailError ? (
          <Text style={styles.errorText}>{error.confirmEmailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputMainView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.CredentialsScreen.createPassword}
        </Text>
        <View style={styles.textInputView2}>
          <TextInput
            placeholder=" "
            secureTextEntry={!createVisible}
            style={styles.textInput2}
            onChangeText={e => {
              handleFormData('password', e);
              handleError('passwordError', '');
            }}
            value={formData.password}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={onCvHandler}>
            <Text style={styles.showTitle}>
              {createVisible
                ? AppLocalizedStrings.CredentialsScreen.hide
                : AppLocalizedStrings.CredentialsScreen.show}
            </Text>
          </TouchableOpacity>
        </View>
        {error.passwordError ? (
          <Text style={styles.errorText}>{error.passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.inputMainView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.CredentialsScreen.Retype}
        </Text>
        <View style={styles.textInputView2}>
          <TextInput
            placeholder=" "
            secureTextEntry={!retypeVisible}
            style={styles.textInput2}
            onChangeText={e => {
              handleFormData('confirmPassword', e);
              handleError('confirmPasswordError', '');
            }}
            value={formData.confirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={onRtvHandler}>
            <Text style={styles.showTitle}>
              {retypeVisible
                ? AppLocalizedStrings.CredentialsScreen.hide
                : AppLocalizedStrings.CredentialsScreen.show}
            </Text>
          </TouchableOpacity>
        </View>
        {error.confirmPasswordError ? (
          <Text style={styles.errorText}>{error.confirmPasswordError}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default CredentialsTextInput;

const styles = ScaledSheet.create({
  inputMainView: {
    marginVertical: hp(1),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '43@s',
    paddingHorizontal: '5@s',
  },
  textInput: {
    color: Colors.Neutral900,
    height: '43@s',
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '43@s',
  },
  textInput2: {
    color: Colors.Neutral900,
    width: wp(80),
    height: '43@s',
  },
  showTitle: {
    color: Colors.Neutral700,
    fontSize: '11@s',
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
