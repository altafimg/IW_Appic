import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import UploadingStatusPopup from '../../popups/UploadingStatusPopup';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../textInput/DetailsTextInput';
import PrimaryButton from '../../buttons/PrimaryButton';

const MediaFilesLinksComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <View>
        <DetailsTextInput title="Title" />
        <DetailsTextInput title="Enter Link " />
        <Text> </Text>
        <PrimaryButton title="Add" onPress={toggleModal} />
      </View>
      <View style={styles.bottomCardView}>
        <Text style={styles.uploadedTitle}>Upload Links</Text>
        <View style={styles.musicAddCard}>
          <View style={styles.videoCard}>
            <SVG.VideoUpload style={styles.image} />
            <View>
              <Text style={styles.musicAddCardTitle}>audio.wav</Text>
              <Text style={styles.musicAddCardTitleSec}>www.link.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <SVG.CloseCross width={21} height={21} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.musicAddCard}>
          <View style={styles.videoCard}>
            <SVG.VideoUpload style={styles.image} />
            <View>
              <Text style={styles.musicAddCardTitle}>audio.wav</Text>
              <Text style={styles.musicAddCardTitleSec}>www.link.com</Text>
            </View>
          </View>
          <TouchableOpacity>
            <SVG.CloseCross width={21} height={21} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <UploadingStatusPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export default MediaFilesLinksComponent;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  musicAddCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: hp(0.5),
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1),
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: wp(3),
  },
  musicAddCardTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    lineHeight: '20@s',
  },
  musicAddCardTitleSec: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  bottomCardView: {
    marginTop: hp(2),
  },
  uploadedTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
    paddingBottom: hp(1),
  },
});
