import React, {useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import ToDoUpComingQuickAdsSkeleton from '../../skeleton/ToDoUpComingQuickAdsSkeleton';
import {getJobsByApplicantIdAction} from '../../../redux/actions/getJobsByApplicantIdAction';
import {ScaledSheet} from 'react-native-size-matters';

const UpcomingComponent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {_id} = useSelector(
    state => state.getLoggedInUserProfileReducer.data?.data?.data || '',
  );

  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;
  const token = useSelector(state => state.loginReducer?.token);
  const loading = useSelector(
    state => state.getJobsByApplicantIdReducer.loading,
  );

  const applicantJobs = useSelector(
    state => state.getJobsByApplicantIdReducer.data?.data?.data,
  );

  const applicants_id = useSelector(
    state => state.loginReducer?.user?.data?.data?._id,
  );

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(() => {
    const data = {
      token: token,
      _id: applicants_id,
    };
    dispatch(getJobsByApplicantIdAction(data));
  }, [dispatch, token, applicants_id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const onCompleteJobHandler = adsId => {
    navigation.navigate('ToDoJobDetailsScreen', {
      adsId: adsId,
      check: 'notComplete',
    });
  };

  const renderItem = ({item}) => {
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
    const totalWidth = scale(270);
    const segmentWidth = totalWidth / 3;

    return (
      <View>
        {props.selectedDate ? (
          <View
            style={{
              borderColor: Colors.Primary500,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 25,
              flexDirection: 'row',
              alignContent: 'center',
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: Colors.Primary500,
                marginRight: 10,
              }}>
              {moment(props.selectedDate).format('DD MMM YYYY')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.setSelectedDate('');
              }}>
              <View>
                <SVG.CloseCross
                  width={21}
                  height={21}
                  color={Colors.Primary500}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
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
          </View>

          <View style={styles.dueDateView}>
            <Text style={styles.dueTitle}>Due Date:</Text>
            <Text style={styles.dueTitleSec}>in {daysLeft} Days</Text>
          </View>

          <TouchableOpacity
            onPress={() => onCompleteJobHandler(item?._id)}
            style={styles.button}>
            <Text style={styles.buttonTitle}>Complete it now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const filteredApplicantsData = (applicantJobs || [])
    .filter(item =>
      item?.applicants?.some(
        applicant =>
          applicant?.applicants_id?._id === _id &&
          applicant?.status === 'in progress',
      ),
    )
    .filter(item => {
      if (props.selectedDate) {
        const taskStartDate = moment(item.task_start_date).format(
          'DD MMMM YYYY',
        );
        const selectedDateFormatted = moment(props.selectedDate).format(
          'DD MMMM YYYY',
        );
        return taskStartDate === selectedDateFormatted;
      }
      return true;
    })

    .filter(item => {
      const today = moment();
      const taskStartDate = moment(item.task_start_date);
      return taskStartDate.isSameOrAfter(today, 'day');
    });

  return (
    <View>
      <EnterAppTopButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        title1="Upcoming"
        title2="Finished"
      />
      <View style={styles.container}>
        {loading ? (
          <>
            <ToDoUpComingQuickAdsSkeleton />
            <ToDoUpComingQuickAdsSkeleton />
          </>
        ) : filteredApplicantsData?.length > 0 ? (
          <>
            <View style={styles.headerTitleView}>
              <Text style={styles.dateTitle}>
                {moment().format('dddd DD MMMM YYYY')}
              </Text>
              <Text style={styles.dateTitle}>Today</Text>
            </View>
            <FlatList
              data={filteredApplicantsData}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </>
        ) : (
          <View style={styles.containerSec}>
            <SVG.DontHaveID />
            <View style={styles.titleView}>
              <Text style={styles.text1}>All clear</Text>
              <Text style={styles.text2}>
                {`Just checked \n There’s nothing here`}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default UpcomingComponent;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: wp(4),
  },
  containerSec: {
    alignItems: 'center',
    marginTop: '100@s',
  },
  allClearView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleView: {
    marginTop: hp(4),
  },
  text1: {
    color: Colors.Neutral900,
    fontWeight: '600',
    fontSize: '23@s',
    lineHeight: 27,
    marginVertical: hp(1),
    textAlign: 'center',
  },
  text2: {
    color: Colors.Neutral700,
    fontWeight: '400',
    fontSize: '13@s',
    lineHeight: 23,
    textAlign: 'center',
  },
  headerTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  dateTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '500',
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
    paddingBottom: hp(2),
  },
  image: {
    width: '60@s',
    height: '60@s',
    borderRadius: 10,
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
    textTransform: 'capitalize',
  },
  cardHeaderSubTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },
  barMainView: {
    marginTop: hp(0.5),
  },
  barStyle: {
    backgroundColor: Colors.Primary500,
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
    backgroundColor: Colors.Primary500,
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
    textAlign: 'center',
    color: Colors.White,
    fontSize: '11@s',
    fontWeight: '400',
    paddingTop: hp(0.2),
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
