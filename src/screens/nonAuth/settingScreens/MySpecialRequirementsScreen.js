import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {Tooltip} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import SecPrimaryButton from '../../../components/buttons/SecPrimaryButton';
import {Switch} from 'react-native-paper';

const MySpecialRequirementsScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={
              AppLocalizedStrings.mySpecialRequirementsScreen.special
            }
            subTitle={
              AppLocalizedStrings.mySpecialRequirementsScreen.requirements
            }
          />
          <View style={styles.main}>
            <View>
              <Text style={styles.displayTitle}>
                Display my special requirements for
              </Text>
              <View style={styles.topView}>
                <Text style={styles.actingTitle}>Acting services</Text>
                <Switch
                  trackColor={{false: Colors.Neutral200, true: '#34C759'}}
                  thumbColor={Colors.White}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
                />
              </View>
              <View style={styles.topView}>
                <Text style={styles.actingTitle}>Bookings</Text>
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
                <View style={styles.veganView}>
                  <DetailsTextInput
                    title={
                      AppLocalizedStrings.actingServicesSettingsScreen
                        .EnterTitle
                    }
                    placeholder="Title"
                  />
                  <DetailsTextInput
                    title={
                      AppLocalizedStrings.actingServicesSettingsScreen
                        .describeMore
                    }
                    placeholder="Title"
                  />
                </View>
              </View>
            </View>
            {/* {} */}
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
                      {
                        AppLocalizedStrings.actingServicesSettingsScreen
                          .products
                      }
                    </Text>
                  }>
                  <SVG.IButton />
                </Tooltip>
              </View>
              <View style={styles.cardMidelViewSec}>
                <View style={styles.veganView}>
                  <Text style={styles.veganTitle}>Vegan lifestyle</Text>
                  <Text style={styles.cannotTitle}>
                    {AppLocalizedStrings.actingServicesSettingsScreen.peanuts}
                  </Text>
                  <View style={styles.buttonsView}>
                    <TouchableOpacity>
                      <Text style={styles.deleteTitle}>
                        {
                          AppLocalizedStrings.actingServicesSettingsScreen
                            .delete
                        }
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.editTitle}>
                      {AppLocalizedStrings.actingServicesSettingsScreen.edit}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderColor: Colors.Neutral200,
                    marginVertical: hp(1.5),
                  }}>
                  <View style={styles.veganViewSec}>
                    <Text style={styles.veganTitle}>No alcohole</Text>
                    <Text style={styles.cannotTitle}>
                      {AppLocalizedStrings.actingServicesSettingsScreen.peanuts}
                    </Text>
                    <View style={styles.buttonsView}>
                      <TouchableOpacity>
                        <Text style={styles.deleteTitle}>
                          {
                            AppLocalizedStrings.actingServicesSettingsScreen
                              .delete
                          }
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.editTitle}>
                        {AppLocalizedStrings.actingServicesSettingsScreen.edit}
                      </Text>
                    </View>
                  </View>
                </View>
                <SecPrimaryButton
                  title={
                    AppLocalizedStrings.actingServicesSettingsScreen.addAnother
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lastBottomView}>
          <Text style={styles.changeTitle}>
            {AppLocalizedStrings.actingServicesSettingsScreen.manage}
          </Text>
          <PrimaryButton title={AppLocalizedStrings.button.save} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MySpecialRequirementsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  main: {
    marginTop: hp(-1),
  },
  displayTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  topView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '36@s',
    paddingHorizontal: wp(3),
    marginVertical: hp(0.7),
  },
  actingTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
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
  // {}
  cardMidelViewSec: {
    paddingVertical: hp(2),
  },
  veganView: {
    paddingHorizontal: wp(3),
  },
  veganViewSec: {
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
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
