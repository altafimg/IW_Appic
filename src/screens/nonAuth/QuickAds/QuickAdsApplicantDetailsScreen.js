import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsDeliveryComponent from '../../../components/nonAuth/toDoList/DetailsDeliveryComponent';
import DetailsViewJobComponent from '../../../components/nonAuth/toDoList/DetailsViewJobComponent';
import {useDispatch, useSelector} from 'react-redux';
import SVG from '../../../assets/svg';
import TimeZone from '../../../components/TimeZone';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';
import ToDoDetailsReceiptComponent from '../../../components/nonAuth/toDoList/ToDoDetailsReceiptComponent';
import QuickAdsApplicantProfileView from '../../../components/nonAuth/QuickAds/QuickAdsApplicantProfileView';
import UtcDateConvert from '../../../components/UtcDateConvert';
import UtcTimeConvert from '../../../components/UtcTimeConvert';
import UtcTimeZoneConvert from '../../../components/UtcTimeZoneConvert';

const QuickAdsApplicantDetailsScreen = ({navigation, route}) => {
  const {adsId, check, applicants_id} = route?.params || {};
  const dispatch = useDispatch();

  const token = useSelector(state => state.loginReducer?.token);
  const loading = useSelector(state => state.getJobsByAdsIdReducer.loading);

  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );

  const applicantData = data?.applicants;

  const matchingItemStatus = applicantData?.find(
    item => item?.applicants_id?._id === applicants_id?._id,
  );

  const status = matchingItemStatus?.status;

  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    fetchAvailableQuickAds();
  }, []);

  const fetchAvailableQuickAds = async () => {
    const fetchData = {
      token: token,
      id: adsId,
    };

    await dispatch(getJobsByAdsIdAction(fetchData));
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <DetailsDeliveryComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          adsId={adsId}
          check={check}
          applicants_id={applicants_id}
          status={status}
        />
      );
    } else if (selectedButton === 1) {
      return (
        <ToDoDetailsReceiptComponent
          adsId={adsId}
          data={data}
          check={check}
          status={status}
        />
      );
    } else {
      return (
        <DetailsViewJobComponent
          jobsData={data}
          check={check}
          jobstatus={status}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <Text style={styles.headerTitle}>Details</Text>
        </View>
        <QuickAdsApplicantProfileView
          data={matchingItemStatus}
          loading={loading}
        />
        {/* {loading ? (
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
            ) : status === 'cancel' ? (
              <View style={{alignItems: 'center'}}>
                <SVG.Cancel />
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <SVG.Loader />
              </View>
            )}

            <Text style={styles.progressTitle}>
              {status === 'completed'
                ? 'Job completed'
                : status === 'cancel'
                ? 'Cancelled by the Influencer'
                : status === 'cancelByCustomer'
                ? 'This job was cancelled by the customer'
                : status === 'in progress'
                ? 'In progress'
                : ''}
            </Text>

            <Text style={styles.dateTitle}>
              {`Due ` +
                UtcDateConvert(data?.utcTimeDate) +
                ' ' +
                UtcTimeConvert(data?.utcTimeDate) +
                ' ' +
                UtcTimeZoneConvert(data?.timeZone)}
            </Text>

            {status === 'completed' ? (
              <Text style={styles.dateTitle}>
                {`Delivered ` +
                  UtcDateConvert(matchingItemStatus?.completeDate) +
                  ' ' +
                  UtcTimeConvert(matchingItemStatus?.completeDate) +
                  ' ' +
                  UtcTimeZoneConvert(matchingItemStatus?.completeDate)}
              </Text>
            ) : (
              ''
            )}
          </View>
        )} */}

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
              {/* QuickAd */}
              View Jobs
            </Text>
          </TouchableOpacity>
        </View>
        <HandleButtonClick />
      </ScrollView>
    </View>
  );
};

export default QuickAdsApplicantDetailsScreen;

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
    marginVertical: '5@s',
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
    marginTop: hp(3),
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
