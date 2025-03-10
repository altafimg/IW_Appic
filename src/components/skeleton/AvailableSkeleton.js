import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {Skeleton} from '@rneui/themed';

const AvailableSkeleton = () => {
  return (
    <View>
      <View style={styles.dataCardContainer}>
        <View style={styles.container}>
          <Skeleton
            style={styles.cardPhotoStyle}
            skeletonStyle={{backgroundColor: '#f5f5f5'}}
          />
        </View>
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          style={styles.skeleton}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <View style={styles.container}>
          <Skeleton
            style={styles.cardButtonStyle}
            skeletonStyle={{backgroundColor: '#f5f5f5'}}
          />
          <Skeleton
            style={styles.cardButtonStyle}
            skeletonStyle={{backgroundColor: '#f5f5f5'}}
          />
        </View>
      </View>
    </View>
  );
};

export default AvailableSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginVertical: hp(2),
    borderRadius: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    height: 550,
  },
  skeleton: {
    marginVertical: 10,
    height: 30,
    width: '100%',
    borderRadius: 5,
    // backgroundColor: 'red',
  },
  cardPhotoStyle: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginVertical: 10,
  },
  cardButtonStyle: {
    width: 147,
    height: 44,
    marginTop: hp(1),
    borderRadius: 5,
  },
});
