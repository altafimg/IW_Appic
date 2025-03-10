import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';
import SecPrimaryButton from '../../buttons/SecPrimaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import SVG from '../../../assets/svg';
import SocialMediaUsageRightsPopup from '../../popups/SocialMediaUsageRightsPopup';
import CustomRightsPopup from '../../popups/CustomRightsPopup';
import OptionsPopup from '../../popups/OptionsPopup';
import {useDispatch, useSelector} from 'react-redux';
import {addToDoListNotesAction} from '../../../redux/actions/addToDoListNotesAction';
import image from '../../../assets/images/image.png';
import SocialPostSkeleton from '../../skeleton/SocialPostSkeleton';
import {updateApplicantStatusAction} from '../../../redux/actions/updateApplicantStatusAction';
import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {Linking} from 'react-native';
import {getUserReviewAction} from '../../../redux/actions/getUserReviewAction';
import StarRating from 'react-native-star-rating-widget';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {userReviewAction} from '../../../redux/actions/userReviewAction';
import {updateUserReviewAction} from '../../../redux/actions/updateUserReviewAction';
import ShowToDoMediaComponent from './ShowToDoMediaComponent';
import {global} from '../../../global';
import axios from 'axios';
import {getJobsByAdsIdAction} from '../../../redux/actions/getJobsByAdsIdAction';
import UtcDateConvert from '../../UtcDateConvert';
import UtcTimeConvert from '../../UtcTimeConvert';
import UtcTimeZoneConvert from '../../UtcTimeZoneConvert';

const ToDoDetailsDeliveryComponent = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const adsId = props?.adsId || '';
  const check = props?.check || '';
  const loading = props?.loading || '';
  const jobstatus = props?.jobstatus || '';
  const jobStatusData = props?.jobStatusData || '';
  const {profile_picture, user_role, first_name, last_name, profile_name} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const {_id} = useSelector(state => state.loginReducer.user?.data?.data) || '';

  const data = useSelector(
    state => state.getJobsByAdsIdReducer.data?.data?.data,
  );

  const jobCreatorId = data?.user_id?._id || '';

  const JobCreatorUserRole = data?.user_id?.user_role || '';

  const updateJobStatusLoader = useSelector(
    state => state.updateApplicantStatusReducer.loading,
  );

  const influencerReview = useSelector(
    state => state?.getUserReviewReducer?.data?.[jobCreatorId]?.[_id] || null,
  );

  const influencerRevieModifiedData = influencerReview?.data?.data;

  const influencerReviewData = influencerRevieModifiedData?.filter(
    item => item?.adsId?._id === adsId,
  );

  const influencerCommentAndRating = influencerReviewData?.reduce(
    (acc, item) => {
      acc.comment = item.comment;
      acc.rating = item.rating;
      return acc;
    },
    {},
  );

  const jobCreatorReview = useSelector(
    state => state?.getUserReviewReducer?.data?.[_id]?.[jobCreatorId] || null,
  );

  const jobCreatorReviewModifiedData = jobCreatorReview?.data?.data;

  const jobCreatorReviewData = jobCreatorReviewModifiedData?.filter(
    item => item?.adsId?._id === adsId,
  );

  const jobCreatorCommentAndRating = jobCreatorReviewData?.reduce(
    (acc, item) => {
      acc.comment = item.comment;
      acc.rating = item.rating;
      acc._id = item._id;
      return acc;
    },
    {},
  );

  const reviewLoader = useSelector(state => state.userReviewReducer.loading);

  const applicantData = data?.applicants || [];

  const matchingItems = applicantData?.filter(
    item => item?.applicants_id?._id === _id,
  );

  const getJobCreatorReviewHandler = async () => {
    const reviewData = {
      reviewerId: _id,
      revieweeId: jobCreatorId,
    };
    await dispatch(getUserReviewAction(reviewData));
  };

  const getInfluencerReviewHandler = async () => {
    const reviewData = {
      reviewerId: jobCreatorId,
      revieweeId: _id,
    };
    await dispatch(getUserReviewAction(reviewData));
  };

  useEffect(() => {
    if (check === 'complete') {
      getJobCreatorReviewHandler();
      getInfluencerReviewHandler();
    }
  }, []);

  const userNote =
    matchingItems?.map(item => {
      return item?.notes;
    }) || [];

  const userAudios =
    matchingItems?.flatMap(item => item?.mediaFilesAudio) || [];

  const userImages =
    matchingItems?.flatMap(item => item?.mediaFilesImage) || [];

  const firstFourUserImages = userImages?.slice(0, 4);

  const userLinks = matchingItems?.flatMap(item => item?.mediaFilesLink) || [];

  const userPdfs = matchingItems?.flatMap(item => item?.mediaFilesPdf) || [];

  const userVideos =
    matchingItems?.flatMap(item => item?.mediaFilesVideo) || [];

  const combinedAllMedia = [
    ...userImages,
    ...userVideos,
    ...userLinks,
    ...userPdfs,
    ...userAudios,
  ];

  const status = matchingItems?.map(item => item?.status) || [];
  const influencerCancelReason = matchingItems?.map(item => item?.reason) || [];

  const userSocialMediaPostLink =
    matchingItems?.flatMap(item => item?.socialMediaPostLink) || [];

  const totalMediaFilesLength =
    userAudios?.length +
    userImages?.length +
    userLinks?.length +
    userPdfs?.length +
    userVideos?.length;

  const [isVisibleMediaRights, setIsVisibleMediaRights] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const [notesData, setNotesData] = useState('');
  const [isInitialFocus, setIsInitialFocus] = useState(true);
  const [deleteLinkLoader, setDeleteLinkLoader] = useState(false);
  const [rating, setRating] = useState(jobCreatorCommentAndRating?.rating || 0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [customUserPopup, setCustomUserPopup] = useState(false);

  useEffect(() => {
    setNotesData(userNote[0]);
  }, [userNote[0], _id]);

  const onChangeNotes = input => {
    setNotesData(input);
  };

  const onBlurNotes = () => {
    if (!isInitialFocus) {
      const newData = {
        id: data?._id,
        applicants_id: _id,
        notes: notesData,
      };

      dispatch(addToDoListNotesAction(newData))
        .then(res => {
          console.log(res, '<<<<<<Data');
        })
        .catch(err => {
          console.log(err?.response?.data, '<<<<<<<errr');
        });
    } else {
      setIsInitialFocus(false);
    }
  };

  const onModalOptions = () => {
    setIsOptions(!isOptions);
  };
  const toggleModal = () => {
    setIsVisibleMediaRights(!isVisibleMediaRights);
  };
  const toggleModalSec = () => {
    setCustomUserPopup(!customUserPopup);
  };

  const onManageHandler = () => {
    navigation.navigate('ToDoAllMediaScreen', {
      matchingItems: matchingItems,
      adsId: adsId,
      check: check,
    });
  };
  const onManagePostHandler = () => {
    navigation.navigate('ToDoAnalyticsSocialPostsScreen', {
      adsId: adsId,
      check: check,
    });
  };
  const onCancelJobHandler = () => {
    navigation.navigate('CancelJobScreen');
  };
  const onReportHandler = () => {
    navigation.navigate('ReportProposalScreen', {adsId: adsId});
  };

  const fullName = `${
    first_name?.charAt(0).toUpperCase() + first_name?.slice(1)?.toLowerCase()
  } ${last_name?.charAt(0).toUpperCase() + last_name?.slice(1)?.toLowerCase()}`;

  const imageData = [
    {
      id: 1,
      name: 'image 982284.jpg',
      image: image,
      download_size: '1.6',
    },
    {
      id: 2,
      name: 'image 982284.jpg',
      image: image,
      download_size: '1.6',
    },
    {
      id: 3,
      name: 'image 982284.jpg',
      image: image,
      download_size: '1.6',
    },
    {
      id: 4,
      name: 'image 982284.jpg',
      image: image,
      download_size: '1.6',
    },
  ];

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
      setDeleteLinkLoader(false);
      dispatch(getJobsByAdsIdAction(apiData));
    } else {
      setDeleteLinkLoader(false);
    }
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
            style={{
              width: 110,
              height: 130,
              marginBottom: hp(1),
            }}
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

  function capitalizeEachWord(str) {
    return str
      ?.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word?.slice(1))
      .join(' ');
  }

  const completeJobHandler = () => {
    const currentDate = new Date();
    const completeDate = moment(currentDate).format('YYYY-MM-DD');

    const data = {
      applicantId: _id,
      adsId: adsId,
      status: 'completed',
      completeDate: completeDate,
      reason: '',
    };

    dispatch(updateApplicantStatusAction(data))
      .then(res => {
        console.log(res?.data, '<<<<<<<<<<<data');
        if (res?.status === 200) {
          navigation.goBack('');
        } else {
          Alert.alert('something went wrong! pleaes try again');
        }
      })
      .catch(err => {
        console.log(err, '<<<<<<<<err');
      });
  };

  const userMatched = applicantData?.some(
    item => item?.applicants_id?._id === _id,
  );

  const ReviewSubmitHandler = () => {
    if (ratingMessage?.trim() !== '') {
      const ratingData = {
        reviewerId: _id,
        revieweeId: jobCreatorId,
        adsId: adsId,
        rating: rating,
        comment: ratingMessage,
      };
      if (jobCreatorReviewData?.length >= 1) {
        console.log('update');
        const updateRatingData = {
          id: jobCreatorCommentAndRating?._id,
          rating: rating,
          comment: ratingMessage,
        };
        console.log(updateRatingData);
        dispatch(updateUserReviewAction(updateRatingData))
          .then(res => {
            console.log(res?.status);
            if (res?.status === 201) {
              getJobCreatorReviewHandler();
              getInfluencerReviewHandler();
            } else {
              Alert.alert('Something went wrong!', 'Please try again!');
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log('new');

        dispatch(userReviewAction(ratingData))
          .then(res => {
            console.log(res?.status);
            if (res?.status === 201) {
              getJobCreatorReviewHandler();
              getInfluencerReviewHandler();
            } else {
              Alert.alert('Something went wrong!', 'Please try again!');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderMainView}>
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : ''}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.loaderMainView}>
            <Text style={styles.progressTitle}>
              {jobstatus === 'completed'
                ? 'Job completed'
                : jobstatus === 'cancel'
                ? 'Cancelled by the Influencer'
                : jobstatus === 'in progress'
                ? 'In progress'
                : jobstatus === 'cancelByCustomer'
                ? 'This job was cancelled by the customer'
                : jobstatus === 'failedToDeliver'
                ? `${applicants_id?.profile_name + ' failed to deliver'}`
                : ''}
            </Text>
          </View>

          <View>
            <View style={styles.dueDateView}>
              <Text style={styles.dueTitle}>Due Date:</Text>
              <Text style={styles.dueTitleSec}>
                {`${UtcDateConvert(
                  jobStatusData?.utcTimeDate,
                )} ${UtcTimeConvert(
                  jobStatusData?.utcTimeDate,
                )} ${UtcTimeZoneConvert(jobStatusData?.timeZone)}`}
              </Text>
            </View>
          </View>
        </>
      )}
      <View>
        {/* ----------------------- profile and reason for cancel view  start---------------------- */}
        <>
          {status[0] === 'completed' ||
          status[0] === 'failedToDeliver' ||
          status[0] === 'in progress' ? (
            <>
              <Text style={styles.influencerTitle}>
                {user_role
                  ?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
              <View style={styles.influencerCardView}>
                <View style={styles.influencerImageView}>
                  <Image source={{uri: profile_picture}} style={styles.image} />
                  <Text style={styles.chanceTitle}>{fullName}</Text>
                </View>
              </View>
            </>
          ) : (
            ''
          )}
        </>

        {/* ----------------------- profile and reason for cancel view  end---------------------- */}

        {/* ----------------------- notes view  start---------------------- */}

        <>
          {status[0] === 'completed' || status[0] === 'in progress' ? (
            <>
              <Text style={styles.influencerTitle}>Note</Text>
              <View style={styles.addNoteCardView}>
                <TextInput
                  multiline
                  placeholder="For example: Provide a tracking number or say thanks for the opprtunity"
                  placeholderTextColor={'#898A8D'}
                  style={{color: Colors.Black}}
                  onChangeText={onChangeNotes}
                  onBlur={onBlurNotes}
                  onFocus={() => setIsInitialFocus(false)}
                  value={notesData}
                  editable={check === 'complete' ? false : true}
                />
              </View>
            </>
          ) : (
            ''
          )}
        </>

        {/* ----------------------- notes view  end---------------------- */}

        {/* ----------------------- upload media view  start---------------------- */}

        {/* <>
          {status[0] === 'completed' || status[0] === 'in progress' ? (
            // askcnjkljas
            totalMediaFilesLength < 1 ? (
              <View style={styles.influencerCardView}>
                <Text style={styles.influencerTitle}>Upload media & files</Text>
                <Text style={styles.influencerSubTitle}>
                  Manage your images, videos, audio, links & docs
                </Text>
                <SecPrimaryButton title="Manage" onPress={onManageHandler} />
              </View>
            ) : totalMediaFilesLength > 0 && totalMediaFilesLength <= 3 ? (
              <View style={styles.influencerCardView}>
                <View style={styles.headerView}>
                  <Text style={styles.influencerTitle}>
                    Upload media & files
                  </Text>
                  <TouchableOpacity onPress={onManageHandler}>
                    <Text style={styles.seeAllTitle}>See All</Text>
                  </TouchableOpacity>
                </View>

                {combinedAllMedia?.map((item, index) => (
                  <ShowToDoMediaComponent
                    key={item?._id}
                    media={item}
                    status={status}
                    adsId={adsId}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.influencerCardView}>
                <Text style={styles.influencerTitle}>Upload media & files</Text>
                <Text style={styles.influencerSubTitle}>
                  Manage your images, videos, audio, links & docs
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.Neutral200,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                    }}>
                    <FlatList
                      data={firstFourUserImages}
                      horizontal={true}
                      renderItem={({item, index}) => {
                        return (
                          <View>
                            <Image
                              style={{
                                height: 35,
                                width: 35,
                                borderRadius: 25,
                                right: index * 20,
                                borderColor: Colors.White,
                                borderWidth: 2,
                              }}
                              source={{uri: item?.image}}
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      color: Colors.Neutral700,
                    }}>
                    {totalMediaFilesLength + ' media files uploaded'}
                  </Text>
                </View>
                <SecPrimaryButton
                  title="Manage All"
                  onPress={onManageHandler}
                />
              </View>
            )
          ) : (
            ''
          )}
        </> */}
        <>
          {status[0] === 'completed' || status[0] === 'in progress' ? (
            totalMediaFilesLength > 0 ? (
              totalMediaFilesLength <= 3 ? (
                <View>
                  <Text style={styles.influencerTitle}>
                    Upload media & files
                  </Text>
                  <View style={styles.influencerCardView}>
                    <View style={styles.headerView}>
                      <Text style={styles.influencerTitleSec}>
                        Upload media & files
                      </Text>
                      <TouchableOpacity onPress={onManageHandler}>
                        <Text style={styles.seeAllTitle}>See All</Text>
                      </TouchableOpacity>
                    </View>
                    {combinedAllMedia?.map((item, index) => (
                      <ShowToDoMediaComponent
                        key={item?._id}
                        media={item}
                        status={status}
                        adsId={adsId}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.influencerTitle}>
                    Upload media & files
                  </Text>
                  <View style={styles.influencerCardView}>
                    <Text style={styles.influencerSubTitle}>
                      Manage your images, videos, audio, links & docs
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.Neutral200,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 10,
                        }}>
                        <FlatList
                          data={firstFourUserImages}
                          horizontal={true}
                          renderItem={({item, index}) => {
                            return (
                              <View>
                                <Image
                                  style={{
                                    height: 35,
                                    width: 35,
                                    borderRadius: 25,
                                    right: index * 20,
                                    borderColor: Colors.White,
                                    borderWidth: 2,
                                  }}
                                  source={{uri: item?.image}}
                                />
                              </View>
                            );
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: Colors.Neutral700,
                        }}>
                        {totalMediaFilesLength + ' media files uploaded'}
                      </Text>
                    </View>
                    <SecPrimaryButton
                      title="Manage"
                      onPress={onManageHandler}
                    />
                  </View>
                </View>
              )
            ) : (
              <>
                <Text style={styles.influencerTitle}>Upload media & files</Text>
                <View style={styles.influencerCardView}>
                  <View style={styles.headerView}>
                    <Text style={styles.influencerTitleSec}>Media & Files</Text>
                    <TouchableOpacity onPress={onManageHandler}>
                      <Text style={styles.seeAllTitle}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  {combinedAllMedia?.map((item, index) => (
                    <ShowToDoMediaComponent
                      key={item?._id}
                      media={item}
                      status={status}
                      adsId={adsId}
                    />
                  ))}
                </View>
              </>
            )
          ) : null}
        </>

        {/* ----------------------- upload media view  end---------------------- */}

        {/* {status[0] === 'completed' || status[0] === 'in progress' ? (
          userSocialMediaPostLink?.length < 1 ? (
            <View style={styles.influencerCardView}>
              <Text style={styles.influencerTitle}>
                Add the URL to a social media post
              </Text>
              <Text style={styles.influencerSubTitle}>
                We’ll display the analytics
              </Text>
              <SecPrimaryButton title="Manage" onPress={onManagePostHandler} />
            </View>
          ) : userSocialMediaPostLink?.length > 0 &&
            userSocialMediaPostLink?.length < 3 ? (
            <View style={styles.influencerCardView}>
              <View style={styles.headerView}>
                <Text style={styles.influencerTitle}>Social media post</Text>
                <TouchableOpacity onPress={onManagePostHandler}>
                  <Text style={styles.seeAllTitle}>See All</Text>
                </TouchableOpacity>
              </View>
              {deleteLinkLoader ? (
                <SocialPostSkeleton />
              ) : (
                <FlatList
                  data={userSocialMediaPostLink}
                  keyExtractor={item => item?.id}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: scale(20),
                  }}
                />
              )}
            </View>
          ) : (
            <View style={styles.influencerCardView}>
              <Text style={styles.influencerTitle}>
                Add the URL to a social media post
              </Text>
              <Text style={styles.influencerSubTitle}>
                We’ll display the analytics
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.Neutral200,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    marginVertical: 10,
                  }}>
                  <FlatList
                    data={imageData}
                    horizontal={true}
                    renderItem={({item, index}) => {
                      return (
                        <View>
                          <Image
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 25,
                              right: index * +15,
                              borderColor: Colors.White,
                              borderWidth: 2,
                            }}
                            source={item.image}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: Colors.Neutral700,
                  }}>
                  {userSocialMediaPostLink?.length + ' social posts uploaded'}
                </Text>
              </View>

              <SecPrimaryButton
                title="Manage All"
                onPress={onManagePostHandler}
              />
            </View>
          )
        ) : (
          ''
        )} */}

        {status[0] === 'cancel' || status[0] === 'cancelByCustomer' ? (
          <>
            <Text style={styles.influencerTitle}>Reason for cancellation</Text>
            <View style={styles.influencerCardView}>
              <TouchableOpacity onPress={onModalOptions}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: Colors.Black,
                  }}>
                  {influencerCancelReason[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          ''
        )}

        {(status[0] === 'completed' || status[0] === 'in progress') &&
        userSocialMediaPostLink?.length > 0 ? (
          userSocialMediaPostLink.length < 3 ? (
            <View>
              <Text style={styles.influencerTitle}>Social media post</Text>
              <View style={styles.influencerCardView}>
                <View style={styles.headerView}>
                  <Text style={styles.influencerTitleSec}>
                    Social media post
                  </Text>
                  <TouchableOpacity onPress={onManagePostHandler}>
                    <Text style={styles.seeAllTitle}>See All</Text>
                  </TouchableOpacity>
                </View>
                {deleteLinkLoader ? (
                  <SocialPostSkeleton />
                ) : (
                  <FlatList
                    data={userSocialMediaPostLink}
                    keyExtractor={item => item?.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingBottom: scale(20),
                    }}
                  />
                )}
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.influencerTitle}>
                Add the URL to a social media post
              </Text>
              <View style={styles.influencerCardView}>
                <Text style={styles.influencerSubTitle}>
                  We’ll display the analytics
                </Text>

                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.Neutral200,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      marginVertical: 10,
                    }}>
                    <FlatList
                      data={imageData}
                      horizontal={true}
                      renderItem={({item, index}) => {
                        return (
                          <View>
                            <Image
                              style={{
                                height: 40,
                                width: 40,
                                borderRadius: 25,
                                right: index * +15,
                                borderColor: Colors.White,
                                borderWidth: 2,
                              }}
                              source={item.image}
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      color: Colors.Neutral700,
                    }}>
                    {userSocialMediaPostLink?.length + ' social posts uploaded'}
                  </Text>
                </View>

                <SecPrimaryButton
                  title="Manage All"
                  onPress={onManagePostHandler}
                />
              </View>
            </View>
          )
        ) : (
          <>
            <Text style={styles.influencerTitle}>
              Add the URL to a social media post
            </Text>
            <View style={styles.influencerCardView}>
              <View style={styles.headerView}>
                <Text style={styles.influencerTitleSec}>Social media post</Text>
                <TouchableOpacity onPress={onManagePostHandler}>
                  <Text style={styles.seeAllTitle}>See All</Text>
                </TouchableOpacity>
              </View>
              {deleteLinkLoader ? (
                <SocialPostSkeleton />
              ) : (
                <FlatList
                  data={userSocialMediaPostLink}
                  keyExtractor={item => item?.id}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: scale(20),
                  }}
                />
              )}
            </View>
          </>
        )}

        {status[0] === 'completed' || status[0] === 'in progress' ? (
          <>
            <Text style={styles.influencerTitle}>Usage rights</Text>
            <View style={styles.influencerCardView}>
              {data?.content_right == 'Custom usage rights' ? (
                <TouchableOpacity
                  // onPress={toggleModalSec}
                  onPress={() => navigation.navigate('ToDoCustomRightsScreen')}>
                  <Text style={styles.supportTitle}>{data?.content_right}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  // onPress={toggleModal}
                  onPress={() =>
                    navigation.navigate('ToDoSocialMediaUsageRightsScreen')
                  }>
                  <Text style={styles.supportTitle}>{data?.content_right}</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          ''
        )}
      </View>

      {/* {status[0] === 'cancel' || status[0] === 'cancelByCustomer' ? (
        <View style={styles.influencerCardView}>
          <Text style={styles.influencerTitle}>Reason for cancellation</Text>
          <TouchableOpacity onPress={onModalOptions}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: Colors.Black,
              }}>
              {influencerCancelReason[0]}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )} */}
      <>
        <Text style={styles.influencerTitle}>Help and support</Text>
        <View style={styles.influencerCardView}>
          <TouchableOpacity onPress={onModalOptions}>
            <Text style={styles.supportTitle}>Options</Text>
          </TouchableOpacity>
        </View>
      </>

      {status[0] === 'in progress' ? (
        <>
          <View style={styles.buttonsView}>
            <PrimaryButton
              title={
                updateJobStatusLoader ? (
                  <ActivityIndicator
                    color={Colors.White}
                    size={'small'}
                    style={{marginTop: hp(1)}}
                  />
                ) : (
                  <Text>Mark job as complete</Text>
                )
              }
              onPress={completeJobHandler}
            />
            <TouchableOpacity onPress={onCancelJobHandler}>
              <Text style={styles.cancelTitle}>Cancel job</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onReportHandler}>
              <Text style={styles.reportTitle}>Report this proposal</Text>
            </TouchableOpacity>
          </View>
          <SocialMediaUsageRightsPopup
            isVisible={isVisibleMediaRights}
            setIsVisible={setIsVisibleMediaRights}
            toggleModal={toggleModal}
          />
          <OptionsPopup
            isOptions={isOptions}
            setIsOptions={setIsOptions}
            onModalOptions={onModalOptions}
            status={status}
          />
          <CustomRightsPopup
            setCustomUserPopup={setCustomUserPopup}
            customUserPopup={customUserPopup}
            data={data.customUserRights}
          />
        </>
      ) : (
        ''
      )}

      {status[0] === 'in progress' ? (
        ''
      ) : (
        <View>
          <Text style={styles.influencerTitle}>Rate each other</Text>
          <View style={styles.influencerCardView}>
            <Text style={[styles.urlTitleSec, {marginTop: hp(-1)}]}>
              Service: QuickAds
            </Text>
            {userMatched ? (
              <>
                <View style={{marginTop: hp(1)}}>
                  <View style={styles.startsView}>
                    <Text style={styles.floydTitle}>
                      {JobCreatorUserRole === 'customer' ||
                      JobCreatorUserRole === 'kid_influencer' ||
                      JobCreatorUserRole === 'influencer'
                        ? capitalizeEachWord(data?.user_id?.profile_name)
                        : capitalizeEachWord(data?.user_id?.company_name)}
                    </Text>
                    <StarRating
                      rating={rating}
                      onChange={setRating}
                      starSize={20}
                      color={'#F8A401'}
                      enableHalfStar={false}
                    />
                  </View>
                  <View
                    style={[
                      styles.amazingView,
                      {
                        backgroundColor: Colors.White,
                      },
                    ]}>
                    <TextInput
                      style={styles.amazingTitle}
                      placeholder={jobCreatorCommentAndRating?.comment}
                      value={ratingMessage}
                      onChangeText={e => {
                        setRatingMessage(e);
                        setShowError(false);
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: hp(1)}}>
                  <View style={styles.startsView}>
                    <Text style={styles.floydTitle}>
                      {profile_name?.charAt(0).toUpperCase() +
                        profile_name?.slice(1)}
                    </Text>

                    <StarRatingDisplay
                      starSize={20}
                      color={'#F8A401'}
                      enableHalfStar={false}
                      rating={influencerCommentAndRating?.rating || 0}
                    />
                  </View>
                  <View
                    style={[
                      styles.amazingView,
                      {
                        backgroundColor: '#D4D4D4',
                      },
                    ]}>
                    <TextInput
                      style={styles.amazingTitle}
                      placeholder="Your Rating"
                      editable={false}
                      value={influencerCommentAndRating?.comment}
                    />
                  </View>
                </View>
                {showError && (
                  <Text style={{color: Colors.Destructive400, marginTop: 10}}>
                    Please fill field
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={ReviewSubmitHandler}
                  disabled={reviewLoader}>
                  {/* {reviewLoader ? (
                    <ActivityIndicator color={Colors.White} size="small" />
                  ) : ( */}
                  <Text style={styles.buttonTitle}>Submit</Text>
                  {/* )} */}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={{marginTop: hp(1)}}>
                  <View style={styles.startsView}>
                    <Text style={styles.floydTitle}>
                      {profile_name?.charAt(0).toUpperCase() +
                        profile_name?.slice(1)}
                    </Text>

                    <StarRating
                      rating={rating}
                      onChange={setRating}
                      starSize={20}
                      color={'#F8A401'}
                      enableHalfStar={false}
                    />
                  </View>
                  <View style={styles.amazingView}>
                    <Text style={styles.amazingTitle}>
                      It was an amazing opporunity to work with you
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: hp(1)}}>
                  <View style={styles.startsView}>
                    <Text style={styles.floydTitle}>
                      {JobCreatorUserRole === 'customer' ||
                      JobCreatorUserRole === 'kid_influencer' ||
                      JobCreatorUserRole === 'influencer'
                        ? capitalizeEachWord(data?.user_id?.profile_name)
                        : capitalizeEachWord(data?.user_id?.company_name)}
                    </Text>
                    <StarRatingDisplay
                      starSize={20}
                      color={'#F8A401'}
                      enableHalfStar={false}
                    />
                  </View>
                  <View style={styles.amazingView}>
                    <Text style={styles.amazingTitle}>Leave a review here</Text>
                  </View>
                </View>
                {showError && (
                  <Text style={{color: Colors.Destructive400, marginTop: 10}}>
                    Please fill field
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={ReviewSubmitHandler}
                  disabled={reviewLoader}>
                  {reviewLoader ? (
                    <ActivityIndicator color={Colors.White} size="small" />
                  ) : jobCreatorReviewData?.length <= 0 ? (
                    <Text style={styles.buttonTitle}>Submit</Text>
                  ) : (
                    <Text style={styles.buttonTitle}>Update Rating</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
      <OptionsPopup
        isOptions={isOptions}
        onModalOptions={onModalOptions}
        status={status}
      />
    </View>
  );
};

export default ToDoDetailsDeliveryComponent;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  influencerCardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  image: {
    width: '42@s',
    height: '42@s',
    borderRadius: 5,
  },
  influencerTitle: {
    color: Colors.Neutral800,
    fontSize: '18@s',
    fontWeight: '600',
    paddingVertical: hp(2),
  },
  influencerTitleSec: {
    color: Colors.Neutral800,
    fontSize: '16@s',
    fontWeight: '500',
    paddingVertical: hp(1),
  },
  influencerSubTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '400',
    paddingBottom: hp(1.5),
  },
  influencerImageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chanceTitle: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '500',
    paddingHorizontal: wp(3),
    textDecorationLine: 'underline',
  },
  addNoteCardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    marginVertical: hp(0.7),
    paddingVertical: hp(2.5),
  },
  textInput: {},
  buttonsView: {
    marginVertical: hp(2),
  },
  cancelTitle: {
    color: Colors.Destructive500,
    fontSize: '13@s',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  reportTitle: {
    color: Colors.Neutral400,
    fontSize: '12@s',
    fontWeight: '400',
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllTitle: {
    color: Colors.Primary500,
    fontSize: '13@s',
    fontWeight: '400',
    // paddingBottom: hp(1.5),
  },
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
  profileImageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image2: {
    marginRight: wp(3),
  },
  musicAddCardTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    paddingLeft: wp(3),
  },
  downloadButton: {
    alignItems: 'center',
  },
  sizeTitle: {
    color: Colors.Neutral600,
    fontSize: '11@s',
    fontWeight: '400',
    paddingTop: hp(0.5),
  },
  cardMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
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
  image3: {
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
  supportTitle: {
    color: Colors.Neutral800,
    fontSize: '13@s',
    fontWeight: '400',
    paddingVertical: hp(0.5),
    textDecorationLine: 'underline',
  },
  floydTitle: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '500',
  },
  startsView: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amazingView: {
    height: 155,
    paddingHorizontal: wp(2),
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingVertical: hp(1),
  },
  amazingTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '400',
  },
  button: {
    width: wp('88%'),
    height: '48@s',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.Primary500,
    marginTop: hp(2.2),
  },
  buttonTitle: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
  headerCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loaderMainView: {
    marginTop: hp(2),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 7,
    paddingVertical: hp(1),
  },
  progressTitle: {
    color: Colors.Primary400,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  dateTitle: {
    color: Colors.Neutral500,
    fontSize: '13@s',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: '5@s',
  },
  dueDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderRadius: 7,
    marginTop: hp(1),
  },
  dueTitle: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '400',
  },
  dueTitleSec: {
    color: Colors.Black,
    fontSize: '14@s',
    fontWeight: '600',
  },
});
