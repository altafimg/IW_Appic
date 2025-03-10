import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import NewHeader from '../../components/NewHeader';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ManageCookiesPopup from '../../components/popups/ManageCookiesPopup';

// cookies
import cookies from '../../assets/images/cookies.png';

const CookiesScreen = ({navigation}) => {
  const [visiable, setVisiable] = useState(false);

  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle="Cookies"
        // onPress={() => navigation.goBack()}
      />
      <View style={styles.containerSec}>
        <View style={styles.centerContentView}>
          <Image source={cookies} style={styles.iconStyle} />
          <Text style={styles.cookiesTitle}>Cookies</Text>
          <Text style={styles.cookiesSubTitle}>
            Our app uses cookies to enhance your experience and provide
            personalized content.
          </Text>
          <TouchableOpacity>
            <Text style={styles.cookiesPolicyTitle}>Cookie Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <PrimaryButton
          title="Accept all"
          onPress={() => navigation.replace('WelcomeScreen')}
        />
        <TouchableOpacity
          onPress={() => {
            setVisiable(true);
          }}>
          <Text style={styles.manageCookiesTitle}>Manage Cookies</Text>
        </TouchableOpacity>
      </View>
      <ManageCookiesPopup visiable={visiable} setVisiable={setVisiable} />
    </View>
  );
};

export default CookiesScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  containerSec: {
    flex: 1,
    justifyContent: 'center',
  },
  centerContentView: {
    alignItems: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  cookiesTitle: {
    fontSize: '23@s',
    fontWeight: '600',
    color: Colors.Black,
    paddingVertical: hp(2),
  },
  cookiesSubTitle: {
    fontSize: '13@s',
    fontWeight: '400',
    color: Colors.Neutral800,
    textAlign: 'center',
    width: wp(80),
  },
  cookiesPolicyTitle: {
    fontSize: '13@s',
    fontWeight: '500',
    color: Colors.Primary500,
    textDecorationLine: 'underline',
    paddingTop: hp(3),
  },
  manageCookiesTitle: {
    fontSize: '13@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    marginTop: hp(4),
    textAlign: 'center',
  },
  buttonView: {
    marginBottom: hp(3),
  },
});
