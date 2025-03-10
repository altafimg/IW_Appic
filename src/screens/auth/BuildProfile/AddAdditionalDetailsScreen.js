import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Header from '../../../components/Auth/Header';
import CountryStateCityPicker from '../../../components/Auth/CountryStateCityPicker';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {buildProfileDataAction} from '../../../redux/actions/buildProfileDataAction';
import {completeSteps} from '../../../redux/actions/completeStepsAction';

const AddAdditionalDetailsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );

  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
    gender: '',
    language: [],
    dialect: [],
    bio: '',
  });

  const [data, setData] = useState({countryCode: '', stateCode: ''});
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [showState, setShowState] = useState(false);
  const [showCity, setShowCity] = useState(false);

  const handleFormData = (field, value) => {
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  const handleContinue = () => {
    if (isFormIncomplete()) {
      console.log('Please fill in all fields');
      return;
    }

    const combinedArray = formData?.language?.map((lang, index) => ({
      language: lang,
      dialect: formData?.dialect[index] || '',
    }));

    const newFormData = {
      country: formData?.country || '',
      state: formData?.state || '',
      city: formData?.city || '',
      gender: formData?.gender || '',
      bio: formData?.bio || '',
    };

    const updatedData = {
      ...profileBuildingData,
      ...newFormData,
      language: combinedArray,
    };
    console.log(updatedData, '<<<<<<updated data');

    dispatch(buildProfileDataAction(updatedData));
    dispatch(completeSteps(1));
    navigation.navigate('SelectYourCategoryScreen');
  };

  const onGoBackHandler = async () => {
    if (isFormIncomplete()) {
      navigation.navigate('BuildProfileScreen');
    } else {
      const combinedArray = formData?.language?.map((lang, index) => ({
        language: lang,
        dialect: formData?.dialect[index] || '',
      }));

      const newFormData = {
        country: formData?.country || '',
        state: formData?.state || '',
        city: formData?.city || '',
        gender: formData?.gender || '',
        bio: formData?.bio || '',
      };

      const updatedData = {
        ...profileBuildingData,
        ...newFormData,
        language: combinedArray,
      };

      console.log(updatedData, '<<<<<<updated data');
      dispatch(buildProfileDataAction(updatedData));
      dispatch(completeSteps(1));
      navigation.navigate('BuildProfileScreen');
    }
  };

  const isFormIncomplete = () => {
    const {country, state, city, gender, bio} = formData;

    return (
      country.trim() === '' ||
      (stateData.length > 0 && state.trim() === '') ||
      (cityData.length > 0 && city.trim() === '') ||
      gender.trim() === '' ||
      bio.trim() === ''
    );
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.topHeadTitle}>
            {AppLocalizedStrings.profilePictureScreen.step} 2 of 4
          </Text>
          <Header
            headerTitle={AppLocalizedStrings.addAdditionalDetailsScreen.add}
          />
          <CountryStateCityPicker
            formData={formData}
            handleFormData={handleFormData}
            setFormData={setFormData}
            data={data}
            setData={setData}
            countryData={countryData}
            setCountryData={setCountryData}
            stateData={stateData}
            setStateData={setStateData}
            cityData={cityData}
            setCityData={setCityData}
            showState={showState}
            setShowState={setShowState}
            showCity={showCity}
            setShowCity={setShowCity}
          />
          <View style={styles.buttonMainView}>
            <PrimaryButton
              disabled={isFormIncomplete()}
              title={AppLocalizedStrings.button.continue}
              onPress={handleContinue}
            />
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={onGoBackHandler}>
              <Text style={styles.buttonTitle}>
                {AppLocalizedStrings.addAdditionalDetailsScreen.save}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddAdditionalDetailsScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingVertical: hp(3),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  topHeadTitle: {
    color: Colors.Neutral700,
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: hp(1),
  },
  bottomButton: {
    marginTop: hp(2.3),
  },
  buttonTitle: {
    color: Colors.Neutral700,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonMainView: {
    marginTop: hp(3),
  },
});
