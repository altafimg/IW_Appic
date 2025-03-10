import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  LogBox,
  Alert,
  BackHandler,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

//components
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import MainHeader from '../../../components/nonAuth/QuickAds/MainHeader';
import AvailableQuickAdsComponent from '../../../components/nonAuth/EnterApp/AvailableQuickAdsComponent';
import MyQuickAdsComponent from '../../../components/nonAuth/EnterApp/MyQuickAdsComponent';
import {availableQuickAdsAction} from '../../../redux/actions/availableQuickAdsAction';

// import Image
import profile from '../../../assets/images/profile.png';
import {useIsFocused} from '@react-navigation/native';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const token = useSelector(state => state.loginReducer?.token);
  const userType = useSelector(
    state => state.loginReducer?.user?.data?.data?.user_role,
  );
  const loading = useSelector(state => state.availableQuickAdsReducer.loading);

  const userData = useSelector(
    state => state.availableQuickAdsReducer.data?.data?.data,
  );

  console.log(userData, 'userData::::');

  const [selectedButton, setSelectedButton] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onMassageHandler = () => {
    navigation.navigate('MessageScreen');
  };
  const onViewProfileHandler = () => {
    navigation.navigate('SettingScreen');
  };

  const onQuickAdsHandler = () => {
    const data = {
      token,
      check: 'MainScreen',
    };
    dispatch(availableQuickAdsAction(data));
  };

  useEffect(() => {
    if (isFocused) {
      onQuickAdsHandler();
    }
  }, [isFocused, dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    onQuickAdsHandler();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // const HandleButtonClick = () => {
  //   if (selectedButton === 0) {
  //     return (
  //       <AvailableQuickAdsComponent
  //         selectedButton={selectedButton}
  //         setSelectedButton={setSelectedButton}
  //         userData={userData}
  //       />
  //     );
  //   } else {
  //     return (
  //       <MyQuickAdsComponent
  //         selectedButton={selectedButton}
  //         setSelectedButton={setSelectedButton}
  //       />
  //     );
  //   }
  // };

  const HandleButtonClick = () => {
    if (userType == 'influencer' || userType == 'kid_influencer') {
      if (selectedButton === 0) {
        return (
          <AvailableQuickAdsComponent
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            userData={userData}
            loading={loading}
          />
        );
      } else {
        return (
          <MyQuickAdsComponent
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        );
      }
    } else
      return (
        <MyQuickAdsComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      );
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.Primary500]}
            tintColor={Colors.Primary500}
          />
        }>
        <MainHeader
          onPress={onViewProfileHandler}
          onPress1={onMassageHandler}
          image1={profile}
          title={AppLocalizedStrings.quickAdsHomescreen.QuickAds}
        />
        <HandleButtonClick />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
