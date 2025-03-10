import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import ReferralsEarningsCard from '../../../components/nonAuth/setting/ReferralsEarningsCard';
import ReferralsFaqCard from '../../../components/nonAuth/setting/ReferralsFaqCard';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ReferralsScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onAllReferralsHandler = () => {
    navigation.navigate('ReferralsListScreen');
  };

  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle={AppLocalizedStrings.referralsScreen.referrals} />
      <ReferralsEarningsCard onAllReferralsHandler={onAllReferralsHandler} />
      <ReferralsFaqCard />
    </View>
  );
};

export default ReferralsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
});
