import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BrowsePopup from '../../popups/BrowsePopup';

const MediaFilesVideoComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardMainView}>
        <Text style={styles.uploadTitle}>Upload Video</Text>
        <TouchableOpacity style={styles.cradView} onPress={toggleModal}>
          <Text style={styles.cradTitle}>Browse</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCardView}>
        <Text style={styles.uploadedTitle}>Uploaded Video</Text>
        <View style={styles.musicAddCard}>
          <View style={styles.videoCard}>
            <SVG.VideoUpload style={styles.image} />
            <Text style={styles.musicAddCardTitle}>http://video.com</Text>
          </View>
          <TouchableOpacity>
            <SVG.CloseCross width={21} height={21} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <BrowsePopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
};

export default MediaFilesVideoComponent;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  cardMainView: {
    marginTop: hp(2),
  },
  uploadTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(1),
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
  //   {}
  musicAddCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginVertical: hp(1),
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
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(1.5),
  },
  bottomCardView: {
    marginTop: hp(2),
  },
  uploadedTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
  },
});
