import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {CheckBox, Divider, Overlay} from 'react-native-elements';

// image
import checked from '../../assets/images/checked.png';
import unChecked from '../../assets/images/unChecked.png';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewTargetAudiencePopup = props => {
  const targetVisible = props.targetVisible;
  const setTargetVisible = props.setTargetVisible;
  const target = props.target;
  const targetAge = props.targetAge;
  const setTargetAge = props.setTargetAge;

  const ageData = [
    {id: 1, name: 'Parents/guardians of children', age: '13 - 100'},
    {id: 2, name: '13-20 years old', age: '13 - 20'},
    {id: 3, name: '20-30 years old', age: '20 - 30'},
    {id: 4, name: '30-40 years old', age: '30 - 40'},
    {id: 5, name: '40-50 years old', age: '40 - 50'},
    {id: 6, name: '50-60 years old', age: '50 - 60'},
    {id: 7, name: '60+ years old', age: '60 - 100'},
  ];

  // for multi selacket
  // const toggleAgeSelection = age => {
  //   if (targetAge.includes(age)) {
  //     setTargetAge(targetAge.filter(selectedAge => selectedAge !== age));
  //   } else {
  //     setTargetAge([...targetAge, age]);
  //   }
  // };

  // for single selecket
  const toggleAgeSelection = age => {
    setTargetAge([age]);
  };

  return (
    <Overlay
      onRequestClose={() => setTargetVisible(false)}
      onBackdropPress={() => setTargetVisible(false)}
      isVisible={targetVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setTargetVisible(false)}>
            <SVG.Cross width={24} height={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Age Range</Text>
          <Text style={styles.headerSubTitle}>kk</Text>
        </View>
        <Divider style={styles.divider} />
      </View>
      <View style={{padding: 10}}>
        <ScrollView
          scrollEnabled={target == 'Age' ? false : true}
          showsVerticalScrollIndicator={false}
          style={{
            height: scale(410),
          }}>
          {target == 'Age' &&
            ageData.map(item => (
              <View key={item.id}>
                <CheckBox
                  containerStyle={[
                    styles.CheckBoxContainer,
                    {marginTop: hp(2)},
                  ]}
                  wrapperStyle={{
                    right: 10,
                    height: scale(24),
                    bottom: 10,
                    gap: 7,
                  }}
                  checkedIcon={
                    <Image
                      source={checked}
                      style={{width: scale(24), height: scale(24)}}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={unChecked}
                      style={{width: scale(24), height: scale(24)}}
                    />
                  }
                  checked={targetAge.includes(item.age)}
                  onPress={() => toggleAgeSelection(item.age)}
                  title={item.name}
                />
                <Divider style={styles.divider} />
              </View>
            ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            setTargetVisible(false);
          }}
          activeOpacity={0.6}
          style={[styles.buttonStyle]}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Save}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CreateNewTargetAudiencePopup;

const styles = ScaledSheet.create({
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    backgroundColor: Colors.White,
    width: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '200@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '14@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '1@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
