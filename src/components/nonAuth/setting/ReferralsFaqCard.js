import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import CardOpen from '../../cardOpen/CradOpen';

const ReferralsFaqCard = () => {
  const [open, setOpen] = useState(false);
  const onOpenHandler = () => {
    setOpen(!open);
  };
  return (
    <View style={styles.faqView}>
      <Text style={styles.faqTitle}>
        {AppLocalizedStrings.referralsScreen.faqs}
      </Text>
      <TouchableOpacity style={styles.cardView}>
        <Text style={styles.cardTitle}>
          {AppLocalizedStrings.referralsScreen.howOften}
        </Text>
        <SVG.ArrowUp style={styles.errowIconSec} />
      </TouchableOpacity>
      <CardOpen
        open={open}
        setOpen={setOpen}
        onPress={onOpenHandler}
        title={AppLocalizedStrings.referralsScreen.howMuch}
        subTitle={AppLocalizedStrings.referralsScreen.youReceive}
      />
      {/* {open ? (
        <TouchableOpacity style={styles.cardViewSec} onPress={onOpenHandler}>
          <View style={styles.openCardView}>
            <Text style={styles.cardTitle}>
             
            </Text>
            <SVG.ArrowUp style={styles.errowIcon} />
          </View>
          <Text style={styles.cradP}>
            {AppLocalizedStrings.referralsScreen.youReceive}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cardView} onPress={onOpenHandler}>
          <Text style={styles.cardTitle}>
            {AppLocalizedStrings.referralsScreen.howMuch}
          </Text>
          <SVG.ArrowUp style={styles.errowIconSec} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default ReferralsFaqCard;

const styles = ScaledSheet.create({
  faqView: {
    marginTop: hp(3),
  },
  faqTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
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
  errowIcon: {
    transform: [{rotateZ: '180deg'}],
  },
  errowIconSec: {
    transform: [{rotateZ: '0deg'}],
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
  },
  cardViewSec: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginTop: hp(3.5),
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
});
