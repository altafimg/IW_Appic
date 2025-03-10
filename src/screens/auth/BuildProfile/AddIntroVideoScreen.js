import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import BackArrow from '../../../components/buttons/BackArrow';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';

const AddIntroVideoScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer?.token) || {};
  const {_id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  useEffect(() => {
    const data = {
      token,
      _id,
    };
    dispatch(getLoggedInUserProfileAction(data));
  }, []);

  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );

  const {check} = route?.params || '';

  console.log(check);
  ('editIntroVideo');

  const onGoBackHandler = () => {
    navigation.navigate('SignupSuccessScreen');
  };
  const onRecordViewHandler = () => {
    navigation.navigate('VideoRecordScreen', {
      check: check,
    });
  };

  const backHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {check === 'editIntroVideo' ? (
          <BackArrow goBack={backHandler} />
        ) : (
          <Text style={styles.topHeadTitle}>
            {AppLocalizedStrings.profilePictureScreen.step} 4 of 4
          </Text>
        )}

        <Header
          headerTitle={
            check === 'editIntroVideo'
              ? AppLocalizedStrings.addIntroVideoScreen.edit
              : AppLocalizedStrings.addIntroVideoScreen.add
          }
          subTitle={
            'Record an intro video using your device camera which appears on your profile page. '
          }
        />
        <Text style={styles.midelTitle}>
          {AppLocalizedStrings.addIntroVideoScreen.some}
        </Text>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.addIntroVideoScreen.guys}
        </Text>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.addIntroVideoScreen.influencer}
        </Text>
        <Text style={styles.bottomTitle}>
          {AppLocalizedStrings.addIntroVideoScreen.able}
        </Text>
      </ScrollView>
      <PrimaryButton
        title={AppLocalizedStrings.addIntroVideoScreen.recordVideo}
        onPress={onRecordViewHandler}
      />
      {check === 'editIntroVideo' ? (
        ''
      ) : (
        <TouchableOpacity style={styles.bottomButton} onPress={onGoBackHandler}>
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.addIntroVideoScreen.record}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddIntroVideoScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  topHeadTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingBottom: hp(1),
  },
  bottomButton: {
    marginTop: hp(2.3),
  },
  buttonTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
  },
  midelTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingBottom: hp(4),
    paddingTop: hp(-3),
  },
  bottomTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },
});
