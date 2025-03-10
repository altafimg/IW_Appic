import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';

const InternationalLawsScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onBookmarkedHandler = () => {
    navigation.navigate('SavedTopicsScreen');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.internationalLawsScreen.IntLaws}
        </Text>
        <TouchableOpacity onPress={onBookmarkedHandler}>
          <Text style={styles.headerSubTitle}>
            {AppLocalizedStrings.internationalLawsScreen.bookmarkedTopics}
          </Text>
        </TouchableOpacity>
      </View>
      <DetailsTextInput placeholder="Search" />
      <View style={styles.topCardMain}>
        <TouchableOpacity style={styles.cradView}>
          <Text style={styles.cardTitle}>
            {AppLocalizedStrings.internationalLawsScreen.advertising}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.internationalLawsScreen.influencerGuidelines}
          </Text>
          <SVG.Question style={styles.image} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.bottomCradView}>
          <View>
            <Text style={styles.bottomCardTitle}>
              {AppLocalizedStrings.internationalLawsScreen.australianNews}
            </Text>
            <Text style={styles.bottomCradSubTitle}>
              {AppLocalizedStrings.internationalLawsScreen.lorem}
            </Text>
          </View>
          <SVG.LeftArrow width={22} height={22} />
        </View>
        <View style={styles.bottomCradView}>
          <View>
            <Text style={styles.bottomCardTitle}>
              {AppLocalizedStrings.internationalLawsScreen.denmark}
            </Text>
            <Text style={styles.bottomCradSubTitle}>
              {AppLocalizedStrings.internationalLawsScreen.lorem}
            </Text>
          </View>
          <SVG.LeftArrow width={22} height={22} />
        </View>
        <View style={styles.bottomCradView}>
          <View>
            <Text style={styles.bottomCardTitle}>Canada</Text>
            <Text style={styles.bottomCradSubTitle}>
              {AppLocalizedStrings.internationalLawsScreen.lorem}
            </Text>
          </View>
          <SVG.LeftArrow width={22} height={22} />
        </View>
      </View>
    </View>
  );
};

export default InternationalLawsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(1),
  },
  headerSubTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  topCardMain: {
    marginVertical: hp(2),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    width: '231@s',
    height: '194@s',
    padding: hp(2),
  },
  cardTitle: {
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
  bottomCradView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingBottom: hp(2),
    marginTop: hp(2),
  },
  bottomCardTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    paddingBottom: hp(0.6),
  },
  bottomCradSubTitle: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
  },
});
