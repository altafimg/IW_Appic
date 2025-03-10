import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import RequestToChangeInput from '../../textInput/RequestToChangeInput';
import DetailsTextInput from '../../textInput/DetailsTextInput';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useSelector} from 'react-redux';
import Video from 'react-native-video';
import RequestToChangePopup from '../../popups/RequestToChangePopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {State, City, Country} from 'country-state-city';
import {useNavigation} from '@react-navigation/native';

const EditProfileInfoComponent = ({formData, setFormData, handleFormData}) => {
  const navigation = useNavigation();
  const {
    profile_name,
    gender,
    last_name,
    user_role,
    first_name,
    intro_video,
    bio,
    user_name,
    company_name,
    language, // Keep language as it uses optional chaining and potential mapping
  } =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const languagesArray = language?.map(item => item.language) || [];
  const dialectsArray = language?.map(item => item.dialect) || [];

  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);
  const [userName, setUserName] = useState(false);
  const [companyName, setCompanyName] = useState(false);
  const [reason, setReason] = useState('');
  const [value, setValue] = useState(gender);
  const [isVisible, setIsVisible] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [profileName, setProfileName] = useState(false);

  const [countryData, setCountryData] = useState([]);
  const [data, setData] = useState({countryCode: '', stateCode: ''});

  const [languageList, setLanguageList] = useState([]);
  const [dialectList, setDialectList] = useState([]);
  const [languageDialectData, setLanguageDialectData] = useState([]);

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allCountriesData');
        const parsedData = jsonValue ? JSON.parse(jsonValue) : [];
        setCountryData(parsedData);
      } catch (error) {
        console.error('Error fetching country data from AsyncStorage:', error);
      }
    };

    const fetchLanguagesFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allLanguagesData');
        const parsedData = jsonValue ? JSON.parse(jsonValue) : [];
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
    const countries = Country.getAllCountries()?.map(country => ({
      name: country.name,
      isoCode: country.isoCode,
    }));
    setCountryData(countries);

    if (formData.country) {
      const selectedCountry = countries?.find(c => c.name === formData.country);
      if (selectedCountry) {
        const states = State.getStatesOfCountry(selectedCountry.isoCode)?.map(
          state => ({
            name: state.name,
            isoCode: state.isoCode,
          }),
        );
        setFilteredStateData(states);

        if (formData.state) {
          const selectedState = states?.find(s => s.name === formData.state);
          if (selectedState) {
            const cities = City.getCitiesOfState(
              selectedCountry.isoCode,
              selectedState.isoCode,
            )?.map(city => ({
              name: city.name,
            }));
            setFilteredCityData(cities);
          } else {
            setFilteredCityData([]);
          }
        } else {
          setFilteredCityData([]);
        }

        // Initialize languages and dialects based on the selected country
        const selectedData = languageDialectData?.find(
          data => data.Country === selectedCountry.name,
        );
        if (selectedData) {
          const mainLanguages = selectedData.MainLanguage?.split(', ');
          const languageList = mainLanguages?.map(lang => ({
            label: lang,
            value: lang,
          }));

          setLanguageList(languageList);

          const dialects = selectedData.Dialects?.split(', ');
          const dialectList = dialects?.map(dialect => ({
            label: dialect,
            value: dialect,
          }));

          setDialectList(dialectList);
        } else {
          setLanguageList([]);
          setDialectList([]);
        }
      } else {
        setFilteredStateData([]);
        setFilteredCityData([]);
        setLanguageList([]);
        setDialectList([]);
      }
    } else {
      setFilteredStateData([]);
      setFilteredCityData([]);
      setLanguageList([]);
      setDialectList([]);
    }
  }, [formData.country, formData.state, languageDialectData]);
  const stateData = State.getStatesOfCountry(data?.countryCode);
  const cityData = City.getCitiesOfState(data?.countryCode, data?.stateCode);

  const [filteredStateData, setFilteredStateData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);

  const [paused, setPaused] = useState(true);

  // const [languageComponents, setLanguageComponents] = useState([
  //   {id: 1, language: '', dialect: ''},
  // ]);
  const [languageComponents, setLanguageComponents] = useState(
    languagesArray?.map((lang, index) => ({
      id: index + 1,
      language: lang,
      dialect: dialectsArray[index],
    })),
  );

  const handleData = (field, value) => {
    setData(prevData => ({...prevData, [field]: value}));
  };

  const handlePause = () => {
    setPaused(prevPaused => !prevPaused);
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

  const handleCountryChange = item => {
    const selectedCountry = countryData?.find(
      country => country.name === item.value,
    );
    if (selectedCountry) {
      handleFormData('country', selectedCountry.name);
      handleFormData('state', '');
      handleFormData('city', '');
      handleData('countryCode', selectedCountry.isoCode);

      const selectedData = languageDialectData?.find(
        data => data.Country === selectedCountry.name,
      );

      if (selectedData) {
        const mainLanguages = selectedData.MainLanguage?.split(', ');
        const languageList = mainLanguages?.map(lang => ({
          label: lang,
          value: lang,
        }));

        setLanguageList(languageList);
        setDialectList([]);
      } else {
        setLanguageList([]);
        setDialectList([]);
      }
    } else {
      console.error('Selected country not found:', item.value);
      setLanguageList([]);
      setDialectList([]);
    }
  };

  // const handleCountryChange = item => {
  //   const country = countryData.find(country => country?.name === item?.value);
  //   if (country) {
  //     const selectedCountry = countryData.find(
  //       c => c.isoCode === country.isoCode,
  //     );

  //     if (selectedCountry) {
  //       const selectedData = languageDialectData?.find(
  //         data => data?.Country === selectedCountry.name,
  //       );
  //       handleData('countryCode', country.isoCode);
  //       handleFormData('country', country.name);
  //       if (selectedData) {
  //         const mainLanguages = selectedData.MainLanguage?.split(', ');
  //         const languageList = mainLanguages?.map(lang => ({
  //           label: lang,
  //           value: lang,
  //         }));

  //         setLanguageList(languageList || []);
  //         setDialectList([]);

  //         handleData('countryCode', country.isoCode);
  //         handleFormData('country', country.name);
  //       } else {
  //         setLanguageList([]);
  //         setDialectList([]);
  //       }
  //     }
  //   } else {
  //     console.error('Selected country not found:', item.value);
  //   }
  // };

  const handleStateChange = item => {
    const selectedState = filteredStateData?.find(
      state => state.name === item.value,
    );
    if (selectedState) {
      handleFormData('state', selectedState.name);
      handleData('stateCode', selectedState.isoCode);
      handleFormData('city', ''); // Reset city when state changes
    }
  };

  const onRequestHandler = type => {
    let currentData;
    switch (type) {
      case 'firstName':
        currentData = {
          current: first_name,
          new: '',
          type: 'first_name',
          title: 'First Name',
        };
        setFirstName(!firstName);
        break;
      case 'lastName':
        currentData = {
          current: last_name,
          new: '',
          type: 'last_name',
          title: 'Last Name',
        };
        setLastName(!lastName);
        break;
      case 'userName':
        currentData = {
          current: user_name,
          new: '',
          type: 'user_name',
          title: 'User Name',
        };
        setUserName(!userName);
        break;
      case 'companyName':
        currentData = {
          current: company_name,
          new: '',
          type: 'company_name',
          title: 'Company Name',
        };
        setCompanyName(!companyName);
        break;
      case 'profileName':
        currentData = {
          current: profile_name,
          new: '',
          type: 'profile_name',
          title: 'Profile Name',
        };
        setProfileName(!profileName);
        break;
      default:
        return;
    }
    setRequestData(currentData);
    setIsVisible(!isVisible);
  };

  const genderData = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Others', value: 'Others'},
  ];

  const handleLanguageChange = (index, language) => {
    const newLanguageComponents = [...languageComponents];
    newLanguageComponents[index].language = language.value;
    setLanguageComponents(newLanguageComponents);

    const newData = [...formData.language];
    newData[index] = language.value;
    handleFormData('language', newData);

    const selectedData = languageDialectData?.find(
      data => data.Country === formData.country,
    );
    if (selectedData) {
      const dialects = selectedData.Dialects?.split(', ');
      const dialectList = dialects?.map(dialect => ({
        label: dialect,
        value: dialect,
      }));
      setDialectList(dialectList);
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

  const editIntroVideo = () => {
    const check = 'editIntroVideo';
    navigation.navigate('AddIntroVideoScreen', {
      check: check,
    });
  };

  return (
    <View style={styles.container}>
      {intro_video ? (
        <View>
          <View style={styles.introVideoView}>
            <Text style={styles.introVideoTitle}>
              {AppLocalizedStrings.editProfileScreen.introVideo}
            </Text>
            <SVG.EditIcon onPress={editIntroVideo} />
          </View>
          <Video
            source={{uri: intro_video}}
            style={styles.backgroundVideo}
            paused={paused}
            resizeMode="cover"
            repeat={true}
          />
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            {paused ? (
              <SVG.PlayCircle />
            ) : (
              <View
                style={{
                  backgroundColor: 'transparent',
                  height: 30,
                  width: 30,
                  borderRadius: 25,
                }}></View>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}

      <View>
        {user_role === 'government' || user_role === 'business' ? (
          <RequestToChangeInput
            title={
              user_role === 'business'
                ? AppLocalizedStrings.editProfileScreen.companyName
                : AppLocalizedStrings.editProfileScreen.govtOrganization
            }
            editable={false}
            onRequestFirstHandler={() => onRequestHandler('companyName')}
            placeholder={company_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          />
        ) : (
          <>
            <RequestToChangeInput
              title={AppLocalizedStrings.editProfileScreen.firstName}
              editable={false}
              onRequestFirstHandler={() => onRequestHandler('firstName')}
              placeholder={first_name
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            />

            <RequestToChangeInput
              title={AppLocalizedStrings.editProfileScreen.lastName}
              editable={false}
              onRequestFirstHandler={() => onRequestHandler('lastName')}
              placeholder={last_name
                ?.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            />
          </>
        )}

        <RequestToChangeInput
          title={AppLocalizedStrings.editProfileScreen.username}
          editable={false}
          onRequestFirstHandler={() => onRequestHandler('userName')}
          placeholder={'@' + user_name}
        />
        <RequestToChangeInput
          title={AppLocalizedStrings.editProfileScreen.profileName}
          editable={false}
          onRequestFirstHandler={() => onRequestHandler('profileName')}
          placeholder={profile_name
            ?.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        />
        <View>
          <Text style={styles.textInputTitle}>
            {AppLocalizedStrings.editProfileScreen.bio}
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={300}
            placeholder={bio}
            value={formData.bio}
            style={styles.textInputView}
            onChangeText={e => {
              handleFormData('bio', e);
            }}
          />
        </View>
        <View style={styles.relationView}>
          <Text style={styles.textInputTitle}>
            {AppLocalizedStrings.editProfileScreen.gender}
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={genderData}
            // disable={
            //   user_role === 'government' || user_role === 'business'
            //     ? false
            //     : true
            // }
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={formData.gender}
            onChange={item => {
              setValue(item.value);
              handleFormData('gender', item.value);
            }}
          />
        </View>
        {/* <DetailsTextInput
          title={AppLocalizedStrings.editProfileScreen.basedIn}
          editable={true}
          placeholder={country}
        /> */}

        {/* ----------------------------country data start --------------------------------- */}

        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.editProfileScreen.basedIn}
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
          placeholder={formData.country || 'Select Country'}
          value={formData.country}
          onChange={handleCountryChange}
        />
        {/* ----------------------------country data end --------------------------------- */}

        {/* ----------------------------state data start --------------------------------- */}

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
            data={filteredStateData?.map(item => ({
              label: item.name,
              value: item.name,
            }))}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={formData.state || 'Select State'}
            value={formData.state}
            onChange={handleStateChange}
          />
        </View>

        {/* ----------------------------state data end --------------------------------- */}

        {/* ----------------------------city data start --------------------------------- */}

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
            data={filteredCityData?.map(item => ({
              label: item.name,
              value: item.name,
            }))}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={formData.city || 'Select City'}
            value={formData.city}
            onChange={item => handleFormData('city', item.value)}
          />
        </View>

        {/* ----------------------------city data end --------------------------------- */}

        {/* <DetailsTextInput
          title={AppLocalizedStrings.editProfileScreen.city}
          placeholder={city}
          editable={true}
        /> */}
        {/* <DetailsTextInput
          title={AppLocalizedStrings.editProfileScreen.languagesFluently}
          placeholder=" "
          editable={true}
        /> */}

        {/* ------------------------------ languages and dialects start ----------------------------------- */}
        <View>
          {languageComponents?.map((component, index) => (
            <View
              key={component.id}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View style={{width: '45%'}}>
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

                <View style={{width: '45%', marginLeft: 16}}>
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
                    disabled={!component.language} // Disable if no language selected
                  />
                </View>
              </View>
              {index > 0 && (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10%',
                  }}
                  onPress={() => handleDelete(component.id)}>
                  <SVG.VectorCross height={17} width={17} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={handleAdd}>
            <Text style={{color: '#1DA1F2', fontSize: 13}}>
              {AppLocalizedStrings.addAdditionalDetailsScreen.addLanguage}
            </Text>
          </TouchableOpacity>
        </View>
        {/* ------------------------------ languages and dialects end ----------------------------------- */}

        {isVisible ? (
          <RequestToChangePopup
            isVisible={isVisible}
            onRequestClose={() => {
              setIsVisible(false);
              setReason('');
            }}
            reason={reason}
            setReason={setReason}
            requestData={requestData}
          />
        ) : null}
      </View>
    </View>
  );
};

export default EditProfileInfoComponent;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: wp(3),
  },
  introVideoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
  },
  introVideoTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },

  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
    marginTop: hp(2),
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
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(2),
    textAlignVertical: 'top',
    height: '150@s',
  },
  introVideo: {
    width: '100%',
    borderRadius: 15,
    height: 150,
    resizeMode: 'contain',
  },
  backgroundVideo: {
    width: '100%',
    height: 180,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  pauseButton: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    borderRadius: 25,
  },
});

// import React, {useState} from 'react';
// import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import {Dropdown} from 'react-native-element-dropdown';
// import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
// import SVG from '../../../assets/svg';
// import Colors from '../../../theme/Colors';
// import RequestToChangeInput from '../../textInput/RequestToChangeInput';
// import DetailsTextInput from '../../textInput/DetailsTextInput';
// import {AppLocalizedStrings} from '../../../localization/Localization';
// import {useSelector} from 'react-redux';
// import Video from 'react-native-video';
// import RequestToChangePopup from '../../popups/RequestToChangePopup';

// const EditProfileInfoComponent = () => {
//   const {
//     profile_name,
//     category,
//     Subcategory,
//     dob,
//     gender,
//     is_eighteen,
//     language,
//     last_name,
//     my_images,
//     my_music,
//     my_video,
//     reviews,
//     user_role,
//     email,
//     email_verify,
//     first_name,
//     _id,
//     tag,
//     state,
//     profile_picture,
//     intro_video,
//     country,
//     bio,
//     city,
//     user_name,
//     company_name,
//   } = useSelector(state => state.getUserProfileReducer.data?.data?.data);

//   const [firstName, setFirstName] = useState(false);
//   const [lastName, setLastName] = useState(false);
//   const [userName, setUserName] = useState(false);
//   const [companyName, setCompanyName] = useState(false);
//   const [reason, setReason] = useState('');
//   const [value, setValue] = useState(gender);
//   const [isVisible, setIsVisible] = useState(false);
//   const [requestData, setRequestData] = useState({});
//   const [profileName, setProfileName] = useState(false);
//   const [dialectList, setDialectList] = useState([]);
//   const [storeName, setStoreName] = useState('');
//   const [paused, setPaused] = useState(true);
//   const [languageComponents, setLanguageComponents] = useState([
//     {id: 1, language: '', dialect: ''},
//   ]);
//   const [formData, setFormData] = useState({
//     language: [],
//     dialect: [],
//   });

//   const handleFormData = (field, value) => {
//     setFormData(prevData => ({...prevData, [field]: value}));
//   };

//   const handlePause = () => {
//     setPaused(prevPaused => !prevPaused);
//   };

//   const handleAdd = () => {
//     setLanguageComponents([
//       ...languageComponents,
//       {id: languageComponents.length + 1, language: '', dialect: ''},
//     ]);
//   };

//   const handleDelete = id => {
//     const newLanguageComponents = languageComponents.filter(
//       component => component.id !== id,
//     );
//     setLanguageComponents(newLanguageComponents);

//     const newLanguageData = formData.language.filter(
//       (_, index) => index !== id - 1,
//     );
//     const newDialectData = formData.dialect.filter(
//       (_, index) => index !== id - 1,
//     );

//     handleFormData('language', newLanguageData);
//     handleFormData('dialect', newDialectData);
//   };

//   const onRequestHandler = type => {
//     let currentData;
//     switch (type) {
//       case 'firstName':
//         currentData = {current: first_name, new: '', type: 'First Name'};
//         setFirstName(!firstName);
//         break;
//       case 'lastName':
//         currentData = {current: last_name, new: '', type: 'Last Name'};
//         setLastName(!lastName);
//         break;
//       case 'userName':
//         currentData = {current: '@' + user_name, new: '', type: 'Username'};
//         setUserName(!userName);
//         break;
//       case 'companyName':
//         currentData = {current: company_name, new: '', type: 'Company Name'};
//         setCompanyName(!companyName);
//         break;
//       case 'profileName':
//         currentData = {current: profile_name, new: '', type: 'Profile Name'};
//         setProfileName(!profileName);
//         break;
//       default:
//         return;
//     }
//     setRequestData(currentData);
//     setIsVisible(!isVisible);
//   };

//   const genderData = [
//     {label: 'Male', value: 'Male'},
//     {label: 'Female', value: 'Female'},
//     {label: 'Others', value: 'Others'},
//   ];

//   const languageList = [
//     {
//       _id: '660ba6b8927f8ffc9e093ab5',
//       Continent: 'Asia',
//       Country: 'Armenia',
//       MainLanguage: 'Armenian',
//       Dialects: 'Eastern Armenian, Western Armenian',
//       SecondaryLanguage: 'Russian, Kurdish, Assyrian, Azeri',
//     },
//     {
//       _id: '660ba6b8927f8ffc9e093ab6',
//       Continent: 'Asia',
//       Country: 'Azerbaijan',
//       MainLanguage: 'Azerbaijani',
//       Dialects: 'Baku, Ganja, Nakhchivan',
//       SecondaryLanguage: 'Lezgian, Talysh, Georgian, Armenian',
//     },
//     {
//       _id: '660ba6b8927f8ffc9e093abb',
//       Continent: 'Asia',
//       Country: 'Cambodia',
//       MainLanguage: 'Khmer',
//       Dialects: 'Standard Khmer',
//       SecondaryLanguage: 'Vietnamese, Cham, Teochew, Yue Chinese',
//     },
//     {
//       _id: '660ba6b8927f8ffc9e093abc',
//       Continent: 'Asia',
//       Country: 'China',
//       MainLanguage: 'Mandarin',
//       Dialects: 'Beijing Mandarin, Cantonese, Min, Wu, Hakka, Gan, Xiang',
//       SecondaryLanguage: 'Tibetan, Uyghur, Mongolian, Zhuang',
//     },
//     {
//       _id: '660ba6b8927f8ffc9e093abd',
//       Continent: 'Asia',
//       Country: 'Cyprus',
//       MainLanguage: 'Greek, Turkish',
//       Dialects: 'Cypriot Greek, Cypriot Turkish',
//       SecondaryLanguage: 'English',
//     },
//   ];

//   const handleLanguageChange = () => {};

//   return (
//     <View style={styles.container}>
//       {intro_video ? (
//         <View>
//           <View style={styles.introVideoView}>
//             <Text style={styles.introVideoTitle}>
//               {AppLocalizedStrings.editProfileScreen.introVideo}
//             </Text>
//             <SVG.EditIcon />
//           </View>
//           <Video
//             source={{uri: intro_video}}
//             style={styles.backgroundVideo}
//             paused={paused}
//             resizeMode="cover"
//             repeat={true}
//           />
//           <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
//             {paused ? (
//               <SVG.PlayCircle />
//             ) : (
//               <View
//                 style={{
//                   backgroundColor: 'transparent',
//                   height: 30,
//                   width: 30,
//                   borderRadius: 25,
//                 }}></View>
//             )}
//           </TouchableOpacity>
//         </View>
//       ) : (
//         ''
//       )}

//       <View>
//         {user_role === 'government' || user_role === 'business' ? (
//           <RequestToChangeInput
//             title={
//               user_role === 'business'
//                 ? AppLocalizedStrings.editProfileScreen.companyName
//                 : AppLocalizedStrings.editProfileScreen.govtOrganization
//             }
//             editable={false}
//             onRequestFirstHandler={() => onRequestHandler('companyName')}
//             placeholder={company_name
//               ?.split(' ')
//               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//               .join(' ')}
//           />
//         ) : (
//           <>
//             <RequestToChangeInput
//               title={AppLocalizedStrings.editProfileScreen.firstName}
//               editable={false}
//               onRequestFirstHandler={() => onRequestHandler('firstName')}
//               placeholder={first_name
//                 ?.split(' ')
//                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(' ')}
//             />

//             <RequestToChangeInput
//               title={AppLocalizedStrings.editProfileScreen.lastName}
//               editable={false}
//               onRequestFirstHandler={() => onRequestHandler('lastName')}
//               placeholder={last_name
//                 ?.split(' ')
//                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(' ')}
//             />
//           </>
//         )}

//         <RequestToChangeInput
//           title={AppLocalizedStrings.editProfileScreen.username}
//           editable={false}
//           onRequestFirstHandler={() => onRequestHandler('userName')}
//           placeholder={'@' + user_name}
//         />
//         <RequestToChangeInput
//           title={AppLocalizedStrings.editProfileScreen.profileName}
//           editable={false}
//           onRequestFirstHandler={() => onRequestHandler('profileName')}
//           placeholder={profile_name
//             ?.split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ')}
//         />
//       </View>
//       <RequestToChangePopup
//         requestData={requestData}
//         reason={reason}
//         setReason={setReason}
//         isVisible={isVisible}
//         setIsVisible={setIsVisible}
//       />
//     </View>
//   );
// };

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     // paddingHorizontal: 10,
//   },
//   title: {
//     fontSize: '16@ms',
//     color: Colors.black,
//     marginBottom: hp(0.7),
//   },
//   profileNameTitle: {
//     fontSize: '16@ms',
//     color: Colors.black,
//     fontFamily: 'bold',
//     marginBottom: hp(0.7),
//   },
//   profileNameInput: {
//     borderWidth: 1,
//     borderColor: Colors.borderGray,
//     borderRadius: 5,
//     paddingVertical: hp(1.2),
//     paddingHorizontal: wp(3),
//   },
//   item: {
//     paddingVertical: hp(1),
//     paddingHorizontal: wp(2),
//   },
//   itemText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   introVideoView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: wp(5),
//     marginVertical: hp(2),
//   },
//   introVideoTitle: {
//     fontSize: 16,
//     color: Colors.black,
//     fontFamily: 'bold',
//   },
//   backgroundVideo: {
//     height: 220,
//     width: '100%',
//   },
//   pauseButton: {
//     position: 'absolute',
//     top: '45%',
//     left: '45%',
//   },
// });

// export default EditProfileInfoComponent;
