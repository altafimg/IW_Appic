import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import BackArrow from '../../components/buttons/BackArrow';
import Header from '../../components/Auth/Header';
import NeedHelpOtpPopup from '../../components/popups/NeedHelpOtpPopup';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {optVerificationAction} from '../../redux/actions/otpVerificationAction';
import {sendOptAction} from '../../redux/actions/sendOtpAction';
import {mobileNumberDataSaveAction} from '../../redux/actions/mobileNumberStoreAction';
import {profileBuildApiAction} from '../../redux/actions/profileBuildApiAction';

const OTPScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {type, email, number} = route.params || {};
  const {title} = route.params || {};
  const {subTitle} = route.params || {};

  const lastFourDigits = number?.substring(number?.length - 4);

  // Mask the previous digits with asterisks
  const maskedNumber = '***-***-' + lastFourDigits;

  const {_id} = useSelector(state => state.loginReducer.user?.data?.data) || {};

  const errorMessage = useSelector(state => state.otpVerificationReducer.error);
  const loading = useSelector(state => state.otpVerificationReducer.loading);
  const [isVisible, setIsVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [filledOtp, setFilledOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  const [toastError, setToastError] = useState('');

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onSubmitHandler = () => {
    if (type == 'login') {
      if (filledOtp !== '') {
        const parsedOtp = parseInt(filledOtp);
        const data = {
          email: email,
          otp: parsedOtp,
        };
        dispatch(optVerificationAction(data))
          .then(res => {
            if (res?.data?.status === true) {
              // navigation.navigate('BuildProfileScreen');
              navigation.reset({
                index: 0,
                routes: [{name: 'ToDoBottomNavigation'}],
              });
            } else {
              setErrorVisible(true);
              setToastError('Incorrect OTP');
            }
          })
          .catch(err => {
            console.log(err, 'err');
            setErrorVisible(true);
          });
      } else {
        setErrorVisible(true);
        setToastError('Please fill OTP');
      }
    } else if (type == 'reset') {
      if (filledOtp !== '') {
        const parsedOtp = parseInt(filledOtp);
        const data = {
          email: email,
          otp: parsedOtp,
        };
        dispatch(optVerificationAction(data))
          .then(res => {
            // console.log(res);
            if (res?.data?.status === true) {
              toast.show(res?.data?.message, {
                type: 'success',
              });
              navigation.navigate('ResetPasswordScreen', {email: email});
            } else {
              setErrorVisible(true);
              setToastError('Incorrect OTP');
            }
          })
          .catch(err => {
            console.log(err, 'err');
            setErrorVisible(true);
          });
      } else {
        setErrorVisible(true);
        setToastError('Please fill OTP');
      }
    } else if (type == 'signup') {
      const parsedOtp = parseInt(filledOtp);

      if (filledOtp === '') {
        setToastError('Please fill OTP');
        setErrorVisible(true);
      } else {
        if (filledOtp == 123456) {
          // const data = {
          //   phone_number: number,
          //   otp: parsedOtp,
          // };
          // console.log(data);
          // dispatch(optVerificationAction(data))
          //   .then(res => {
          //     if (res?.data?.status === true) {
          //       toast.show(res?.data?.message, {
          //         type: 'success',
          //       });

          dispatch(mobileNumberDataSaveAction(number));
          navigation.navigate('BuildProfileScreen');
          //   } else {
          //     toast.show('Incorrect OTP', {
          //       type: 'danger',
          //     });
          //     setErrorVisible(true);
          //   }
          // })
          // .catch(err => {
          //   console.log(err, 'err');
          //   setErrorVisible(true);
          // });
        } else {
          setErrorVisible(true);
          setToastError('Incorrect OTP');
        }
      }
    } else if (type === 'edit') {
      const parsedOtp = parseInt(filledOtp);

      if (filledOtp === '') {
        setToastError('Please fill OTP');
        setErrorVisible(true);
      } else {
        if (filledOtp == 123456) {
          // const stringNumber = number?.toString();

          const formattedNumber = `${number}`;

          // const data = {
          //   phone_number: number,
          //   otp: parsedOtp,
          // };
          // console.log(data);
          // dispatch(optVerificationAction(data))
          //   .then(res => {
          //     if (res?.data?.status === true) {
          //       toast.show(res?.data?.message, {
          //         type: 'success',
          //       });
          // dispatch(mobileNumberDataSaveAction(number));
          // navigation.navigate('LoginSecurityScreen');
          const data = {
            _id,
            phone_number: formattedNumber,
          };

          dispatch(profileBuildApiAction(data))
            .then(res => {
              console.log(res?.status, '<<<<<<<Res');
              if (res?.status === 200) {
                navigation.navigate('PhoneNumberConfirmedScreen');
              } else {
                Alert.alert('Please try again!');
              }
            })
            .catch(err => {
              console.log(err, '<<<<Err');
            });
          //   } else {
          //     toast.show('Incorrect OTP', {
          //       type: 'danger',
          //     });
          //     setErrorVisible(true);
          //   }
          // })
          // .catch(err => {
          //   console.log(err, 'err');
          //   setErrorVisible(true);
          // });
        } else {
          setErrorVisible(true);
          setToastError('Incorrect OTP');
        }
      }
    } else {
      navigation.navigate('LoginSecurityScreen');
    }
  };

  const resendOtp = () => {
    const mobile_number = '';
    dispatch(sendOptAction(mobile_number))
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  // console.log(type);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerView}>
          <BackArrow goBack={onGoBackHandler} />
          {type === 'login' ? (
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.helpTitle}>
                {AppLocalizedStrings.otpScreen.needHelp}
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* {type === 'reset' ? null : (
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.helpTitle}>
                {AppLocalizedStrings.otpScreen.needHelp}
              </Text>
            </TouchableOpacity>
          )} */}
        </View>
        <Header
          headerTitle={title}
          subTitle={
            !number ? subTitle + ' ' + email : subTitle + ' ' + maskedNumber
          }
        />
        <OTPInputView
          style={styles.main}
          pinCount={6}
          autoFocusOnLoad
          onCodeChanged={e => {
            setFilledOtp(e);
            setErrorVisible(false);
          }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        {errorVisible ? <Text style={styles.errorText}>{toastError}</Text> : ''}

        {timerActive ? (
          <TouchableOpacity style={styles.resendButton} onPress={resendOtp}>
            <Text style={styles.resendTitle}>OTP resend in : {timer}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={() => {
              setTimer(30);
              setTimerActive(true);
            }}>
            <Text style={styles.resendTitle}>
              {AppLocalizedStrings.otpScreen.resend}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <PrimaryButton
        title={
          loading ? (
            <View
              style={{
                width: wp('93%'),
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={Colors.White}
                size={'small'}
                style={{marginTop: hp(1)}}
              />
            </View>
          ) : (
            <Text>{AppLocalizedStrings.button.submit}</Text>
          )
        }
        onPress={onSubmitHandler}
      />
      <NeedHelpOtpPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export default OTPScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
  main: {
    width: '95%',
    height: 70,
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  underlineStyleBase: {
    height: wp(14),
    aspectRatio: 45 / 54,
    borderWidth: 0,
    borderBottomWidth: 2.5,
    borderColor: Colors.Neutral300,
    fontSize: '21@s',
    color: Colors.Black,
    lineHeight: Platform.OS === 'android' ? 27 : undefined,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.Primary500,
  },
  resendButton: {
    alignSelf: 'center',
    marginVertical: hp(4),
  },
  resendTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
