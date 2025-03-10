import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../theme/Colors';
import {Divider} from 'react-native-elements';
import SVG from '../assets/svg';
import {hp} from '../utility/responsive/ScreenResponsive';

const NewHeader = props => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onPress}>
          <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{props.headerTitle}</Text>
        <Text style={styles.headerSubTitle}>kk</Text>
        {/* <Text style={styles.headerSubTitle}>{props.subTitle}</Text> */}
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

export default NewHeader;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
