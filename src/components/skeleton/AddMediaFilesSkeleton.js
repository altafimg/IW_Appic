import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import {Skeleton} from '@rneui/themed';

const AddMediaFilesSkeleton = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.directionStyle}>
        <Skeleton style={styles.profileImageStyle} />
      </View>
    </View>
  );
};

export default AddMediaFilesSkeleton;

const styles = ScaledSheet.create({
  mainContainer: {
    height: '80@s',
    paddingVertical: '10@s',
    backgroundColor: Colors.White,
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    padding: 10,
  },
  profileImageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },
});
