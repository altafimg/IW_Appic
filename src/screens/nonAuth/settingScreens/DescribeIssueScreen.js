import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const DescribeIssueScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onContinueHandler = () => {
    navigation.navigate('HowDoSigninScreen');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.describeIssueScreen.describeIssue}
        />
        <Text style={styles.cardHeaderTitle}>
          {AppLocalizedStrings.describeIssueScreen.select}
        </Text>
        <View style={styles.cardMain}>
          <View style={styles.cardView}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Refunds</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Cancellations</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Verification</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Something else</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Safety issues</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Help with an order</Text>
            </View>
          </View>
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.button.continue}
        onPress={onContinueHandler}
      />
    </View>
  );
};

export default DescribeIssueScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    marginTop: hp(-3),
  },
  cardMain: {
    marginVertical: hp(2),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#F2F2F2',
    width: '141@s',
    marginRight: wp(3),
    marginVertical: hp(1),
  },
  buttonTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
});
