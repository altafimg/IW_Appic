import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';

const BirthdayDatePicker = ({title, value, onDateChange}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [open, setOpen] = useState(false);
  const currentDate = new Date();

  return (
    <View style={styles.relationView}>
      <Text style={styles.textInputTitle}>{title}</Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.dateTitle}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'numeric',
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
          onDateChange(selectedDate); // Call the onDateChange function with the selected date
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default BirthdayDatePicker;

const styles = ScaledSheet.create({
  relationView: {
    marginVertical: hp(1),
  },
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
    // height: hp(6),
  },
  dateText: {
    color: Colors.Neutral700,
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: wp(4),
  },
});
