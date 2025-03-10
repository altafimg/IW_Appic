import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import ToDoHomeScreenHeader from '../../../components/nonAuth/toDoList/ToDoHomeScreenHeader';
import FinishedComponent from '../../../components/nonAuth/toDoList/FinishedComponent';
import UpcomingComponent from '../../../components/nonAuth/toDoList/UpcomingComponent';

const ToDoHomeScreen = () => {
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <>
          <UpcomingComponent
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </>
      );
    } else {
      return (
        <FinishedComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ToDoHomeScreenHeader
          selectedButton={selectedButton}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <HandleButtonClick />
      </ScrollView>
    </View>
  );
};

export default ToDoHomeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
