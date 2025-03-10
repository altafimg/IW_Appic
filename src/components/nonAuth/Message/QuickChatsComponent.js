import React from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Divider} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';

// image
import no_Jobs from '../../../assets/images/no_quickads.png';
import image from '../../../assets/images/profile.png';
import dot from '../../../assets/images/dot.png';
import timestamp from '../../../assets/images/timestamp.png';
import pin from '../../../assets/images/Pin.png';
import report from '../../../assets/images/report.png';
import ChatListSkeleton from '../../skeleton/ChatListSkeleton';

const QuickChatsComponent = props => {
  const search = props.search;
  const navigation = useNavigation();
  const quickChatData = [
    {
      id: 1,
      name: 'Marcus Saris',
      image: image,
      last_msg: 'Hey cak, could you free now?',
      msg_count: 4,
      timestamp: 1706162859,
    },
  ];

  const filterQuickChats = quickChatData.filter(item => {
    let name1 = item.name.toLowerCase().includes(search.toLowerCase());
    let msg = item.last_msg.toLowerCase().includes(search.toLowerCase());

    return name1, msg;
  });
  let pinedData = [];

  const renderQuickChat = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('QuickChatScreen', {
            quickChatData: item,
            title: 'Quick',
          });
        }}
        activeOpacity={1}
        style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={dot} style={styles.dotSignStyle} />
              <Image source={item.image} style={styles.profileImageStyle} />
            </View>
            <View
              style={{
                marginHorizontal: scale(15),
                width: scale(170),
              }}>
              <Text numberOfLines={1} style={styles.nameTextStyle}>
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.countStyle, {color: Colors.Neutral400}]}>
                {item.last_msg}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.messageCountStyle}>{item.msg_count}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={timestamp}
                style={{width: scale(16), height: scale(16)}}
              />
              <Text
                style={[
                  styles.countStyle,
                  {color: Colors.Neutral400, marginHorizontal: 2},
                ]}>
                11h 22m
              </Text>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    );
  };
  const load = false;
  return (
    <View>
      {pinedData.length > 0 && (
        <Text
          style={[
            styles.overlayTitleStyle,
            {marginHorizontal: scale(10), marginTop: scale(20)},
          ]}>
          All
        </Text>
      )}

      {load ? (
        <>
          <ChatListSkeleton />
          <ChatListSkeleton />
        </>
      ) : filterQuickChats?.length > 0 ? (
        <SwipeListView
          data={filterQuickChats}
          disableRightSwipe={true}
          rightOpenValue={scale(-170)}
          keyExtractor={item => item.id}
          renderItem={renderQuickChat}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('ReportMessageScreen', {data: data.item});
                }}
                style={styles.reportButtonStyle}>
                <Image source={report} style={{width: scale(24), height: 24}} />
                <Text
                  style={[
                    styles.countStyle,
                    {color: Colors.White, marginTop: 5},
                  ]}>
                  {AppLocalizedStrings.jobMessagesComponent.report}
                </Text>
              </TouchableOpacity>
              <View style={styles.pinButtonStyle}>
                <Image
                  source={pin}
                  style={{
                    width: scale(24),
                    height: scale(24),
                  }}
                />
                <Text
                  style={[
                    styles.countStyle,
                    {color: Colors.White, marginTop: 5},
                  ]}>
                  {AppLocalizedStrings.jobMessagesComponent.pin}
                </Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: pinedData.length > 0 ? 0 : scale(20),
            paddingBottom: scale(20),
          }}
        />
      ) : (
        <View>
          <Image source={no_Jobs} style={styles.imageStyle} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.no_Job_message}
          </Text>
          <Text style={styles.subTitleStyle}>
            {AppLocalizedStrings.MessageingScreen.job_message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default QuickChatsComponent;

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
  messageCountStyle: {
    backgroundColor: Colors.Primary500,
    width: '19@s',
    height: '19@s',
    borderRadius: '60@s',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: '13@s',
    fontWeight: '500',
    color: Colors.Neutral50,
    marginBottom: hp(0.4),
  },
  overlayTitleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '10@s',
  },
});
