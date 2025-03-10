import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsDeliveryComponent from '../../../components/nonAuth/toDoList/DetailsDeliveryComponent';
import DetailsReceiptComponent from '../../../components/nonAuth/toDoList/DetailsReceiptComponent';
import DetailsViewJobComponent from '../../../components/nonAuth/toDoList/DetailsViewJobComponent';
import ToDoJobDetailsProfileView from '../../../components/nonAuth/toDoList/ToDoJobDetailsProfileView';
import {useDispatch, useSelector} from 'react-redux';
import {jobDetailsAction} from '../../../redux/actions/jobDetailsAction';
import UtcDateConvert from '../../../components/UtcDateConvert';
import UtcTimeConvert from '../../../components/UtcTimeConvert';
import UtcTimeZoneConvert from '../../../components/UtcTimeZoneConvert';

const JobDetailsScreen = ({route}) => {
  const navigation = useNavigation('');
  const dispatch = useDispatch();

  const item = route.params;
  const [selectedButton, setSelectedButton] = useState(0);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const token = useSelector(state => state.loginReducer?.token);
  const id = item?.item?.adsId?._id;
  const adsId = item?.item?.adsId?._id;

  const onViewJobsHandler = () => {
    dispatch(jobDetailsAction({token, id}));
  };

  useEffect(() => {
    onViewJobsHandler();
  }, []);

  const userData = useSelector(
    state => state.jobDetailsReducer?.data?.data?.data,
  );
  const loading = useSelector(state => state.jobDetailsReducer.loading);
  const applicants_id = userData?.applicants[0]?._id;
  console.log(applicants_id, '!@#$%^&*()_)(*&');

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <DetailsDeliveryComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          // adsId={adsId}
          // check={check}
          // applicants_id={applicants_id}
        />
      );
    } else if (selectedButton === 1) {
      return <DetailsReceiptComponent />;
    } else {
      return <DetailsViewJobComponent jobsData={userData} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <Text style={styles.headerTitle}>Details</Text>
        </View>
        <ToDoJobDetailsProfileView data={userData} loading={loading} />
        <View style={styles.loaderMainView}>
          <ActivityIndicator size={'small'} color={Colors.Primary500} />
          <Text style={styles.progressTitle}>In progress</Text>
          <Text style={styles.dateTitle}>
            {`Due ` +
              UtcDateConvert(userData?.utcTimeDate) +
              ' ' +
              UtcTimeConvert(userData?.utcTimeDate) +
              ' ' +
              UtcTimeZoneConvert(userData?.timeZone)}
          </Text>
        </View>
        <View style={styles.topTabMainView}>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 0 ? Colors.Primary500 : Colors.Neutral100,
              },
            ]}
            onPress={() => setSelectedButton(0)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 0 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 1 ? Colors.Primary500 : Colors.Neutral100,
              },
            ]}
            onPress={() => setSelectedButton(1)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 1 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              Receipt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topTabButtonView,
              {
                backgroundColor:
                  selectedButton === 2 ? Colors.Primary500 : Colors.Neutral100,
              },
            ]}
            onPress={() => setSelectedButton(2)}>
            <Text
              style={[
                styles.topTabButtonTitle,
                {
                  color:
                    selectedButton === 2 ? Colors.White : Colors.Neutral600,
                },
              ]}>
              View job
            </Text>
          </TouchableOpacity>
        </View>
        <HandleButtonClick />
      </ScrollView>
    </View>
  );
};

export default JobDetailsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '500',
    paddingHorizontal: wp(3),
  },
  loaderMainView: {
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  progressTitle: {
    color: Colors.Neutral900,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  dateTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '500',
    textAlign: 'center',
  },
  // {Top Tab }
  topTabMainView: {
    backgroundColor: Colors.Neutral100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36@s',
    paddingHorizontal: wp(1),
    borderRadius: 5,
    marginVertical: hp(1),
  },
  topTabButtonView: {
    backgroundColor: Colors.Primary500,
    flex: 1,
    height: '28@s',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  topTabButtonTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '500',
    textAlign: 'center',
  },
});
