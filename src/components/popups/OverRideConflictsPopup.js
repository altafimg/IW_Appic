import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import SVG from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {acceptJobsAction} from '../../redux/actions/acceptJobAction';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const OverRideConflictsPopup = ({
  isVisible,
  setIsVisible,
  conflictFilteredData,
  getJobByDateTimeData,
  setScheduleVisible,
  applicants_id,
  ads_id,
  token,
  date,
  user_id,
  id,
  jobsData,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user_role, dob} =
    useSelector(state => state.loginReducer?.user?.data?.data) || {};

  const jobAcceptLoading = useSelector(
    state => state.acceptJobReducer?.loading,
  );

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const [checkedItems, setCheckedItems] = useState([]);
  const [totalCheckboxes, setTotalCheckboxes] = useState(0);

  const toggleSkip = () => {
    setScheduleVisible(false);
    toggleModal();
  };

  const handleCheckboxChange = text => {
    const updatedCheckedItems = [...checkedItems];
    if (checkedItems.includes(text)) {
      const index = checkedItems.indexOf(text);
      updatedCheckedItems.splice(index, 1);
    } else {
      updatedCheckedItems.push(text);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAcceptJob = () => {
    const acceptJobData = {
      applicants_id,
      ads_id,
      token,
      date,
      overrideConflict: checkedItems,
      status: 'in progress',
    };

    console.log(acceptJobData);

    const age = calculateAge(dob);
    if (age < jobsData?.set_age_for_applicants) {
      navigation.navigate('NotEligibleScreen', {
        id,
        user_id,
      });
    } else {
      dispatch(acceptJobsAction(acceptJobData))
        .then(res => {
          if (res?.status === 200) {
            navigation.navigate('AcceptedJobScreen');
            setScheduleVisible(false);
            console.log(res?.status);
          } else {
            if (res === 'You have already applied to this job') {
              Alert.alert(res);
              setScheduleVisible(false);
            } else {
              Alert.alert('Something went wrong!! please try again later');
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const renderConflictOptions = () => {
    const hasConflictData = conflictFilteredData?.length !== 0;
    const hasJobData = getJobByDateTimeData?.length !== 0;
    let checkboxCount = 0;

    const ConflictItem = ({text}) => (
      <View style={styles.checkBoxMainView}>
        <TouchableOpacity onPress={() => handleCheckboxChange(text)}>
          {checkedItems.includes(text) ? (
            <SVG.CheckboxFill />
          ) : (
            <SVG.Checkbox />
          )}
        </TouchableOpacity>
        <Text style={styles.conflictsText}>{text}</Text>
      </View>
    );

    if (hasConflictData && hasJobData) {
      checkboxCount = 3;
      return (
        <>
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.overRideConflicts}
          />
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.overRideBurnOut}
          />
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.able}
          />
        </>
      );
    }

    if (hasJobData) {
      checkboxCount = 2;
      return (
        <>
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.overRideBurnOut}
          />
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.able}
          />
        </>
      );
    }

    if (hasConflictData) {
      checkboxCount = 2;
      return (
        <>
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.overRideConflicts}
          />
          <ConflictItem
            text={AppLocalizedStrings.overRideConflictsPopup.able}
          />
        </>
      );
    }

    setTotalCheckboxes(checkboxCount);
    return null;
  };

  useEffect(() => {
    const hasConflictData = conflictFilteredData?.length !== 0;
    const hasJobData = getJobByDateTimeData?.length !== 0;

    if (hasConflictData && hasJobData) {
      setTotalCheckboxes(3);
    } else if (hasJobData || hasConflictData) {
      setTotalCheckboxes(2);
    } else {
      setTotalCheckboxes(0);
    }
  }, [conflictFilteredData, getJobByDateTimeData]); // Update dependency array

  return (
    <Modal
      animationType="slide"
      transparent
      isVisible={isVisible}
      onRequestClose={toggleModal}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.overRideConflictsPopup.please}
              </Text>
              <Text style={styles.subTitle}>
                {AppLocalizedStrings.overRideConflictsPopup.failure}
              </Text>
              <Text style={styles.subTitle}>
                {AppLocalizedStrings.overRideConflictsPopup.strikes}
              </Text>
            </View>
            {renderConflictOptions()}
            <PrimaryButton
              title={
                jobAcceptLoading ? (
                  <ActivityIndicator
                    color={Colors.White}
                    size={'small'}
                    style={{marginTop: hp(1)}}
                  />
                ) : (
                  AppLocalizedStrings.overRideConflictsPopup.accept
                )
              }
              onPress={handleAcceptJob}
              disabled={checkedItems.length !== totalCheckboxes}
            />
            <TouchableOpacity style={styles.goBackButton} onPress={toggleSkip}>
              <Text style={styles.goBackTitle}>
                {AppLocalizedStrings.overRideConflictsPopup.skip}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OverRideConflictsPopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(-5),
    marginBottom: hp(-2.3),
  },
  main: {
    backgroundColor: Colors.White,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: hp(2),
    paddingTop: hp(4),
    paddingHorizontal: wp(5),
  },
  headerTitle: {
    color: Colors.Black,
    fontSize: '20@s',
    fontWeight: '600',
    paddingBottom: hp(2),
  },
  subTitle: {
    color: Colors.Black,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: 20,
  },
  goBackButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Primary500,
    backgroundColor: Colors.White,
    width: wp('95%'),
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
  },
  goBackTitle: {
    color: Colors.Primary500,
    fontSize: '14@s',
    fontWeight: '600',
    textAlign: 'center',
  },
  checkBoxMainView: {
    flexDirection: 'row',
    marginVertical: '10@s',
    alignItems: 'center',
  },
  conflictsText: {
    fontSize: '12@s',
    color: Colors.Black,
    fontWeight: '400',
    marginHorizontal: '10@s',
  },
});
