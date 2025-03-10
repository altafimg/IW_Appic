import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {sendVerificationEmailAction} from '../../redux/actions/sendVerificationEmailAction';
import {emailVerifyAction} from '../../redux/actions/emailVerifyAction';
import {createAccountManagerAction} from '../../redux/actions/createAccountManagerAction';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import SentEmailThanksPopup from '../../components/popups/SentEmailThanksPopup';
import {AppLocalizedStrings} from '../../localization/Localization';
import SVG from '../../assets/svg';
import {useFocusEffect} from '@react-navigation/native';

const SentEmailThanksScreen = ({navigation, route}) => {
  const _id = useSelector(state => state.signUpReducer?.data?.data?._id) || {};
  const userId =
    useSelector(state => state.loginReducer.user?.data?.data?._id) || {};

  const toast = useToast();
  const {
    email,
    accountManagerDateOfBirth,
    accountManagerFirstName,
    accountManagerLastName,
    accountManagerRelationship,
    accountManagerOccupation,
    type,
  } = route.params || {};

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState(60);

  const toggleModal = () => setIsVisible(!isVisible);

  const onStartHandler = () => {
    if (type === 'changeEmail') {
      navigation.replace('SettingScreen');
    } else {
      navigation.replace('WelcomeScreen');
    }
  };

  const verifyEmail = async () => {
    if (type == 'changeEmail') {
      try {
        const res = await dispatch(emailVerifyAction(userId));
        console.log(res, '<<<<<<<<Asdfasfsd');
        if (res?.status === 'Verify') {
          navigation.navigate('SettingScreen');
        } else if (res?.data?.status === 'Expiry') {
          console.log(res?.data?.status, '<<<expiry');
          navigation.navigate('LinkExpiredScreen');
        }
      } catch (error) {
        console.log(error, '<<<<<<error');
      }
    } else {
      try {
        const res = await dispatch(emailVerifyAction(_id));
        if (res?.status === 'Verify') {
          console.log('Verify');
          if (type === 'company') {
            console.log('type<<<<<<<<<<<<<<<<<<<<company');
            await dispatch(
              createAccountManagerAction(
                _id,
                accountManagerDateOfBirth,
                accountManagerFirstName,
                accountManagerLastName,
                accountManagerRelationship,
                accountManagerOccupation,
              ),
            )
              .then(res => {
                console.log(res, '<<<<<<<<<<<<<<response');
              })
              .catch(err => {
                console.log(err, '<<<<<<<<<<<<<<<<<err');
              });
          }
          navigation.navigate('PhoneNumberScreen', {
            check: 'signup',
          });
        } else if (res?.data?.status === 'Expiry') {
          console.log(res?.data?.status, '<<<expiry');
          navigation.navigate('LinkExpiredScreen');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resendHandle = async () => {
    try {
      const res = await dispatch(sendVerificationEmailAction(email));
      if (res?.data?.status === true) {
        toast.show('Email has been sent!', {type: 'success'});
        setTimer(60);
        setTimerActive(true);
      } else {
        toast.show('Something wrong!', {type: 'danger'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const verifyEmailInterval = setInterval(() => verifyEmail(), 5000);

      return () => clearInterval(verifyEmailInterval);
    }, []),
  );

  const decrementTimer = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      setTimerActive(false);
    }
  };
  useEffect(() => {
    const timerID = setInterval(() => decrementTimer(), 1000); // Update timer every second
    return () => clearInterval(timerID);
  }, [timer]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.helpButton}>
        <Text style={styles.helpTitle}>
          {AppLocalizedStrings.sentEmailThanksScreen.needHelp}
        </Text>
      </TouchableOpacity>
      <View>
        <SVG.Thanks style={styles.image} />
        <Text style={styles.title}>
          {AppLocalizedStrings.sentEmailThanksScreen.weSent}
        </Text>
        <Text style={styles.subTitle}>
          {AppLocalizedStrings.sentEmailThanksScreen.click}
        </Text>
        {timerActive ? (
          <Text style={styles.resendInTitle}>Resending in : {timer}s</Text>
        ) : (
          <View style={styles.bottomView}>
            <Text style={styles.receiveTitle}>
              {AppLocalizedStrings.sentEmailThanksScreen.receive}
            </Text>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={resendHandle}>
              <Text style={styles.resendTitle}>
                {AppLocalizedStrings.otpScreen.resendEmail}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <SentEmailThanksPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
        onStartHandler={onStartHandler}
        type={type}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(3),
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(15),
  },
  helpButton: {
    alignSelf: 'flex-end',
  },
  helpTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  image: {
    alignSelf: 'center',
    marginBottom: hp(5),
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(8),
    textAlign: 'center',
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingTop: hp(1),
    textAlign: 'center',
    lineHeight: '20@s',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(5),
  },
  receiveTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  resendButton: {
    marginLeft: wp(2),
  },
  resendTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  resendInTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: hp(5),
  },
});

export default SentEmailThanksScreen;
