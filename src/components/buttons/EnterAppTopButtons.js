import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';

const EnterAppTopButtons = props => {
  const navigation = useNavigation('');
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;

  const onCompleteJobHandler = () => {
    navigation.navigate('JobDetailsScreen');
  };

  return (
    <View>
      <View style={styles.twoButtonView}>
        <TouchableOpacity
          style={[
            styles.leftButtonView,
            {
              backgroundColor:
                selectedButton === 0 ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}
          onPress={() => setSelectedButton(0)}>
          <Text
            style={[
              styles.openTitle,
              {color: selectedButton === 0 ? Colors.White : Colors.Neutral600},
            ]}>
            {props.title1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.leftButtonView,
            {
              backgroundColor:
                selectedButton === 1 ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}
          onPress={() => {
            setSelectedButton(1);
          }}>
          <Text
            style={[
              styles.openTitle,
              {color: selectedButton === 1 ? Colors.White : Colors.Neutral600},
            ]}>
            {props.title2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterAppTopButtons;

const styles = ScaledSheet.create({
  twoButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    backgroundColor: Colors.Neutral100,
    height: '37@s',
    borderRadius: 3,
    marginHorizontal: wp(3),
  },
  leftButtonView: {
    backgroundColor: Colors.Neutral100,
    width: '47%',
    alignItems: 'center',
    marginLeft: wp(1.5),
    borderRadius: 3,
  },
  openTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '500',
    paddingVertical: hp(0.7),
  },
});
