import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import SVG from '../../../assets/svg';

const JobCancelledThanksScreen = () => {
  const navigation = useNavigation('');

  const onBackHandler = () => {
    navigation.navigate('ToDoBottomNavigation');
  };
  return (
    <View style={styles.container}>
      <View>
        <SVG.JobCancelled style={styles.image} />
        <Text style={styles.cancelledTitle}>Cancelled</Text>
        <Text style={styles.subTitle}>This job has now been cancelled.</Text>
      </View>
      <PrimaryButton title="Back to To do List" onPress={onBackHandler} />
    </View>
  );
};

export default JobCancelledThanksScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
    marginTop: hp(10),
  },
  cancelledTitle: {
    color: Colors.Neutral900,
    fontSize: '23@s',
    fontWeight: '600',
    lineHeight: '28@s',
    textAlign: 'center',
    marginTop: hp(5),
  },
  subTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    textAlign: 'center',
    paddingTop: hp(1),
  },
});
