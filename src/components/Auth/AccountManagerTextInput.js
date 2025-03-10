import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from '../textInput/DetailsTextInput';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import {Dropdown} from 'react-native-element-dropdown';
import BirthdayDatePicker from '../textInput/BirthdayDatePicker';

const AccountManagerTextInput = ({
  formData,
  handleFormData,
  error,
  diffCheck = '',
}) => {
  const data = [
    {value: 'Father', label: 'Father'},
    {value: 'Mother', label: 'Mother'},
    {value: 'Brother', label: 'Brother'},
    {value: 'Sister', label: 'Sister'},
    {value: 'Legal Guardian', label: 'Legal Guardian'},
    {value: 'Other', label: 'Other'},
  ];

  const isError = field => {
    // return error && error !== 'Available' && formData[field].trim() === '';
    return error && formData[field].trim() === '';
  };

  const formatDate = date => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    const formattedDateString = `${day}-${month}-${year}`;
    return formattedDateString;
  };

  return (
    <View style={styles.container}>
      <DetailsTextInput
        title={AppLocalizedStrings.accountManagerScreen.firstName}
        editable={true}
        value={formData.firstName}
        onChangeText={e => {
          handleFormData('accountManagerFirstName', e);
        }}
      />
      {isError('accountManagerFirstName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}
      <DetailsTextInput
        title={AppLocalizedStrings.accountManagerScreen.lastName}
        editable={true}
        value={formData.lastName}
        onChangeText={e => {
          handleFormData('accountManagerLastName', e);
        }}
      />
      {isError('accountManagerLastName') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}
      <BirthdayDatePicker
        title={AppLocalizedStrings.accountManagerScreen.dateOfBirth}
        value={formData.dateOfBirth}
        onDateChange={date => {
          // const formattedDate = formatDate(date);
          const formattedDate = date.toISOString().split('T')[0]; // Format the date to 'YYYY-MM-DD'
          handleFormData('accountManagerDateOfBirth', formattedDate);
        }}
      />

      {diffCheck === 'replace' ? (
        <DetailsTextInput
          title={AppLocalizedStrings.accountManagerScreen.email}
          editable={true}
          value={formData.accountManagerEmail}
          onChangeText={e => {
            handleFormData('accountManagerEmail', e);
          }}
        />
      ) : (
        ''
      )}

      {isError('accountManagerDateOfBirth') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}
      <View style={styles.relationView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.accountManagerScreen.relationship}
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={formData.accountManagerRelationship}
          onChange={item => {
            handleFormData('accountManagerRelationship', item.label);
          }}
        />
      </View>
      {isError('accountManagerRelationship') && (
        <Text style={styles.errorText}>
          {AppLocalizedStrings.accountManagerScreen.pleaseFill}
        </Text>
      )}
    </View>
  );
};

export default AccountManagerTextInput;

const styles = ScaledSheet.create({
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  dateTitle: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    height: hp(6),
  },
  relationView: {
    marginVertical: hp(1),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
