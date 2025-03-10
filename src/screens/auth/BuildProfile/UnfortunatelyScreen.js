import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import YouSureDeleteAccountPopup from '../../../components/popups/YouSureDeleteAccountPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';
import UnfortunatelyDeletePopup from '../../../components/popups/UnfortunatelyDeletePopup';

const UnfortunatelyScreen = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);

  const user_role = route?.params?.user_role;
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const onGoBackHandler = () => {
    navigation.replace('ManagingkidInfluencersScreen', {user_role});
  };

  return (
    <View style={styles.container}>
      <Text> </Text>
      <View>
        <SVG.DontHaveID style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.dontHaveIdScreen.unfortunately}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.dontHaveIdScreen.toKeep}
        </Text>
      </View>
      <View>
        <PrimaryButton title={'Quit Setup'} onPress={toggleModal} />
        <TouchableOpacity
          onPress={onGoBackHandler}
          style={styles.previousButton}>
          <Text style={styles.previousTitle}>
            {AppLocalizedStrings.dontHaveIdScreen.go}
          </Text>
        </TouchableOpacity>
      </View>
      <UnfortunatelyDeletePopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onGoBackHandler={onGoBackHandler}
      />
    </View>
  );
};

export default UnfortunatelyScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(3),
    paddingHorizontal: wp(3),
    backgroundColor: Colors.White,
  },
  image: {
    alignSelf: 'center',
  },
  title: {
    fontSize: '22@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingTop: hp(8),
    textAlign: 'center',
    marginTop: hp(5),
  },
  subTitle: {
    fontSize: '12@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    paddingTop: hp(1),
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    marginTop: hp(1),
    width: wp('95%'),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
