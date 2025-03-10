import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {addSocialMediaPostLinkAction} from '../../../redux/actions/addSocialMediaPostLinkAction';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';
import {ActivityIndicator} from 'react-native-paper';
import {global} from '../../../global';
import axios from 'axios';
import {Alert} from 'react-native';
import NewHeader from '../../../components/NewHeader';

const ToDoAnalyticsSocialPostsScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {adsId, check} = route?.params || {};
  const [deleteLinkLoader, setDeleteLinkLoader] = useState(false);

  const {_id} = useSelector(
    state => state.getLoggedInUserProfileReducer.data?.data?.data,
  );

  const token = useSelector(state => state.loginReducer?.token);

  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );

  const getJobsByAdsIdLoader = useSelector(
    state => state.getJobsByAdsIdReducer.loading,
  );

  const applicantData = data?.applicants;

  const matchingItems = applicantData?.filter(
    item => item?.applicants_id?._id === _id,
  );

  const apiData = {
    token: token,
    id: adsId,
  };

  const userSocialMediaPostLink =
    matchingItems?.flatMap(item => item?.socialMediaPostLink) || [];

  const loading = useSelector(
    state => state.addSocialMediaPostLinkReducer.loading,
  );

  const [link, setLink] = useState('');

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const handleDeletePostLink = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setDeleteLinkLoader(true);

    const response = await axios.post(
      global.BASE_URL + 'quickAds/deleteLinks',
      {
        id: adsId,
        applicant_id: _id,
        linkId: id,
      },
      config,
    );

    if (response?.status === 200) {
      dispatch(getJobsByAdsIdAction(apiData));
      setDeleteLinkLoader(false);
    } else {
      setDeleteLinkLoader(false);
    }
  };

  const handleAddPostLink = () => {
    const data = {
      id: adsId,
      applicant_id: _id,
      socialMediaPostLink: link,
    };

    dispatch(addSocialMediaPostLinkAction(data))
      .then(res => {
        if (res?.status === 200) {
          setLink('');
          dispatch(getJobsByAdsIdAction(apiData));
        }
      })
      .catch(err => {
        console.log(err?.response, '<<<<<Err');
      });
  };

  const openLink = async link => {
    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      } else {
        Alert.alert(`Don't know how to open this URL: ${link}`);
      }
    } catch (error) {
      console.error('An error occurred while trying to open the URL:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardMainView}>
        <View style={styles.headerCardView}>
          <TouchableOpacity onPress={() => openLink(item?.postLink)}>
            <Text style={styles.urlTitle}>{item?.postLink}</Text>
          </TouchableOpacity>
          {check === 'complete' ? (
            ''
          ) : (
            <TouchableOpacity onPress={() => handleDeletePostLink(item?._id)}>
              <View style={{alignItems: 'flex-end', marginRight: 5}}>
                <SVG.CloseCross width={21} height={21} color="red" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.urlTitleSec}>Posted: 17 July 2021</Text>
        <Text style={styles.urlTitleSec}>Updated: 20 July 2022</Text>
        <View style={styles.infoMain}>
          <Image
            source={require('../../../assets/images/girl.png')}
            style={styles.image}
          />

          <View style={styles.infoCard}>
            <View style={styles.infoCradFirst}>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>2.6M</Text>
                <Text style={styles.impressionsTitle}>Impressions</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>1.1M+</Text>
                <Text style={styles.impressionsTitle}>Likes</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>48.2K</Text>
                <Text style={styles.impressionsTitle}>Website Click</Text>
              </View>
            </View>
            <View style={styles.infoCradFirst}>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>245K</Text>
                <Text style={styles.impressionsTitle}>Comments</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>121K</Text>
                <Text style={styles.impressionsTitle}>Swipe ups</Text>
              </View>
              <View style={styles.infoView}>
                <Text style={styles.folowersTitle}>4K</Text>
                <Text style={styles.impressionsTitle}>Saves</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.activeView}>
          <SVG.OnlinGreenDot width={6} height={6} />
          <Text style={styles.activeTitle}>Active</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewHeader
          headerTitle={
            check === 'complete'
              ? AppLocalizedStrings.toDoAllMediaScreen.social
              : AppLocalizedStrings.toDoAllMediaScreen.manage
          }
          onPress={onGoBackHandler}
        />
        {check === 'complete' ? (
          <Text style={styles.headerTitle}></Text>
        ) : (
          <>
            <View style={{marginTop: hp(3)}}>
              <DetailsTextInput
                title={AppLocalizedStrings.toDoAllMediaScreen.enterUrl}
                editable={true}
                value={link}
                onChangeText={setLink}
              />
            </View>

            <PrimaryButton
              title={
                loading ? (
                  <ActivityIndicator color={Colors.White} size={'small'} />
                ) : (
                  <Text>{AppLocalizedStrings.toDoAllMediaScreen.add}</Text>
                )
              }
              onPress={handleAddPostLink}
              disabled={link === '' ? true : false}
            />
          </>
        )}

        {loading || deleteLinkLoader || getJobsByAdsIdLoader ? (
          <>
            <View
              style={{
                justifyContent: 'center',
                marginTop: hp(10),
              }}>
              <ActivityIndicator size={'small'} color={Colors.Primary500} />
            </View>
          </>
        ) : (
          <View style={styles.main}>
            <View style={styles.bottomContainer}>
              <FlatList
                data={userSocialMediaPostLink}
                keyExtractor={item => item?.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: scale(20),
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ToDoAnalyticsSocialPostsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    // marginTop: hp(-5),
  },
  bottomContainer: {
    marginTop: hp(1),
  },
  cardMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
    borderRadius: '5@s',
  },
  addedTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
  },
  urlTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    textDecorationLine: 'underline',
  },
  urlTitleSec: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  headerCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '110@s',
    height: '130@s',
    marginBottom: hp(1),
  },
  infoMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  infoCradFirst: {
    width: '40%',
  },
  infoView: {
    paddingVertical: hp(1),
  },
  folowersTitle: {
    color: Colors.Neutral800,
    fontSize: '12@s',
    fontWeight: '600',
  },
  impressionsTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  activeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(9),
  },
  activeTitle: {
    color: Colors.Success500,
    fontSize: '11@s',
    fontWeight: '400',
    paddingHorizontal: wp(1),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
    paddingTop: hp(0.4),
    marginBottom: hp(1),
  },
});
