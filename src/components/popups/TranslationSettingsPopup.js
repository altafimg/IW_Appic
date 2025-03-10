import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

// images
import downArrow from '../../assets/images/downArrow.png';

const TranslationSettingsPopup = props => {
  const navigation = useNavigation();
  const visiable = props.visiable;
  const setVisiable = props.setVisiable;

  const [checked, setChecked] = useState(true);

  const selecketLangwageHandler = () => {
    navigation.navigate('SelectLanguageScreen');
    setVisiable(false);
  };
  return (
    <Overlay
      onRequestClose={() => setVisiable(false)}
      onBackdropPress={() => setVisiable(false)}
      isVisible={visiable}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.overlaythumbStyle} />
      <View style={styles.bottomSheetStyle}>
        <Text style={styles.overlayTitleStyle}>
          {AppLocalizedStrings.MessageingScreen.Translation_Settings}
        </Text>
        <View style={{marginTop: scale(10), padding: 5}}>
          <View style={styles.directionStyle}>
            <Text
              style={[
                styles.newButtonTextStyle,
                {
                  fontWeight: '400',
                  color: Colors.Neutral800,
                },
              ]}>
              {AppLocalizedStrings.MessageingScreen.Translation_Assistant}
            </Text>
            <ToggleSwitch
              isOn={checked}
              onColor={Colors.Success500}
              offColor={Colors.Neutral400}
              //   label="Example label"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="medium"
              onToggle={() => setChecked(!checked)}
            />
          </View>
          <Text
            style={[
              styles.countStyle,
              {marginTop: scale(20), color: Colors.Neutral500},
            ]}>
            {AppLocalizedStrings.MessageingScreen.Translation_All}
          </Text>
          <TouchableOpacity
            onPress={selecketLangwageHandler}
            style={[styles.directionStyle, {marginTop: scale(10)}]}>
            <Text
              style={[
                styles.countStyle,
                {marginTop: scale(0), color: Colors.Neutral900},
              ]}>
              English (US)
            </Text>
            <Image
              source={downArrow}
              style={{
                width: scale(26),
                height: scale(26),
                tintColor: Colors.Neutral900,
                transform: [{rotateZ: '270deg'}],
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setVisiable(false);
            }}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: Colors.Primary500,
                marginBottom: scale(25),
                height: scale(53),
              },
            ]}>
            <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
              {AppLocalizedStrings.MessageingScreen.save}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

export default TranslationSettingsPopup;

const styles = ScaledSheet.create({
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingVertical: '10@s',
  },
  buttonContainer: {
    backgroundColor: Colors.Neutral100,
    height: '40@s',
    marginTop: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '3@s',
  },
  newButtonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
  },
  countStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Primary500,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  overlayTitleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '25@s',
    marginBottom: '7@s',
  },
});
