import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  View,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import CreateNewQuickadTitle from '../../../components/nonAuth/QuickAds/CreateNewQuickadTitle';
import CreateNewQuickAdModel from '../../../components/nonAuth/QuickAds/CreateNewQuickAdModel';
import CreateNewPlatformModel from '../../../components/nonAuth/QuickAds/CreateNewPlatformModel';
import CreateNewDateTimeModel from '../../../components/nonAuth/QuickAds/CreateNewDateTimeModel';
import CreateNewTheVibeModel from '../../../components/nonAuth/QuickAds/CreateNewTheVibeModel';
import CreateNewTargetAudienceModel from '../../../components/nonAuth/QuickAds/CreateNewTargetAudienceModel';
import CreateNewPaymentModel from '../../../components/nonAuth/QuickAds/CreateNewPaymentModel';
import {deleteJobAction} from '../../../redux/actions/deleteJobAction';
import {useDispatch, useSelector} from 'react-redux';
import AboutProfileCardSec from '../../../components/nonAuth/profile/AboutProfileCardSec';
// import moment from 'moment';
import {Country, City, State} from 'country-state-city';
import moment from 'moment-timezone';

// images
import tiktok from '../../../assets/images/tiktok.png';
import youtube from '../../../assets/images/youtube.png';
import instagram from '../../../assets/images/instagram.png';
import twitch from '../../../assets/images/twitch.png';
import twitter from '../../../assets/images/twitter.png';
import snapchat from '../../../assets/images/snapchat.png';
import linkedin from '../../../assets/images/linkedin.png';
import facebook from '../../../assets/images/facebook.png';
import {ActivityIndicator} from 'react-native';
import {depositFundsAction} from '../../../redux/actions/depositFundsAction';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';

const CreateNewScreen = ({navigation, route}) => {
  const disclosureNoticeData = route?.params?.disclosureNoticeData || {};
  // console.log('disclosureNoticeData=======', disclosureNoticeData);
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer.user?.data?.token);
  const userid = useSelector(state => state.loginReducer.user?.data?.data?._id);

  const {_id, profile_name, email, profile_picture, user_role} =
    useSelector(state => state.loginReducer.user?.data?.data) || {};

  const profileLanguage = useSelector(
    state => state.loginReducer.user?.data?.data?.language[0],
  );
  const profileCountry = useSelector(
    state => state.loginReducer.user?.data?.data?.country,
  );

  const profileData = {
    _id,
    profile_name,
    email,
    profile_picture,
    profileLanguage,
    profileCountry,
    user_role,
  };

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [vibeType, setVibeType] = useState('');
  const [language, setLanguage] = useState([]);
  const [mood, setMood] = useState('Any');
  const [swear, setSwear] = useState('');
  const [quickTitle, setQuickTitle] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [ageLimit, setAgeLimit] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');
  const [imagesLink, setImagesLink] = useState([]);
  const [videosLink, setVideosLink] = useState([]);
  const [audiosLink, setAudiosLink] = useState([]);
  const [contentRight, setContentRight] = useState('');
  const [number, setNumber] = useState('');
  const [influencer, setInfluencer] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(
    moment().format('h:mm A').toUpperCase(),
  );
  const [value2, setValue2] = useState(null);
  const [price, setPrice] = useState('');
  const [totelPrice, setTotelPrice] = useState(null);
  const [currency, setCurrency] = useState('USD - United states dollar');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState([]);
  const [targetAge, setTargetAge] = useState([]);
  const [country, setCountry] = useState('Country');
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [userRightsText, setUserRightsText] = useState('');

  const [selectedAge, setSelectedAge] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [timezone, setTimezone] = useState([
    {label: 'Pacific Standard Time', value: 'America/Los_Angeles'},
    {label: 'Greenwich Meantime', value: 'Europe/London'},
    {label: 'British Standard Time', value: 'Europe/London'},
    {label: 'Indian Standard Time', value: 'Asia/Kolkata'},
    {label: 'Bangladesh Standard Time', value: 'Asia/Dhaka'},
  ]);
  const [items, setItems] = useState([
    {label: 'AM', value: 'AM'},
    {label: 'PM', value: 'PM'},
  ]);
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [value1, setValue1] = useState(null);

  // ****************** convert time into UTC start
  const timeWithPeriod = `${selectedTime} ${value2}`;
  const dateTimeString = `${selectedDate} ${timeWithPeriod}`;

  const utcDateTime = moment
    .tz(dateTimeString, 'dddd, DD MMMM YYYY hh:mm A', value1)
    .utc();

  // ****************** convert time into UTC end

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Create New QuickAd', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.navigate('MainScreen')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const socialData = [
    {
      id: 1,
      name: 'TikTok',
      image: tiktok,
      subName: [' Video ', ' Live Stream ', ' Story '],
    },
    {
      id: 2,
      name: 'Youtube',
      image: youtube,
      subName: [' Video', ' Live Stream', ' Shorts'],
    },
    {
      id: 3,
      name: 'Instagram',
      image: instagram,
      subName: [' Post', ' Story', ' Reels', ' Live Streams  '],
    },
    {id: 4, name: 'Twitch', image: twitch, subName: [' Live Stream  ']},
    {
      id: 5,
      name: 'X (Formerly Twitter)',
      image: twitter,
      subName: [' Tweet', ' Spaces'],
    },
    {id: 6, name: 'Snapchat', image: snapchat, subName: [' Story  ']},
    {id: 7, name: 'Linkedin', image: linkedin, subName: [' Post ']},
    {
      id: 8,
      name: 'Facebook',
      image: facebook,
      subName: [' Post  ', ' Story   ', ' Live Video'],
    },
  ];

  const formatSelectedPlatform = selectedPlatform => {
    const formattedPlatform = [];

    selectedPlatform?.forEach(item => {
      const isPlatform = socialData?.some(platform => platform?.name === item);

      if (isPlatform) {
        formattedPlatform?.push({platform_name: item, service_name: []});
      } else if (formattedPlatform?.length > 0) {
        formattedPlatform[formattedPlatform.length - 1].service_name?.push(
          item?.trim(),
        );
      }
    });

    return formattedPlatform;
  };

  const formattedPlatform = formatSelectedPlatform(selectedPlatform);

  // const formatSelectedPlatform = selectedPlatform => {
  //   const formattedPlatform = [];

  //   selectedPlatform?.forEach(item => {
  //     const isPlatform = socialData?.some(platform => platform?.name === item);

  //     if (isPlatform) {
  //       formattedPlatform.push({platform_name: item, service_name: ''}); // Initialize service_name as a string
  //     } else if (formattedPlatform?.length > 0) {
  //       // Append the service name as a single string, separated by commas if needed
  //       const lastPlatform = formattedPlatform[formattedPlatform.length - 1];
  //       lastPlatform.service_name = lastPlatform.service_name
  //         ? `${lastPlatform.service_name}, ${item.trim()}`
  //         : item.trim();
  //     }
  //   });

  //   return formattedPlatform;
  // };

  // const formattedPlatform = formatSelectedPlatform(selectedPlatform);

  const handleDeleteJob = () => {
    const deleteJob = {
      user_id: userid,
      AdsId: AdsId,
    };
    dispatch(deleteJobAction(deleteJob)).then(res => {
      console.log(res);
      Alert.alert(`Ad ${AdsId} Deleted Successfully`);
    });
  };
  const loading = useSelector(state => state.createJobReducer.loading);

  // const depositFundesState = {
  //   quick_ads_title: quickTitle,
  //   // thumbnail_picture_ads: thumbnailImage,
  //   set_age_for_applicants: ageLimit,
  //   category: selectedCategories,
  //   // descriptionQuick: about,
  //   bio: about,
  //   website_link: website,
  //   images: imagesLink,
  //   video: videosLink,
  //   audio: audiosLink,
  //   content_right: contentRight,
  //   // followers_number: number,
  //   // followers_number: influencer,
  //   apply_limit: influencer,
  //   platform: formattedPlatform,
  //   minimum_number_follower_influencer_each: number,
  //   task_start_date: selectedDate,
  //   // task_complete_date: null, // add end quick job date
  //   time: selectedTime,
  //   language: language,
  //   mood: mood,
  //   swearing: swear,
  //   country: country,
  //   state: state,
  //   city: city,
  //   target: targetAge,
  //   // target: country,
  //   // target: selectedCountry,
  //   pay_offered: totelPrice,
  //   particularPrice: price,
  //   currency: currency,
  //   token: token,
  //   user_id: userid,
  //   customUserRights: userRightsText,
  // };

  const resetStateObject = {
    setQuickTitle: setQuickTitle,
    setThumbnailImage: setThumbnailImage,
    setAgeLimit: setAgeLimit,
    setSelectedCategories: setSelectedCategories,
    setAbout: setAbout,
    setWebsite: setWebsite,
    setImagesLink: setImagesLink,
    setVideosLink: setVideosLink,
    setAudiosLink: setAudiosLink,
    setContentRight: setContentRight,
    setNumber: setNumber,
    setInfluencer: setInfluencer,
    setSelectedPlatform: setSelectedPlatform,
    setSelectedDate: setSelectedDate,
    setSelectedTime: setSelectedTime,
    setLanguage: setLanguage,
    setMood: setMood,
    setSwear: setSwear,
    setSelectedCity: setSelectedCity,
    setSelectedCountry: setSelectedCountry,
    setSelectedState: setSelectedState,
    setTargetAge: setTargetAge,
    setPrice: setPrice,
    setCurrency: setCurrency,
    setUserRightsText: setUserRightsText,
    setSelectedAge: setSelectedAge,
    setMarkedDates: setMarkedDates,
    setTimezone: setTimezone,
    setItems: setItems,
    setPickerVisibility: setPickerVisibility,
  };

  // const combinedState = {
  //   depositFundesState,
  //   resetStateObject,
  // };

  const fieldFill = {
    quickTitle,
    thumbnailImage,
    ageLimit,
    selectedCategories,
    about,
    website,
    imagesLink,
    // videosLink,
    // audiosLink,
    contentRight,
    influencer,
    formattedPlatform,
    number,
    selectedDate,
    selectedTime,
    language,
    mood,
    swear,
    city,
    country,
    state,
    targetAge,
    price,
    currency,
    // userRightsText,
  };

  const validateFields = (fields, selectedCountry, selectedState) => {
    for (let key in fields) {
      if (!fields[key]) {
        // Skip validation for state if the country has no states
        if (key === 'state') {
          const hasStates =
            State?.getStatesOfCountry(selectedCountry)?.length > 0;
          if (!hasStates) continue;
        }

        // Skip validation for city if the state has no cities
        if (key === 'city') {
          const hasCities =
            City?.getCitiesOfState(selectedCountry, selectedState)?.length > 0;
          if (!hasCities) continue;
        }

        return false;
      }
    }
    return true;
  };

  const handleNextButtonClick = async () => {
    if (validateFields(fieldFill, selectedCountry, selectedState)) {
      const formData = new FormData();
      formData.append('imgUrls', {
        uri: thumbnailImage,
        type: 'image/jpg',
        name: 'image.jpg',
      });

      try {
        const res = await dispatch(imageUploadAction(formData));
        const thumbnail_picture_ads = res?.data?.imgUrls[0];
        if (!thumbnail_picture_ads) {
          throw new Error('Image upload failed');
        }
        const depositFundesState = {
          quick_ads_title: quickTitle,
          thumbnail_picture_ads: thumbnail_picture_ads,
          set_age_for_applicants: ageLimit,
          category: selectedCategories,
          bio: about,
          website_link: website,
          images: imagesLink,
          video: videosLink,
          audio: audiosLink,
          content_right: contentRight,
          apply_limit: influencer,
          platform: formattedPlatform,
          minimum_number_follower_influencer_each: number,
          task_start_date: selectedDate,
          time: selectedTime,
          language: language,
          mood: mood,
          swearing: swear,
          country: country,
          state: state,
          city: city,
          target: targetAge,
          pay_offered: totelPrice,
          particularPrice: price,
          currency: currency,
          token: token,
          user_id: userid,
          customUserRights: userRightsText,
          utcTimeDate: utcDateTime,
          timeZone: value1,
          amPm: value2,
          disclosureNotice: disclosureNoticeData,
        };

        const combinedState = {
          depositFundesState,
          resetStateObject,
        };

        dispatch(depositFundsAction(combinedState));
        // navigation.replace('DepositFundsScreen');
        navigation.navigate('DepositFundsScreen');
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    } else {
      Alert.alert('Validation Error', 'Please fill all required fields');
    }
  };

  const onBackHandler = () => {
    Alert.alert('Create New QuickAd', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => navigation.goBack('')},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <BackArrow goBack={onBackHandler} />
        <SVG.Share />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 40}}>
        <AboutProfileCardSec profileData={profileData} />

        <CreateNewQuickadTitle
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          ageLimit={ageLimit}
          setAgeLimit={setAgeLimit}
          thumbnailImage={thumbnailImage}
          setThumbnailImage={setThumbnailImage}
          quickTitle={quickTitle}
          setQuickTitle={setQuickTitle}
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
        />
        <CreateNewQuickAdModel
          about={about}
          setAbout={setAbout}
          website={website}
          setWebsite={setWebsite}
          imagesLink={imagesLink}
          setImagesLink={setImagesLink}
          videosLink={videosLink}
          setVideosLink={setVideosLink}
          audiosLink={audiosLink}
          setAudiosLink={setAudiosLink}
          contentRight={contentRight}
          setContentRight={setContentRight}
          number={number}
          setNumber={setNumber}
          influencer={influencer}
          setInfluencer={setInfluencer}
          disclosureNoticeData={disclosureNoticeData}
          userRightsText={userRightsText}
          setUserRightsText={setUserRightsText}
        />
        <CreateNewPlatformModel
          influencer={influencer}
          setInfluencer={setInfluencer}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          socialData={socialData}
        />
        <CreateNewDateTimeModel
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
          value1={value1}
          setValue1={setValue1}
        />
        <CreateNewTheVibeModel
          vibeType={vibeType}
          setVibeType={setVibeType}
          language={language}
          setLanguage={setLanguage}
          mood={mood}
          setMood={setMood}
          swear={swear}
          setSwear={setSwear}
        />
        <CreateNewTargetAudienceModel
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          targetAge={targetAge}
          setTargetAge={setTargetAge}
          country={country}
          setCountry={setCountry}
          state={state}
          setState={setState}
          city={city}
          setCity={setCity}
        />
        <CreateNewPaymentModel
          price={price}
          setPrice={setPrice}
          currency={currency}
          setCurrency={setCurrency}
          influencer={influencer}
          totelPrice={totelPrice}
          setTotelPrice={setTotelPrice}
        />

        <View style={styles.buttonTopStyle}></View>
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
              <Text>{AppLocalizedStrings.button.next}</Text>
            )
          }
          onPress={handleNextButtonClick}
        />
        <Text style={styles.allCompleteText}>
          {AppLocalizedStrings.quickAdsHomescreen.complete_all}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNewScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allCompleteText: {
    fontWeight: '400',
    fontSize: '12@s',
    color: Colors.Neutral400,
    textAlign: 'center',
    marginBottom: hp(3.5),
    marginTop: hp(3),
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
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
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },
  buttonTopStyle: {
    marginTop: hp(4),
  },
});
