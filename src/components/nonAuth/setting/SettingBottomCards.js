import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {getAccountManagerAction} from '../../../redux/actions/getAccountManagerAction';

const SettingBottomCards = props => {
  const {user_role} =
    useSelector(state => state.loginReducer.user?.data?.data) || {};

  return (
    <View>
      <View style={styles.cardBorderMain}>
        {user_role === 'customer' ||
        user_role === 'influencer' ? null : user_role === 'government' ||
          user_role === 'business' ? (
          <TouchableOpacity
            style={styles.cardButton}
            onPress={props.onAccManageHandler}>
            <View style={styles.cardIconTitleView}>
              <SVG.User />
              <Text style={styles.cardTitle}>
                {AppLocalizedStrings.settingBottomCards.account}
              </Text>
            </View>
            <SVG.LeftArrow width={23} height={23} />
          </TouchableOpacity>
        ) : user_role === 'kid_influencer' ? (
          <TouchableOpacity
            style={styles.cardButton}
            onPress={props.onAccManageHandler}>
            <View style={styles.cardIconTitleView}>
              <SVG.User />
              <Text style={styles.cardTitle}>
                {AppLocalizedStrings.settingBottomCards.parent}
              </Text>
            </View>
            <SVG.LeftArrow width={23} height={23} />
          </TouchableOpacity>
        ) : (
          ''
        )}

        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onEditProfileHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.EditMt />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.editProfile}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBorderMain}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onReferralsHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.Referrals />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.referrals}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onPaymentHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.Payments />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.payments}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBorderMain}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onAnalyticsHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.Analytics />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.analytics}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBorderMain}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onManageServicesHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.ManageServices />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.manageServices}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onLoginSecurityHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.LoginSecurity />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.loginSecurity}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onAccountHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.SocialAccounts />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.socialAccounts}
            </Text>
          </View>
          <SVG.LeftArrow width={23} height={23} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBorderMain}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onHelpAndFaqHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.HelpFAQ />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.help}
            </Text>
          </View>
          <View style={styles.languageTitleView}>
            <SVG.LeftArrow width={23} height={23} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.cardBorderMain}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={props.onLanguageHandler}>
          <View style={styles.cardIconTitleView}>
            <SVG.Language />
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.settingScreen.language}
            </Text>
          </View>
          <View style={styles.languageTitleView}>
            <Text style={styles.languageTitle}>English (US)</Text>
            <SVG.LeftArrow width={23} height={23} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingBottomCards;

const styles = ScaledSheet.create({
  cardBorderMain: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    marginVertical: hp(1),
    marginHorizontal: wp(3),
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardIconTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingHorizontal: wp(2.5),
  },
  languageTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
