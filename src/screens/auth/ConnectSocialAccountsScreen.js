import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import BackArrow from '../../components/buttons/BackArrow';
import Header from '../../components/Auth/Header';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import SocilAccountCard from '../../components/Auth/SocilAccountCard';
import {profileBuildApiAction} from '../../redux/actions/profileBuildApiAction';
import {useDispatch, useSelector} from 'react-redux';
import {buildProfileDataRemoveAction} from '../../redux/actions/buildProfileDataAction';
import {resetSteps} from '../../redux/actions/completeStepsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mobileNumberDataRemoveAction} from '../../redux/actions/mobileNumberStoreAction';
import {editUserDataRemoveAction} from '../../redux/actions/editUserDataStoreAction';
import {recoverAccountDataRemoveAction} from '../../redux/actions/recoverAccountDataAction';
import {replaceAccountManagerDataRemoveAction} from '../../redux/actions/replaceAccountManagerDataStoreAction';
import NewHeader from '../../components/NewHeader';

const ConnectSocialAccountsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );

  const numberAsString =
    useSelector(state => state.mobileNumberDataReducer.data) || {};

  const phone_number = numberAsString?.toString();

  const _id = useSelector(state => state.signUpReducer?.data?.data?._id);
  const profileCheck = 'profileBuild';

  const onGoBackHandler = () => {
    navigation.goBack();
  };

  const clearSpecificFields = async () => {
    try {
      await AsyncStorage.removeItem('savedFormData');
      await AsyncStorage.removeItem('savedLanguageComponents');
      await AsyncStorage.removeItem('savedLanguagesData');
      await AsyncStorage.removeItem('savedDialectsData');
      await AsyncStorage.removeItem('savedMusicItems');
      await AsyncStorage.removeItem('savedVideoUploadItems');
      await AsyncStorage.removeItem('savedVideoUrlItems');
      console.log('Specific fields cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing specific fields from AsyncStorage:', error);
    }
  };

  const handleSubmit = () => {
    const data = {...profileBuildingData, _id, profileCheck, phone_number};
    console.log(data, '<<<<<<<<Data');
    dispatch(profileBuildApiAction(data))
      .then(res => {
        console.log(res, '<<<<<<<<<<<<res');

        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });

        dispatch(buildProfileDataRemoveAction());
        dispatch(mobileNumberDataRemoveAction());
        dispatch(editUserDataRemoveAction());
        dispatch(recoverAccountDataRemoveAction());
        dispatch(replaceAccountManagerDataRemoveAction());
        dispatch(resetSteps());
        clearSpecificFields();
      })
      .catch(err => {
        console.log(err, 'error ::::::');
      });
  };

  const onSkipHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewHeader
          headerTitle={AppLocalizedStrings.connectSocialAccountsScreen.connect}
          onPress={onGoBackHandler}
        />
        <Text style={styles.headerSubTitle}>
          {AppLocalizedStrings.connectSocialAccountsScreen.showcase}
        </Text>
        <SocilAccountCard />
        <View style={styles.bottomView}>
          <PrimaryButton
            title={AppLocalizedStrings.connectSocialAccountsScreen.continue}
            onPress={handleSubmit}
          />
          <TouchableOpacity onPress={onSkipHandler}>
            <Text style={styles.skipTitle}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConnectSocialAccountsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  accountButton: {
    alignSelf: 'center',
    marginBottom: hp(2),
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  bottomView: {
    marginTop: hp(7),
  },
  headerSubTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(0.5),
    marginBottom: hp(5),
    lineHeight: 20,
    marginTop: '20@s',
  },
  skipTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: hp(4),
  },
});
