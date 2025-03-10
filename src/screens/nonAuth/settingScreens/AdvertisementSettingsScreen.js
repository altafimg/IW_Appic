import React, {useState} from 'react';
import {Switch, Text, TextInput, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import {TouchableOpacity} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AdvertisementSettingsScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={
          AppLocalizedStrings.advertisementSettingsScreen.advertisementSettings
        }
        subTitle={AppLocalizedStrings.advertisementSettingsScreen.customers}
      />
      <View style={styles.main}>
        <View style={styles.cardMainView}>
          <View style={styles.cardHeaderView}>
            <View style={styles.headerIconView}>
              <SVG.Youtube />
              <Text style={styles.cradTitle}>
                {AppLocalizedStrings.advertisementSettingsScreen.youtube}
              </Text>
            </View>
            <Tooltip
              width={257}
              height={'100@s'}
              withPointer={false}
              containerStyle={styles.tooltipStyle}
              popover={
                <Text style={styles.tooltipTitle}>
                  {AppLocalizedStrings.advertisementSettingsScreen.allow}
                </Text>
              }>
              <SVG.IButton />
            </Tooltip>
          </View>
          <View style={styles.cardMidelView}>
            <Text style={styles.onlyTitle}>
              {AppLocalizedStrings.advertisementSettingsScreen.only}
            </Text>
            <View style={styles.inputView}>
              <TextInput placeholder=" " style={styles.input} />
              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveTitle}>
                  {AppLocalizedStrings.button.save}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.customersTitle}>
              {AppLocalizedStrings.advertisementSettingsScreen.customersWill}
            </Text>
          </View>
          <View style={styles.secMiddelCard}>
            <Text style={styles.onlyTitle}>
              {AppLocalizedStrings.advertisementSettingsScreen.services}
            </Text>
            <View style={styles.secCardRapView}>
              <TouchableOpacity style={styles.secCardView}>
                <Text style={styles.secCardTitle}>
                  {AppLocalizedStrings.advertisementSettingsScreen.video}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secCardView}>
                <Text style={styles.secCardTitle}>
                  {AppLocalizedStrings.advertisementSettingsScreen.liveStream}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secCardView}>
                <Text style={styles.secCardTitle}>
                  {AppLocalizedStrings.advertisementSettingsScreen.story}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.onlyTitle}>
              {AppLocalizedStrings.advertisementSettingsScreen.youWill}
            </Text>
            <Switch
              trackColor={{false: Colors.Neutral200, true: '#34C759'}}
              thumbColor={isEnabled ? Colors.White : Colors.White}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdvertisementSettingsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-3),
  },
  cardMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    marginVertical: hp(2),
  },
  cardHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3),
  },
  headerIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    paddingLeft: wp(3),
  },
  cardMidelView: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
  },
  onlyTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(1),
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    height: '33@s',
    width: '217@s',
  },
  saveButton: {
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    width: '83@s',
    height: '34@s',
    justifyContent: 'center',
  },
  saveTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  customersTitle: {
    color: Colors.Neutral500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(1),
  },
  secMiddelCard: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
  },
  secCardRapView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.6),
  },
  secCardView: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: 50,
    marginRight: wp(2.5),
  },
  secCardTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.4),
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingTop: hp(3),
    paddingBottom: hp(2),
  },
  tooltipStyle: {
    backgroundColor: Colors.Primary500,
  },
  tooltipTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
