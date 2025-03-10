import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {changeDobAction} from '../../../redux/actions/changeDobAction';
import {editUserDataStoreAction} from '../../../redux/actions/editUserDataStoreAction';

const ChangeDOBScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token) || {};
  const {_id} = useSelector(state => state.loginReducer.user?.data?.data) || {};
  const {dob} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const loader = useSelector(state => state.changeDobReducer.loading);

  const modifiedDob = moment(dob).format('DD MMMM YYYY');
  const currentDate = new Date();

  const [showError, setShowError] = useState(false);
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(dob));

  const reasonsForDobChange = [
    {
      label: 'Incorrect information provided at birth',
      value: 'Incorrect information provided at birth',
    },
    {label: 'Adoption', value: 'Adoption'},
    {label: 'Legal name change', value: 'Legal name change'},
    {
      label: 'Lost or damaged birth certificate',
      value: 'Lost or damaged birth certificate',
    },
    {label: 'Typographical error', value: 'Typographical error'},
    {label: 'Other', value: 'Other'},
  ];

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onUploadGovIDHandler = () => {
    // console.log(date);
    if (reason.trim() === '') {
      setShowError(true);
    } else {
      const modified = moment(date).format('YYYY-MM-DD');
      const current_value = moment(dob)?.format('YYYY-MM-DD');

      const check = 'edit_profile';

      const data = {
        reason_change: reason,
        new_value: modified,
        req_name: 'dob',
        current_value: current_value,
      };

      dispatch(editUserDataStoreAction(data));

      navigation.navigate('UploadGovIDScreen', {
        check: check,
      });

      // const data = {
      //   // token,
      //   userId: _id,
      //   newDob: modified,
      //   reason: reason,
      // };

      // dispatch(changeDobAction(data)).then(res => {
      //   console.log(res, '<<<<<<<<<<res');
      // });
      // // navigation.navigate('UploadGovIDScreen');
    }
  };

  const onDateChange = selectedDate => {
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle={AppLocalizedStrings.changeDOBScreen.changeDOB} />
        <View style={styles.main}>
          <DetailsTextInput
            title={AppLocalizedStrings.changeDOBScreen.currentDOB}
            value={modifiedDob}
            editable={false}
            backgroundColor={Colors.Neutral100}
          />
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
                onDateChange(selectedDate);
                setShowError(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>

          <View style={styles.dropdownView}>
            <Text style={styles.textInputTitle}>
              {AppLocalizedStrings.changeDOBScreen.selectReason}
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={styles.itemTextStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={reasonsForDobChange}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={reason}
              onChange={item => {
                setReason(item.value);
                setShowError(false);
              }}
            />
            {showError && (
              <Text style={{color: 'red', marginTop: 10}}>
                {AppLocalizedStrings.changeDOBScreen.pleaseFill}
              </Text>
            )}
          </View>
        </View>
      </View>

      <PrimaryButton
        title={
          loader ? (
            <View
              style={{
                width: wp('93%'),
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={Colors.White}
                size={'small'}
                style={{marginTop: hp(1)}}
              />
            </View>
          ) : (
            <Text>{AppLocalizedStrings.button.submit}</Text>
          )
        }
        onPress={onUploadGovIDHandler}
      />
    </View>
  );
};

export default ChangeDOBScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  main: {
    marginTop: hp(-3),
  },
  dateTitle: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
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
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
  },
  placeholderStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  iconStyle: {
    tintColor: Colors.Neutral800,
  },
  itemTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  dropdownView: {
    marginTop: hp(1),
  },
});
