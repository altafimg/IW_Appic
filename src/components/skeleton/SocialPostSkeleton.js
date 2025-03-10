import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {Skeleton} from '@rneui/themed';

const SocialPostSkeleton = () => {
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <Skeleton
        height={300}
        skeletonStyle={{
          backgroundColor: '#f5f5f5',
          borderWidth: 1,
          borderColor: Colors.Neutral200,
        }}
      />
    </View>
  );
};

export default SocialPostSkeleton;

const styles = StyleSheet.create({});
