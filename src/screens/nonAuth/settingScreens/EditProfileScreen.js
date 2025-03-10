import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';
import Colors from '../../../theme/Colors';
import EditProfileImageCard from '../../../components/nonAuth/setting/EditProfileImageCard';
import EditProfileInfoComponent from '../../../components/nonAuth/setting/EditProfileInfoComponent';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import MyVideoCard from '../../../components/nonAuth/profile/MyVideoCard';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import MyCategoryComponent from '../../../components/nonAuth/setting/MyCategoryComponent';
import MyEditMusicScreen from '../../../components/nonAuth/setting/MyEditMusicScreen';
import MyEditVideoScreen from '../../../components/nonAuth/setting/MyEditVideoScreen';
import {profileBuildApiAction} from '../../../redux/actions/profileBuildApiAction';
import {ActivityIndicator, Text} from 'react-native-paper';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';

const EditProfileScreen = ({navigation}) => {
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token);
  const loading = useSelector(state => state.profileBuildApiReducer.loading);

  const {
    category,
    Subcategory,
    gender,
    _id,
    tag,
    state,
    country,
    bio,
    city,
    language,
  } =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  // const languagesArray = language?.map(item => item.language);
  // const dialectsArray = language?.map(item => item.dialect);

  const languagesArray = language?.map(item => item.language) || [];
  const dialectsArray = language?.map(item => item.dialect) || [];

  const [formData, setFormData] = useState({
    language: languagesArray || [],
    dialect: dialectsArray || [],
    country: country || '',
    state: state || '',
    city: city || '',
    bio: bio || '',
    gender: gender || '',
  });

  const initialCategoryFormData = {
    category: category ? category : [],
    subCategory: Subcategory ? Subcategory : [],
    tags: tag ? tag : [],
    categoryData: [],
    subData: [],
    tagsData: [],
    limitMessage: false,
  };

  const [categoryFormData, setCategoryFormData] = useState(
    initialCategoryFormData,
  );

  const handleCategoryData = (field, data) => {
    setCategoryFormData(prevState => ({
      ...prevState,
      [field]: data,
    }));
  };

  const handleFormData = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onGoBackHandler = () => {
    navigation.navigate('SettingScreen');
  };
  const onManageHandler = () => {
    navigation.navigate('ManageMusicScreen');
  };
  const onManageVideoHandler = () => {
    navigation.navigate('ManageVideoScreen');
  };

  const handleEditProfile = () => {
    const {bio, city, country, dialect, gender, language, state} = formData;

    const combinedArray = formData?.language?.map((lang, index) => ({
      language: lang,
      dialect: formData?.dialect[index] || '',
    }));

    const data = {
      profileCheck: '',
      bio,
      category: categoryFormData?.category,
      city,
      country,
      gender,
      language: combinedArray,
      state,
      subCategory: categoryFormData?.subCategory,
      tags: categoryFormData?.tags,
      _id,
    };

    const isNonEmpty = value => {
      if (Array?.isArray(value)) {
        return value?.length > 0;
      }
      return value !== undefined && value !== null && value !== '';
    };

    const filteredData = Object.fromEntries(
      Object?.entries(data).filter(([key, value]) => isNonEmpty(value)),
    );

    console.log(filteredData);

    dispatch(profileBuildApiAction(filteredData))
      .then(res => {
        console.log(res?.data, '<<<<<<<Res');
        if (res?.status === 200) {
          navigation.navigate('SettingScreen');
          setFormData({
            language: [],
            dialect: [],
            country: '',
            state: '',
            city: '',
            bio: '',
            gender: '',
          });

          setCategoryFormData({
            category: [],
            subCategory: [],
            tags: [],
            categoryData: [],
            subData: [],
            tagsData: [],
            limitMessage: false,
          });

          const getProfileData = {
            token,
            _id,
          };
          dispatch(getLoggedInUserProfileAction(getProfileData));
        } else {
          Alert.alert('Please try again!');
        }
      })
      .catch(err => {
        console.log(err, '<<<<Err');
      });
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView>
          <EditProfileImageCard onGoBackHandler={onGoBackHandler} />
          <EditProfileInfoComponent
            formData={formData}
            setFormData={setFormData}
            handleFormData={handleFormData}
          />
          <MyCategoryComponent
            categoryFormData={categoryFormData}
            handleCategoryData={handleCategoryData}
          />
          <MyEditMusicScreen seeAll="Manage" manageMusic={onManageHandler} />

          <MyEditVideoScreen
            seeAll="Manage"
            manageVideo={onManageVideoHandler}
          />
          <View style={styles.buttonView}>
            <PrimaryButton
              title={
                loading ? (
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
                  <Text style={{color: Colors.White, textAlign: 'center'}}>
                    {AppLocalizedStrings.button.save}
                  </Text>
                )
              }
              onPress={handleEditProfile}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  buttonView: {
    marginTop: hp(3),
    marginBottom: hp(4),
  },
});
