import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import MainHeader from '../../../components/nonAuth/QuickAds/MainHeader';
import AvailableSponsorComponent from '../../../components/nonAuth/EnterApp/AvailableSponsorComponent';
import MyListingsComponent from '../../../components/nonAuth/EnterApp/MyListingsComponent';

// import Image
import profile from '../../../assets/images/profile.png';

const SponsorshipsScreen = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState(0);

  const onMassageHandler = () => {
    navigation.navigate('MessageScreen');
  };
  const onViewProfileHandler = () => {
    navigation.navigate('ViewProfileScreen');
  };

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <AvailableSponsorComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      );
    } else {
      return (
        <MyListingsComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <MainHeader
        onPress={onViewProfileHandler}
        onPress1={onMassageHandler}
        image1={profile}
        title="Sponsorships"
      />
      <HandleButtonClick />
    </View>
  );
};

export default SponsorshipsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
