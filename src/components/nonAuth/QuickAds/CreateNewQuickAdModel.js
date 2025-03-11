import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import CreateNewQuickAdMediaFilePopup from '../../popups/CreateNewQuickAdMediaFilePopup';
import CreateNewQuickAdContentUsagePopup from '../../popups/CreateNewQuickAdContentUsagePopup';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

// image
import downArrow from '../../../assets/images/downArrow.png';
import close from '../../../assets/images/close.png';
import noticeIcon from '../../../assets/images/noticeIcon.png';
import edit from '../../../assets/images/Edit.png';
import ContentUsageRightsPopup from '../../popups/ContentUsageRightsPopup';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateNewQuickAdModel = ({
  about,
  setAbout,
  website,
  setWebsite,
  imagesLink,
  setImagesLink,
  videosLink,
  setVideosLink,
  audiosLink,
  setAudiosLink,
  contentRight,
  setContentRight,
  influencer,
  setInfluencer,
  number,
  setNumber,
  disclosureNoticeData,
  userRightsText,
  setUserRightsText,
}) => {
  const navigation = useNavigation();
  const [expend, setExpend] = useState(false);
  const [type, setType] = useState('');
  const [imageVisible, setImageVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notsContentRights, setNotsContentRights] = useState(false);

  const handleHowManyInfluencerInputChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setInfluencer(numericValue);
  };

  const handleNumberOfFollowersInputChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setNumber(numericValue);
  };

  const loading = useSelector(state => state.imageUploadReducer.loading);
  const renderItem = ({item}) => {
    const quationData = item?.data;
    const answerData = item?.answers;
    const mergedData = quationData.map(question => {
      return {
        ...question,
        answer: answerData[question.id],
      };
    });
    const filteredData = mergedData?.filter(item => item?.answer);
    return (
      <View style={{marginVertical: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={noticeIcon}
              style={{width: scale(24), height: scale(24)}}
            />
            <Text
              style={[
                styles.quickTitleStyle,
                {fontSize: scale(16), marginHorizontal: 10},
              ]}>
              {item?.selectedTitle}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={edit}
                style={{width: scale(24), height: scale(24)}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('asjdka')}>
              <Image
                source={close}
                style={{
                  width: scale(24),
                  height: scale(24),
                  marginLeft: scale(10),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.quickTitleStyle, {marginTop: 10}]}>
          {AppLocalizedStrings.createNewQuickAdModel.note}
        </Text>
        <Divider style={{marginVertical: 10}} />
        <Text style={styles.askedTitle}>
          {AppLocalizedStrings.createNewQuickAdModel.asked}
        </Text>
        <Divider style={{marginVertical: 10}} />
        {filteredData?.length > 0 && mergedData.length > 0
          ? mergedData?.map((item, index) => (
              <View key={index.toString()} style={styles.itemContainer}>
                <Text style={styles.question}>{item?.number}</Text>
                <Text style={styles.text}>{item?.title}</Text>
                <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                  <Text style={{color: 'black'}}>
                    {AppLocalizedStrings?.createNewQuickAdModel?.ad}
                  </Text>
                  <Text style={{color: '#1DA1F2', marginLeft: hp(1)}}>
                    {item?.answer}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </View>
    );
  };

  return (
    <View style={[styles.mainBoxStyle1]}>
      <TouchableOpacity
        onPress={() => {
          setExpend(!expend);
        }}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.The_QuickAd}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: expend ? Colors.Primary500 : null,
            transform: expend ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>
      <View style={{}}>
        {expend && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.Neutral300,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
            }}>
            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Short_brief}
            </Text>
            <TextInput
              multiline={true}
              style={[
                styles.inputStyle,
                {
                  height: scale(178),
                  textAlignVertical: 'top',
                },
              ]}
              value={about}
              onChangeText={t => setAbout(t)}
              placeholder={AppLocalizedStrings.quickAdsHomescreen.Write_here}
            />
            <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
              {AppLocalizedStrings.quickAdsHomescreen.Website_link}
            </Text>
            <TextInput
              style={styles.inputStyle}
              value={website}
              onChangeText={t => setWebsite(t)}
              placeholder={AppLocalizedStrings.quickAdsHomescreen.Write_here}
            />
            <Text style={[styles.quickTitleStyle, {marginTop: scale(10)}]}>
              {AppLocalizedStrings.quickAdsHomescreen.Media_Files}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                let type = 'browse';
                setType(type);
                setImageVisible(true);
              }}
              style={styles.browseButton}>
              {loading == true ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text
                  style={
                    (styles.messageStyle,
                    {
                      textDecorationLine: 'underline',
                      color: Colors.Neutral500,
                    })
                  }>
                  {AppLocalizedStrings.createNewQuickAdModel.browse}
                </Text>
              )}
            </TouchableOpacity>
            {imagesLink &&
              imagesLink.map((image, index) => {
                const fileType = image.substring(image.lastIndexOf('.') + 1);
                return (
                  <View key={index} style={styles.browseContainer}>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <ImageBackground
                        source={{uri: image}}
                        borderRadius={scale(5)}
                        style={{width: scale(50), height: scale(50)}}
                      />
                      <Text
                        style={[
                          styles.messageStyle,
                          {color: Colors.Neutral700, left: scale(10)},
                        ]}>
                        {/* image {index} */}
                        Image {index + 1}.{fileType.toUpperCase()}
                      </Text>
                      <TouchableOpacity
                        style={[styles.crossImageStyle]}
                        activeOpacity={0.6}
                        onPress={() => {
                          const updatedImages = [...imagesLink];
                          updatedImages.splice(index, 1);
                          setImagesLink(updatedImages);
                        }}>
                        <Image
                          source={close}
                          style={[styles.crossImageStyle]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            {videosLink &&
              videosLink.map((video, index) => (
                <View key={index} style={styles.browseContainer}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <ImageBackground
                      source={require('../../../assets/images/video.png')}
                      borderRadius={scale(5)}
                      style={{width: scale(45), height: scale(45)}}
                    />
                    <Text
                      style={[
                        styles.messageStyle,
                        {color: Colors.Neutral700, left: scale(10)},
                      ]}>
                      video{index}.mp4
                    </Text>
                    <TouchableOpacity
                      style={[styles.crossImageStyle]}
                      activeOpacity={0.6}
                      onPress={() => {
                        const updatedVideos = [...videosLink];
                        updatedVideos.splice(index, 1);
                        setVideosLink(updatedVideos);
                      }}>
                      <Image source={close} style={[styles.crossImageStyle]} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            {audiosLink &&
              audiosLink.map((audio, index) => (
                <View key={index} style={styles.browseContainer}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <ImageBackground
                      source={require('../../../assets/images/volume.png')}
                      borderRadius={scale(5)}
                      style={{width: scale(45), height: scale(45)}}
                    />
                    <Text
                      style={[
                        styles.messageStyle,
                        {color: Colors.Neutral700, left: scale(10)},
                      ]}>
                      audio{index}.mp3
                    </Text>
                    <TouchableOpacity
                      style={[styles.crossImageStyle]}
                      activeOpacity={0.6}
                      onPress={() => {
                        const updatedAudios = [...audiosLink];
                        updatedAudios.splice(index, 1);
                        setAudiosLink(updatedAudios);
                      }}>
                      <Image source={close} style={[styles.crossImageStyle]} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('DisclosureNoticeScreen', {
                  selectedItem: selectedItem,
                  setSelectedItem: setSelectedItem,
                });
              }}
              style={[
                styles.mainBoxStyle,
                {height: scale(45), bottom: 10, marginTop: hp(3)},
              ]}>
              {disclosureNoticeData?.selectedTitle?.length > 0 ? (
                <>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: Colors.Neutral900,
                    }}>
                    This job includes{' '}
                    {disclosureNoticeData?.selectedItem?.length} notices
                  </Text>
                </>
              ) : (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.boxTextStyle,
                    {
                      color: '#171717',
                    },
                  ]}>
                  Select Disclosure notices
                </Text>
              )}
              <Image
                source={downArrow}
                style={{
                  width: scale(24),
                  height: scale(24),
                  transform: [{rotateZ: '270deg'}],
                }}
              />
            </TouchableOpacity>

            {/* {/ ------------disclosure notice data start ----------- /} */}
            {disclosureNoticeData?.length > 0 ? (
              <View style={styles.rightCardStyle}>
                <FlatList
                  data={disclosureNoticeData}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : null}

            {/* {/ ------------disclosure notice data end ----------- /} */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setContentVisible(true);
              }}
              style={[styles.mainBoxStyle, {bottom: 10}]}>
              <Text numberOfLines={1} style={[styles.boxTextStyle]}>
                {contentRight ? contentRight : 'Select Content usage rights'}
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
            {/* {userRightsText ? ( */}
            {contentRight === 'Custom usage rights' ? (
              <View style={styles.rightCardStyle}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={noticeIcon}
                      style={{width: scale(24), height: scale(24)}}
                    />
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {fontSize: scale(16), marginHorizontal: 10},
                      ]}>
                      {AppLocalizedStrings.createNewQuickAdModel.custom}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => setNotsContentRights(true)}>
                      <Image
                        source={edit}
                        style={{width: scale(23), height: scale(23)}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUserRightsText('');
                        setContentRight('Social media license');
                      }}>
                      <Image
                        source={close}
                        style={{
                          width: scale(23),
                          height: scale(23),
                          marginLeft: scale(10),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={[styles.quickTitleStyle, {marginVertical: 10}]}>
                  {AppLocalizedStrings.createNewQuickAdModel.explain}
                </Text>
                <Text style={styles.askedTitle}>{userRightsText}</Text>
              </View>
            ) : null}

            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.influencers_promote}
            </Text>
            <TextInput
              style={[styles.inputStyle, {marginBottom: scale(15)}]}
              value={influencer}
              keyboardType="number-pad"
              onChangeText={t => handleHowManyInfluencerInputChange(t)}
              placeholder="Enter number"
            />
            <Text style={[styles.quickTitleStyle]}>
              {AppLocalizedStrings.quickAdsHomescreen.minimum_influencers}
            </Text>
            <TextInput
              style={[styles.inputStyle, {marginBottom: scale(15)}]}
              value={number}
              keyboardType="number-pad"
              onChangeText={t => handleNumberOfFollowersInputChange(t)}
              placeholder="Enter minimum number"
            />
          </View>
        )}
      </View>

      <CreateNewQuickAdMediaFilePopup
        imageVisible={imageVisible}
        setImageVisible={setImageVisible}
        type={type}
        imagesLink={imagesLink}
        setImagesLink={setImagesLink}
        videosLink={videosLink}
        setVideosLink={setVideosLink}
        audiosLink={audiosLink}
        setAudiosLink={setAudiosLink}
      />
      <CreateNewQuickAdContentUsagePopup
        contentVisible={contentVisible}
        setContentVisible={setContentVisible}
        contentRight={contentRight}
        setContentRight={setContentRight}
        userRightsText={userRightsText}
        setUserRightsText={setUserRightsText}
        notsContentRights={notsContentRights}
        setNotsContentRights={setNotsContentRights}
      />
      <ContentUsageRightsPopup
        contentVisible={notsContentRights}
        setContentVisible={setNotsContentRights}
        userRightsText={userRightsText}
        setUserRightsText={setUserRightsText}
      />
    </View>
  );
};

export default CreateNewQuickAdModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    paddingHorizontal: '10@s',
  },
  expendButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 5,
    height: '44@s',
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  inputStyle: {
    height: '36@s',
    marginTop: '6@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: 10,
    color: Colors.Neutral900,
  },
  browseButton: {
    borderWidth: 1,
    borderRadius: 5,
    height: '36@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    marginTop: '6@s',
  },
  messageStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  browseContainer: {
    marginTop: '10@s',
    height: '66@s',
    borderColor: Colors.Neutral300,
    borderWidth: 1,
    borderRadius: '4@s',
  },
  crossImageStyle: {
    position: 'absolute',
    backgroundColor: Colors.White,
    width: '24@s',
    height: '24@s',
    borderRadius: '50@s',
    right: 10,
    alignSelf: 'center',
  },
  mainBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
    paddingVertical: '10@s',
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  rightCardStyle: {
    backgroundColor: Colors.Neutral100,
    padding: '15@s',
    borderRadius: '5@s',
    marginBottom: '10@s',
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  question: {
    fontWeight: '400',
    fontSize: '13@s',
    color: Colors.Primary500,
    paddingBottom: hp(0.8),
  },
  itemContainer: {
    marginVertical: hp(1),
  },
  askedTitle: {
    fontWeight: '500',
    fontSize: '13@s',
    color: Colors.Neutral900,
  },
});
