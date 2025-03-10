import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const BackArrow = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.goBack}>
        <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default BackArrow;

const styles = StyleSheet.create({
  backIcon: {
    paddingVertical: hp(3),
  },
});
