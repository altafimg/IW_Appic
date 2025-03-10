import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';

const CardOpen = props => {
  const open = props.open;
  const setOpen = props.setOpen;
  const onOpenHandler = props.onPress;

  return (
    <View>
      {open ? (
        <TouchableOpacity style={styles.cardViewSec} onPress={onOpenHandler}>
          <View style={styles.openCardView}>
            <Text style={styles.cardTitle}>{props.title}</Text>
            <SVG.ArrowUp style={styles.errowIcon} />
          </View>
          <Text style={styles.cradP}>{props.subTitle}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cardView} onPress={onOpenHandler}>
          <Text style={styles.cardTitle}>{props.title}</Text>
          <SVG.ArrowUp style={styles.errowIconSec} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CardOpen;

const styles = ScaledSheet.create({
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
