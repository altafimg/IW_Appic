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

const ActingServicesSettingsScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.actingServicesSettingsScreen.acting}
          subTitle={AppLocalizedStrings.actingServicesSettingsScreen.allow}
        />
        <View style={styles.main}>
          <View style={styles.cardMainView}>
            <View style={styles.cardHeaderView}>
              <Text style={styles.cradTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.casting}
              </Text>
              <Tooltip
                width={257}
                height={'100@s'}
                withPointer={false}
                containerStyle={styles.tooltipStyle}
                popover={
                  <Text style={styles.tooltipTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.products}
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
          <View>
            <View style={styles.openCardView}>
              <Text style={styles.cradTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.special}
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
            <View>
              <Text style={styles.paragraph}>
                {AppLocalizedStrings.actingServicesSettingsScreen.requirements}
              </Text>
            </View>
          </View>
          <View style={styles.cardMainViewSec}>
            <View style={styles.cardHeaderViewSec}>
              <Text style={styles.dietaryTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.dietary}
              </Text>
              <Tooltip
                width={257}
                height={'100@s'}
                withPointer={false}
                containerStyle={styles.tooltipStyle}
                popover={
                  <Text style={styles.tooltipTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.send}
                  </Text>
                }>
                <SVG.IButton />
              </Tooltip>
            </View>
            <View style={styles.cardMidelViewSec}>
              <DetailsTextInput
                title={
                  AppLocalizedStrings.actingServicesSettingsScreen.EnterTitle
                }
                placeholder="Title"
              />
              <DetailsTextInput
                title={
                  AppLocalizedStrings.actingServicesSettingsScreen.describeMore
                }
                placeholder="Title"
              />
            </View>
          </View>
          <View style={styles.cardMainViewSec}>
            <View style={styles.cardHeaderViewSec}>
              <Text style={styles.dietaryTitle}>
                {
                  AppLocalizedStrings.actingServicesSettingsScreen
                    .dietaryRequirements
                }
              </Text>
              <Tooltip
                width={257}
                height={'100@s'}
                withPointer={false}
                containerStyle={styles.tooltipStyle}
                popover={
                  <Text style={styles.tooltipTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.products}
                  </Text>
                }>
                <SVG.IButton />
              </Tooltip>
            </View>
            <View style={styles.cardMidelViewSec}>
              <Text style={styles.veganTitle}>Vegan lifestyle</Text>
              <Text style={styles.cannotTitle}>
                {AppLocalizedStrings.actingServicesSettingsScreen.peanuts}
              </Text>
              <View style={styles.buttonsView}>
                <TouchableOpacity>
                  <Text style={styles.deleteTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.delete}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.editTitle}>
                  {AppLocalizedStrings.actingServicesSettingsScreen.edit}
                </Text>
              </View>
              <SecPrimaryButton
                title={
                  AppLocalizedStrings.actingServicesSettingsScreen.addAnother
                }
              />
            </View>
          </View>
          <View style={styles.lastBottomView}>
            <Text style={styles.changeTitle}>
              {AppLocalizedStrings.actingServicesSettingsScreen.manage}
            </Text>
            <PrimaryButton title={AppLocalizedStrings.button.next} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActingServicesSettingsScreen;

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
    height: '43@s',
    width: '217@s',
    paddingHorizontal: wp(2),
  },
  saveButton: {
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
    width: '83@s',
    height: '43@s',
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
  openCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: wp(3),
  },
  paragraph: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingVertical: hp(1),
  },
  // {}
  cardMainViewSec: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    marginVertical: hp(1),
  },
  cardHeaderViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.Primary500,
    borderRadius: 5,
  },
  dietaryTitle: {
    color: Colors.Neutral50,
    fontSize: '13@s',
    fontWeight: '600',
  },
  cardMidelViewSec: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
  },
  veganTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
  },
  cannotTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(1.5),
    lineHeight: '19@s',
  },
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
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  deleteTitle: {
    color: Colors.Destructive500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  editTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
