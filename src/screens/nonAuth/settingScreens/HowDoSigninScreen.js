import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SecPrimaryButton from '../../../components/buttons/SecPrimaryButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const HowDoSigninScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle={AppLocalizedStrings.howDoSigninScreen.howDo} />
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu quisque
          consequat eget suspendisse lacus sed enim. Nullam venenatis ante
          fermentum aliquet ut vivamus placerat velit, aliquam. Vitae donec
          pharetra ac leo, scelerisque in. Commodo ultrices proin duis nulla.
        </Text>
        <View style={styles.main}>
          <Text style={styles.informationTitle}>
            {AppLocalizedStrings.howDoSigninScreen.information}
          </Text>
          <View style={styles.buttonMainView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>
                {AppLocalizedStrings.howDoSigninScreen.yes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>
                {AppLocalizedStrings.howDoSigninScreen.no}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <SecPrimaryButton
          title={AppLocalizedStrings.howDoSigninScreen.return}
        />
        <PrimaryButton title={AppLocalizedStrings.howDoSigninScreen.talk} />
      </View>
    </View>
  );
};

export default HowDoSigninScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  paragraph: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    marginTop: hp(-5),
  },
  main: {
    marginVertical: hp(5),
  },
  informationTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '600',
  },
  buttonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  button: {
    backgroundColor: Colors.Primary100,
    width: '141@s',
    height: '37@s',
    marginRight: wp(2),
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    paddingHorizontal: wp(4),
  },
});
