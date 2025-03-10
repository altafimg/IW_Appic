import React, {useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {Calendar} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import moment from 'moment';

const CalendarsPopup = ({
  isVisible,
  toggleModal,
  selectedButton,
  selectedDate,
  applicantJobs,
  setSelectedDate,
}) => {
  const [isDefaultState, setIsDefaultState] = useState(true);

  const {_id} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || '';

  const handleDayPress = day => {
    setSelectedDate(day?.dateString);
    setIsDefaultState(false);
  };

  const upcomingJobsData = useMemo(
    () =>
      applicantJobs?.filter(item =>
        item?.applicants?.some(
          applicant =>
            applicant?.applicants_id?._id === _id &&
            applicant?.status === 'in progress',
        ),
      ),
    [applicantJobs, _id],
  );

  const finishedData = useMemo(
    () =>
      applicantJobs?.filter(
        item =>
          !item?.applicants?.some(
            applicant =>
              applicant?.applicants_id?._id === _id &&
              applicant?.status === 'in progress',
          ),
      ),
    [applicantJobs, _id],
  );

  const getMarkedDates = () => {
    const data = selectedButton === 0 ? upcomingJobsData : finishedData;

    const markedDates = {};
    data?.forEach(item => {
      const taskStartDate = moment(item.task_start_date).format('YYYY-MM-DD');
      markedDates[taskStartDate] = {
        marked: true,
        dotColor: Colors.Blue,
      };
    });

    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: isDefaultState ? Colors.Primary500 : Colors.Black, // Change color based on isDefaultState
        selectedTextColor: Colors.White,
      };
    }

    return markedDates;
  };

  const showResult = () => {
    toggleModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={isVisible}
      onRequestClose={toggleModal}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={getMarkedDates()}
              style={{height: 350}}
            />
            {selectedDate ? (
              <TouchableOpacity style={styles.button} onPress={showResult}>
                <Text style={styles.buttonTitle}>Show results</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarsPopup;

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
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingTop: hp(4),
    height: '60%',
  },
  button: {
    backgroundColor: Colors.Primary500,
    height: hp(6.5),
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: hp(2),
  },
  buttonTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
