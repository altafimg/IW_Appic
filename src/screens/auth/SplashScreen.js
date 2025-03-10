import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {BounceView} from '../../components/BounceView';
import {Country} from 'country-state-city';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguagesAction} from '../../redux/actions/getLanguagesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loginReducer.loggedIn);

  console.log(
    loggedIn,
    '{}}{_+_+?>>?<<><:":":}{{ splace screen login data }}{_+_+?>>?<<><:":":}{{||P_+_()()**',
  );

  useEffect(() => {
    const storeCountriesData = async () => {
      const countryData = await Country.getAllCountries();
      try {
        const jsonValue = JSON.stringify(countryData);
        await AsyncStorage.setItem('allCountriesData', jsonValue);
      } catch (e) {
        // saving error
      }
    };

    storeCountriesData();
  }, [dispatch]);

  useEffect(() => {
    const getLanguagesData = async () => {
      dispatch(getLanguagesAction())
        .then(res => {
          const data = res?.data?.data;
          const jsonValue = JSON.stringify(data);
          AsyncStorage.setItem('allLanguagesData', jsonValue);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getLanguagesData();
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        loggedIn
          ? navigation.replace('NonAuthStack')
          : navigation.replace('AuthStack');
      } catch (error) {
        console.error('Error navigating:', error);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigation, loggedIn]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <BounceView>
        <SVG.Logo width={94} height={78} />
      </BounceView>
    </View>
  );
};

export default SplashScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
});
