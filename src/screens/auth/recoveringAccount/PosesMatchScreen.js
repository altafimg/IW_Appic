import React from 'react';
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';

const PosesMatchScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const poseImagePath = route?.params?.capturedImageUrl;
  const check = route?.params?.check;
  const loading = useSelector(state => state.imageUploadReducer.loading);

  const finalPoseHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('imgUrls', {
        uri: poseImagePath,
        type: 'image/jpg',
        name: 'image.jpg',
      });

      const res = await dispatch(imageUploadAction(formData));
      const uploadedID = res?.data?.imgUrls[0];

      if (!uploadedID) {
        throw new Error('Image upload failed');
      }

      navigation.navigate('PhotoVerificationFinalCameraScreen', {
        poseImage1: uploadedID,
        check: check,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Image upload failed, please try again.');
    }
  };

  const onRetakeHandler = () => {
    navigation.navigate('PhotoVerificationCameraScreen', {check});
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageMainView}>
        <Image source={{uri: poseImagePath}} style={styles.imageUp} />
        <Image
          source={require('../../../assets/images/cameraPose2.png')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.headerTitle}>
          {AppLocalizedStrings.posesMatchScreen.posesMatch}
        </Text>
        <Text style={styles.paragraph}>
          {AppLocalizedStrings.posesMatchScreen.ensure}
        </Text>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.previousButton}
          onPress={onRetakeHandler}>
          <Text style={styles.previousTitle}>
            {AppLocalizedStrings.posesMatchScreen.retake}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={finalPoseHandler}>
          {loading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator color={Colors.White} size="small" />
            </View>
          ) : (
            <Text style={styles.nextTitle}>Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PosesMatchScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingBottom: hp(3),
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  imageMainView: {
    // alignSelf: 'center',
    // width: '70%',
    // marginTop: hp(10),
  },
  imageUp: {
    // marginLeft: wp(2),
    width: 186,
    height: 250,
    borderRadius: 85,
  },
  image: {
    // zIndex: 1,
    marginTop: hp(-6),
    alignSelf: 'flex-end',
    // height: 200,
    // width: 150,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '22@s',
    fontWeight: '600',
    lineHeight: '27@s',
    textAlign: 'center',
    marginTop: hp(5),
  },
  paragraph: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    textAlign: 'center',
    marginTop: hp(1),
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  nextButton: {
    backgroundColor: Colors.Primary500,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginLeft: wp(1),
  },
  nextTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  previousButton: {
    backgroundColor: Colors.White,
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: Colors.Primary500,
    borderWidth: 1,
    flex: 1,
    marginRight: wp(1),
  },
  previousTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  loadingView: {
    alignItems: 'center',
  },
});
