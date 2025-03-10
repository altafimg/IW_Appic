import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SecPrimaryButton from '../../../components/buttons/SecPrimaryButton';
import SVG from '../../../assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import {reportJobAction} from '../../../redux/actions/reportJobAction';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {updateApplicantStatusAction} from '../../../redux/actions/updateApplicantStatusAction';
import NewHeader from '../../../components/NewHeader';

const ReportProposalScreen = ({navigation, route}) => {
  // const {adsId} = route?.params;
  const dispatch = useDispatch();

  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);
  const loading = useSelector(state => state.reportJobReducer.loading);
  const statusUpdateLoading = useSelector(
    state => state.updateApplicantStatusReducer.loading,
  );
  const [jobMessage, setJobMessage] = useState('');
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showError, setShowError] = useState(false);

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onReportHandler = () => {
    if (
      jobMessage.trim() === '' ||
      reason?.trim() === '' ||
      (reason === 'Others' && otherReason?.trim() === '')
    ) {
      setShowError(true);
    } else {
      const reportReason = otherReason?.trim() !== '' ? otherReason : reason;
      const data = {
        user_id: _id,
        // job_id: adsId,
        reportMessage: jobMessage,
        reportReason,
      };

      dispatch(reportJobAction(data))
        .then(res => {
          console.log(res?.data, '<<<<<<<<<<<Data');
          if (res?.status === 200) {
            const currentDate = new Date();
            const completeDate = moment(currentDate).format('YYYY-MM-DD');
            const changeJobStatus = {
              applicantId: _id,
              // adsId: adsId,
              status: 'cancelByInfluencer',
              completeDate: completeDate,
              reason: reportReason,
            };
            dispatch(updateApplicantStatusAction(changeJobStatus))
              .then(res => {
                console.log(res?.data, '<<<<<<<<<<<data');
                if (res?.status === 200) {
                  setReason('');
                  setOtherReason('');
                  setJobMessage('');
                  navigation.navigate('LookingReportToDoScreen');
                } else {
                  Alert.alert('something went wrong! pleaes try again');
                }
              })
              .catch(err => {
                console.log(err, '<<<<<<<<err');
              });
          } else {
            Alert.alert('somthing went wrong!! please try again');
          }
        })
        .catch(err => {
          console.log(err, '<<<<<<<<err');
        });
    }
  };

  const options = [
    'Abuse, harassment, or threats',
    'Soliciting',
    'Violates IW guidelines',
    'Others',
  ];

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <NewHeader
              headerTitle="Report this Job"
              onPress={onGoBackHandler}
            />
            <Header subTitle="Tell us why you are reporting this proposal" />
            <TextInput
              multiline
              placeholder=" "
              style={styles.textInput}
              onChangeText={i => {
                setJobMessage(i);
                setShowError(false);
              }}
              value={jobMessage}
            />
            <View style={styles.radioMainView}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioButtonView}
                  onPress={() => {
                    setReason(option);
                    setShowError(false);
                    if (option !== 'Others') setOtherReason('');
                  }}>
                  {reason === option ? (
                    <SVG.RadioButtonFill />
                  ) : (
                    <SVG.RadioButton />
                  )}
                  <Text style={styles.radioTitle}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {reason === 'Others' && (
              <TextInput
                style={styles.otherTextInput}
                placeholder="Please specify"
                onChangeText={text => {
                  setOtherReason(text);
                  setShowError(false);
                }}
                value={otherReason}
              />
            )}
            {showError && (
              <Text style={{color: Colors.Destructive400}}>
                Please fill all fields
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <SecPrimaryButton
        title={
          loading || statusUpdateLoading ? (
            <View
              style={{
                width: wp('93%'),
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                color={Colors.Primary500}
                size={'small'}
                style={{marginTop: hp(1)}}
              />
            </View>
          ) : (
            <Text>Report</Text>
          )
        }
        onPress={onReportHandler}
      />
    </View>
  );
};

export default ReportProposalScreen;

const styles = ScaledSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: hp(3),
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    textAlignVertical: 'top',
    height: '108@s',
    paddingHorizontal: wp(3),
    marginTop: hp(-3),
  },
  radioMainView: {
    marginVertical: hp(2),
  },
  radioButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  radioTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingHorizontal: wp(2),
  },
  otherTextInput: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    marginTop: hp(2),
    height: '50@s',
  },
});
