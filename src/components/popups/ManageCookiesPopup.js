import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {ScaledSheet, scale} from 'react-native-size-matters';

// images
import downArrow from '../../assets/images/downArrow.png';
import {hp} from '../../utility/responsive/ScreenResponsive';

const ManageCookiesPopup = props => {
  const visiable = props.visiable;
  const setVisiable = props.setVisiable;

  const [checked, setChecked] = useState(true);

  return (
    <Overlay
      onRequestClose={() => setVisiable(false)}
      onBackdropPress={() => setVisiable(false)}
      isVisible={visiable}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.overlaythumbStyle} />
      <View style={styles.bottomSheetStyle}>
        <Text style={styles.overlayTitleStyle}>Manage Cookies</Text>

        <View style={{marginTop: scale(10), padding: 5}}>
          <View style={styles.directionStyle}>
            <View style={styles.directionStyleSec}>
              <Text style={styles.newButtonTextStyle}>Essential</Text>
              <Text style={styles.newButtonTextStyleSec}>Always on</Text>
            </View>
            <Text style={styles.newButtonTextStyleThird}>
              Our app uses cookies to enhance your experience and provide
              personalized content.
            </Text>
          </View>
          <View style={styles.directionStyle}>
            <View style={styles.directionStyleSec}>
              <Text style={styles.newButtonTextStyle}>Analytical</Text>
              <ToggleSwitch
                isOn={checked}
                onColor={Colors.Success500}
                offColor={Colors.Neutral400}
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="medium"
                onToggle={() => setChecked(!checked)}
              />
            </View>
            <Text style={styles.newButtonTextStyleThird}>
              Our app uses cookies to enhance your experience and provide
              personalized content.
            </Text>
          </View>
          <View style={styles.directionStyle}>
            <View style={styles.directionStyleSec}>
              <Text style={styles.newButtonTextStyle}>Name</Text>
              <ToggleSwitch
                isOn={checked}
                onColor={Colors.Success500}
                offColor={Colors.Neutral400}
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="medium"
                onToggle={() => setChecked(!checked)}
              />
            </View>

            <Text style={styles.newButtonTextStyleThird}>
              Our app uses cookies to enhance your experience and provide
              personalized content.
            </Text>
          </View>
          <View style={styles.directionStyle}>
            <View style={styles.directionStyleSec}>
              <Text style={styles.newButtonTextStyle}>Name</Text>
              <ToggleSwitch
                isOn={checked}
                onColor={Colors.Success500}
                offColor={Colors.Neutral400}
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="medium"
                onToggle={() => setChecked(!checked)}
              />
            </View>

            <Text style={styles.newButtonTextStyleThird}>
              Our app uses cookies to enhance your experience and provide
              personalized content.
            </Text>
          </View>

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

export default ManageCookiesPopup;

const styles = ScaledSheet.create({
  directionStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingVertical: '10@s',
    borderRadius: 8,
    marginBottom: hp(1),
  },
  directionStyleSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directionStyleThird: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingVertical: '10@s',
    borderRadius: 8,
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
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral800,
  },
  newButtonTextStyleSec: {
    fontWeight: '500',
    fontSize: '14@s',
    color: '#898A8D',
  },
  newButtonTextStyleThird: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral800,
    paddingTop: hp(1),
  },
  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
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
