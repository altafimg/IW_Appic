import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const ToDoJobCompletedScreen = () => {
  return (
    <View style={styles.container}>
      <View />
      <View>
        <SVG.PaymentSuccess />
        <View style={styles.viewStyle}>
          <Text style={styles.title}>Job Completed</Text>
          <Text style={styles.subTitle}>But the grind doesn’t stop here</Text>
        </View>
      </View>
      <View style={styles.button}>
        <PrimaryButton title={`See more To Do’s`} />
      </View>
    </View>
  );
};

export default ToDoJobCompletedScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  viewStyle: {
    marginTop: '20@s'
  },
  title: {
    fontSize: '23@s',
    fontWeight: '600',
    textAlign: "center"
  },
  subTitle: {
    fontSize: '13@s',
    fontWeight: '400',
    marginTop: '10@s',
    textAlign: "center"
  },
  button: {
    marginBottom: '30@s'
  }
});
