import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../assets/svg';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

const SorryAboutThisCard = () => {
  return (
    <View>
      <View style={styles.textInputView}>
        <TextInput
          placeholder=" "
          multiline
          maxLength={300}
          style={styles.textInput}
        />
      </View>
      <Text style={styles.inputBottomTitle}>0/300</Text>
      <View>
        <Text style={styles.title}>
          {AppLocalizedStrings.sorryAboutThisScreen.upload}
        </Text>
        <TouchableOpacity style={styles.cradView}>
          <Text style={styles.cradTitle}>Browse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.musicAddCard}>
        <View style={styles.videoCard}>
          <SVG.VideoUpload style={styles.image} />
          <Text style={styles.musicAddCardTitle}>video2993.mov</Text>
        </View>
        <TouchableOpacity>
          <SVG.CircleCross />
        </TouchableOpacity>
      </View>
      <View style={styles.musicAddCard}>
        <View style={styles.videoCard}>
          <SVG.Music style={styles.image} />
          <Text style={styles.musicAddCardTitle}>video2993.mov</Text>
        </View>
        <TouchableOpacity>
          <SVG.CircleCross />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SorryAboutThisCard;

const styles = ScaledSheet.create({
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '140@s',
  },
  textInput: {
    paddingHorizontal: wp(3),
  },
  inputBottomTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'right',
    paddingTop: hp(1),
  },
  title: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    marginTop: hp(4),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral500,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: hp(1),
  },
  cradTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
    paddingVertical: hp(1.4),
  },
  musicAddCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1),
  },
  musicAddCardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '400',
    paddingLeft: wp(4),
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
