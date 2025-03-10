import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScaledSheet} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';

const CreateNewQuickadTitleThumbnailPopup = props => {
  const imageVisible = props.imageVisible;
  const setImageVisible = props.setImageVisible;
  const type = props.type;
  const handleImagePicker = props.handleImagePicker;
  return (
    <Overlay
      onRequestClose={() => setImageVisible(false)}
      onBackdropPress={() => setImageVisible(false)}
      isVisible={imageVisible}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.overlaythumbStyle} />
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            let note = 'photo';
            handleImagePicker(note);
          }}
          activeOpacity={0.6}>
          <Text style={styles.overlayTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Browse_gallery}
          </Text>
        </TouchableOpacity>
        {type === 'browse' && (
          <TouchableOpacity
            onPress={() => {
              let note = 'browse';
              handleImagePicker(note);
            }}
            activeOpacity={0.6}>
            <Text style={styles.overlayTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Browse_files}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setImageVisible(false)}
          activeOpacity={0.6}>
          <Text style={[styles.overlayTextStyle, {color: 'red'}]}>
            {AppLocalizedStrings.quickAdsHomescreen.Cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CreateNewQuickadTitleThumbnailPopup;

const styles = ScaledSheet.create({
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '180@s',
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
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
  },
});
