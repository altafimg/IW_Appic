import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import CalendarsPopup from '../../popups/CalendarsPopup';
import ToDoListSearchPopup from '../../popups/ToDoListSearchPopup';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ToDoHomeScreenHeader = ({
  selectedButton,
  selectedDate,
  setSelectedDate,
}) => {
  const navigation = useNavigation();
  const applicantJobs = useSelector(
    state => state.getJobsByApplicantIdReducer.data?.data?.data,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleModal = () => {
    // setIsVisible(!isVisible);
    navigation.navigate('TodoCalendarScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>To do list</Text>
      <View style={styles.insideContainer}>
        <TouchableOpacity onPress={() => setSearchVisible(true)}>
          <SVG.Search width={25} height={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}>
          <SVG.Calendar width={25} height={25} />
        </TouchableOpacity>
      </View>
      <CalendarsPopup
        isVisible={isVisible}
        toggleModal={toggleModal}
        selectedButton={selectedButton}
        applicantJobs={applicantJobs}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ToDoListSearchPopup
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        applicantJobs={applicantJobs}
        selectedButton={selectedButton}
      />
    </View>
  );
};

export default ToDoHomeScreenHeader;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: Colors.White,
    marginTop: hp(2),
  },
  insideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(1),
    width: '80%',
  },
});
