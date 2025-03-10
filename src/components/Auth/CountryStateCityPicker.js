import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import {State, City} from 'country-state-city';
import SVG from '../../assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from 'react-native-elements';
import Modal from 'react-native-modal';

const CountryStateCityPicker = ({
  formData,
  handleFormData,
  setFormData,
  data,
  setData,
  stateData,
  setCityData,
  countryData,
  setCountryData,
  setStateData,
  cityData,
  showState,
  setShowState,
  showCity,
  setShowCity,
}) => {
  const [languageDialectData, setLanguageDialectData] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [dialectList, setDialectList] = useState([]);
  const [languageComponents, setLanguageComponents] = useState([
    {id: 1, language: '', dialect: ''},
  ]);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allCountriesData');
        const parsedData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setCountryData(parsedData);
      } catch (error) {
        console.error('Error fetching country data from AsyncStorage:', error);
      }
    };

    const fetchLanguagesFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allLanguagesData');
        const parsedData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setLanguageDialectData(parsedData);
      } catch (error) {
        console.error(
          'Error fetching languages data from AsyncStorage:',
          error,
        );
      }
    };

    fetchDataFromAsyncStorage();
    fetchLanguagesFromAsyncStorage();
  }, []);

  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const savedFormData = await AsyncStorage.getItem('savedFormData');
        if (savedFormData) {
          setFormData(JSON.parse(savedFormData));
        }

        const savedLanguageComponents = await AsyncStorage.getItem(
          'savedLanguageComponents',
        );
        if (savedLanguageComponents) {
          setLanguageComponents(JSON.parse(savedLanguageComponents));
        }

        const savedLanguagesData = await AsyncStorage.getItem(
          'savedLanguagesData',
        );
        if (savedLanguagesData) {
          setLanguageList(JSON.parse(savedLanguagesData));
        }

        const savedDialectsData = await AsyncStorage.getItem(
          'savedDialectsData',
        );
        if (savedDialectsData) {
          setDialectList(JSON.parse(savedDialectsData));
        }
      } catch (error) {
        console.error('Error loading saved values:', error);
      }
    };

    loadAdditionalData();
  }, []);

  useEffect(() => {
    const loadSelectedValues = async () => {
      try {
        const savedData = await AsyncStorage.getItem('selectedLocationData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setData(parsedData);
        }
      } catch (error) {
        console.error('Error loading selected values:', error);
      }
    };

    loadSelectedValues();
  }, []);

  useEffect(() => {
    const saveSelectedValues = async () => {
      try {
        await AsyncStorage.setItem(
          'selectedLocationData',
          JSON.stringify(data),
        );
      } catch (error) {
        console.error('Error saving selected values:', error);
      }
    };

    saveSelectedValues();
  }, [data]);

  useEffect(() => {
    const saveAdditionalData = async () => {
      try {
        await AsyncStorage.setItem('savedFormData', JSON.stringify(formData));
        await AsyncStorage.setItem(
          'savedLanguageComponents',
          JSON.stringify(languageComponents),
        );
        await AsyncStorage.setItem(
          'savedLanguagesData',
          JSON.stringify(languageList),
        );
        await AsyncStorage.setItem(
          'savedDialectsData',
          JSON.stringify(dialectList),
        );
      } catch (error) {
        console.error('Error saving values:', error);
      }
    };

    saveAdditionalData();
  }, [formData, languageComponents, languageList, dialectList]);

  const handleData = (field, value) => {
    setData(prevData => ({...prevData, [field]: value}));
  };

  const gender = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ];

  const handleCountryChange = item => {
    const country = countryData.find(country => country?.name === item?.value);
    if (country) {
      const selectedCountry = countryData.find(
        c => c.isoCode === country.isoCode,
      );

      if (selectedCountry) {
        const selectedData = languageDialectData?.find(
          data => data?.Country === selectedCountry.name,
        );

        // Clear state and city data when country changes
        setStateData([]);
        setCityData([]);
        setShowState(false);
        setShowCity(false);

        // Reset state and city selection
        handleData('stateCode', ''); // Clear selected state code
        handleData('cityCode', ''); // Clear selected city code
        handleFormData('state', ''); // Clear selected state name
        handleFormData('city', ''); // Clear selected city name

        // Set new country code and data
        handleData('countryCode', country.isoCode);
        handleFormData('country', country.name);

        if (selectedData) {
          const mainLanguages = selectedData.MainLanguage?.split(', ');
          const languageList = mainLanguages?.map(lang => ({
            label: lang,
            value: lang,
          }));
          setLanguageList(languageList || []);
          setDialectList([]); // Clear dialect list initially
        } else {
          setLanguageList([]);
          setDialectList([]);
        }

        // Update stateData and visibility
        const states = State.getStatesOfCountry(country.isoCode);
        if (states.length > 0) {
          setStateData(states);
          setShowState(true); // Show state dropdown if there are states
        } else {
          setShowState(false); // Hide state dropdown if no states
        }
      }
    } else {
      console.error('Selected country not found:', item.value);
    }
  };

  const handleStateChange = item => {
    const selectedState = stateData?.find(state => state.name === item.value);

    if (selectedState) {
      handleFormData('state', selectedState.name);
      handleData('stateCode', selectedState.isoCode);

      // Check if cities are available for the selected state
      const cities = City.getCitiesOfState(
        data.countryCode,
        selectedState.isoCode,
      );
      if (cities.length > 0) {
        setCityData(cities);
        setShowCity(true); // Show city dropdown if there are cities
      } else {
        setCityData([]);
        setShowCity(false); // Hide city dropdown if no cities
      }
    }
  };

  useEffect(() => {
    // Update stateData and visibility when country changes
    if (data.countryCode) {
      const states = State.getStatesOfCountry(data.countryCode);
      if (states.length > 0) {
        setStateData(states);
        setShowState(true); // Show state dropdown if there are states
      } else {
        setShowState(false); // Hide state dropdown if no states
      }
    }
  }, [data.countryCode]);

  useEffect(() => {
    // Update cityData when state changes
    if (data.stateCode) {
      const cities = City.getCitiesOfState(data.countryCode, data.stateCode);
      if (cities.length > 0) {
        setCityData(cities);
        setShowCity(true); // Show city dropdown if there are cities
      } else {
        setCityData([]);
        setShowCity(false); // Hide city dropdown if no cities
      }
    }
  }, [data.stateCode]);

  const handleLanguageChange = (index, language) => {
    const newLanguageComponents = [...languageComponents];
    newLanguageComponents[index].language = language.value;
    setLanguageComponents(newLanguageComponents);

    const newData = [...formData.language];
    newData[index] = language.value;
    handleFormData('language', newData);

    // Clear dialect list if no language is selected
    if (!language.value) {
      const newLanguageComponents = [...languageComponents];
      newLanguageComponents[index].dialect = '';
      setLanguageComponents(newLanguageComponents);
      return;
    }

    // Fetch dialects for the selected language
    const selectedData = languageDialectData.find(
      data => data.Country === formData.country,
    );
    if (selectedData) {
      const dialects = selectedData.Dialects?.split(', ');
      const dialectList = dialects?.map(dialect => ({
        label: dialect,
        value: dialect,
      }));
      setDialectList(dialectList || []);
    } else {
      setDialectList([]);
    }
  };

  const handleDialectChange = (index, dialect) => {
    const newLanguageComponents = [...languageComponents];
    newLanguageComponents[index].dialect = dialect.value;
    setLanguageComponents(newLanguageComponents);

    const newData = [...formData.dialect];
    newData[index] = dialect.value;
    handleFormData('dialect', newData);
  };

  const handleAdd = () => {
    setLanguageComponents([
      ...languageComponents,
      {id: languageComponents.length + 1, language: '', dialect: ''},
    ]);
  };

  const handleDelete = id => {
    const newLanguageComponents = languageComponents.filter(
      component => component.id !== id,
    );
    setLanguageComponents(newLanguageComponents);

    const newLanguageData = formData.language.filter(
      (_, index) => index !== id - 1,
    );
    const newDialectData = formData.dialect.filter(
      (_, index) => index !== id - 1,
    );

    handleFormData('language', newLanguageData);
    handleFormData('dialect', newDialectData);
  };

  return (
    <View style={styles.container}>
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
          value={formData.country}
          onChange={handleCountryChange}
          autoScroll={false}
        />
      </View>

      {showState ? (
        <View style={styles.relationView}>
          <Text style={styles.textInputTitle}>
            {AppLocalizedStrings.addAdditionalDetailsScreen.state}
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
            value={formData.state}
            onChange={handleStateChange}
          />
        </View>
      ) : (
        ''
      )}

      {showCity ? (
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
            data={cityData?.map(item => ({label: item.name, value: item.name}))}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={formData.city}
            onChange={item => {
              handleFormData('city', item.value);
            }}
          />
        </View>
      ) : (
        ''
      )}

      <View style={styles.relationView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.addAdditionalDetailsScreen.gender}
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={gender}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={formData.gender}
          onChange={item => {
            handleFormData('gender', item.label);
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <Text style={styles.genderBottomTile}>
            {AppLocalizedStrings.addAdditionalDetailsScreen.why}
          </Text>
        </TouchableOpacity>

        <Modal
          isVisible={isTooltipVisible}
          onBackdropPress={() => setTooltipVisible(false)}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.0}
          style={styles.tooltipContainer}>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document.
            </Text>
            <TouchableOpacity
              onPress={() => setTooltipVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <View>
        {languageComponents.map((component, index) => (
          <>
            {index > 0 && <Divider style={styles.divider} />}
            <View
              key={component.id}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 16,
              }}>
              <View
                style={{
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  flex: 1,
                }}>
                <View
                // style={{width: '45%'}}
                >
                  <Text style={styles.textInputTitle}>
                    {
                      AppLocalizedStrings.addAdditionalDetailsScreen
                        .selectLanguage
                    }
                  </Text>
                  <Dropdown
                    style={styles.languageDropdown}
                    placeholderStyle={styles.placeholderStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={languageList}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    search
                    onChange={language => handleLanguageChange(index, language)}
                    value={component.language}
                  />
                </View>

                <View
                  // style={{width: '45%', marginLeft: 16}}
                  style={{marginTop: 20}}>
                  <Text style={styles.textInputTitle}>
                    {
                      AppLocalizedStrings.addAdditionalDetailsScreen
                        .selectDialects
                    }
                  </Text>
                  <Dropdown
                    style={styles.languageDropdown}
                    placeholderStyle={styles.placeholderStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={dialectList}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    search
                    onChange={dialect => handleDialectChange(index, dialect)}
                    value={component.dialect}
                    disabled={!component.language}
                  />
                </View>
              </View>
              {index > 0 && (
                <TouchableOpacity
                  style={{
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    marginTop: -130,
                  }}
                  onPress={() => handleDelete(component.id)}>
                  <SVG.VectorCross height={17} width={17} />
                </TouchableOpacity>
              )}
            </View>
          </>
        ))}
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{color: '#1DA1F2', fontSize: 13}}>
            {AppLocalizedStrings.addAdditionalDetailsScreen.addLanguage}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: hp(2)}}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.addAdditionalDetailsScreen.bio}
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={300}
          placeholderTextColor={'#737373'}
          placeholder={AppLocalizedStrings.addAdditionalDetailsScreen.what}
          style={styles.textInputView}
          value={formData.bio}
          onChangeText={e => handleFormData('bio', e)}
        />
        <Text
          style={[
            styles.textInputBottomTitle,
            {
              color:
                formData?.bio.length >= 300
                  ? Colors.Destructive700
                  : Colors.Neutral700,
            },
          ]}>
          {formData.bio.length}/300
        </Text>
      </View>
    </View>
  );
};

export default CountryStateCityPicker;

const styles = ScaledSheet.create({
  container: {
    marginTop: hp(-5),
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
  genderBottomTile: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'right',
    paddingVertical: hp(0.9),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
  },
  languageDropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
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
  multiSelectedTextStyle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    textAlignVertical: 'top',
    height: '150@s',
  },
  textInputBottomTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'right',
    paddingTop: hp(1),
  },
  selectedTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(0.8),
    paddingRight: wp(1),
  },
  selectedStyle: {
    borderWidth: 1,
    color: Colors.Primary500,
    borderColor: Colors.Primary500,
    borderRadius: '60@s',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2.5),
    marginVertical: hp(1),
    marginHorizontal: wp(1),
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },

  tooltipContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: hp(27),
  },
  tooltip: {
    backgroundColor: Colors.Primary500,
    padding: 15,
    width: 300,
    position: 'relative',
  },
  tooltipText: {
    color: Colors.White,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: 23,
    marginTop: '10@s',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
  },
});
