import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Overlay} from 'react-native-elements';
import {Country, State, City} from 'country-state-city';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import close from '../../assets/images/close.png';
import dropdown from '../../assets/images/Dropdown.png';
import SearchInputField from '../textInput/SearchInputField';
import SVG from '../../assets/svg';

const LocationPopup = props => {
  const setLocationVisible = props.setLocationVisible;
  const setLocationArrayCountry = props.setLocationArrayCountry;
  const setLocationArrayState = props.setLocationArrayState;
  const setLocationArrayCity = props.setLocationArrayCity;

  const [selected1, setSelected1] = useState('0');
  const [selected2, setSelected2] = useState('0');
  const [selected3, setSelected3] = useState('0');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setLocationArrayCountry(country);
    setLocationArrayState(state);
    setLocationArrayCity(city);
  }, [country, state, city]);

  const filteredData = Country.getAllCountries().filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const AllState = State.getStatesOfCountry(selectedCountry).filter(item =>
    item.name.toLowerCase().includes(searchState.toLowerCase()),
  );
  const AllCities = City.getCitiesOfState(
    selectedCountry,
    selectedState,
  ).filter(item => item.name.toLowerCase().includes(searchCity.toLowerCase()));

  return (
    <Overlay
      visible={props.locationVisible}
      animationType="slide"
      overlayStyle={{
        width: Dimensions.get('window').width,
        height: '100%',
        padding: 0,
      }}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setLocationVisible(false);
              }}>
              <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.filterTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Location}
            </Text>
            <Text
              onPress={() => {
                setCity('');
                setCountry('');
                setState('');
              }}
              style={styles.ResetTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Reset}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.selectText}>
              {AppLocalizedStrings.quickAdsHomescreen.country}
            </Text>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (selected1 === '1') {
                    setSelected1('0');
                  } else {
                    setSelected1('1');
                    setSelected3('0');
                    setSelected2('0');
                  }
                }}
                style={[
                  styles.mainContainer,
                  {
                    borderColor:
                      selected1 === '1' ? Colors.Primary500 : Colors.Neutral300,
                  },
                ]}>
                <Text style={styles.mainTextStyle}>
                  {country || 'Select Country'}
                </Text>
                <Image
                  source={dropdown}
                  style={[
                    styles.iconStyle,
                    {
                      tintColor:
                        selected1 === '1'
                          ? Colors.Primary500
                          : Colors.Neutral900,
                    },
                  ]}
                />
              </TouchableOpacity>

              {selected1 == '1' && (
                <View style={styles.dropdownContainer}>
                  <View
                    style={{
                      width: scale(310),
                      alignSelf: 'center',
                      marginTop: 15,
                    }}>
                    <SearchInputField
                      value={search}
                      onChangeText={s => setSearch(s)}
                      placeholder={
                        AppLocalizedStrings.quickAdsHomescreen.search
                      }
                      style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.White,
                      }}
                    />
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginHorizontal: 30,
                      marginBottom: 10,
                    }}>
                    {filteredData.map((data, index) => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setCountry(data.name);
                              setSelectedCountry(data.isoCode);
                              setSelected1('0');
                            }}>
                            <Text style={styles.dropdownTextStyle}>
                              {data.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.selectText}>
              {AppLocalizedStrings.quickAdsHomescreen.state}
            </Text>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (selected2 === '1') {
                    setSelected2('0');
                  } else {
                    setSelected3('0');
                    setSelected1('0');
                    setSelected2('1');
                  }
                }}
                style={[
                  styles.mainContainer,
                  {
                    borderColor:
                      selected2 === '1' ? Colors.Primary500 : Colors.Neutral300,
                  }, // Change border color
                ]}>
                <Text style={styles.mainTextStyle}>
                  {state || 'Select State'}
                </Text>
                <Image
                  source={dropdown}
                  style={[
                    styles.iconStyle,
                    {
                      tintColor:
                        selected2 === '1'
                          ? Colors.Primary500
                          : Colors.Neutral900,
                    },
                  ]} // Change icon color
                />
              </TouchableOpacity>
              {selected2 == '1' && (
                <View style={styles.dropdownContainer}>
                  <View
                    style={{
                      width: scale(310),
                      alignSelf: 'center',
                      marginTop: 15,
                    }}>
                    <SearchInputField
                      value={searchState}
                      onChangeText={s => setSearchState(s)}
                      placeholder={
                        AppLocalizedStrings.quickAdsHomescreen.search
                      }
                      style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.White,
                      }}
                    />
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginHorizontal: 30,
                      marginBottom: 10,
                    }}>
                    {AllState.map((data, index) => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setState(data.name);
                              setSelectedState(data.isoCode);
                              setSelected2('0');
                            }}>
                            <Text style={styles.dropdownTextStyle}>
                              {data.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.selectText}>
              {AppLocalizedStrings.quickAdsHomescreen.city}
            </Text>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if (selected3 === '1') {
                    setSelected3('0');
                  } else {
                    setSelected3('1');
                    setSelected1('0');
                    setSelected2('0');
                  }
                }}
                style={[
                  styles.mainContainer,
                  {
                    borderColor:
                      selected3 === '1' ? Colors.Primary500 : Colors.Neutral300,
                  }, // Change border color
                ]}>
                <Text style={styles.mainTextStyle}>
                  {city || 'Select City'}
                </Text>
                <Image
                  source={dropdown}
                  style={[
                    styles.iconStyle,
                    {
                      tintColor:
                        selected3 === '1'
                          ? Colors.Primary500
                          : Colors.Neutral900,
                    },
                  ]} // Change icon color
                />
              </TouchableOpacity>

              {selected3 == '1' && (
                <View style={styles.dropdownContainer}>
                  <View
                    style={{
                      width: scale(310),
                      alignSelf: 'center',
                      marginTop: 15,
                    }}>
                    <SearchInputField
                      value={searchCity}
                      onChangeText={s => setSearchCity(s)}
                      placeholder={
                        AppLocalizedStrings.quickAdsHomescreen.search
                      }
                      style={{
                        alignSelf: 'center',
                        backgroundColor: Colors.White,
                      }}
                    />
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginHorizontal: 30,
                      marginBottom: 10,
                    }}>
                    {AllCities.map((data, index) => {
                      return (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setCity(data.name);
                              setSelected3('0');
                            }}>
                            <Text style={styles.dropdownTextStyle}>
                              {data.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setLocationVisible(false);
          }}
          style={styles.ButtonStyle}>
          <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
            {AppLocalizedStrings.quickAdsHomescreen.Show_Results}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Overlay>
  );
};

export default LocationPopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    top: 5,
  },
  imageStyle: {
    width: '24@s',
    height: '24@s',
  },
  filterTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral800,
  },
  ResetTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
  },
  divider: {
    marginTop: '15@s',
    alignSelf: 'center',
    width: '120%',
  },
  titleStyle: {
    fontWeight: '600',
    color: Colors.Neutral900,
    fontSize: '16@s',
  },
  mainTextStyle: {
    fontWeight: '500',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: Colors.Neutral400,
    paddingHorizontal: '10@s',
    height: '30@s',
    borderRadius: '60@s',
  },
  selectText: {
    fontWeight: '400',
    color: Colors.Neutral600,
    fontSize: '14@s',
    marginTop: '10@s',
  },
  flatListContainer: {
    gap: '13@s',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '15@s',
  },
  buttonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
  },
  ButtonStyle: {
    height: '50@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5@s',
    position: 'absolute',
    bottom: '15@s',
    width: '94%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#F9FAFB',
    height: '300@s',
    elevation: 5,
    borderRadius: '5@s',
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
