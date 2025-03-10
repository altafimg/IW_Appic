import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsViewJobComponent from '../../../components/nonAuth/toDoList/DetailsViewJobComponent';
import ToDoJobDetailsProfileView from '../../../components/nonAuth/toDoList/ToDoJobDetailsProfileView';
import {useDispatch, useSelector} from 'react-redux';
import SVG from '../../../assets/svg';
import TimeZone from '../../../components/TimeZone';
import ToDoDetailsDeliveryComponent from '../../../components/nonAuth/toDoList/ToDoDetailsDeliveryComponent';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';
import ToDoDetailsReceiptComponent from '../../../components/nonAuth/toDoList/ToDoDetailsReceiptComponent';

const CompletedJobDetailsScreen = ({navigation, route}) => {
  const {adsId} = route?.params || {};
  const dispatch = useDispatch();

  const token = useSelector(state => state.loginReducer?.token);
  const loading = useSelector(state => state.getJobsByAdsIdReducer.loading);

  const {_id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || '';

  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );

  const applicantData = data?.applicants;

  const matchingItemStatus = applicantData?.find(
    item => item?.applicants_id?._id === _id,
  );
  const status = matchingItemStatus?.status;

  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    fetchAvailableQuickAds();
  }, []);

  const fetchAvailableQuickAds = async () => {
    const data = {
      token: token,
      id: adsId,
    };

    await dispatch(getJobsByAdsIdAction(data));
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <ToDoDetailsDeliveryComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          adsId={adsId}
        />
      );
    } else if (selectedButton === 1) {
      return <ToDoDetailsReceiptComponent adsId={adsId} data={data} />;
    } else {
      return <DetailsViewJobComponent jobsData={data} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <Text style={styles.headerTitle}>Details</Text>
        </View>
        <ToDoJobDetailsProfileView data={data} loading={loading} />
        {loading ? (
          <View style={styles.loaderMainView}>
            <View style={{alignItems: 'center', marginVertical: 30}}>
              <SVG.Loader />
            </View>
          </View>
        ) : (
          <View style={styles.loaderMainView}>
            {status === 'completed' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.CheckCircle />
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <SVG.Loader />
              </View>
            )}

            <Text style={styles.progressTitle}>
              {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </Text>
            <Text style={styles.dateTitle}>
              {'Due ' + TimeZone(data?.task_start_date)}
            </Text>
          </View>
        )}

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

export default CompletedJobDetailsScreen;

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
