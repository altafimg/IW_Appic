import React from 'react';
import {Share, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import SecPrimaryButton from '../../buttons/SecPrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ReferralsEarningsCard = props => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View>
      <View style={styles.copyUrlView}>
        <Text style={styles.copyUniqueTitle}>
          {AppLocalizedStrings.referralsScreen.youUnique}
        </Text>
        <TouchableOpacity style={styles.urlView} onPress={onShare}>
          <Text style={styles.urlTitle}>https://i-w.app/loremipsu</Text>
          <SVG.CopyIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.earningsCardMain}>
        <Text style={styles.earningsTitleHeader}>
          {AppLocalizedStrings.referralsScreen.earnings}
        </Text>
        <Text style={styles.earningsTitleSub}>
          {AppLocalizedStrings.referralsScreen.already}
        </Text>
        <View style={styles.totalMain}>
          <View style={styles.totalView}>
            <Text style={styles.earningsTitle}>
              {AppLocalizedStrings.referralsScreen.totalEarnings}
            </Text>
            <Text style={styles.earningsTitle}>$ 1,204.00</Text>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.earningsTitle}>
              {AppLocalizedStrings.referralsScreen.inThePost}
            </Text>
            <Text style={styles.earningsTitle}>$ 100.00</Text>
          </View>
        </View>
        <SecPrimaryButton
          title={AppLocalizedStrings.referralsScreen.viewAll}
          onPress={props.onAllReferralsHandler}
        />
      </View>
    </View>
  );
};

export default ReferralsEarningsCard;

const styles = ScaledSheet.create({
  copyUrlView: {
    backgroundColor: Colors.Primary500,
    height: '73@s',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    marginTop: hp(-3),
    borderRadius: 5,
  },
  copyUniqueTitle: {
    color: Colors.White,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '23@s',
  },
  urlView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingRight: wp(3),
  },
  earningsCardMain: {
    marginTop: hp(4),
  },
  earningsTitleHeader: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
    lineHeight: '22@s',
  },
  earningsTitleSub: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  totalMain: {
    marginVertical: hp(2),
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(0.6),
  },
  earningsTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
