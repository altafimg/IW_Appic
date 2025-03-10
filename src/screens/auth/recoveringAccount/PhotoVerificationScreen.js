import {Text, View} from 'react-native';
import React from 'react';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useSelector} from 'react-redux';

const PhotoVerificationScreen = ({navigation, route}) => {
  const {check} = route.params;

  const editUserData =
    useSelector(state => state.editUserDataStoreReducer.data) || {};

  // console.log(editUserData, '<<<<<<<<<<<<<<<poseVerificationScreen');

  // const recoverAccountData = useSelector(
  //   state => state.recoverAccountDataReducer.data,
  // );
  // console.log(recoverAccountData);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onContinueHandler = () => {
    navigation.navigate('PhotoVerificationCameraScreen', {
      check: check,
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <SVG.PhotoVerification2 style={styles.image} />
        <Text style={styles.headerTitle}>
          {/* {AppLocalizedStrings.photoVerificationScreen.photo} */}
          Selfie Verification
        </Text>
        <Text style={styles.paragraph}>
          {/* {AppLocalizedStrings.photoVerificationScreen.account} */}
          Take two photos copying the poses on the next screens. Only our
          verification team will see them.
        </Text>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.button.continue}
        onPress={onContinueHandler}
      />
    </View>
  );
};

export default PhotoVerificationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: hp(3),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  image: {
    alignSelf: 'center',
    marginTop: hp(10),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '27@s',
    textAlign: 'center',
    marginTop: hp(8),
  },
  paragraph: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    textAlign: 'center',
    marginTop: hp(1),
  },
});
