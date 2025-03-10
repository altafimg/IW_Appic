import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import CreateNewVibePopup from '../../popups/CreateNewVibePopup';

// image
import downArrow from '../../../assets/images/downArrow.png';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const CreateNewTheVibeModel = ({
  vibeType,
  setVibeType,
  language,
  setLanguage,
  mood,
  setMood,
  swear,
  setSwear,
}) => {
  const [vibeExpend, setVibeExpend] = useState(false);
  const [vibeVisible, setVibeVisible] = useState(false);

  return (
    <View style={[styles.mainBoxStyle1]}>
      <TouchableOpacity
        onPress={() => {
          setVibeExpend(!vibeExpend);
        }}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.the_vibe}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: vibeExpend ? Colors.Primary500 : null,
            transform: vibeExpend ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        {vibeExpend && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.Neutral300,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
            }}>
            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.which_languange}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVibeVisible(true);
                setVibeType('language');
              }}
              activeOpacity={0.6}
              style={styles.inputStyle}>
              <View style={styles.directionRowStyle}>
                <Text numberOfLines={1} style={styles.dateTextStyle}>
                  {language.length > 0
                    ? `${language}`
                    : AppLocalizedStrings.quickAdsHomescreen.select}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
              Dialect
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVibeVisible(true);
                setVibeType('language');
              }}
              activeOpacity={0.6}
              style={styles.inputStyle}>
              <View style={styles.directionRowStyle}>
                <Text numberOfLines={1} style={styles.dateTextStyle}>
                  {AppLocalizedStrings.quickAdsHomescreen.select}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
              {AppLocalizedStrings.quickAdsHomescreen.set_mood}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVibeVisible(true);
                setVibeType('mood');
              }}
              activeOpacity={0.6}
              style={[styles.inputStyle]}>
              <View style={styles.directionRowStyle}>
                <Text style={styles.dateTextStyle}>
                  {mood.length > 0
                    ? mood
                    : AppLocalizedStrings.quickAdsHomescreen.select}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
              {AppLocalizedStrings.quickAdsHomescreen.Swearing_language}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVibeVisible(true);
                setVibeType('Swearing');
              }}
              activeOpacity={0.6}
              style={[styles.inputStyle, {marginBottom: scale(15)}]}>
              <View style={styles.directionRowStyle}>
                <Text style={styles.dateTextStyle}>
                  {swear.length > 0
                    ? swear
                    : AppLocalizedStrings.quickAdsHomescreen.select}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    top: scale(5),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <CreateNewVibePopup
        vibeVisible={vibeVisible}
        setVibeVisible={setVibeVisible}
        vibeType={vibeType}
        setVibeType={setVibeType}
        language={language}
        setLanguage={setLanguage}
        mood={mood}
        setMood={setMood}
        swear={swear}
        setSwear={setSwear}
      />
    </View>
  );
};

export default CreateNewTheVibeModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    // borderWidth: 1,
    // borderRadius: '3@s',
    // borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
  },
  expendButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 5,
    height: '44@s',
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  inputStyle: {
    // height: '36@s',
    marginTop: '6@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: 10,
    paddingBottom: '10@s',
  },
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTextStyle: {
    width: '90%',
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
    top: '5@s',
  },
});
