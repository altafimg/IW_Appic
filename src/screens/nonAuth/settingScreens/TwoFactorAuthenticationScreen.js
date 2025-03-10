import React, {useState, useEffect} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {twoFactorAuthAction} from '../../../redux/actions/twoFactorAuthAction';
import {getUserProfileAction} from '../../../redux/actions/getUserProfileAction';
import {getLoggedInUserProfileAction} from '../../../redux/actions/getLoggedInUserProfileAction';

const TwoFactorAuthenticationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {token, _id} = useSelector(state => ({
    token: state.loginReducer.user?.data?.token,
    _id: state.loginReducer.user?.data?.data?._id,
  }));

  const twoFactorAuth = useSelector(
    state =>
      state.getLoggedInUserProfileReducer.data?.data?.data?.two_factor_auth,
  );

  const [isEnabled, setIsEnabled] = useState(twoFactorAuth);

  useEffect(() => {
    if (twoFactorAuth !== undefined) {
      setIsEnabled(twoFactorAuth);
    }
  }, [twoFactorAuth]);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    const data = {
      token,
      _id,
      isEnabled: newValue,
    };

    dispatch(twoFactorAuthAction(data)).then(res => {
      console.log(res?.data, '<<<<<<<<Response');
      if (res?.data?.success) {
        dispatch(getLoggedInUserProfileAction(_id, token));
      }
    });
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={
          AppLocalizedStrings.twoFactorAuthenticationScreen.twoFactor
        }
        subTitle={AppLocalizedStrings.twoFactorAuthenticationScreen.toProtect}
      />
      <TouchableOpacity style={styles.cradView}>
        <Text style={styles.cradTitle}>
          {AppLocalizedStrings.twoFactorAuthenticationScreen.email}
        </Text>
        <Switch
          trackColor={{false: Colors.Neutral200, true: '#34C759'}}
          thumbColor={Colors.White}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TwoFactorAuthenticationScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  cradView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
  },
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
  },
});
