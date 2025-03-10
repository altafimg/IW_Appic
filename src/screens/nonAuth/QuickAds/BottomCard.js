import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {TextInput} from 'react-native-gesture-handler';

const BottomCard = ({
  showBottomCard,
  setShowBottomCard,
  adText,
  selectedItemTitle,
  setAdText,
  handleContinue,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 15,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        onPress={() => {
          setShowBottomCard(!showBottomCard);
        }}>
        <View
          style={{
            backgroundColor: '#A8A29E',
            width: 50,
            height: 4,
            borderRadius: 5,
          }}></View>
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>
          {AppLocalizedStrings.quickAdsHomescreen.further}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text numberOfLines={1} style={styles.text}>
            {selectedItemTitle}
          </Text>
          <Text style={[styles.text, {opacity: 0.5}]}>(Optional)</Text>
        </View>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder="Add a note here"
          value={adText}
          onChangeText={t => {
            setAdText(t);
          }}
        />
      </View>
      <View style={styles.buttonTopStyle}>
        <PrimaryButton
          onPress={handleContinue}
          title={AppLocalizedStrings.quickAdsHomescreen.continue}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '95%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 30,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  titleText: {
    width: '100%',
    fontWeight: '500',
    fontSize: '20@s',
    color: Colors.Neutral800,
    textAlign: 'left',
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  textInput: {
    alignSelf: 'center',
    width: '100%',
    height: hp(30),
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 10,
    fontSize: '16@s',
    lineHeight: 20,
    marginTop: 5,
  },
  // text: {
  //   fontSize: 15,
  //   textAlign: 'center',
  // },
  Question: {
    fontSize: 15,
    flex: 1,
    color: '#1DA1F2',
  },
  text: {
    fontSize: 15,
    color: 'black',
    width: '80%',
    marginVertical: 5,
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
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
  CheckBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  buttonTopStyle: {
    marginTop: hp(35),
    alignSelf: 'center',
  },
});

export default BottomCard;
