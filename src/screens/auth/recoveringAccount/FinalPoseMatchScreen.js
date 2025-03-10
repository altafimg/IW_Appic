import React, {useCallback} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

import {imageUploadAction} from '../../../redux/actions/imageUploadAction';
import {useDispatch, useSelector} from 'react-redux';
import {
  recoverAccountDataAddAction,
  recoverAccountDataRemoveAction,
} from '../../../redux/actions/recoverAccountDataAction';
import {recoverAccountAction} from '../../../redux/actions/recoverAccountAction';
import {editUserRequestAction} from '../../../redux/actions/editUserRequestAction';
import {ActivityIndicator} from 'react-native-paper';
import {userVerifiedRequestAction} from '../../../redux/actions/userVerifiedRequestAction';
import {editUserDataRemoveAction} from '../../../redux/actions/editUserDataStoreAction';
import {accountManagerVerifiedRequestAction} from '../../../redux/actions/accountManagerVerifiedRequestAction';
import {kidParentCheckRemoveAction} from '../../../redux/actions/kidParentCheckAction';
import {replaceAccountManagerAction} from '../../../redux/actions/replaceAccountManagerAction';
import {replaceAccountManagerDataRemoveAction} from '../../../redux/actions/replaceAccountManagerDataStoreAction';

const FinalPoseMatchScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const imageLoader = useSelector(state => state.imageUploadReducer.loading);
  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);
  const token = useSelector(state => state.loginReducer?.token);
  const ParentKidCheck = useSelector(state => state.kidParentCheckReducer.data);
  const editUserData =
    useSelector(state => state.editUserDataStoreReducer.data) || {};
  const replaceAccountManagerData =
    useSelector(state => state.replaceAccountManagerDataStoreReducer.data) ||
    {};
  const recoverAccountData = useSelector(
    state => state.recoverAccountDataReducer.data,
  );
  const user_role =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data?.user_role,
    ) || {};

  const manager_Id = useSelector(state => {
    const data = state?.getAccountManagerReducer?.data?.data;
    if (data && Array.isArray(data) && data.length > 0) {
      return data[0]?._id || '';
    }
    return '';
  });

  const poseImage2 = route?.params?.poseImage2;
  const poseImage1 = route?.params?.poseImage1;
  const check = route?.params?.check;

  const uploadImage = useCallback(
    async uri => {
      const formData = new FormData();
      formData.append('imgUrls', {uri, type: 'image/jpg', name: 'image.jpg'});
      const res = await dispatch(imageUploadAction(formData));
      return res?.data?.imgUrls[0];
    },
    [dispatch],
  );

  const handleEditProfile = async uploadedImageUrl => {
    const {current_value, new_value, reason_change, req_name, uploadedID} =
      editUserData;
    const data = {
      user_id: _id,
      req_name,
      new_value,
      current_value,
      reason_change,
      govt_id: uploadedID,
      pose1: poseImage1,
      pose2: uploadedImageUrl,
      token,
    };
    const res = await dispatch(editUserRequestAction(data));
    if (res?.status === 201) {
      navigation.navigate('EditProfileThanksScreen', {
        screenCheck: req_name,
      });
      dispatch(editUserDataRemoveAction());
    } else {
      Alert.alert('Please try again!');
    }
  };

  const handleUserVerify = async uploadedImageUrl => {
    const data = {
      user_id: _id,
      govt_id: editUserData.uploadedID,
      pose1: poseImage1,
      pose2: uploadedImageUrl,
      token,
      user_verify_status: 'underreview',
    };
    const res = await dispatch(userVerifiedRequestAction(data));
    console.log(res?.data, '<<<<<<<res?.data');

    if (res?.status === 200) {
      navigation.navigate('EditProfileThanksScreen', {
        screenCheck: 'user_verify',
      });
      dispatch(editUserDataRemoveAction());
      dispatch(kidParentCheckRemoveAction());
    } else {
      Alert.alert('Please try again!');
    }
  };

  const handleAccountManagerVerify = async uploadedImageUrl => {
    const data = {
      user_id: _id,
      govt_id: editUserData.uploadedID,
      pose1: poseImage1,
      pose2: uploadedImageUrl,
      token,
      Manager_verify_request_Status: 'underreview',
      user_role,
    };
    const res = await dispatch(accountManagerVerifiedRequestAction(data));
    console.log(res?.data, '<<<<<<<res?.data');
    if (res?.status === 200) {
      navigation.navigate('EditProfileThanksScreen', {
        screenCheck: 'manager_verify',
      });
      dispatch(editUserDataRemoveAction());
      dispatch(kidParentCheckRemoveAction());
    } else {
      Alert.alert('Please try again!');
    }
  };

  const handleReplaceAccountManager = async uploadedImageUrl => {
    const {dateOfBirth, email, firstName, lastName, relationship, uploadedID} =
      replaceAccountManagerData;
    const data = {
      user_Id: _id,
      managerId: manager_Id,
      first_name: firstName,
      last_name: lastName,
      profile_name: '',
      relationship,
      date_of_birth: dateOfBirth,
      email,
      token,
      pose1: poseImage1,
      pose2: uploadedImageUrl,
      govt_id: uploadedID,
      Manager_verify_request_Status: 'additionalverificationrequest',
    };
    const res = await dispatch(replaceAccountManagerAction(data));
    if (res?.status === 200) {
      navigation.navigate('EditProfileThanksScreen', {
        screenCheck: 'manager_replace',
      });
      dispatch(replaceAccountManagerDataRemoveAction());
    } else {
      Alert.alert('Please try again!');
    }
  };

  const handleRecoverAccount = async () => {
    try {
      const [poseImage1Response, poseImage2Response] = await Promise.all([
        uploadImage(poseImage1),
        uploadImage(poseImage2),
      ]);
      if (poseImage1Response && poseImage2Response) {
        const modifiedRecoverData = {
          ...recoverAccountData,
          poseImage1: poseImage1Response,
          poseImage2: poseImage2Response,
        };
        const res = await dispatch(recoverAccountAction(modifiedRecoverData));
        if (res?.status == 200) {
          navigation.navigate('YourPartDoneScreen');
          dispatch(recoverAccountDataRemoveAction());
        } else {
          Alert.alert('Something went wrong!');
        }
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Image upload failed, please try again.');
    }
  };

  const finalPoseHandler = async () => {
    try {
      const uploadedImageUrl = await uploadImage(poseImage2);
      if (!uploadedImageUrl) throw new Error('Image upload failed');
      if (check === 'edit_profile') {
        await handleEditProfile(uploadedImageUrl);
      } else if (check === 'user_verify') {
        if (user_role === 'business' || user_role === 'government') {
          await handleAccountManagerVerify(uploadedImageUrl);
        } else if (user_role === 'kid_influencer') {
          if (ParentKidCheck === 'parent') {
            await handleAccountManagerVerify(uploadedImageUrl);
          } else {
            await handleUserVerify(uploadedImageUrl);
          }
        } else {
          await handleUserVerify(uploadedImageUrl);
        }
      } else if (check === 'replace') {
        await handleReplaceAccountManager(uploadedImageUrl);
      } else {
        await handleRecoverAccount();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Image upload failed, please try again.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.imageMainView}>
          <Image source={{uri: poseImage2}} style={styles.imageUp} />
          <Image
            source={require('../../../assets/images/cameraPose3.png')}
            style={styles.image}
          />
        </View>
        <View style={{marginTop: hp(8)}}>
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
              disabled={imageLoader}
              onPress={() =>
                navigation.navigate('PhotoVerificationFinalCameraScreen', {
                  poseImage1,
                  check,
                })
              }>
              <Text style={styles.previousTitle}>
                {AppLocalizedStrings.posesMatchScreen.retake}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={finalPoseHandler}>
              {imageLoader ? (
                <View style={{alignItems: 'center'}}>
                  <ActivityIndicator color={Colors.White} size="small" />
                </View>
              ) : (
                <Text style={styles.nextTitle}>
                  {AppLocalizedStrings.posesMatchScreen.submit}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FinalPoseMatchScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: hp(3),
    // justifyContent: 'space-between',
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
});
