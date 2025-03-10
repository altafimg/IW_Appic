import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import WelcomeSwiper from '../../components/Swiper/WelcomeSwiper';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp} from '../../utility/responsive/ScreenResponsive';

const WelcomeScreen = ({navigation}) => {
  const onSignupHandler = () => {
    navigation.navigate('SignupScreen');
  };
  const onLoginHandler = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.container}>
      <WelcomeSwiper />
      <View style={styles.bottom_Wrapper}>
        <View style={styles.content_Container}></View>
      </View>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.welcomeScreen.getStarted}
          onPress={onSignupHandler}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={onLoginHandler}>
          <Text style={styles.AlreadyText}>
            {AppLocalizedStrings.welcomeScreen.account}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Neutral50,
  },
  AlreadyText: {
    fontSize: '14@s',
    color: Colors.Neutral700,
    textAlign: 'center',
    paddingTop: hp(2),
    paddingBottom: hp(3),
  },
  bottom_Wrapper: {
    position: 'absolute',
    bottom: 0,
    height: '300@s',
    width: '100%',
    backgroundColor: Colors.White,
    borderTopLeftRadius: '26@s',
    borderTopRightRadius: '26@s',
    zIndex: -1,
  },
  content_Container: {
    height: '390@s',
    width: '100%',
    backgroundColor: Colors.White,
    borderTopLeftRadius: '26@s',
    borderTopRightRadius: '26@s',
  },
});

export default WelcomeScreen;
