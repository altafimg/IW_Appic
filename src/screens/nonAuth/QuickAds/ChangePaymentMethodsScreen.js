import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import DefaultBankEditPopup from '../../../components/popups/DefaultBankEditPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ChangePaymentMethodsScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(false);

  const onDefaultBankEditHandler = () => {
    setIsVisible(!isVisible);
  };
  const onActiveHandler = () => {
    setActive(!active);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle="Payment methods" />
        <View style={styles.main}>
          {!active ? (
            <TouchableOpacity
              style={[styles.cardView, styles.cardViewSec]}
              onPress={onActiveHandler}>
              <View>
                <Text
                  style={[styles.headerCardTitle, styles.headerCardTitleSec]}>
                  Citibank CC
                </Text>
                <Text style={styles.cardTitle}>Ending in 3828</Text>
                <Text style={styles.cardTitle}>Expires on 20/12/22</Text>
              </View>
              <View style={styles.threeDotView}>
                <View style={styles.defaultView}>
                  <Text style={styles.defaultTitle}>Default</Text>
                </View>
                <TouchableOpacity
                  style={styles.threeDotButton}
                  onPress={onDefaultBankEditHandler}>
                  <SVG.ThreeDot width={24} height={24} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cardView} onPress={onActiveHandler}>
              <View>
                <Text style={styles.headerCardTitle}>Citibank CC</Text>
                <Text style={styles.cardTitle}>Ending in 3828</Text>
                <Text style={styles.cardTitle}>Expires on 20/12/22</Text>
              </View>
              <TouchableOpacity
                style={styles.threeDotButton}
                onPress={onDefaultBankEditHandler}>
                <SVG.ThreeDot width={24} height={24} style={styles.icon} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.cardView, {marginTop: hp(1)}]}>
          <View>
            <Text style={styles.headerCardTitle}>HSBC Bank</Text>
            <Text style={styles.cardTitle}>Ending in 3828</Text>
            <Text style={[styles.cardTitle, {color: 'red'}]}>
              Expired on 1/11/21
            </Text>
          </View>
          <TouchableOpacity
            style={styles.threeDotButton}
            onPress={onDefaultBankEditHandler}>
            <SVG.ThreeDot width={24} height={24} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <PrimaryButton title="Continue" onPress={() => navigation.goBack('')} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentMethodsScreen')}>
          <Text style={styles.buttonTitle}>Add new payment method</Text>
        </TouchableOpacity>
      </View>

      <DefaultBankEditPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={onDefaultBankEditHandler}
      />
    </View>
  );
};

export default ChangePaymentMethodsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  main: {
    marginTop: hp(-2),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    backgroundColor: Colors.White,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginVertical: hp(1.5),
    marginTop: hp(-3),
  },
  cardViewSec: {
    borderColor: Colors.Primary500,
  },
  headerCardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    paddingBottom: hp(0.6),
  },
  headerCardTitleSec: {
    color: Colors.Primary500,
  },
  cardTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    paddingBottom: hp(0.6),
  },
  threeDotButton: {
    paddingHorizontal: wp(2),
  },
  icon: {
    transform: [{rotateZ: '90deg'}],
  },
  threeDotView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultView: {
    backgroundColor: '#22C55E33',
    marginHorizontal: wp(2),
    borderRadius: 2,
  },
  defaultTitle: {
    color: Colors.Success500,
    fontSize: '11@s',
    fontWeight: '400',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
  },
  button: {
    width: wp('93%'),
    height: '48@s',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    marginTop: hp(1.5),
  },
  buttonTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
