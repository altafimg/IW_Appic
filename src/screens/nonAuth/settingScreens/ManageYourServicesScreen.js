import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import OnOffIndigaterCard from '../../../components/nonAuth/setting/OnOffIndigaterCard';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ManageYourServicesScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onAdvertisementsHandler = () => {
    navigation.navigate('AdvertisementSettingsScreen');
  };
  const onActingServicesHandler = () => {
    navigation.navigate('ActingServicesSettingsScreen');
  };
  const onBookingSettingHandler = () => {
    navigation.navigate('BookingSettingsScreen');
  };
  const onLicensingDealHandler = () => {
    navigation.navigate('LicensingDealSettingsScreen');
  };
  const onMySpecialRequirementHandler = () => {
    navigation.navigate('MySpecialRequirementsScreen');
  };
  const onPostalAddressHandler = () => {
    navigation.navigate('PostalAddressScreen');
  };
  const onMusicServicesSettingsHandler = () => {
    navigation.navigate('MusicServicesSettingsScreen');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          <TouchableOpacity>
            <Text style={styles.helpTitle}>
              {AppLocalizedStrings.manageYourServicesScreen.needHelp}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitleView}>
          <SVG.Manage style={styles.headerIcon} />
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.manageYourServicesScreen.manageServices}
          </Text>
          <Text style={styles.headerSubTitle}>
            {AppLocalizedStrings.manageYourServicesScreen.click}
          </Text>
        </View>
        <View>
          <OnOffIndigaterCard
            title={AppLocalizedStrings.manageYourServicesScreen.advertisements}
            type="off"
            onPress={onAdvertisementsHandler}
          />
          <OnOffIndigaterCard
            title={AppLocalizedStrings.manageYourServicesScreen.actingServices}
            type="on"
            onPress={onActingServicesHandler}
          />
          <OnOffIndigaterCard
            title={AppLocalizedStrings.manageYourServicesScreen.bookings}
            type="off"
            onPress={onBookingSettingHandler}
          />
          <OnOffIndigaterCard
            title={AppLocalizedStrings.manageYourServicesScreen.licensingDeals}
            type="off"
            onPress={onLicensingDealHandler}
          />
          <OnOffIndigaterCard
            title={AppLocalizedStrings.manageYourServicesScreen.musicServices}
            type="on"
            onPress={onMusicServicesSettingsHandler}
          />
          <OnOffIndigaterCard
            title={
              AppLocalizedStrings.manageYourServicesScreen.specialRequirements
            }
            type="on"
            onPress={onMySpecialRequirementHandler}
          />
        </View>
        <Text style={styles.paragraph}>
          {AppLocalizedStrings.manageYourServicesScreen.letCustomers}
        </Text>
        <OnOffIndigaterCard
          title={AppLocalizedStrings.manageYourServicesScreen.postalAddress}
          type="on"
          onPress={onPostalAddressHandler}
        />
        <Text style={styles.paragraphBottom}>
          {AppLocalizedStrings.manageYourServicesScreen.remove}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ManageYourServicesScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  headerIcon: {
    alignSelf: 'center',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '19@s',
    fontWeight: '600',
    lineHeight: '28@s',
    textAlign: 'center',
    paddingTop: hp(3.5),
  },
  headerSubTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerTitleView: {
    marginVertical: hp(4),
  },
  paragraph: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(3),
    paddingBottom: hp(5),
  },
  paragraphBottom: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(1),
  },
});
