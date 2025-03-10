import React, {useState} from 'react';
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import {Tooltip} from 'react-native-elements';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import SecPrimaryButton from '../../../components/buttons/SecPrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const LicensingDealSettingsScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={
            AppLocalizedStrings.licensingDealSettingsScreen.licensing
          }
          subTitle={AppLocalizedStrings.licensingDealSettingsScreen.allow}
        />
        <View style={styles.main}>
          <View style={styles.cardMainView}>
            <View style={styles.cardHeaderView}>
              <Text style={styles.cradTitle}>
                {AppLocalizedStrings.licensingDealSettingsScreen.product}
              </Text>
              <Tooltip
                width={257}
                height={'100@s'}
                withPointer={false}
                containerStyle={styles.tooltipStyle}
                popover={
                  <Text style={styles.tooltipTitle}>
                    {AppLocalizedStrings.licensingDealSettingsScreen.only}
                  </Text>
                }>
                <SVG.IButton />
              </Tooltip>
            </View>
            <View style={styles.cardMidelView}>
              <Text style={styles.onlyTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.only}
              </Text>
              <View style={styles.inputView}>
                <TextInput placeholder=" " style={styles.input} />
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.save}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.customersTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.customers}
              </Text>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.onlyTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.proposals}
              </Text>
              <Switch
                trackColor={{false: Colors.Neutral200, true: '#34C759'}}
                thumbColor={Colors.White}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lastBottomView}>
        <Text style={styles.changeTitle}>
          {AppLocalizedStrings.actingServicesSettingsScreen.manage}
        </Text>
        <PrimaryButton title={AppLocalizedStrings.button.next} />
      </View>
    </View>
  );
};

export default LicensingDealSettingsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
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
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
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
    height: '35@s',
    width: '217@s',
  },
  saveButton: {
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    width: '83@s',
    height: '35@s',
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
  // {}
  lastBottomView: {
    marginVertical: hp(2),
  },
  changeTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: hp(3),
  },
});
