import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import TransferDetailsPopup from '../../../components/popups/TransferDetailsPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';

const WithdrawBalanceScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onaddNewHandler = () => {
    // navigation.navigate('AddBankAccountScreen');
    navigation.navigate('WithdrawFundsScreen');
  };

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={
            AppLocalizedStrings.withdrawBalanceScreen.withdrawBalance
          }
        />
        <View style={styles.copyUrlView}>
          <Text style={styles.copyUniqueTitle}>$ 20.00</Text>
          <Text style={styles.urlTitle}>Minimum withdrawal is $50.00</Text>
        </View>
        <TouchableOpacity style={styles.cardView} onPress={toggleModal}>
          <View style={styles.cradHeaderView}>
            <Text style={styles.cardHeaderTitle}>
              {AppLocalizedStrings.withdrawBalanceScreen.transferTo}
            </Text>
            <View style={styles.bankView}>
              <Text style={styles.bankTitle}>Citibank**1920</Text>
              <SVG.LeftArrow width={23} height={23} />
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.stripView}>
            <Text style={styles.stripTitle}>
              {AppLocalizedStrings.withdrawBalanceScreen.stripeFee}
            </Text>
            <Text style={styles.stripTitle}>$3.00</Text>
          </View>
          <View style={styles.stripView}>
            <Text style={styles.stripTitle}>
              {AppLocalizedStrings.withdrawBalanceScreen.youWillReceive}
            </Text>
            <Text style={styles.stripTitle}>$97.00</Text>
          </View>
          <View style={styles.stripView}>
            <Text style={styles.stripTitle}>
              {AppLocalizedStrings.withdrawBalanceScreen.shouldArrive}
            </Text>
            <Text style={styles.stripTitle}>3-5 working days</Text>
          </View>
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.withdrawBalanceScreen.enterAmount}
      />
      <TransferDetailsPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onaddNewHandler={onaddNewHandler}
      />
    </View>
  );
};

export default WithdrawBalanceScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  copyUrlView: {
    backgroundColor: Colors.Primary500,
    height: '73@s',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginTop: hp(-3),
    borderRadius: 5,
    alignItems: 'center',
  },
  copyUniqueTitle: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
  urlTitle: {
    color: Colors.White,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  cardView: {
    borderWidth: 1.5,
    borderColor: Colors.Neutral200,
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginVertical: hp(2),
  },
  cradHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
  cardHeaderTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
  },
  stripView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },
  stripTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
