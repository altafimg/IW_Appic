import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import MainHeader from '../../../components/nonAuth/QuickAds/MainHeader';

// import Image
import profile from '../../../assets/images/profile.png';

const DashboardScreen = ({navigation}) => {
  const onMassageHandler = () => {
    navigation.navigate('MessageScreen');
  };
  const onViewProfileHandler = () => {
    navigation.navigate('ViewProfileScreen');
  };
  return (
    <View style={styles.container}>
      <MainHeader
        onPress={onViewProfileHandler}
        onPress1={onMassageHandler}
        image1={profile}
        title="Dashboard"
      />
    </View>
  );
};

export default DashboardScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
