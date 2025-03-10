import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import NewHeader from '../../../components/NewHeader';

const LookingReportToDoScreen = () => {
  const navigation = useNavigation('');

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onBackHandler = () => {
    navigation.navigate('ToDoBottomNavigation');
  };
  return (
    <View style={styles.container}>
      <View>
        <NewHeader
          headerTitle="We’re looking in to your report"
          onPress={onGoBackHandler}
        />
        <Header subTitle="This job has now been cancelled." />
        <Text style={styles.screenTitle}>
          We’re going to take a look at this job proposal and take the most
          appropriate action.
        </Text>
      </View>
      <PrimaryButton title="Back to To do List" onPress={onBackHandler} />
    </View>
  );
};

export default LookingReportToDoScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    marginBottom: '20@s',
  },
  screenTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: hp(-2),
  },
});
