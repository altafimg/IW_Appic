import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from '../textInput/DetailsTextInput';
import Colors from '../../theme/Colors';
import DatePicker from 'react-native-date-picker';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import SVG from '../../assets/svg';
import moment from 'moment';
import {TextInput} from 'react-native';

const NewProfileKidsTextInput = ({
  formData,
  handleFormData,
  title,
  error,
  usernameError,
  value,
  onDateChange,
  calculateAge,
  adultAge,
  setAdultAge,
}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [open, setOpen] = useState(false);
  const currentDate = new Date();

  const isError = field => {
    // return error && error !== 'Available' && formData[field].trim() === '';
    return error && formData[field].trim() === '';
  };

  return (
    <View style={styles.container}>
      <DetailsTextInput
        title={AppLocalizedStrings.newProfileDetailsScreen.firstName}
        placeholder={' '}
        editable={true}
        onChangeText={e => {
          handleFormData('firstName', e);
        }}
        value={formData.firstName}
      />
      {isError('firstName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}

      <DetailsTextInput
        title={AppLocalizedStrings.newProfileDetailsScreen.lastName}
        placeholder={' '}
        editable={true}
        onChangeText={e => {
          handleFormData('lastName', e);
        }}
        value={formData.lastName}
      />
      {isError('lastName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}

      <View>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.newProfileDetailsScreen.dateOfBirth}
        </Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <View style={styles.dateTitle}>
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </TouchableOpacity>

        <DatePicker
          modal
          androidVariant="iosClone"
          open={open}
          date={date}
          maximumDate={currentDate}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            setDate(selectedDate);
            onDateChange(selectedDate);
            // calculateAge(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      {isError('dateOfBirth') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.newProfileKidsTextInput.pleaseSelect}
        </Text>
      )}

      {adultAge && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.newProfileKidsTextInput.youMust}
        </Text>
      )}

      <Text style={styles.content}>
        {AppLocalizedStrings.newProfileDetailsScreen.information}
      </Text>
      <View style={styles.textInputView}>
        <View style={styles.textInputAddrateView}>
          <Text style={styles.addrateTitle}>@</Text>
          <TextInput
            placeholder=""
            editable={true}
            style={styles.textInput}
            onChangeText={e => {
              handleFormData('userName', e);
            }}
            autoCapitalize="none" // Disable auto capitalization
            value={formData.userName}
          />
        </View>
      </View>

      {isError('userName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}

      {formData.userName.trim() === '' ? (
        ''
      ) : !usernameError ? (
        <View style={styles.existError}>
          <SVG.ExistError color="green" />
          <Text style={[styles.usernameError, {color: Colors.Success500}]}>
            {AppLocalizedStrings.newProfileKidsTextInput.thisUsername}
          </Text>
        </View>
      ) : (
        <View style={styles.existError}>
          <SVG.ExistError color="red" />
          <Text style={[styles.usernameError, {color: Colors.Destructive500}]}>
            {usernameError}
          </Text>
        </View>
      )}

      <DetailsTextInput
        title={AppLocalizedStrings.newProfileDetailsScreen.profileName}
        placeholder={' '}
        editable={true}
        frountTitle={
          formData.profileName.length > 0
            ? 26 - formData.profileName.length + ` characters remaining`
            : 26 - formData.profileName.length + ` characters max.`
        }
        onChangeText={e => {
          handleFormData('profileName', e);
        }}
        value={formData.profileName}
        maxLength={26}
      />
      {isError('profileName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}

      <Text style={[styles.content, styles.contentSec]}>
        {AppLocalizedStrings.newProfileDetailsScreen.displayed}
      </Text>
    </View>
  );
};

export default NewProfileKidsTextInput;

const styles = ScaledSheet.create({
  container: {
    marginTop: hp(-1),
  },
  content: {
    fontSize: '11@s',
    fontWeight: '400',
    color: Colors.Neutral500,
    lineHeight: '18@s',
    paddingTop: hp(1),
    marginBottom: hp(1),
  },
  contentSec: {
    paddingTop: hp(-3),
  },
  dateTitle: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    // height: hp(6),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
    marginTop: hp(1),
  },
  dateText: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: wp(3),
    lineHeight: '20@s',
  },
  usernameError: {
    fontWeight: '400',
    fontSize: 12,
    paddingLeft: 3,
  },
  existError: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  textInputView: {
    height: '43@s',
  },
  addrateTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
  },
  frountTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  textInputAddrateView: {
    // flex: 1,
    color: Colors.Neutral900,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '43@s',
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
});
