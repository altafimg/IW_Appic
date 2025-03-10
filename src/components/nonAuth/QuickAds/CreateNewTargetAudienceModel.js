import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import {Country, City, State} from 'country-state-city';
import CreateNewTargetAudiencePopup from '../../popups/CreateNewTargetAudiencePopup';
import {Dropdown} from 'react-native-element-dropdown';
// image
import downArrow from '../../../assets/images/downArrow.png';
import dropdown from '../../../assets/images/Dropdown.png';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import CreateCountryPopup from '../../popups/CreateCountryPopup';
import CreateStatePopup from '../../popups/CreateStatePopup';
import CreateCityPopup from '../../popups/CreateCityPopup';

const CreateNewTargetAudienceModel = props => {
  const targetAge = props.targetAge;
  const setTargetAge = props.setTargetAge;
  const selectedCountry = props.selectedCountry;
  const setSelectedCountry = props.setSelectedCountry;
  const selectedState = props.selectedState;
  const setSelectedState = props.setSelectedState;
  const setSelectedCity = props.setSelectedCity;
  const setCountry = props.setCountry;
  const setState = props.setState;
  const city = props.city;
  const setCity = props.setCity;

  const [targetExpend, setTargetExpend] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);
  const [target, setTarget] = useState(false);
  const [countryCode, setCountryCode] = useState('null');
  const [stateCode, setStateCode] = useState('null');
  const [search, setSearch] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [allState, setAllState] = useState([]);
  const [countryVisible, setCountryVisible] = useState(false);
  const [stateVisible, setStateVisible] = useState(false);
  const [cityVisible, setCityVisible] = useState(false);

  const filteredData = Country.getAllCountries().filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const AllState = State.getAllStates();
  useEffect(() => {
    const filterStatesByIsoCode = Code => {
      return AllState.filter(state => state.countryCode === Code);
    };
    const filteredStates = filterStatesByIsoCode(countryCode);
    setAllState(filteredStates);
  }, [selectedCountry]);

  const AllCities = City.getCitiesOfState(countryCode, stateCode);

  return (
    <View style={[styles.mainBoxStyle1]}>
      <TouchableOpacity
        onPress={() => {
          setTargetExpend(!targetExpend);
        }}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Target_audience}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: targetExpend ? Colors.Primary500 : null,
            transform: targetExpend ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        {targetExpend && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.Neutral300,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
            }}>
            {/* Country Dropdown */}
            <View>
              <TouchableOpacity
                // style={styles.dropdownContainer}
                onPress={() => setCountryVisible(true)}
                style={[
                  styles.dropdown,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000',
                    paddingVertical: hp(1.5),
                  }}>
                  {selectedCountry ? selectedCountry : ' Target Countries'}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: 23,
                    height: 23,
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </TouchableOpacity>
              {/* <Dropdown
                data={filteredData?.map(item => ({
                  label: item.name,
                  value: item.name,
                  isoCode: item.isoCode,
                }))}
                search
                placeholder={selectedCountry ? selectedCountry : 'Country'}
                searchPlaceholder={
                  AppLocalizedStrings.quickAdsHomescreen.search
                }
                labelField="label"
                valueField="value"
                onChange={item => {
                  setCountry(item.label);
                  setSelectedCountry(item.value);
                  setCountryCode(item.isoCode);

                  setState('');
                  setSelectedState('');
                  setSearchState('');
                  setCity('');
                  setSelectedCity('');
                  setSearchCity('');
                }}
                style={styles.dropdown}
                containerStyle={styles.dropdownContainerStyle}
              /> */}
            </View>

            {/* State Dropdown - Only show if country is selected and states are available */}
            {selectedCountry && allState?.length > 0 && (
              <View>
                <View>
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      // style={styles.dropdownContainer}
                      onPress={() => setStateVisible(true)}
                      style={[
                        styles.dropdown,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '400',
                          color: '#000',
                          paddingVertical: hp(1.5),
                        }}>
                        {selectedState ? selectedState : ' Target State'}
                      </Text>
                      <Image
                        source={downArrow}
                        style={{
                          width: 23,
                          height: 23,
                          transform: [{rotateZ: '270deg'}],
                        }}
                      />
                    </TouchableOpacity>
                    {/* <Dropdown
                      data={allState?.map(item => ({
                        label: item.name,
                        value: item.name,
                        stateCode: item.isoCode,
                      }))}
                      search
                      placeholder={selectedState ? selectedState : 'State'}
                      searchPlaceholder={
                        AppLocalizedStrings.quickAdsHomescreen.search
                      }
                      labelField="label"
                      valueField="value"
                      onChange={item => {
                        setState(item.label);
                        setSelectedState(item.value);
                        setStateCode(item.stateCode);

                        setCity('');
                        setSelectedCity('');
                        setSearchCity('');
                      }}
                      style={styles.dropdown}
                      containerStyle={styles.dropdownContainerStyle}
                    /> */}
                  </View>
                </View>
              </View>
            )}

            {/* City Dropdown - Only show if state is selected and cities are available */}
            {selectedState && AllCities?.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => setCityVisible(true)}
                  style={[
                    styles.dropdown,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: hp(2),
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '400',
                      color: '#000',
                      paddingVertical: hp(1.5),
                    }}>
                    {city ? city : 'Target City'}
                  </Text>
                  <Image
                    source={downArrow}
                    style={{
                      width: 23,
                      height: 23,
                      transform: [{rotateZ: '270deg'}],
                    }}
                  />
                </TouchableOpacity>
                {/* <View style={styles.dropdownContainer}>
                      <Dropdown
                        data={AllCities?.map(item => ({
                          label: item.name,
                          value: item.name,
                        }))}
                        search
                        placeholder={city ? city : 'City'}
                        searchPlaceholder={
                          AppLocalizedStrings.quickAdsHomescreen.search
                        }
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                          setCity(item.label);
                        }}
                        style={styles.dropdown}
                        containerStyle={styles.dropdownContainerStyle}
                      />
                    </View> */}
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                setTargetVisible(true);
                setTarget('Age');
              }}
              activeOpacity={0.6}
              style={[
                styles.inputStyle,
                {marginTop: scale(15), marginBottom: scale(15)},
              ]}>
              <View style={styles.directionRowStyle}>
                <Text numberOfLines={1} style={styles.dateTextStyle}>
                  {targetAge.length > 0
                    ? `${targetAge} year olds`
                    : AppLocalizedStrings.quickAdsHomescreen.Select_age_bracket}
                </Text>
                <Image
                  source={dropdown}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <CreateNewTargetAudiencePopup
        targetVisible={targetVisible}
        setTargetVisible={setTargetVisible}
        target={target}
        targetAge={targetAge}
        setTargetAge={setTargetAge}
      />
      <CreateCountryPopup
        countryVisible={countryVisible}
        setCountryVisible={setCountryVisible}
        filteredData={filteredData}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        setCountry={setCountry}
        setCountryCode={setCountryCode}
        setState={setState}
        setSelectedState={setSelectedState}
        setSearchState={setSearchState}
        setCity={setCity}
        setSelectedCity={setSelectedCity}
        setSearchCity={setSearchCity}
      />
      <CreateStatePopup
        stateVisible={stateVisible}
        setStateVisible={setStateVisible}
        allState={allState}
        setSelectedState={setSelectedState}
        selectedState={selectedState}
        setState={setState}
        setStateCode={setStateCode}
        setCity={setCity}
        setSelectedCity={setSelectedCity}
        setSearchCity={setSearchCity}
      />
      <CreateCityPopup
        cityVisible={cityVisible}
        setCityVisible={setCityVisible}
        AllCities={AllCities}
        setCity={setCity}
        city={city}
      />
    </View>
  );
};

export default CreateNewTargetAudienceModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    // borderWidth: 1,
    // borderRadius: '3@s',
    // borderColor: Colors.Neutral300,
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
    color: Colors.Neutral900,
    top: '5@s',
    width: '85%',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '180@s',
    backgroundColor: Colors.White,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '200@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },
  mainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5@s',
    height: '40@s',
    marginTop: '10@s',
    paddingHorizontal: '10@s',
  },
  mainTextStyle: {
    fontWeight: '500',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  dropdownContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: '5@s',
    marginTop: '13@s',
  },
  dropdownTextStyle: {
    marginTop: 10,
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: scale(14),
  },
  iconStyle: {
    width: '26@s',
    height: '26@s',
  },
  dropdown: {
    backgroundColor: '#fff',
    // height: '40@s',
    borderRadius: '5@s',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
  },
  dropdownContainerStyle: {
    height: '250@s',
    backgroundColor: '#fff',
  },
});
