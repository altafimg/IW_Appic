import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import TimeZone from '../../TimeZone';
import UtcDateConvert from '../../UtcDateConvert';
import UtcTimeConvert from '../../UtcTimeConvert';
import UtcTimeZoneConvert from '../../UtcTimeZoneConvert';
import {Divider} from 'react-native-elements';

const ToDoDetailsReceiptComponent = props => {
  const {data, loading, jobstatus, status} = props;
  const {bio, particularPrice} = data || {};
  const allData = data?.applicants[0]?.applicants_id;

  return (
    <>
      {/* {loading ? (
        <View style={styles.loaderMainView}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : ''}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.loaderMainView}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'completed'
                ? 'Job completed'
                : jobstatus === 'cancel'
                ? 'Cancelled by the Influencer'
                : jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'cancelByCustomer'
                ? 'This job was cancelled by the customer'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : ''}
            </Text>
          </View>
          <View>
            <View style={styles.dueDateView}>
              <Text style={styles.dueTitle}>Due Date:</Text>
              <Text style={styles.dueTitleSec}>
                {`${UtcDateConvert(data?.utcTimeDate)} ${UtcTimeConvert(
                  data?.utcTimeDate,
                )} ${UtcTimeZoneConvert(data?.timeZone)}`}
              </Text>
            </View>
          </View>
        </>
      )} */}
      <View style={styles.statusView}>
        <Text style={styles.statusViewText}>{status}</Text>
      </View>
      <View style={styles.dueDateMainView}>
        <View style={styles.dueDateMainViewSec}>
          <Text style={styles.dueDateMainViewSecText}>Published:</Text>
          <Text style={styles.dateTitleText}>
            {UtcDateConvert(data?.timestamp)}
            {`${UtcTimeConvert(data?.timestamp)} ${UtcTimeZoneConvert(
              data?.timestamp,
            )}`}
          </Text>
        </View>
        <Divider style={styles.Divider} />
        <View style={styles.dueDateMainViewSec}>
          <Text style={styles.dueDateMainViewSecText}>Due date:</Text>
          <Text style={styles.dateTitleText}>
            {UtcDateConvert(data?.utcTimeDate)}
            {`${UtcTimeConvert(data?.utcTimeDate)} ${UtcTimeZoneConvert(
              data?.utcTimeDate,
            )}`}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>Receipt:</Text>
          <Text style={styles.dateTitle}>{TimeZone(allData?.timestamp)}</Text>
        </View>
        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>ID:</Text>
          <Text style={styles.dateTitle}>3250854</Text>
        </View>

        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>Service: QuickAds</Text>
          <Text style={styles.dateTitle}>{bio}</Text>
        </View>
        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>Customer:</Text>
          <Text style={styles.appleTitle}>
            {data?.user_id?.profile_name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Text>
        </View>
        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>Earning:</Text>
          <Text style={styles.appleTitle}>{'$' + particularPrice}</Text>
        </View>
        <View style={styles.cradView}>
          <Text style={styles.cardHeaderTitle}>Status:</Text>
          <Text style={[styles.appleTitle, {width: '50%', textAlign: 'right'}]}>
            Fund in Escrow You will get paid upon delivery
          </Text>
        </View>
        {/* <View style={styles.cradView}>
          <View style={styles.cradHeaderView}>
            <Text style={styles.cardHeaderTitle}>Payment</Text>
            <Text style={styles.cardHeaderTitle}>{'$' + particularPrice}</Text>
          </View>
          <Text style={styles.dateTitle}>
            {`Status: Funds in Escrow\nYou will get paid upon delivery`}
          </Text>
        </View> */}
        {/* <View style={styles.cradViewSec}>
          <Text style={styles.cardHeaderTitle}>Need help?</Text>
          <Text style={styles.appleTitle}>Contact support</Text>
        </View> */}
      </View>
      <View>
        <TouchableOpacity style={styles.dueDateView}>
          <Text style={styles.dueTitleNeedHelp}>Need help?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ToDoDetailsReceiptComponent;

const styles = ScaledSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: hp(2),
    borderWidth: 1,
    borderColor: '#E7E7E7',
  },
  cradView: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cradViewSec: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
  },
  cradHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: '24@s',
  },
  viewButton: {
    marginBottom: hp(-0.3),
  },
  viewTitle: {
    color: Colors.Primary500,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  appleTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '20@s',
    textDecorationLine: 'underline',
  },

  loaderMainView: {
    marginTop: hp(2),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    paddingVertical: hp(1),
  },
  progressTitle: {
    color: Colors.Primary400,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  dateTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: '5@s',
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
  dueTitleNeedHelp: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '500',
  },
  statusView: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: hp(2),
    marginTop: hp(2),
  },
  statusViewText: {
    fontWeight: '600',
    fontSize: '14@s',
    color: '#818CF8',
    textAlign: 'center',
  },
  dueDateMainView: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginTop: hp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  dueDateMainViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDateMainViewSecText: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#171717',
  },
  Divider: {
    marginTop: '10@s',
    marginBottom: '10@s',
  },
  dateTitleText: {
    fontWeight: '600',
    fontSize: '13@s',
    color: Colors.Black,
  },
});
