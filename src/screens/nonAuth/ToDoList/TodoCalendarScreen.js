import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import NewHeader from '../../../components/NewHeader';
import {Calendar} from 'react-native-calendars';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const TodoCalendarScreen = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <NewHeader headerTitle="Upcoming Job Dates" onPress={goBack} />
      <View style={styles.main}>
        <Calendar style={styles.calenderContainer} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Show results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoCalendarScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
  },
  calenderContainer: {
    height: 350,
    marginTop: hp(1),
  },
  main: {
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: hp(2),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingTop: hp(4),
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
