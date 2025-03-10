import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from '../../textInput/DetailsTextInput';
import PrimaryButton from '../../buttons/PrimaryButton';
import SVG from '../../../assets/svg';
import UploadingStatusPopup from '../../popups/UploadingStatusPopup';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BrowsePopup from '../../popups/BrowsePopup';

const MediaFilesDocsComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSec, setIsVisibleSec] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const toggleModaSec = () => {
    setIsVisibleSec(!isVisibleSec);
  };
  return (
    <View style={styles.container}>
      <View>
        <DetailsTextInput title="Title" />
      </View>
      <View style={styles.cardMainView}>
        <TouchableOpacity style={styles.cradView} onPress={toggleModaSec}>
          <Text style={styles.cradTitle}>Browse</Text>
        </TouchableOpacity>
        <PrimaryButton title="Add" onPress={toggleModal} />
      </View>
      <View style={styles.bottomCardView}>
        <Text style={styles.uploadedTitle}>Uploaded Images</Text>
        <View style={styles.musicAddCard}>
          <View style={styles.videoCard}>
            <SVG.VideoUpload style={styles.image} />
            <Text style={styles.musicAddCardTitle}>image 982284.jpg</Text>
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
      <BrowsePopup
        isVisible={isVisibleSec}
        setIsVisible={setIsVisibleSec}
        toggleModal={toggleModaSec}
      />
    </View>
  );
};

export default MediaFilesDocsComponent;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  cardMainView: {
    marginVertical: hp(1),
  },
  cradView: {
    borderWidth: 1,
    borderColor: Colors.Neutral500,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginVertical: hp(1),
    marginBottom: hp(2),
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
