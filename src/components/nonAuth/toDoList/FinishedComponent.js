import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import SVG from '../../../assets/svg';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const FinishedComponent = props => {
  const navigation = useNavigation();
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;

  const {_id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || '';
  const applicantJobs = useSelector(
    state => state.getJobsByApplicantIdReducer.data?.data?.data,
  );

  const applicantsData = applicantJobs?.filter(
    item =>
      !item?.applicants?.some(
        applicant =>
          applicant?.applicants_id?._id === _id &&
          applicant?.status === 'in progress',
      ),
  );

  const [statusValue, setStatusValue] = useState('All');

  const data = [
    {label: 'All', value: 'All'},
    {label: 'Completed', value: 'completed'},
    // {label: 'Cancelled', value: 'cancelByInfluencer'},
    {label: 'Cancelled', value: 'cancel'},
    {label: 'You failed to deliver', value: 'failedTodeliver'},
    // { label: 'Expired', value: 'expired' },
  ];

  const filteredData = applicantsData?.filter(item => {
    const applicantData = item?.applicants?.find(
      i => i?.applicants_id?._id === _id,
    );
    const applicantDataStatus = applicantData?.status || '';
    const taskStartDate = moment(item?.task_start_date).format('YYYY-MM-DD');

    // Filter by status
    const statusFilter =
      statusValue === 'All' || applicantDataStatus === statusValue;
    // Filter by selected date
    const dateFilter =
      !props.selectedDate ||
      taskStartDate === moment(props.selectedDate).format('YYYY-MM-DD');

    return statusFilter && dateFilter;
  });

  const onCompleteJobHandler = adsId => {
    navigation.navigate('ToDoJobDetailsScreen', {
      adsId: adsId,
      check: 'complete',
    });
  };

  const renderItem = ({item}) => {
    const applicantData = item?.applicants?.find(
      i => i?.applicants_id?._id === _id,
    );

    const applicantDataStatus = applicantData?.status || '';
    return (
      <View style={styles.cardView}>
        <View style={styles.cradImageView}>
          <Image
            source={{uri: item?.thumbnail_picture_ads}}
            style={styles.image}
          />
          <View style={styles.cardTitleView}>
            <Text style={styles.cardHeaderTitle}>{item?.quick_ads_title}</Text>
            <Text style={styles.cardHeaderSubTitle}>{item?.bio}</Text>
          </View>
        </View>
        {/* <View style={styles.barMainView}>
          <Progress.Bar
            progress={1}
            width={scale(290)}
            color={applicantDataStatus === 'completed'? Colors.Success500 :applicantDataStatus === 'cancel'? Colors.Neutral400:  }
          />
          <View style={styles.barBottomView}>
            <Text style={styles.accepTitle}>Accepted</Text>
            <Text style={styles.accepTitle}>Waiting for you to complete</Text>
            <Text style={styles.waitingTitle}>Get Paid</Text>
          </View>
        </View> */}
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  applicantDataStatus === 'cancel' ||
                  applicantDataStatus === 'cancelByCustomer'
                    ? Colors.Neutral400
                    : Colors.Success500,
              },
            ]}
            onPress={() => onCompleteJobHandler(item?._id)}>
            <Text style={styles.buttonTitle}>
              {applicantDataStatus === 'cancel' ||
              applicantDataStatus === 'cancelByCustomer'
                ? 'Cancelled'
                : applicantDataStatus === 'completed'
                ? 'Completed'
                : 'Failed to deliver'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <EnterAppTopButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        title1="Upcoming"
        title2="Finished"
      />

      <View style={styles.container}>
        {applicantsData?.length > 0 ? (
          <>
            <View style={styles.dropdownView}>
              <Text style={styles.shhowingTitle}>Showing</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select status"
                value={statusValue}
                onChange={item => {
                  setStatusValue(item.value);
                }}
              />
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.dateTitle}>
                {moment().format('dddd DD MMMM YYYY')}
              </Text>
              <Text style={styles.dateTitle}>Today</Text>
            </View>

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

            {filteredData?.length > 0 ? (
              <FlatList data={filteredData} renderItem={renderItem} />
            ) : (
              <View style={styles.containerSec}>
                <SVG.DontHaveID />
                <View style={styles.titleView}>
                  <Text style={styles.text1}>All clear</Text>
                  <Text style={styles.text2}>
                    Just checked There’s nothing here
                  </Text>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.containerSec}>
            <SVG.DontHaveID />
            <View style={styles.titleView}>
              <Text style={styles.text1}>All clear</Text>
              <Text style={styles.text2}>
                Just checked There’s nothing here
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default FinishedComponent;

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
    lineHeight: 18,
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
    // alignItems: 'center',
    flexWrap: 'wrap',
    // borderBottomWidth: 1,
    // borderColor: Colors.Neutral200,
    // paddingBottom: hp(2),
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
    textTransform: 'capitalize',
  },
  cardHeaderSubTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '18@s',
  },
  barMainView: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
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
  // {}
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
});
