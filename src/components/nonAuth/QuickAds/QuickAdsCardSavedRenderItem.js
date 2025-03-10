import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../../theme/Colors';
import PlatformIcon from './PlatformIcon';
import {useDispatch, useSelector} from 'react-redux';
import {getSavedQuickAdsApiAction} from '../../../redux/actions/getSavedQuickAdsApiAction';
import {ActivityIndicator} from 'react-native-paper';
import {removeSavedQuickAdsApiAction} from '../../../redux/actions/removeSavedQuickAdsApiAction';
import moment from 'moment';
import {jobDetailsAction} from '../../../redux/actions/jobDetailsAction';

const QuickAdsCardSavedRenderItem = props => {
  const dispatch = useDispatch();
  const item = props.item || {};
  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const removeLoader = useSelector(
    state => state.removeSavedQuickAdsApiReducer.loading,
  );

  const [removingJobId, setRemovingJobId] = useState(null);

  const navigation = useNavigation();

  const handleRemoveFromCart = async (adsId, userId) => {
    const data = {
      adsId,
      userId,
    };
    setRemovingJobId(adsId);
    try {
      const res = await dispatch(removeSavedQuickAdsApiAction(data));
      console.log(res?.data, ':::::');
      if (res?.status === 200) {
        await dispatch(getSavedQuickAdsApiAction(_id));
        console.log(res?.status, ':::::');
      }
    } catch (err) {
      console.log(err, '<<<<<err');
    } finally {
      setRemovingJobId(null);
    }
  };

  console.log(item._id, '{{{{{{{{');

  const onCompleteJobHandler = () => {
    // navigation.navigate('JobDetailsScreen', {item: item});
    navigation.navigate('StandardQuickAdsScreen', {
      id: item._id,
      user_id: item?.userId?._id,
    });
  };

  const validApplicants =
    item?.adsId?.applicants?.filter(
      applicant => applicant?.status !== 'cancel',
    ) || [];

  const remainingSlots = item?.adsId?.apply_limit - validApplicants.length;

  const todayDate = moment().format('DD MMMM YYYY');
  const endDate = moment(item?.adsId?.task_start_date).format('DD MMMM YYYY');

  const today = moment(todayDate, 'DD MMMM YYYY');
  const end = moment(endDate, 'DD MMMM YYYY');

  const daysLeft = end.diff(today, 'days');

  return (
    <View style={styles.dataCardContainer}>
      <View style={{width: scale(300)}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item?.adsId?.thumbnail_picture_ads}}
            style={styles.cardPhotoStyle}
          />
          <View
            style={{
              marginHorizontal: 10,
              width: scale(215),
              paddingHorizontal: 5,
            }}>
            <Text
              style={[styles.cardNameStyle, {fontSize: scale(16), bottom: 3}]}>
              {item?.adsId?.quick_ads_title}
            </Text>
            <Text
              numberOfLines={3}
              style={[styles.cardDecStyle, {color: Colors.Neutral500}]}>
              {item?.adsId?.bio}
            </Text>
          </View>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Spaces_remaining}
          </Text>
          <Text style={styles.cardNameStyle}>{remainingSlots}</Text>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.daysLeft}
          </Text>
          <Text style={styles.cardNameStyle}>{daysLeft}</Text>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Language}
          </Text>
          <View style={styles.langView}>
            <Text style={styles.cardNameStyle}>{item?.adsId?.language[0]}</Text>
            {/* {item?.adsId?.language?.length > 1 ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cardNameStyle}>{item?.language[0]}</Text>
                {AppLocalizedStrings.quickAdsHomescreen.more}
                <Text style={{color: Colors.Neutral500}}></Text>
              </View>
            ) : (
              <Text style={styles.cardNameStyle}>
                {item?.adsId?.language[0]}
              </Text>
            )} */}
          </View>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Platform}
          </Text>
          <PlatformIcon platformData={item?.adsId?.platform} />
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Followers}
          </Text>
          <Text style={styles.cardNameStyle}>
            {item?.adsId?.minimum_number_follower_influencer_each}
          </Text>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Target}
          </Text>
          <Text style={styles.cardNameStyle}>{item?.adsId?.target}</Text>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />

        <View style={styles.cardDetailContainer1}>
          <Text style={styles.cardDecStyle1}>
            {AppLocalizedStrings.quickAdsHomescreen.earning}
          </Text>
          <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
            ${item?.adsId?.pay_offered}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(10),
          }}>
          <TouchableOpacity
            onPress={() =>
              handleRemoveFromCart(item?.adsId?._id, item?.userId?._id)
            }
            style={styles.cardButtonStyle}>
            <Text style={styles.cardButtonTextStyle}>
              {removeLoader && removingJobId === item?.adsId?._id ? (
                <ActivityIndicator color={Colors.Primary500} size={'small'} />
              ) : (
                AppLocalizedStrings.quickAdsHomescreen.unSave
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onCompleteJobHandler}
            style={[
              styles.cardButtonStyle,
              {backgroundColor: Colors.Primary500},
            ]}>
            <Text
              style={[
                styles.cardButtonTextStyle,
                {
                  color: Colors.White,
                },
              ]}>
              {AppLocalizedStrings.quickAdsHomescreen.View}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuickAdsCardSavedRenderItem;

const styles = ScaledSheet.create({
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginTop: '15@s',
    padding: '7@s',
    borderRadius: '5@s',
    alignSelf: 'center',
    paddingBottom: '15@s',
    paddingTop: '15@s',
    alignItems: 'center',
    width: '100%',
  },
  cardPhotoStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '15@s',
  },
  cardNameStyle: {
    color: Colors.Neutral800,
    fontWeight: '600',
    fontSize: '14@s',
  },
  cardDecStyle: {
    color: Colors.Neutral600,
    fontWeight: '400',
    fontSize: '14@s',
  },
  cardDecStyle1: {
    color: Colors.Neutral800,
    fontWeight: '400',
    fontSize: '16@s',
  },
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5@s',
    marginVertical: '8@s',
  },
  cardDetailContainer1: {
    backgroundColor: '#D1EBFA',
    marginTop: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5@s',
    height: '36@s',
    borderRadius: '5@s',
  },
  cardButtonStyle: {
    width: '147@s',
    height: '47@s',
    marginTop: '10@s',
    borderWidth: 2,
    borderColor: Colors.Primary500,
    borderRadius: '5@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
  langView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
