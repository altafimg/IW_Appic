import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

const GovernmentOrganizationScreen = ({navigation, route}) => {
  const {user_role, relationship} = route.params;

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onProfileBusinessHandler = () => {
    navigation.navigate('NewProfileDetailsBusinessScreen', {
      user_role: user_role,
      relationship: relationship,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={
            AppLocalizedStrings.governmentOrganizationScreen.government
          }
        />
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.governmentOrganizationScreen.following}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.governmentOrganizationScreen.local}
        </Text>
      </ScrollView>
      <PrimaryButton title="Yes" onPress={onProfileBusinessHandler} />
      <TouchableOpacity style={styles.goBackButton} onPress={onGoBackHandler}>
        <Text style={styles.buttonTitle}>
          {AppLocalizedStrings.governmentOrganizationScreen.no}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GovernmentOrganizationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '500',
    marginTop: hp(-3),
  },
  subTitle: {
    color: Colors.Neutral800,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(2),
    lineHeight: '18@s',
  },
  goBackButton: {
    backgroundColor: Colors.White,
    width: wp('93%'),
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    marginTop: hp(1.5),
  },
  buttonTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
