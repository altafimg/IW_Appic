import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';

const TipsQuickAdsScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const onOpenHandler = () => {
    setOpen(!open);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={AppLocalizedStrings.tipsQuickAdsScreen.tipsQuickAds}
      />
      <View style={styles.main}>
        <View>
          {open ? (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.cardViewSec}
              onPress={onOpenHandler}>
              <View style={styles.openCardView}>
                <Text style={styles.cardTitle}>
                  {AppLocalizedStrings.faqScreen.how}
                </Text>
                <SVG.ArrowUp style={styles.errowIcon} />
              </View>
              <Text style={styles.cradP}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
                quisque consequat eget suspendisse lacus sed enim. Nullam
                venenatis ante fermentum aliquet ut vivamus placerat velit,
                aliquam. Vitae donec pharetra ac leo, scelerisque in. Commodo
                ultrices proin duis nulla.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.cardView}
              onPress={onOpenHandler}>
              <Text style={styles.cardTitle}>
                {AppLocalizedStrings.faqScreen.much}
              </Text>
              <SVG.ArrowUp style={styles.errowIconSec} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.cardView} onPress={onOpenHandler}>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.faqScreen.much}
            </Text>
            <SVG.ArrowUp style={styles.errowIconSec} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TipsQuickAdsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-3),
  },
  cardViewSec: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginTop: hp(1.8),
  },
  openCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cradP: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingVertical: hp(2),
  },
  errowIcon: {
    transform: [{rotateZ: '180deg'}],
  },
  errowIconSec: {
    transform: [{rotateZ: '0deg'}],
  },
  cardView: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2.3),
    marginTop: hp(1.8),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
});
