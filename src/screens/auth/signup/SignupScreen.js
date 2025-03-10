import {ScrollView, View, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AccountTypeCrad from '../../../components/Auth/AccountTypeCrad';
import {AppLocalizedStrings} from '../../../localization/Localization';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import InfluencerAgePopup from '../../../components/popups/InfluencerAgePopup';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import Demo from '../../../components/popups/Demo';
import {useDispatch} from 'react-redux';
import {buildProfileDataRemoveAction} from '../../../redux/actions/buildProfileDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mobileNumberDataRemoveAction} from '../../../redux/actions/mobileNumberStoreAction';
import {editUserDataRemoveAction} from '../../../redux/actions/editUserDataStoreAction';
import {recoverAccountDataRemoveAction} from '../../../redux/actions/recoverAccountDataAction';
import {replaceAccountManagerDataRemoveAction} from '../../../redux/actions/replaceAccountManagerDataStoreAction';
import {resetSteps} from '../../../redux/actions/completeStepsAction';

const SignupScreen = ({navigation}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(buildProfileDataRemoveAction());
    dispatch(mobileNumberDataRemoveAction());
    dispatch(editUserDataRemoveAction());
    dispatch(recoverAccountDataRemoveAction());
    dispatch(replaceAccountManagerDataRemoveAction());
    dispatch(resetSteps());
    clearSpecificFields();
  }, []);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  if (selectedCard == 1) {
    var first_text = 'I’m an individual customer.';
    var second_text = 'I’m representing a business.';
  } else {
    var first_text = 'Influencer 18+';
    var second_text = 'Kids & Under 18';
  }

  const onProfileDetailHandler = () => {
    if (selectedCard === 1) {
      navigation.navigate('NewProfileDetailsCustomerScreen', {
        user_role: 'customer',
      });
      setIsVisible(false);
    } else {
      navigation.navigate('NewProfileDetailsInfluencerScreen', {
        user_role: 'influencer',
      });
      setIsVisible(false);
    }
  };

  const onManagingkidInfluencersHandler = () => {
    navigation.navigate('ManagingkidInfluencersScreen', {
      user_role: 'kid_influencer',
    });
    setIsVisible(false);
  };

  const onProfileBusinessHandler = () => {
    navigation.navigate('NewProfileDetailsBusinessScreen', {
      user_role: 'business',
      relationship: 'businessmanger',
    });
    setIsVisible(false);
  };
  const aaa = () => {
    navigation.navigate('GovernmentOrganizationScreen', {
      user_role: 'government',
      relationship: 'govtmanager',
    });
    setIsVisible(false);
  };
  return (
    <TouchableWithoutFeedback
      style={{
        flex: 1,
      }}
      onPress={() => {
        setIsVisible(false);
      }}>
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={AppLocalizedStrings.signupScreen.accountType}
            subTitle={AppLocalizedStrings.signupScreen.loremIpsum}
          />
          <AccountTypeCrad
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        </ScrollView>
        {selectedCard ? (
          <PrimaryButton
            title={AppLocalizedStrings.button.continue}
            onPress={selectedCard === 3 ? aaa : toggleModal}
          />
        ) : null}
        <InfluencerAgePopup
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleModal={toggleModal}
          second_text={second_text}
          first_text={first_text}
          onProfileDetailHandler={onProfileDetailHandler}
          onManagingkidInfluencersHandler={onManagingkidInfluencersHandler}
          onProfileBusinessHandler={onProfileBusinessHandler}
          selectedCard={selectedCard}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
});
