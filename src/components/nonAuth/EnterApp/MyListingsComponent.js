import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import {AppLocalizedStrings} from '../../../localization/Localization';

const MyListingsComponent = props => {
  const navigation = useNavigation('');
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;
  const [dataFound, setDataFound] = useState(true);

  const onCompleteJobHandler = () => {
    navigation.navigate('JobDetailsScreen');
  };

  return (
    <View>
      <EnterAppTopButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        title1="Available"
        title2="My Listings"
      />
      <View style={styles.container}>
        <Text>{AppLocalizedStrings.myListingsComponent.my}</Text>
      </View>
    </View>
  );
};

export default MyListingsComponent;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
});
