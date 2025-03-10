import React, {useEffect, useState} from 'react';
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
import {recoverAccountAction} from '../../redux/actions/recoverAccountAction';
import {recoverAccountDataAddAction} from '../../redux/actions/recoverAccountDataAction';
import {State, City} from 'country-state-city';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecoveringAccount2 = props => {
  const height = useHeaderHeight();
  const recoverAccountData = useSelector(
    state => state.recoverAccountDataReducer.data,
  );
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [addressMore, setAddressMore] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [data, setData] = useState({
    countryCode: '',
    stateCode: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    fullName: '',
    address: '',
    addressMore: '',
    city: '',
    country: '',
    state,
    zipCode: '',
  });

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allCountriesData');
        const parsedData = jsonValue != null ? JSON.parse(jsonValue) : null;
        setCountryData(parsedData);
      } catch (error) {
        console.error('Error fetching country data from AsyncStorage:', error);
      }
    };

    fetchDataFromAsyncStorage();
  }, []);

  const handleData = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const stateData = State.getStatesOfCountry(data?.countryCode);
  const cityData = City.getCitiesOfState(data?.countryCode, data?.stateCode);

  const buttonHandler = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please fill in this field';
    }
    if (!address.trim()) {
      errors.address = 'Please fill in this field';
    }
    if (!addressMore.trim()) {
      errors.addressMore = 'Please fill in this field';
    }
    if (!city.trim()) {
      errors.city = 'Please fill in this field';
    }
    if (!country.trim()) {
      errors.country = 'Please fill in this field';
    }
    if (!state.trim()) {
      errors.state = 'Please fill in this field';
    }
    if (!zipCode.trim()) {
      errors.zipCode = 'Please fill in this field';
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (buttonHandler()) {
      const updatedRecoverData = {
        ...recoverAccountData,
        fullName,
        address,
        addressMore,
        city,
        country,
        state,
        zipCode,
      };

      dispatch(recoverAccountDataAddAction(updatedRecoverData));
      props.onNextButtonHandler();
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
            {AppLocalizedStrings.recoveringAccountScreen.talking}
          </Text>
          <View style={styles.main}>
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.fullName}
              editable={true}
              onChangeText={e => {
                setFullName(e);
              }}
            />
            {errorMessages.fullName ? (
              <Text style={styles.errorText}>{errorMessages.fullName}</Text>
            ) : null}
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.address}
              editable={true}
              onChangeText={e => {
                setAddress(e);
              }}
            />
            {errorMessages.address ? (
              <Text style={styles.errorText}>{errorMessages.address}</Text>
            ) : null}
            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.line2}
              editable={true}
              onChangeText={e => {
                setAddressMore(e);
              }}
            />
            {errorMessages.addressMore ? (
              <Text style={styles.errorText}>{errorMessages.addressMore}</Text>
            ) : null}

            {/* --------- country code start -------- */}
            <View style={styles.relationView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.addAdditionalDetailsScreen.country}
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={countryData?.map(item => ({
                  label: item.name,
                  value: item.name,
                }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={country}
                onChange={item => {
                  const selectedCountry = countryData.find(
                    country => country.name === item.value,
                  );
                  if (selectedCountry) {
                    handleData('countryCode', selectedCountry.isoCode);
                    setCountry(selectedCountry.name);
                  }
                }}
              />
            </View>
            {errorMessages.country ? (
              <Text style={styles.errorText}>{errorMessages.country}</Text>
            ) : null}
            {/* --------- country code end -------- */}

            {/* --------- state code start -------- */}
            <View style={styles.relationView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.addAdditionalDetailsScreen.onlyState}
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={stateData?.map(item => ({
                  label: item.name,
                  value: item.name,
                }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={state}
                onChange={item => {
                  const selectedState = stateData.find(
                    state => state.name === item.value,
                  );
                  if (selectedState) {
                    setState(selectedState.name);
                    handleData('stateCode', selectedState.isoCode);
                  }
                }}
              />
            </View>
            {errorMessages.state ? (
              <Text style={styles.errorText}>{errorMessages.state}</Text>
            ) : null}
            {/* --------- state code end -------- */}

            {/* --------- city code start -------- */}
            <View style={styles.relationView}>
              <Text style={styles.textInputTitle}>
                {AppLocalizedStrings.addAdditionalDetailsScreen.city}
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={cityData?.map(item => ({
                  label: item.name,
                  value: item.name,
                }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={city}
                onChange={item => {
                  setCity(item.value);
                }}
              />
            </View>

            {errorMessages.city ? (
              <Text style={styles.errorText}>{errorMessages.city}</Text>
            ) : null}
            {/* --------- city code end ---------- */}

            <DetailsTextInput
              title={AppLocalizedStrings.recoveringAccountScreen.zip}
              editable={true}
              onChangeText={e => {
                setZipCode(e);
              }}
            />
            {errorMessages.zipCode ? (
              <Text style={styles.errorText}>{errorMessages.zipCode}</Text>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
            {AppLocalizedStrings.recoveringAccountScreen.next}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoveringAccount2;

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
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
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
});
