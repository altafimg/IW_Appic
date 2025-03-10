import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import NewHeader from '../../../components/NewHeader';

const HelpCenterScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onSupportHandler = () => {
    navigation.navigate('SupportInboxScreen');
  };
  const onTipsQuickAdsHandler = () => {
    navigation.navigate('TipsQuickAdsScreen');
  };
  const onBlogHandler = () => {
    navigation.navigate('BlogScreen');
  };
  const onFAQHandler = () => {
    navigation.navigate('FAQScreen');
  };
  const onInternationalLawsHandler = () => {
    navigation.navigate('InternationalLawsScreen');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewHeader
          headerTitle={AppLocalizedStrings.helpCenterScreen.helpCenter}
          onPress={onGoBackHandler}
        />
        <View style={styles.topCardMain}>
          <TouchableOpacity
            style={styles.cradView}
            onPress={onTipsQuickAdsHandler}>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.helpCenterScreen.tips}
            </Text>
            <Text style={styles.subTitle}>
              {AppLocalizedStrings.helpCenterScreen.featured}
            </Text>
            <SVG.Question style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomCardMain}>
          <TouchableOpacity
            style={styles.bottomCardView}
            onPress={onBlogHandler}>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.helpCenterScreen.blog}
            </Text>
            <SVG.LeftArrow width={22} height={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomCardView}
            onPress={onFAQHandler}>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.helpCenterScreen.faq}
            </Text>
            <SVG.LeftArrow width={22} height={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomCardView}
            onPress={onInternationalLawsHandler}>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.helpCenterScreen.internationalLaws}
            </Text>
            <SVG.LeftArrow width={22} height={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomCardView}
            onPress={onSupportHandler}>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.helpCenterScreen.chat}
            </Text>
            <SVG.LeftArrow width={22} height={22} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpCenterScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  topCardMain: {
    marginTop: hp(3),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    width: '231@s',
    height: '194@s',
    padding: hp(2),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '24@s',
  },
  subTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  image: {
    marginTop: hp(3),
  },
  bottomCardMain: {
    marginVertical: hp(3),
  },
  bottomCardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
  },
});
