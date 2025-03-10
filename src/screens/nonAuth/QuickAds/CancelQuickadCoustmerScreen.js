import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {CancelJobQuickadAction} from '../../../redux/actions/CancelJobQuickadAction';

const CancelQuickadCoustmerScreen = ({route}) => {
  const navigation = useNavigation('');
  const dispatch = useDispatch();
  const ad_post = route?.params;

  const [reason, setReason] = useState('');

  const adsId = ad_post?.ad_post?.ad_post;

  const loginUserId =
    useSelector(state => state.loginReducer.user?.data?.data) || '';

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  console.log(adsId?._id, '???');
  console.log(loginUserId?._id, '>>>');

  const cancelJobHandler = () => {
    const data = {
      adsId: adsId?._id,
      user_id: loginUserId?._id,
      adsStatus: 'cancel',
      customerCancelReson: reason,
    };
    dispatch(CancelJobQuickadAction(data))
      .then(res => {
        console.log(res?.data, '<<<<<<<<<<<data');
        if (res?.status === 200) {
          // console.log('yeeeee cancel ho gya');
          navigation.replace('JobCancelledThanksScreen');
        } else {
          Alert.alert('something went wrong! pleaes try again');
          console.log(res, '<<<<<<<<<<<data2222222');
        }
      })
      .catch(err => {
        console.log(err, '<<<<<<<<err');
      });
  };

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BackArrow goBack={onGoBackHandler} />
            <Header
              headerTitle="You can cancel this QuickAd"
              subTitle="The funds held in escrow for this job will be refunded to you within 5-7 working days. "
            />
            <View style={styles.inputMain}>
              <Text style={styles.reasonTitle}>Reason for cancelling</Text>
              <TextInput
                multiline
                placeholder=" "
                style={styles.textInput}
                onChangeText={i => setReason(i)}
              />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton title="Cancel QuickAd" onPress={cancelJobHandler} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CancelQuickadCoustmerScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    paddingBottom: hp(3),
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  inputMain: {
    marginTop: hp(-2),
  },
  reasonTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    lineHeight: '20@s',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    textAlignVertical: 'top',
    height: '421@s',
    paddingHorizontal: wp(3),
  },
});
