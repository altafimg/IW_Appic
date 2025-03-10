import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider} from 'react-native-elements';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PlatformIcon from './PlatformIcon';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as Progress from 'react-native-progress';

const RenderMyQuickItem = props => {
  const navigation = useNavigation('');
  const item = props?.item;
  const platformData = item?.platform;

  const capitalizeFirstLetter = string => {
    if (!string) return;
    return string[0].toUpperCase() + string.slice(1);
  };

  const validApplicants =
    item?.applicants?.filter(applicant => applicant?.status !== 'cancel') || [];

  const remainingSlots = item?.apply_limit - validApplicants.length;

  const todayDate = moment().format('DD MMMM YYYY');
  const endDate = moment(item?.task_start_date).format('DD MMMM YYYY');

  const today = moment(todayDate, 'DD MMMM YYYY');
  const end = moment(endDate, 'DD MMMM YYYY');

  const daysLeft = end.diff(today, 'days');

  return (
    <View style={styles.dataCardContainer}>
      <View style={{width: scale(300)}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item.thumbnail_picture_ads}}
            style={styles.cardPhotoStyle}
          />
          <View
            style={{
              marginHorizontal: 10,
              width: scale(215),
            }}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(item.quick_ads_title)}
            </Text>
            <Text
              numberOfLines={3}
              style={[styles.cardDecStyle, {color: Colors.Neutral500}]}>
              {item.bio}
            </Text>
          </View>
        </View>
        <Divider
          style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
        />
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
        <Divider
          style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
        />
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Language}
          </Text>
          <View style={styles.langView}>
            {item?.language?.length > 1 ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cardNameStyle}>{item?.language[0]}</Text>
                <Text style={{color: Colors.Neutral500}}> More...</Text>
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
          <PlatformIcon platformData={platformData} />
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
          <Text style={styles.cardNameStyle}>{item?.country}</Text>
        </View>
        <Divider
          style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
        />
        <View style={styles.cardDetailContainer1}>
          <Text style={styles.cardDecStyle1}>
            {AppLocalizedStrings.quickAdsHomescreen.pay_offer}
          </Text>
          <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
            ${item.pay_offered}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailScreen', {
              ad_post: item,
            });
          }}>
          <View style={styles.cardButtonStyle}>
            <Text style={styles.cardButtonTextStyle}></Text>
            <Text style={styles.cardButtonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.update}
            </Text>
            <Text style={styles.numberTextStyle}>
              {item?.applicants?.length}
              {/* {buttonValueUpdate} */}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: scale(15)}}>
          <Progress.Bar
            progress={
              item?.adsStatus === 'in progress'
                ? 0.5
                : item?.adsStatus === 'completed'
                ? 1
                : item?.adsStatus === 'Partially completed'
                ? 1
                : item?.adsStatus === 'cancel'
                ? 1
                : item?.adsStatus === 'Failed to deliver'
                ? 1
                : item?.adsStatus === 'expired'
                ? 1
                : 0
            }
            width={scale(290)}
            color={
              item?.adsStatus === 'in progress'
                ? Colors.Primary500
                : item?.adsStatus === 'completed'
                ? Colors.Success500
                : item?.adsStatus === 'Partially completed'
                ? Colors.Success500
                : item?.adsStatus === 'cancel'
                ? Colors.red
                : item?.adsStatus === 'Failed to deliver'
                ? Colors.red
                : item?.adsStatus === 'expired'
                ? Colors.red
                : 0
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: scale(7),
            }}>
            <Text style={styles.progresBarTitle}>
              {AppLocalizedStrings.quickAdsHomescreen.published}
            </Text>
            <Text style={styles.progresBarTitle}>
              {AppLocalizedStrings.quickAdsHomescreen.processing}
            </Text>
            <Text style={styles.progresBarTitle}>
              {item?.adsStatus === 'completed'
                ? 'completed'
                : item?.adsStatus === 'Partially completed'
                ? 'Partially completed'
                : item?.adsStatus === 'cancel'
                ? 'Refunded'
                : item?.adsStatus === 'Failed to deliver'
                ? 'Failed to deliver'
                : item?.adsStatus === 'expired'
                ? 'Expired'
                : 'Completed'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderMyQuickItem;

const styles = ScaledSheet.create({
  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginTop: '15@s',
    paddingHorizontal: '12@s',
    borderRadius: '5@s',
    alignSelf: 'center',
    paddingTop: '15@s',
    paddingBottom: '15@s',
    alignItems: 'center',
    width: '100%',
    top: hp(41),
  },
  cardPhotoStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '15@s',
    borderColor: '#D3D3D3',
    borderWidth: 1,
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
  cardDecStyle1: {
    color: Colors.Neutral800,
    fontWeight: '400',
    fontSize: '16@s',
  },
  cardButtonStyle: {
    height: '54@s',
    marginTop: '10@s',
    borderWidth: 2,
    borderColor: Colors.Primary500,
    borderRadius: '5@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  numberTextStyle: {
    backgroundColor: Colors.Primary500,
    height: '20@s',
    width: '20@s',
    borderRadius: '100@s',
    color: Colors.White,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '24@s',
    textTransform: 'capitalize',
  },
  progresBarTitle: {
    color: Colors.Black,
  },
});
