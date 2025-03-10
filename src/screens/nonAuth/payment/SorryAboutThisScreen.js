import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import SorryAboutThisCard from '../../../components/nonAuth/SorryAboutThisCard';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SorryAboutThisScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.sorryAboutThisScreen.sorry}
          subTitle={AppLocalizedStrings.sorryAboutThisScreen.something}
        />
        <SorryAboutThisCard />
      </View>
      <View>
        <PrimaryButton
          title={AppLocalizedStrings.sorryAboutThisScreen.submit}
        />
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.abTitle}>
            {AppLocalizedStrings.sorryAboutThisScreen.cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SorryAboutThisScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },

  accountButton: {
    alignSelf: 'center',
    marginTop: hp(1.4),
    paddingVertical: hp(1),
  },
  abTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
