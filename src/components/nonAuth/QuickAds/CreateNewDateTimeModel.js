import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import CreateNewDateTimePopup from '../../popups/CreateNewDateTimePopup';

// image
import downArrow from '../../../assets/images/downArrow.png';
import date from '../../../assets/images/date.png';
import time from '../../../assets/images/time.png';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const CreateNewDateTimeModel = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  value2,
  setValue2,
  markedDates,
  setMarkedDates,
  timezone,
  setTimezone,
  items,
  setItems,
  isPickerVisible,
  setPickerVisibility,
  value1,
  setValue1,
}) => {
  const [dateTimeExpend, setDateTimeExpend] = useState(false);
  const [dateTimeVisible, setDateTimeVisible] = useState(false);
  const [dateType, setDateType] = useState('');
  const [value, setValue] = useState('');

  const test = timezone.find(item => item.value === value1);

  return (
    <View style={[styles.mainBoxStyle1]}>
      <TouchableOpacity
        onPress={() => {
          setDateTimeExpend(!dateTimeExpend);
        }}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Date_time}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: dateTimeExpend ? Colors.Primary500 : null,
            transform: dateTimeExpend
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        {dateTimeExpend && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.Neutral300,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
            }}>
            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.When_to_post}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setDateTimeVisible(true);
                setDateType('Date');
              }}
              activeOpacity={0.6}
              style={styles.inputStyle}>
              <View style={styles.directionRowStyle}>
                <Text style={styles.dateTextStyle}>
                  {selectedDate ? selectedDate : 'Select date'}
                </Text>
                <Image
                  source={date}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDateTimeVisible(true);
                setDateType('Time');
              }}
              activeOpacity={0.6}
              style={[
                styles.inputStyle,
                {marginTop: scale(15), marginBottom: scale(10)},
              ]}>
              <View style={[styles.directionRowStyle]}>
                <Text style={styles.dateTextStyle}>
                  {test ? `${selectedTime}` : 'Select time'}
                </Text>
                <Image
                  source={time}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={[styles.inputStyle]}>
              <View style={[styles.directionRowStyle]}>
                <Text style={styles.dateTextStyle}>
                  {test ? `${test?.label}` : '  Select time zone'}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <CreateNewDateTimePopup
        dateTimeVisible={dateTimeVisible}
        setDateTimeVisible={setDateTimeVisible}
        dateType={dateType}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        setSelectedTime={setSelectedTime}
        selectedTime={selectedTime}
        value={value}
        setValue={setValue}
        value1={value1}
        setValue1={setValue1}
        value2={value2}
        setValue2={setValue2}
        markedDates={markedDates}
        setMarkedDates={setMarkedDates}
        timezone={timezone}
        setTimezone={setTimezone}
        items={items}
        setItems={setItems}
        isPickerVisible={isPickerVisible}
        setPickerVisibility={setPickerVisibility}
      />
    </View>
  );
};

export default CreateNewDateTimeModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    paddingHorizontal: '10@s',
  },
  expendButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 5,
    height: '44@s',
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  inputStyle: {
    height: '36@s',
    marginTop: '6@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: 10,
  },
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
    top: '5@s',
  },
});
