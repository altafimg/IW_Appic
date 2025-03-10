import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import TwoStepVerificationCard from '../../../components/nonAuth/setting/TwoStepVerificationCard';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch} from 'react-redux';
import {kidParentCheckStoreAction} from '../../../redux/actions/kidParentCheckAction';

const TwoStepVerificationScreen = ({navigation, route}) => {
  const check = route?.params?.check;
  const dispatch = useDispatch();

  console.log(check);

  const [selectedCard, setSelectedCard] = useState(1);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const handleCardClick = cardNumber => {
    setSelectedCard(selectedCard === cardNumber ? null : cardNumber);
  };
  const onContinueHandler = () => {
    if (selectedCard === 1) {
      const data = 'parent';
      dispatch(kidParentCheckStoreAction(data));
      navigation.navigate('UploadGovIDScreen', {check: check});
    } else {
      const data = 'kid';
      dispatch(kidParentCheckStoreAction(data));
      navigation.navigate('VerifyLittleTimmyScreen', {check: check});
    }
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={
          AppLocalizedStrings.twoStepVerificationScreen.verifications
        }
        subTitle={AppLocalizedStrings.twoStepVerificationScreen.complete}
      />
      <View style={styles.stepMainView}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TwoStepVerificationCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          handleCardClick={handleCardClick}
        />
      </ScrollView>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      </View>
    </View>
  );
};

export default TwoStepVerificationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
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
