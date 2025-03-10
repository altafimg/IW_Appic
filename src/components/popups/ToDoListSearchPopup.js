import React, {useState, useMemo} from 'react';
import {Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {Divider, Image, Overlay} from 'react-native-elements';
import Colors from '../../theme/Colors';
import SearchInputField from '../textInput/SearchInputField';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';
import {useSelector} from 'react-redux';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

const ToDoListSearchPopup = props => {
  const navigation = useNavigation();
  const setSearchVisible = props?.setSearchVisible;
  const selectedButton = props?.selectedButton;
  const jobData = props.applicantJobs || [];
  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const [search, setSearch] = useState('');

  const upcomingJobsData = useMemo(
    () =>
      jobData?.filter(item =>
        item?.applicants?.some(
          applicant =>
            applicant?.applicants_id?._id === _id &&
            applicant?.status === 'in progress',
        ),
      ),
    [jobData, _id],
  );

  const finishedData = useMemo(
    () =>
      jobData?.filter(
        item =>
          !item?.applicants?.some(
            applicant =>
              applicant?.applicants_id?._id === _id &&
              applicant?.status === 'in progress',
          ),
      ),
    [jobData, _id],
  );

  const filteredUpcomingJobsData = useMemo(() => {
    return upcomingJobsData?.filter(
      item =>
        item?.quick_ads_title?.toLowerCase().includes(search.toLowerCase()) ||
        item?.bio?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, upcomingJobsData]);

  const filteredFinishedData = useMemo(() => {
    return finishedData?.filter(
      item =>
        item?.quick_ads_title?.toLowerCase().includes(search.toLowerCase()) ||
        item?.bio?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, finishedData]);

  const onCompleteJobHandler = adsId => {
    if (selectedButton == 1) {
      navigation.navigate('ToDoJobDetailsScreen', {
        adsId: adsId,
        check: 'complete',
      });
    } else {
      navigation.navigate('ToDoJobDetailsScreen', {
        adsId: adsId,
        check: 'notComplete',
      });
    }
  };

  const finishedRenderItem = ({item, index}) => {
    const todayDate = moment().format('DD MMMM YYYY');
    const endDate = moment(item?.task_start_date).format('DD MMMM YYYY');

    const today = moment(todayDate, 'DD MMMM YYYY');
    const end = moment(endDate, 'DD MMMM YYYY');

    const daysLeft = end.diff(today, 'days');

    const applicantData = item?.applicants?.find(
      i => i?.applicants_id?._id === _id,
    );

    const applicantDataStatus = applicantData?.status || '';

    return (
      <View>
        <View style={styles.cardView}>
          <View style={styles.cradImageView}>
            <Image
              source={{uri: item?.thumbnail_picture_ads}}
              style={styles.image}
            />
            <View style={styles.cardTitleView}>
              <Text style={styles.cardHeaderTitle}>
                {item?.quick_ads_title}
              </Text>
              <Text style={styles.cardHeaderSubTitle}>{item?.bio}</Text>
            </View>
          </View>
          <View>
            <Progress.Bar
              progress={applicantDataStatus == 'completed' ? 1 : 0}
              width={scale(290)}
              color={
                applicantDataStatus == 'completed'
                  ? Colors.Success500
                  : Colors.Neutral400
              }
              borderColor={
                applicantDataStatus == 'completed'
                  ? Colors.Success500
                  : Colors.Neutral400
              }
              borderWidth={1}
              style={{
                marginTop: 10,
              }}
            />
            <View style={styles.barBottomView}>
              <Text style={styles.accepTitle}>Accepted</Text>
              <Text style={styles.waitingTitle}>
                Waiting for you to complete
              </Text>
              <Text style={styles.accepTitle}>Get Paid</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => onCompleteJobHandler(item?._id)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    applicantDataStatus === 'cancelByInfluencer' ||
                    applicantDataStatus === 'cancelByCustomer'
                      ? Colors.Neutral400
                      : Colors.Success500,
                },
              ]}>
              <Text style={styles.buttonTitle}>Complete this job</Text>
              <Text style={styles.buttonSubTitle}>Due in {daysLeft} days</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const upComingRenderItem = ({item, index}) => {
    const todayDate = moment().format('DD MMMM YYYY');
    const endDate = moment(item?.task_start_date).format('DD MMMM YYYY');

    const today = moment(todayDate, 'DD MMMM YYYY');
    const end = moment(endDate, 'DD MMMM YYYY');

    const daysLeft = end.diff(today, 'days');

    const applicantData = item?.applicants?.find(
      i => i?.applicants_id?._id === _id,
    );

    const applicantDataStatus = applicantData?.status || '';

    const getProgressValue = status => {
      switch (status) {
        case 'in progress':
          return 0.66;
        case 'completed':
        case 'Partially completed':
        case 'cancel':
        case 'Failed to deliver':
        case 'expired':
          return 1;
        default:
          return 0;
      }
    };

    const getProgressColor = status => {
      switch (status) {
        case 'in progress':
          return Colors.Primary500;
        case 'completed':
        case 'Partially completed':
          return Colors.Success500;
        case 'cancel':
        case 'Failed to deliver':
        case 'expired':
          return Colors.red;
        default:
          return Colors.gray;
      }
    };

    const progress = getProgressValue(applicantDataStatus);
    const progressColor = getProgressColor(applicantDataStatus);
    const totalWidth = scale(290);
    const segmentWidth = totalWidth / 3;

    return (
      <View>
        <View style={styles.cardView}>
          <View style={styles.cradImageView}>
            <Image
              source={{uri: item?.thumbnail_picture_ads}}
              style={styles.image}
            />
            <View style={styles.cardTitleView}>
              <Text style={styles.cardHeaderTitle}>
                {item?.quick_ads_title}
              </Text>
              <Text style={styles.cardHeaderSubTitle}>{item?.bio}</Text>
            </View>
          </View>
          <View style={styles.barMainView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Progress.Bar
                progress={progress >= 0.33 ? 1 : progress / 0.33}
                width={segmentWidth}
                color={progressColor}
                height={12.5}
                style={{borderWidth: 0, backgroundColor: '#EEF2FF'}}
              />
              <View style={{marginRight: wp(2.2)}} />
              <Progress.Bar
                progress={
                  progress >= 0.66 ? 1 : Math.max(0, (progress - 0.33) / 0.33)
                }
                width={segmentWidth}
                color={progressColor}
                height={12.5}
                style={{borderWidth: 0, backgroundColor: '#EEF2FF'}}
              />
              <View style={{marginRight: wp(2.2)}} />
              <Progress.Bar
                progress={
                  progress >= 1 ? 1 : Math.max(0, (progress - 0.66) / 0.34)
                }
                width={segmentWidth}
                color={progressColor}
                height={12.5}
                style={{borderWidth: 0, backgroundColor: '#EEF2FF'}}
              />
            </View>
          </View>
          <View style={styles.barBottomView}>
            <Text style={styles.accepTitle}>Accepted</Text>
            <Text style={styles.waitingTitle}>Awaiting delivery</Text>
            <Text style={styles.progresBarTitle}>
              {applicantDataStatus === 'completed'
                ? 'Get Paid'
                : applicantDataStatus === 'cancel'
                ? 'Cancel'
                : 'Get Paid'}
            </Text>
          </View>
          <View style={styles.dueDateView}>
            <Text style={styles.dueTitle}>Due Date:</Text>
            <Text style={styles.dueTitleSec}>in {daysLeft} Days</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => onCompleteJobHandler(item?._id)}
              style={[
                styles.button,
                {
                  backgroundColor: Colors.Primary500,
                },
              ]}>
              <Text style={styles.buttonTitle}>Complete it now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Overlay
      visible={props.searchVisible}
      animationType="slide"
      overlayStyle={{
        width: Dimensions.get('window').width,
        flex: 1,
        paddingTop: hp(3),
      }}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              setSearchVisible(false);
            }}>
            <SVG.Cross width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.filterTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.search}
          </Text>
          <Text style={styles.ResetTextStyle}>...</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={{marginTop: 15}}>
          <SearchInputField
            value={search}
            onChangeText={t => setSearch(t)}
            placeholder="Search"
          />

          {selectedButton === 0 ? (
            filteredUpcomingJobsData?.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: scale(270)}}
                data={filteredUpcomingJobsData}
                renderItem={upComingRenderItem}
                key={item => item.id}
              />
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.notFoundText}>No results found</Text>
              </View>
            )
          ) : filteredFinishedData?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: scale(270)}}
              data={filteredFinishedData}
              renderItem={finishedRenderItem}
              key={item => item.id}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text style={styles.notFoundText}>No results found</Text>
            </View>
          )}
        </View>
      </View>
    </Overlay>
  );
};

export default ToDoListSearchPopup;

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  filterTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral800,
  },
  ResetTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  notFoundText: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral300,
  },
  recommendTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  cardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    marginVertical: hp(2),
  },
  cradImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingBottom: hp(2),
  },
  image: {
    width: '60@s',
    height: '60@s',
    borderRadius: 25,
  },
  cardTitleView: {
    width: '60%',
    marginHorizontal: wp(5),
  },
  cardHeaderTitle: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '24@s',
  },
  cardHeaderSubTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },

  barStyle: {
    backgroundColor: Colors.Success500,
    borderRadius: 50,
    width: '100%',
    height: '9@s',
    marginTop: hp(2),
  },
  barBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: '20@s',
  },
  accepTitle: {
    color: Colors.Neutral700,
    fontSize: '10@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  waitingTitle: {
    color: Colors.Neutral900,
    fontSize: '10@s',
    fontWeight: '700',
    lineHeight: '20@s',
  },
  button: {
    height: hp(6.5),
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: hp(2),
  },
  buttonTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  buttonSubTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '11@s',
    fontWeight: '400',
    paddingTop: hp(0.2),
  },
  dropdownView: {
    marginTop: hp(2),
  },
  shhowingTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
  },
  placeholderStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  iconStyle: {
    tintColor: Colors.Neutral800,
  },
  itemTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  dueDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderRadius: 7,
    marginTop: hp(1),
  },
  dueTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '400',
  },
  dueTitleSec: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '600',
  },
});
