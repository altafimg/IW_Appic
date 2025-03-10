import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {userAccountDeleteAction} from '../../../redux/actions/userAccountDeleteAction';
import {ActivityIndicator} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';

const DeleteMyAccountSecScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const refresh = useSelector(state => state.userAccountDeleteReducer.loading);
  const {inputData, selectedLabel} = route.params;
  const {token, userId} = useSelector(state => ({
    token: state.loginReducer.token,
    userId: state.loginReducer.user.data?.data?._id,
  }));
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(!termsChecked);
  const [requestDataChecked, setRequestDataChecked] = useState(
    !requestDataChecked,
  );
  const [showError, setShowError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState('');

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onContinueHandler = () => {
    if (password !== '') {
      const reason = inputData ? inputData : selectedLabel;
      const data = {
        token: token,
        _id: userId,
        Password: password,
        Reason: reason,
      };

      dispatch(userAccountDeleteAction(data))
        .then(res => {
          console.log(res, '<<<<<<response');
          setShowErrorMessage(res);
          setShowError(true);

          if (res == 'User account deleted successfully') {
            toast.show('User account deleted successfully', {
              type: 'success',
            });
            navigation.navigate('AccountDeletedThanksScreen');
          }
        })
        .catch(err => {
          console.log(err, '<<<<<Error');
        });
    } else {
      setShowError(true);
      setShowErrorMessage('Please enter password');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={
            AppLocalizedStrings.deleteMyAccountSecScreen.deleteAccount
          }
          subTitle={AppLocalizedStrings.deleteMyAccountSecScreen.whyDo}
        />
        <DetailsTextInput
          title={AppLocalizedStrings.deleteMyAccountSecScreen.enterPassword}
          onChangeText={e => {
            setPassword(e);
            setShowError(false);
          }}
          secureTextEntry={true}
          value={password}
        />
        {showError && (
          <Text style={{color: Colors.Destructive500}}>{showErrorMessage}</Text>
        )}
        {/* <View style={styles.mainSec}>
          <DetailsTextInput
            title={AppLocalizedStrings.deleteMyAccountSecScreen.enterPassword}
          />
        </View> */}
        <View>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.importantNotice}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.youWill}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.chatHistory}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.jobHistory}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.allImage}
          </Text>
          <Text style={styles.subTitle}>
            {AppLocalizedStrings.deleteMyAccountSecScreen.create}
          </Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.cardMainView}>
          <View style={styles.cradView}>
            <TouchableOpacity onPress={() => setTermsChecked(!termsChecked)}>
              {termsChecked ? <SVG.Checkbox /> : <SVG.Checked />}
            </TouchableOpacity>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.deleteMyAccountSecScreen.understand}
            </Text>
          </View>
          <View style={styles.cradView}>
            <TouchableOpacity
              onPress={() => setRequestDataChecked(!requestDataChecked)}>
              {requestDataChecked ? <SVG.Checkbox /> : <SVG.Checked />}
            </TouchableOpacity>
            <Text style={styles.cardTitle}>
              {AppLocalizedStrings.deleteMyAccountSecScreen.iWould}
            </Text>
          </View>
        </View>

        <PrimaryButton
          // disabled={refresh}
          title={
            <Text>{AppLocalizedStrings.button.continue}</Text>

            // refresh ? (
            //   <View
            //     style={{
            //       width: wp('93%'),
            //       justifyContent: 'center',
            //     }}>
            //     <ActivityIndicator
            //       color={Colors.White}
            //       size={'small'}
            //       style={{marginTop: hp(1)}}
            //     />
            //   </View>
            // ) : (
            //   <Text>{AppLocalizedStrings.button.continue}</Text>
            // )
          }
          onPress={onContinueHandler}
        />
      </View>
    </View>
  );
};

export default DeleteMyAccountSecScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  mainSec: {
    marginTop: hp(-3),
  },
  headerTitle: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '600',
    lineHeight: '23@s',
    marginTop: hp(2),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
  bottomView: {
    marginBottom: hp(3),
  },
  cardMainView: {
    marginBottom: hp(4),
  },
  cradView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.5),
    width: '90%',
  },
  cardTitle: {
    color: Colors.Neutral700,
    fontSize: '11@s',
    fontWeight: '400',
    paddingLeft: wp(3),
  },
});
