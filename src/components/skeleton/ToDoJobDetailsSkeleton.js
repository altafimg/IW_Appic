import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Skeleton} from '@rneui/base';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';

const ToDoJobDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileLeftContainer}>
          <View style={styles.profilePickView}>
            <View style={styles.profilePickView}>
              <Skeleton
                circle
                width={78}
                height={78}
                style={styles.profileImage}
                skeletonStyle={{backgroundColor: '#f5f5f5'}}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.userNameView}>
            <Skeleton
              style={[styles.userNameTitle, {marginVertical: 5}]}
              width={'80%'}
              height={14}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
          <View style={styles.userNameView}>
            <Skeleton
              style={[styles.userNameTitle, {marginVertical: 5}]}
              width={'80%'}
              height={14}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
          <View style={styles.userNameView}>
            <Skeleton
              style={[styles.userNameTitle, {marginVertical: 5}]}
              width={'80%'}
              height={14}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
          <View style={styles.userNameView}>
            <Skeleton
              style={[styles.userNameTitle, {marginVertical: 5}]}
              width={'80%'}
              height={14}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ToDoJobDetailsSkeleton;

const styles = ScaledSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLeftContainer: {
    width: '30%',
    alignItems: 'center',
  },
  profilePickView: {
    width: '83@s',
    height: '83@s',
    borderRadius: '100@s',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: '78@s',
    height: '78@s',
    borderRadius: '100@s',
    alignSelf: 'center',
    marginLeft: wp(-0.7),
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '22@s',
  },
  baseTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
