import React, {useState} from 'react';
import {ScrollView, Switch, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const PostalAddressScreen = ({navigation}) => {
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
          headerTitle={AppLocalizedStrings.postalAddressScreen.postalAddress}
        />
        <View style={styles.main}>
          <View style={styles.headerMainView}>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.postalAddressScreen.iNeed}
            </Text>
            <Text style={styles.headerSubTitle}>
              {AppLocalizedStrings.postalAddressScreen.customers}
            </Text>
            <Text style={styles.headerSubTitle}>
              {AppLocalizedStrings.postalAddressScreen.toSafe}
            </Text>
            <Text style={styles.headerSubTitle}>
              {AppLocalizedStrings.postalAddressScreen.ifPostal}
            </Text>
          </View>
          <View style={styles.inputMainView}>
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.addressOne}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.addressTwo}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.city}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.state}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.postCode}
            />
            <DetailsTextInput
              title={AppLocalizedStrings.postalAddressScreen.country}
            />
          </View>
          <View style={styles.midelView}>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.postalAddressScreen.control}
            </Text>
            <Text style={styles.midelSubTitle}>
              {AppLocalizedStrings.postalAddressScreen.customersWho}
            </Text>
          </View>
          <View>
            <View style={styles.headerView}>
              <Text style={styles.switchTitle}>
                {AppLocalizedStrings.postalAddressScreen.actingServices}
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
          <View style={styles.bottomButton}>
            <PrimaryButton title={AppLocalizedStrings.button.save} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostalAddressScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-1),
  },
  headerMainView: {
    marginTop: hp(-4),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '600',
    lineHeight: '20@s',
  },
  headerSubTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(1),
  },
  inputMainView: {
    marginTop: hp(3),
  },
  midelView: {
    marginVertical: hp(2),
  },
  midelSubTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  headerView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  switchTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
  },
  bottomButton: {
    marginTop: hp(2),
    marginBottom: hp(3),
  },
});
