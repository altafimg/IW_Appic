import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Skeleton} from '@rneui/themed';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Image} from 'react-native-elements';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';

const ChatListSkeleton = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.directionStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <View style={styles.profileImageStyle}>
              <Skeleton
                circle
                width={45}
                height={45}
                skeletonStyle={{backgroundColor: '#f5f5f5'}}
              />
            </View>
          </View>

          <View style={{marginHorizontal: scale(15), width: '85%'}}>
            <Skeleton
              width={'90%'}
              height={40}
              skeletonStyle={{backgroundColor: '#f5f5f5'}}
            />
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default ChatListSkeleton;

const styles = ScaledSheet.create({
  backContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: '5@s',
    paddingHorizontal: 10,
  },
  reportButtonStyle: {
    backgroundColor: Colors.Destructive500,
    width: '80@s',
    height: '80@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinButtonStyle: {
    backgroundColor: Colors.Neutral500,
    width: '80@s',
    height: '80@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  divider: {
    bottom: '20@s',
    top: '20@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  imageStyle: {
    width: '221@s',
    height: '228@s',
    alignSelf: 'center',
    marginTop: '70@s',
  },
  titleStyle: {
    fontSize: '24@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    textAlign: 'center',
    marginTop: '30@s',
  },
  subTitleStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    textAlign: 'center',
    marginTop: '10@s',
  },
  mainContainer: {
    height: '80@s',
    paddingVertical: '10@s',
    backgroundColor: Colors.White,
    paddingHorizontal: '5@s',
  },
  profileImageStyle: {
    width: '45@s',
    height: '45@s',
    borderRadius: '60@s',
  },
  dotSignStyle: {
    position: 'absolute',
    width: '10@s',
    height: '10@s',
    borderRadius: '60@s',
    bottom: 3,
    right: 3,
    zIndex: 999,
  },
  nameTextStyle: {
    fontSize: '14@s',
    fontWeight: '500',
    color: Colors.Neutral900,
    paddingBottom: hp(0.4),
  },
  countStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Primary500,
  },
});
