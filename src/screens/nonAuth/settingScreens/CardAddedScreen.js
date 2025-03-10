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

const CardAddedScreen = ({navigation}) => {
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
        <Header
          headerTitle={AppLocalizedStrings.makePaymentsScreen.makePayment}
        />
        <View style={styles.main}>
          {active ? (
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
                <SVG.ThreeDot
                  width={24}
                  height={24}
                  style={styles.icon}
                  onPress={onDefaultBankEditHandler}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.cardView} onPress={onActiveHandler}>
              <View>
                <Text style={styles.headerCardTitle}>Citibank CC</Text>
                <Text style={styles.cardTitle}>Ending in 3828</Text>
                <Text style={styles.cardTitle}>Expires on 20/12/22</Text>
              </View>
              <SVG.ThreeDot
                width={24}
                height={24}
                style={styles.icon}
                onPress={onDefaultBankEditHandler}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.makePaymentsScreen.addPayment}
        onPress={onGoBackHandler}
      />
      <DefaultBankEditPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={onDefaultBankEditHandler}
      />
    </View>
  );
};

export default CardAddedScreen;

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
});
