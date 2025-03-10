import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const JobLivePaymentSuccessScreen = ({navigation}) => {
  const onMyQuickAdsHandler = () => {
    // navigation.goBack('');
    navigation.replace('MainScreen');
  };
  const [status, setStatus] = useState(true);

  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        {status ? (
          <SVG.Thanks style={styles.icon} />
        ) : (
          <SVG.JobCancelled style={styles.icon} />
        )}
        {status ? (
          <Text style={styles.title}>
            {AppLocalizedStrings.paymentSuccessScreen.success}
          </Text>
        ) : (
          <Text style={styles.title}>Payment Failed</Text>
        )}

        <Text style={styles.subTitle}>
          Your QuickAd is now live. We’ll notify you with updates.
        </Text>
      </View>
      <View>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui tellus
          pretium at nisi proing.
        </Text>
        {status ? (
          <PrimaryButton
            title="Go to My QuickAds"
            // onPress={() => navigation.goBack('')}
            onPress={() => navigation.replace('MainScreen')}
          />
        ) : (
          <View>
            <PrimaryButton
              title="Go to My QuickAds"
              onPress={onMyQuickAdsHandler}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PaymentMethodsScreen')}>
              <Text style={styles.buttonTitle}>Cancel QuickAd</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default JobLivePaymentSuccessScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  title: {
    fontSize: '21@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingTop: hp(8),
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '11@s',
    fontWeight: '400',
    color: Colors.Neutral600,
    lineHeight: '19@s',
    paddingVertical: hp(3),
  },
  icon: {
    alignSelf: 'center',
  },
  button: {
    width: wp('93%'),
    height: '48@s',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: hp(1.5),
  },
  buttonTitle: {
    color: 'red',
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
