import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {CancelJobTodoListAction} from '../../../redux/actions/CancelJobTodoListAction';
import NewHeader from '../../../components/NewHeader';

const CancelJobScreen = () => {
  const navigation = useNavigation('');
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');

  const adsId = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );
  const loginUserId =
    useSelector(state => state.loginReducer.user?.data?.data) || '';

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const cancelJobHandler = () => {
    const data = {
      applicantId: loginUserId?._id,
      adsId: adsId?._id,
      status: 'cancel',
      reason: reason,
    };
    dispatch(CancelJobTodoListAction(data))
      .then(res => {
        console.log(res?.data, '<<<<<<<<<<<data');
        if (res?.status === 200) {
          navigation.replace('JobCancelledThanksScreen');
        } else {
          Alert.alert('something went wrong! pleaes try again');
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
            <NewHeader
              headerTitle="You can cancel this job"
              onPress={onGoBackHandler}
            />

            <Header subTitle="Please provide a reason" />
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
        <PrimaryButton
          title="Cancel job"
          // onPress={onJobCancelHandler}
          onPress={cancelJobHandler}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CancelJobScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    paddingBottom: hp(2),
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  inputMain: {
    marginTop: hp(-3),
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
    height: '108@s',
    paddingHorizontal: wp(3),
  },
});
