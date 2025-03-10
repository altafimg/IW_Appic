import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Divider} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getChatsListAction} from '../../../redux/actions/getChatsListAction';
import ChatListSkeleton from '../../skeleton/ChatListSkeleton';
// image
import no_Jobs from '../../../assets/images/no_quickads.png';
import dot from '../../../assets/images/dot.png';
import pin from '../../../assets/images/Pin.png';
import report from '../../../assets/images/report.png';
import userImage from '../../../assets/images/userImage.png';

const JobMessagesComponent = props => {
  const [filteredData, setFilteredData] = useState([]);
  const search = props?.search;
  const navigation = useNavigation();
  const userId = useSelector(state => state.loginReducer.user?.data?.data?._id);
  const chatListData = useSelector(
    state => state.getChatsListReducer.data?.data?.data,
  );

  const loading = useSelector(state => state.getChatsListReducer.loading);

  const dispatch = useDispatch();

  const getChatList = () => {
    dispatch(getChatsListAction(userId));
  };

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    // Filter data based on search
    const filtered = chatListData?.filter(item =>
      item?.profile_name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [search, chatListData]);

  const load = true;

  const renderJobsItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('JobChatScreen', {
            jobData: item,
            title: 'Job',
          });
          // navigation.navigate('ChatRoomScreen', {
          //   jobData: item,
          //   title: 'Job',
          // });
        }}
        activeOpacity={1}
        style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={dot} style={styles.dotSignStyle} />

              {item?.profile_picture == null ||
              item?.profile_picture == undefined ? (
                <Image source={userImage} style={styles.profileImageStyle} />
              ) : (
                <Image
                  source={{uri: item?.profile_picture}}
                  style={styles.profileImageStyle}
                />
              )}
            </View>
            <View style={{marginHorizontal: scale(15), width: scale(200)}}>
              <Text numberOfLines={1} style={styles.nameTextStyle}>
                {item?.profile_name
                  ?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {loading ? (
        <>
          <ChatListSkeleton />
          <ChatListSkeleton />
          <ChatListSkeleton />
        </>
      ) : (
        <SwipeListView
          data={search ? filteredData : chatListData}
          disableRightSwipe={true}
          rightOpenValue={scale(-170)}
          keyExtractor={item => item.id}
          renderItem={renderJobsItem}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.backContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  // navigation.navigate('ReportScreen', {data: data.item});
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  // Handle pin action
                }}
                style={styles.pinButtonStyle}>
                <Image
                  source={pin}
                  style={{width: scale(24), height: scale(24)}}
                />
                <Text
                  style={[
                    styles.countStyle,
                    {color: Colors.White, marginTop: 5},
                  ]}>
                  {AppLocalizedStrings.jobMessagesComponent.pin}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: scale(20)}}
        />
      )}

      {filteredData?.length === 0 && (
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

export default JobMessagesComponent;

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
