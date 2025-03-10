import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Dimensions} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {Divider, Overlay} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewDateTimePopup = ({
  dateTimeVisible,
  setDateTimeVisible,
  dateType,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  value1,
  setValue1,
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
}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleConfirm = date => {
    const formattedTime = moment(date).format('hh:mm A').toUpperCase();
    setSelectedTime(formattedTime);
    setPickerVisibility(false);
  };

  const onDayPress = day => {
    const formattedDate = moment(day.timestamp).format('dddd, D MMMM YYYY');
    setSelectedDate(formattedDate);
    const dateString = day.dateString;
    setMarkedDates({
      [dateString]: {
        selected: true,
        selectedColor: Colors.Primary500,
        selectedTextColor: '#FFFFFF',
      },
    });
  };

  const validateFields = () => {
    if (selectedTime && value1) {
      setDateTimeVisible(false);
    } else {
      Alert.alert('All fields details required');
    }
  };

  return (
    <Overlay
      onRequestClose={() => setDateTimeVisible(false)}
      onBackdropPress={() => setDateTimeVisible(false)}
      isVisible={dateTimeVisible}
      overlayStyle={[styles.overlayContainer]}>
      {dateType == 'Date' ? (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setDateTimeVisible(false)}>
                <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.quickAdsHomescreen.Select_Date}
              </Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />

            <View style={{padding: 10}}>
              <Calendar
                onDayPress={onDayPress}
                minDate={moment().format('YYYY-MM-DD')}
                maxDate={moment().add(6, 'days').format('YYYY-MM-DD')}
                markedDates={markedDates}
                theme={{
                  selectedDayBackgroundColor: Colors.Primary500,
                  selectedDayTextColor: '#fff',
                  todayBackgroundColor: '#f2e6ff',
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setDateTimeVisible(false);
            }}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Save}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{paddingTop: hp(2), justifyContent: 'space-between', flex: 1}}>
          <View>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setDateTimeVisible(false)}>
                <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.quickAdsHomescreen.Select_time}
              </Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />

            <View
              style={[
                styles.directionRowStyle,
                {marginTop: scale(10), paddingTop: hp(2)},
              ]}>
              <TouchableOpacity
                style={[
                  styles.timeInputStyle,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  },
                ]}
                onPress={() => setPickerVisibility(true)}>
                <Text
                  style={[
                    styles.timeInputTextStyle,
                    {flex: 1, textAlign: 'left'},
                  ]}>
                  {selectedTime.split(' ')[0]}
                </Text>
                <Text style={[styles.timeInputTextStyle, {textAlign: 'right'}]}>
                  {selectedTime.split(' ')[1]}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={() => setPickerVisibility(false)}
                display="default"
                is24Hour={false}
                style={{}}
              />
            </View>
            <DropDownPicker
              style={{
                marginTop: scale(15),
                borderColor: open1 ? Colors.Primary500 : Colors.Neutral300,
                zIndex: -1,
              }}
              customItemLabelStyle={styles.mainTextStyle}
              dropDownContainerStyle={[
                styles.dropDownContainerStyle,
                {marginTop: scale(18)},
              ]}
              open={open1}
              value={value1}
              items={timezone}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setTimezone}
              placeholderStyle={styles.mainTextStyle}
              placeholder="PST   Pacific Standard Time"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              validateFields();
            }}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Save}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Overlay>
  );
};

export default CreateNewDateTimePopup;

const styles = ScaledSheet.create({
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    backgroundColor: Colors.White,
    width: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  userTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral900,
  },
  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  timeInputStyle: {
    height: '42@s',
    width: '100%',
    paddingHorizontal: '10@s',
    borderRadius: '5@s',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    justifyContent: 'center',
  },
  timeInputTextStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Black,
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  dropDownContainerStyle: {
    backgroundColor: Colors.Neutral100,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 0,
    elevation: 5,
    marginTop: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
