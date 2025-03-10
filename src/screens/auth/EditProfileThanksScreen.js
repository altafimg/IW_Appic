import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg';

const EditProfileThanksScreen = ({navigation, route}) => {
  const {screenCheck} = route?.params || '';

  const onGotItHandler = () => {
    navigation.navigate('SettingScreen');
  };

  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.Thanks style={styles.image} />
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>
            {screenCheck === 'dob'
              ? AppLocalizedStrings.editProfileThanksScreen.review
              : AppLocalizedStrings.editProfileThanksScreen.thanks}
          </Text>
          <Text style={styles.subTitle}>
            {screenCheck === 'user_verify' || screenCheck === 'manager_verify'
              ? AppLocalizedStrings.editProfileThanksScreen.aimMean
              : AppLocalizedStrings.editProfileThanksScreen.managerReplace ===
                'manager_replace'
              ? AppLocalizedStrings.editProfileThanksScreen.managerReplace
              : AppLocalizedStrings.editProfileThanksScreen.aim}
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={
          screenCheck === 'dob' || screenCheck === 'manager_replace'
            ? AppLocalizedStrings.editProfileThanksScreen.got
            : AppLocalizedStrings.editProfileThanksScreen.back
        }
        onPress={onGotItHandler}
      />
    </View>
  );
};

export default EditProfileThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  image: {
    alignSelf: 'center',
  },
  titleView: {
    marginTop: hp(10),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '27@s',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: hp(1),
  },
});
