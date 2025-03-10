import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import BuildProfile from '../../../components/Auth/BuildProfile';
import CancelBuildingProfilePopup from '../../../components/popups/CancelBuildingProfilePopup';
import {useSelector} from 'react-redux';

const BuildProfileScreen = ({navigation, route}) => {
  const check = 'profileBuild';
  const [selectedCard, setSelectedCard] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const selectedCardData = useSelector(
    state => state.completeStepsReducer.steps,
  );

  // console.log(selectedCardData);
  // console.log(selectedCardData[0]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  // const handleCardClick = cardNumber => {
  //   setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  // };

  // const onContinueHandler = () => {
  //   switch (selectedCard) {
  //     case 1:
  //       navigation.navigate('ProfilePictureScreen');
  //       break;
  //     case 2:
  //       navigation.navigate('AddAdditionalDetailsScreen');
  //       break;
  //     case 3:
  //       navigation.navigate('SelectYourCategoryScreen');
  //       break;
  //     case 4:
  //       navigation.navigate('AddMusicVideosScreen');
  //       break;
  //     default:
  //       return null;
  //   }
  // };

  const onContinueHandler = () => {
    if (selectedCard === 1) {
      if (selectedCardData[0] === true) {
        setSelectedCard(2);
        navigation.navigate('AddAdditionalDetailsScreen');
      } else {
        setSelectedCard(1);
        navigation.navigate('ProfilePictureScreen');
      }
    } else if (selectedCard === 2) {
      if (selectedCardData[1] === true) {
        setSelectedCard(3);
        navigation.navigate('SelectYourCategoryScreen');
      } else {
        setSelectedCard(2);
        navigation.navigate('AddAdditionalDetailsScreen');
      }
    } else if (selectedCard === 3) {
      if (selectedCardData[2] === true) {
        setSelectedCard(4);
        navigation.navigate('AddMusicVideosScreen');
      } else {
        setSelectedCard(3);
        navigation.navigate('SelectYourCategoryScreen');
      }
    } else if (selectedCard === 4) {
      if (selectedCardData[3] === true) {
        setSelectedCard(4); // This seems redundant since it's already 4
        navigation.navigate('AddIntroVideoScreen', {check: check});
      } else {
        setSelectedCard(4); // Changed from 0 to 4 to keep it consistent
        navigation.navigate('AddMusicVideosScreen');
      }
    } else if (
      selectedCardData[0] === true &&
      selectedCardData[1] === true &&
      selectedCardData[2] === true &&
      selectedCardData[3] === true
    ) {
      navigation.navigate('AddIntroVideoScreen', {
        check: check,
      });
    } else {
      return null;
    }
  };

  // const onContinueHandler = () => {
  //   console.log(selectedCard);

  //   if (selectedCard === 1) {
  //     // navigation.navigate('ProfilePictureScreen');

  //     if (selectedCardData[0] === true) {
  //       navigation.navigate('AddAdditionalDetailsScreen');
  //       setSelectedCard(2);
  //     } else {
  //       setSelectedCard(1);
  //       navigation.navigate('ProfilePictureScreen');
  //     }
  //   } else if (selectedCard === 2) {
  //     // navigation.navigate('AddAdditionalDetailsScreen');
  //     if (selectedCardData[1] === true) {
  //       navigation.navigate('SelectYourCategoryScreen');
  //       setSelectedCard(3);
  //     } else {
  //       setSelectedCard(2);
  //       navigation.navigate('AddAdditionalDetailsScreen');
  //     }
  //   } else if (selectedCard === 3) {
  //     // navigation.navigate('SelectYourCategoryScreen');
  //     // setSelectedCard(4);
  //     if (selectedCardData[2] === true) {
  //       navigation.navigate('AddMusicVideosScreen');
  //       setSelectedCard(4);
  //     } else {
  //       navigation.navigate('SelectYourCategoryScreen');
  //       setSelectedCard(3);
  //     }
  //   } else if (selectedCard === 4) {
  //     // navigation.navigate('AddMusicVideosScreen');
  //     if (selectedCardData[3] === true) {
  //       console.log('seleected card 33333333');
  //       setSelectedCard(4);
  //       navigation.navigate('AddIntroVideoScreen');
  //     } else {
  //       setSelectedCard(0);
  //       console.log('seleected card intro');

  //       navigation.navigate('AddMusicVideosScreen');
  //     }
  //     // setSelectedCard(0);
  //   } else if (
  //     selectedCardData[0] === true &&
  //     selectedCardData[1] === true &&
  //     selectedCardData[2] === true &&
  //     selectedCardData[3] === true
  //   ) {
  //     navigation.navigate('AddIntroVideoScreen');
  //   } else {
  //     return null;
  //   }
  // };

  // const onContinueHandler = () => {
  //   if (selectedCard === 1) {
  //     setSelectedCard(2);
  //     navigation.navigate('ProfilePictureScreen');
  //   } else if (selectedCard === 2) {
  //     setSelectedCard(3);
  //     navigation.navigate('AddAdditionalDetailsScreen');
  //   } else if (selectedCard === 3) {
  //     setSelectedCard(4);
  //     navigation.navigate('SelectYourCategoryScreen');
  //   } else if (selectedCard === 4) {
  //     setSelectedCard(0);
  //     navigation.navigate('AddMusicVideosScreen');
  //   } else if (
  //     selectedCardData[0] === true &&
  //     selectedCardData[1] === true &&
  //     selectedCardData[2] === true &&
  //     selectedCardData[3] === true
  //   ) {
  //     navigation.navigate('AddIntroVideoScreen');
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <View style={styles.container}>
      <Header
        headerTitle={AppLocalizedStrings.buildProfileScreen.now}
        subTitle={AppLocalizedStrings.buildProfileScreen.complete}
      />
      <View style={styles.stepMainView}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BuildProfile
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          // handleCardClick={handleCardClick}
        />
      </ScrollView>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
        <TouchableOpacity style={styles.bottomButton} onPress={toggleModal}>
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.buildProfileScreen.cancel}
          </Text>
        </TouchableOpacity>
      </View>
      <CancelBuildingProfilePopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onGoBackHandler={onGoBackHandler}
      />
    </View>
  );
};

export default BuildProfileScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
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
});
