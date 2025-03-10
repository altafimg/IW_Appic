import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';

const EnterAppTopThreeButtons = props => {
  const navigation = useNavigation('');
  const selectedButton = props.selected;
  const setSelectedButton = props.setSelected;

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
        <TouchableOpacity
          style={[
            styles.leftButtonView,
            {
              backgroundColor:
                selectedButton === 2 ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}
          onPress={() => {
            setSelectedButton(2);
          }}>
          <Text
            style={[
              styles.openTitle,
              {color: selectedButton === 2 ? Colors.White : Colors.Neutral600},
            ]}>
            {props.title3}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterAppTopThreeButtons;

const styles = ScaledSheet.create({
  twoButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    backgroundColor: Colors.Neutral100,
    height: '45@s',
    borderRadius: 5,
    marginHorizontal: wp(3),
  },
  leftButtonView: {
    backgroundColor: Colors.Neutral100,
    // width: '47%',
    flex: 1,
    alignItems: 'center',
    marginLeft: wp(1.5),
    borderRadius: 5,
  },
  openTitle: {
    color: Colors.White,
    fontSize: '13@s',
    fontWeight: '500',
    paddingVertical: hp(1),
  },
});
