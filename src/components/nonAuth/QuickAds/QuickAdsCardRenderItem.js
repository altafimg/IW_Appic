import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {Divider} from 'react-native-elements';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import PlatformIcon from './PlatformIcon';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {getSavedQuickAdsApiAction} from '../../../redux/actions/getSavedQuickAdsApiAction';
import {saveQuickAdsApiAction} from '../../../redux/actions/saveQuickAdsApiAction';
import {removeSavedQuickAdsApiAction} from '../../../redux/actions/removeSavedQuickAdsApiAction';

const QuickAdsCardRenderItem = props => {
  const dispatch = useDispatch();
  const saveLoader = useSelector(state => state.saveQuickAdsApiReducer.loading);
  const removeLoader = useSelector(
    state => state.removeSavedQuickAdsApiReducer.loading,
  );
  const isFocused = useIsFocused();

  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const navigation = useNavigation();
  const item = props.item;

  const language = item?.language;
  const platformData = item?.platform;
  const userId = item?.user_id?._id;

  const [isSaved, setIsSaved] = useState(false);
  const [savingJobId, setSavingJobId] = useState(null);

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        const response = await dispatch(getSavedQuickAdsApiAction(_id));
        const savedAds = response?.data?.data || [];
        const isItemSaved = savedAds.some(ad => ad?.adsId?._id === item._id);

        setIsSaved(isItemSaved);
      };
      fetchData();
    }
  }, [isFocused, item?._id]);

  const onCompleteJobHandler = () => {
    navigation.navigate('StandardQuickAdsScreen', {
      id: item._id,
      user_id: userId,
    });
  };

  const handleSaveItem = async (adsId, userId) => {
    const data = {
      adsId,
      userId,
    };
    setSavingJobId(adsId);
    try {
      const res = await dispatch(saveQuickAdsApiAction(data));
      setIsSaved(true);

      console.log(res?.data);

      await dispatch(getSavedQuickAdsApiAction(_id));
    } catch (err) {
      console.log(err, '<<<<<<<<<<err');
    } finally {
      setSavingJobId(null);
    }
  };

  const handleUnsaveItem = async (adsId, userId) => {
    setSavingJobId(adsId);
    try {
      const res = await dispatch(removeSavedQuickAdsApiAction({adsId, userId}));
      setIsSaved(false);

      console.log(res?.data);

      await dispatch(getSavedQuickAdsApiAction(_id));
    } catch (err) {
      console.log(err, '<<<<<<<<<<err');
    } finally {
      setSavingJobId(null);
    }
  };

  const validApplicants =
    item?.applicants?.filter(applicant => applicant?.status !== 'cancel') || [];

  const remainingSlots = item?.apply_limit - validApplicants.length;

  useEffect(() => {
    remainingSlots;
  }, [remainingSlots]);

  const todayDate = moment().format('DD MMMM YYYY');
  const endDate = moment(item?.task_start_date).format('DD MMMM YYYY');

  const today = moment(todayDate, 'DD MMMM YYYY');
  const end = moment(endDate, 'DD MMMM YYYY');

  const daysLeft = end.diff(today, 'days');

  return (
    <View style={styles.dataCardContainer}>
      <View style={{flexDirection: 'row'}}>
        {item?.thumbnail_picture_ads != null ? (
          <Image
            source={{uri: item.thumbnail_picture_ads}}
            style={styles.cardPhotoStyle}
          />
        ) : (
          <View style={styles.cardPhotoStyle}></View>
        )}

        <View
          style={{
            width: scale(230),
            paddingHorizontal: wp(4),
          }}>
          <Text numberOfLines={1} style={styles.title}>
            {item.quick_ads_title}
          </Text>
          <Text
            numberOfLines={3}
            style={[styles.cardDecStyle, {color: Colors.Neutral500}]}>
            {item.bio}
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
          {language?.length > 1 ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.cardNameStyle}>{item?.language[0]}</Text>
              <Text style={{color: Colors.Neutral500}}>
                {AppLocalizedStrings.quickAdsHomescreen.more}
              </Text>
            </View>
          ) : (
            <Text style={styles.cardNameStyle}>{item?.language[0]}</Text>
          )}
        </View>
      </View>
      <View style={styles.cardDetailContainer}>
        <Text style={styles.cardDecStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Platform}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '82%',
          }}>
          <PlatformIcon platformData={platformData} />
        </View>
        <Image
          source={item.Platform}
          style={{width: scale(24), height: scale(24)}}
        />
      </View>
      <View style={styles.cardDetailContainer}>
        <Text style={styles.cardDecStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Followers}
        </Text>
        <Text style={styles.cardNameStyle}>
          {item.minimum_number_follower_influencer_each}+
        </Text>
      </View>
      <View style={styles.cardDetailContainer}>
        <Text style={styles.cardDecStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Target}
        </Text>
        <Text style={styles.cardNameStyle}>{item.country}</Text>
      </View>
      <Divider style={{paddingVertical: scale(7)}} />

      <View style={styles.cardDetailContainer1}>
        <Text style={styles.cardDecStyle1}>
          {AppLocalizedStrings.quickAdsHomescreen.earning}
        </Text>
        <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
          ${item.particularPrice}
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
            isSaved
              ? handleUnsaveItem(item?._id, _id)
              : handleSaveItem(item?._id, _id)
          }
          style={styles.cardButtonStyle}
          disabled={saveLoader || removeLoader || savingJobId === item?._id}>
          <Text style={styles.cardButtonTextStyle}>
            {saveLoader && savingJobId === item?._id ? (
              <ActivityIndicator color={Colors.Primary500} size={'small'} />
            ) : removeLoader && savingJobId === item?._id ? (
              <ActivityIndicator color={Colors.Primary500} size={'small'} />
            ) : isSaved ? (
              'Unsave'
            ) : (
              AppLocalizedStrings.quickAdsHomescreen.save
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
  );
};

export default QuickAdsCardRenderItem;

const styles = ScaledSheet.create({
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginVertical: hp(2),
    borderRadius: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    // top: hp(35),
  },
  cardPhotoStyle: {
    width: 80,
    height: 80,
    borderRadius: 15,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    backgroundColor: '#F6F5F5',
  },
  langView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: hp(1),
  },
  cardDetailContainer1: {
    backgroundColor: '#D1EBFA',
    marginTop: hp(1.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    height: '36@s',
    borderRadius: 5,
  },
  cardButtonStyle: {
    width: '147@s',
    height: '44@s',
    marginTop: hp(1),
    borderWidth: 2,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '24@s',
    textTransform: 'capitalize',
  },
});
