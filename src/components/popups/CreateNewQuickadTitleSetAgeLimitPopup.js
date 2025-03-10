import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {CheckBox, Divider, Overlay} from 'react-native-elements';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';

// image
import unChecked from '../../assets/images/unChecked.png';
import checked from '../../assets/images/checked.png';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewQuickadTitleSetAgeLimitPopup = props => {
  const ageVisible = props.ageVisible;
  const setAgeVisible = props.setAgeVisible;
  const setAgeLimit = props.setAgeLimit;
  const selectedAge = props.selectedAge;
  const setSelectedAge = props.setSelectedAge;

  return (
    <Overlay
      onRequestClose={() => setAgeVisible(false)}
      onBackdropPress={() => setAgeVisible(false)}
      isVisible={ageVisible}
      overlayStyle={[styles.overlayContainer]}>
      {/* <View style={styles.overlaythumbStyle} /> */}
      <View
        style={{
          padding: 10,
        }}>
        <View style={{marginBottom: hp(3)}}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setAgeVisible(false);
              }}>
              <SVG.Cross width={24} height={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.quickAdsHomescreen.age_limit}
            </Text>
            <Text style={styles.headerSubTitle}>kk</Text>
          </View>
          <Divider style={styles.divider} />
        </View>
        {/* <Text style={[styles.boxTextStyle, {fontSize: scale(20)}]}></Text> */}
        {[
          {
            label: AppLocalizedStrings.quickAdsHomescreen.all_age,
            age: 'All Age',
          },
          {label: AppLocalizedStrings.quickAdsHomescreen.age_18, age: '18'},
          {label: AppLocalizedStrings.quickAdsHomescreen.age_21, age: '21'},
          {label: AppLocalizedStrings.quickAdsHomescreen.age_25, age: '25'},
        ].map((option, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <CheckBox
              containerStyle={styles.CheckBoxContainer}
              wrapperStyle={{
                right: 10,
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
              // Check if the current option's age matches the selectedAge
              checked={selectedAge === option.age}
              onPress={() => {
                // Update selectedAge when the checkbox is pressed
                setSelectedAge(option.age);
                setAgeLimit(option.age);
              }}
              title={option.label}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          setAgeVisible(false);
        }}
        activeOpacity={0.6}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Save}
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};
export default CreateNewQuickadTitleSetAgeLimitPopup;

const styles = ScaledSheet.create({
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    height: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    justifyContent: 'space-between',
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
    marginBottom: hp(3),
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    borderWidth: 0,
    height: '40@s',
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
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
