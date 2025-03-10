import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const RequestDataThanksScreen = ({navigation}) => {
  const onGotItHandler = () => {
    navigation.navigate('LoginSecurityScreen');
  };

  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.ThanksLogout style={styles.image} />
        <View style={styles.titleView}>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.requestDataThanksScreen.thanks}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.requestDataThanksScreen.please}
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.requestDataThanksScreen.gotIt}
        onPress={onGotItHandler}
      />
    </View>
  );
};

export default RequestDataThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  image: {
    alignSelf: 'center',
  },
  titleView: {
    marginTop: hp(10),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '27@s',
    textAlign: 'center',
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: hp(1),
  },
});
