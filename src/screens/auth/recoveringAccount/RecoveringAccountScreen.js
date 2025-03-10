import React, {useState} from 'react';
import {View} from 'react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import RecoveringAccount1 from '../../../components/Auth/RecoveringAccount1';
import RecoveringAccount2 from '../../../components/Auth/RecoveringAccount2';
import RecoveringAccount3 from '../../../components/Auth/RecoveringAccount3';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RecoveringAccountScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onSubmitHandler = () => {
    const check = 'recover_account';
    navigation.navigate('UploadGovIDScreen', {
      check: check,
    });
  };

  const onNextButtonHandler = () => {
    const totalSteps = 3;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPreviousHandler = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSteps = 3;

  const renderRecoveringAccountComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RecoveringAccount1
            onNextButtonHandler={onNextButtonHandler}
            onPreviousHandler={onPreviousHandler}
          />
        );
      case 2:
        return (
          <RecoveringAccount2
            onNextButtonHandler={onNextButtonHandler}
            onPreviousHandler={onPreviousHandler}
          />
        );
      case 3:
        return (
          <RecoveringAccount3
            onNextButtonHandler={onNextButtonHandler}
            onPreviousHandler={onPreviousHandler}
            onSubmitHandler={onSubmitHandler}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.main}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={AppLocalizedStrings.recoveringAccountScreen.recovering}
      />
      <View style={styles.stepMainView}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.step,
              {
                width: `${90 / totalSteps}%`,
                backgroundColor:
                  index < currentStep ? Colors.Primary500 : Colors.Neutral300,
              },
            ]}></View>
        ))}
      </View>
      {renderRecoveringAccountComponent()}
    </View>
  );
};

export default RecoveringAccountScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  stepMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    height: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: hp(-8),
  },
});
