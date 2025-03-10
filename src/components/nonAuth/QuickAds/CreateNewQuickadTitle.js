import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CreateNewQuickadTitleThumbnailPopup from '../../popups/CreateNewQuickadTitleThumbnailPopup';
import CreateNewQuickadTitleCategoryPopup from '../../popups/CreateNewQuickadTitleCategoryPopup';
import CreateNewQuickadTitleSetAgeLimitPopup from '../../popups/CreateNewQuickadTitleSetAgeLimitPopup';
import Colors from '../../../theme/Colors';

// image
import close from '../../../assets/images/close.png';
import upload from '../../../assets/images/upload.png';
import downArrow from '../../../assets/images/downArrow.png';
import {hp} from '../../../utility/responsive/ScreenResponsive';

const CreateNewQuickadTitle = ({
  ageLimit,
  setAgeLimit,
  thumbnailImage,
  setThumbnailImage,
  quickTitle,
  setQuickTitle,
  setSelectedCategories,
  selectedCategories,
  selectedAge,
  setSelectedAge,
}) => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [ageVisible, setAgeVisible] = useState(false);
  const [type, setType] = useState('');
  const [imageVisible, setImageVisible] = useState(false);

  const handleImagePicker = note => {
    const mediaOption = {
      mediaType: note !== 'browse' ? 'photo' : 'files',
    };
    launchImageLibrary(mediaOption, response => {
      if (response && !response.didCancel) {
        if (note === 'browse') {
          setBrowseImage(response.assets[0].uri);
          setImageVisible(false);
        } else {
          setThumbnailImage(response.assets[0].uri);
          setImageVisible(false);
        }
      } else {
        console.log('Image picker cancelled');
      }
    });
  };

  return (
    <View style={styles.cardMainContainer}>
      <View style={{paddingHorizontal: 10, marginTop: 10}}>
        <Text style={styles.quickTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.quick_title}
        </Text>
        <TextInput
          value={quickTitle}
          onChangeText={t => setQuickTitle(t)}
          // multiline={true}
          style={styles.inputStyle}
          placeholder="Write here"
        />
        {thumbnailImage !== null ? (
          <ImageBackground
            borderRadius={5}
            resizeMode="cover"
            source={{uri: thumbnailImage}}
            style={styles.backgroundImage}>
            <TouchableOpacity
              onPress={() => {
                setThumbnailImage(null);
              }}>
              <Image source={close} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.inputStyle,
              {
                height: scale(140),
                marginTop: scale(15),
                justifyContent: 'space-between',
              },
            ]}>
            <View>
              <Text style={styles.browseTitle}>Browse files to upload</Text>
              <Text style={styles.browseTitleSec}>PNG, JPG, GIF up to 5MB</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                let type = 'image';
                setType(type);
                setImageVisible(true);
              }}
              style={styles.browseButton}>
              <Image
                source={upload}
                style={{
                  width: scale(16),
                  height: scale(16),
                }}
                tintColor={Colors.White}
              />
              <Text
                style={[
                  styles.messageStyle,
                  {
                    color: Colors.White,
                    textAlign: 'center',
                    fontWeight: '500',
                    paddingLeft: 10,
                  },
                ]}>
                Browse Files
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setCategoryVisible(true);
          }}
          style={styles.mainBoxStyle}>
          <Text
            numberOfLines={1}
            style={[styles.boxTextStyle, {color: Colors.Neutral500}]}>
            {selectedCategories.length > 0
              ? `${selectedCategories}`
              : AppLocalizedStrings.quickAdsHomescreen.select_Category}
          </Text>
          <Image
            source={downArrow}
            style={{
              width: scale(24),
              height: scale(24),
              transform: [{rotateZ: '270deg'}],
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setAgeVisible(true);
          }}
          style={styles.mainBoxStyle}>
          <Text
            numberOfLines={1}
            style={[
              styles.boxTextStyle,
              {color: ageLimit ? Colors.Neutral500 : Colors.Neutral400},
            ]}>
            {ageLimit
              ? `Applicants must be ${ageLimit}+ years`
              : AppLocalizedStrings.quickAdsHomescreen.set_age}
          </Text>
          <Image
            source={downArrow}
            style={{
              width: scale(24),
              height: scale(24),
              transform: [{rotateZ: '270deg'}],
            }}
          />
        </TouchableOpacity>
      </View>

      <CreateNewQuickadTitleThumbnailPopup
        imageVisible={imageVisible}
        setImageVisible={setImageVisible}
        type={type}
        handleImagePicker={handleImagePicker}
      />
      <CreateNewQuickadTitleCategoryPopup
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categoryVisible={categoryVisible}
        setCategoryVisible={setCategoryVisible}
      />
      <CreateNewQuickadTitleSetAgeLimitPopup
        ageVisible={ageVisible}
        setAgeVisible={setAgeVisible}
        setAgeLimit={setAgeLimit}
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
      />
    </View>
  );
};

export default CreateNewQuickadTitle;

const styles = ScaledSheet.create({
  cardMainContainer: {
    borderWidth: 1,
    marginTop: '15@s',
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingBottom: '10@s',
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
    color: Colors.Neutral900,
    paddingVertical: '14@s',
  },
  backgroundImage: {
    height: '140@s',
    marginTop: '15@s',
    borderRadius: '3@s',
  },
  crossImageStyle: {
    position: 'absolute',
    backgroundColor: Colors.White,
    width: '24@s',
    height: '24@s',
    borderRadius: '50@s',
    right: 10,
    top: 10,
  },
  messageStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  mainBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '20@s',
    paddingVertical: '14@s',
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  browseTitle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Primary500,
    marginBottom: hp(1),
  },
  browseTitleSec: {
    fontWeight: '400',
    fontSize: '14@s',
    color: '#6B7280',
  },
  browseButton: {
    width: '130@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Primary500,
    justifyContent: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 10,
  },
});
