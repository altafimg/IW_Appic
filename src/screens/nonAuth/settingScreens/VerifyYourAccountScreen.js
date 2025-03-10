import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import NewHeader from '../../../components/NewHeader';

// image
import verification from '../../../assets/images/verification.png';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const VerifyYourAccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle="Verification"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.headerView}>
        <Image source={verification} style={styles.image} />
        <Text style={styles.headerTitle}>Verify your account</Text>
        <Text style={styles.headerSubTitle}>
          To post jobs, earn money, or make purchases, you must verify your
          account.
        </Text>
      </View>
      <View style={styles.buttonView}>
        <PrimaryButton title="Continue" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default VerifyYourAccountScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
  },
  headerView: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: '23@s',
    fontWeight: '600',
    color: Colors.Black,
    textAlign: 'center',
    paddingVertical: hp(2.5),
  },
  headerSubTitle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral800,
    textAlign: 'center',
  },
  buttonView: {
    marginBottom: hp(3),
  },
});
