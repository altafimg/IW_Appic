import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const OnOffIndigaterCard = props => {
  return (
    <TouchableOpacity style={styles.cradView} onPress={props.onPress}>
      <Text style={styles.adveTitle}>{props.title}</Text>
      <View style={styles.onOffMainView}>
        {props.type === 'on' ? (
          <View style={[styles.onOffView, styles.onOffGreenView]}>
            <Text style={styles.onOffTitle}>
              {AppLocalizedStrings.manageYourServicesScreen.on}
            </Text>
          </View>
        ) : (
          <View style={styles.onOffView}>
            <Text style={styles.onOffTitle}>
              {AppLocalizedStrings.manageYourServicesScreen.off}
            </Text>
          </View>
        )}
        <SVG.LeftArrow width={22} height={22} />
      </View>
    </TouchableOpacity>
  );
};

export default OnOffIndigaterCard;

const styles = ScaledSheet.create({
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '46@s',
    paddingHorizontal: wp(4),
    marginVertical: hp(0.7),
    borderRadius: 5,
  },
  adveTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
  },
  onOffMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onOffView: {
    backgroundColor: Colors.Destructive500,
    paddingHorizontal: wp(2),
    borderRadius: 5,
    marginRight: wp(3),
  },
  onOffGreenView: {
    backgroundColor: Colors.Success500,
  },
  onOffTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(0.1),
  },
});
