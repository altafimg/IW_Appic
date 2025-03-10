import React from 'react';
import {View} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ToContinueScreen = ({navigation, route}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const check = 'edit_profile';
  const navigationHandler = () => {
    navigation.navigate('UploadGovIDScreen', {
      check: check,
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.toContinueScreen.continue}
          subTitle={AppLocalizedStrings.toContinueScreen.follow}
        />
      </View>
      <SVG.PhotoVerification style={styles.image} />
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.toContinueScreen.uploadID}
          onPress={navigationHandler}
        />
      </View>
    </View>
  );
};

export default ToContinueScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  image: {
    alignSelf: 'center',
    marginTop: hp(-10),
  },
});
