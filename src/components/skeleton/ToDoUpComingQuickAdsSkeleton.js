import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Skeleton} from '@rneui/base';

const SkeletonLoader = () => {
  return (
    <View style={{marginTop: 20}}>
      <View style={styles.cardView}>
        <View style={styles.cradImageView}>
          <Skeleton
            width={60}
            height={60}
            borderRadius={10}
            style={styles.image}
            skeletonStyle={{backgroundColor: '#f5f5f5'}}
          />
          <View style={styles.cardTitleView}>
            <Skeleton
              width={150}
              height={15}
              borderRadius={4}
              style={styles.cardHeaderTitle}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
            <Skeleton
              width={100}
              height={13}
              borderRadius={4}
              style={styles.cardHeaderSubTitle}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
        </View>
        <Skeleton
          width={'100%'}
          height={3}
          borderRadius={4}
          style={styles.cardHeaderTitle}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          width={'100%'}
          height={3}
          borderRadius={4}
          style={styles.cardHeaderTitle}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          width={'100%'}
          height={3}
          borderRadius={4}
          style={styles.cardHeaderTitle}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
        <Skeleton
          width={'100%'}
          height={40}
          borderRadius={5}
          style={styles.button}
          skeletonStyle={{backgroundColor: '#f5f5f5'}}
        />
      </View>
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  cardView: {
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    height: 244,
  },
  cradImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: '#ededed',
    paddingBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ededed',
  },
  cardTitleView: {
    width: '60%',
    marginHorizontal: 16,
    marginBottom: 60,
  },
  cardHeaderTitle: {
    height: 15,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#ededed',
  },
  cardHeaderSubTitle: {
    height: 13,
    borderRadius: 4,
    backgroundColor: '#ededed',
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#ededed',
  },
});
