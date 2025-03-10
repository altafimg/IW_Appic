// import React, {useEffect} from 'react';
// import {FlatList, Text, TouchableOpacity, View} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import BackArrow from '../../../components/buttons/BackArrow';
// import SVG from '../../../assets/svg';
// import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
// import {scale} from 'react-native-size-matters';
// import Colors from '../../../theme/Colors';
// import PrimaryButton from '../../../components/buttons/PrimaryButton';
// import {Image} from 'react-native';
// import Video from 'react-native-video';
// import socket from '../../../components/socket/socket';
// import {useSelector} from 'react-redux';
// import {io} from 'socket.io-client';

// const ReadyToSendScreen = ({route, navigation}) => {
//   const SOCKET_URL = `http://13.51.89.92:5001`;
//   const approvalData = route?.params?.approvalData || {};
//   const receiverUserId = route?.params?.receiverUserId;
//   const userId = useSelector(state => state.loginReducer.user?.data?.data?._id);
//   const socket = io(SOCKET_URL);

//   const onGoBackHandler = () => {
//     navigation.goBack('');
//   };
//   const removeVideo = () => {
//     console.log('remove');
//   };
//   const sendHandler = () => {
//     navigation.navigate('JobChatScreen', {
//       approvalData: approvalData,
//     });
//     socket.emit('private message', {
//       sender: userId,
//       receiver: receiverUserId,
//       // message: 'approvalData',
//     });
//   };

//   const renderItem = ({item}) => {
//     if (item?.type === 'video/mp4') {
//       return (
//         <Video
//           resizeMode="cover"
//           source={{uri: item?.uri}}
//           muted={true}
//           //   paused={true}
//           controls={true}
//           style={{
//             width: 120,
//             height: 120,
//             marginRight: 8,
//             alignSelf: 'flex-end',
//             marginVertical: 20,
//           }}
//         />
//       );
//     } else if (item?.type === 'image/jpg') {
//       return (
//         <Image
//           source={{uri: item?.uri}}
//           style={{
//             width: 120,
//             height: 120,
//             marginRight: 8,
//             alignSelf: 'flex-end',
//             marginVertical: 20,
//           }}
//         />
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerView}>
//         <BackArrow goBack={onGoBackHandler} />
//       </View>
//       <Text style={styles.readyText}>Ready to send?</Text>
//       <SVG.Play style={{marginVertical: 15}} />

//       <TouchableOpacity>
//         <Text style={{color: '#1DA1F2', fontSize: 14, textAlign: 'center'}}>
//           Remove
//         </Text>
//       </TouchableOpacity>

//       <FlatList
//         data={approvalData}
//         horizontal
//         keyExtractor={(item, index) => index}
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderItem}
//       />

//       <View style={{alignSelf: 'flex-end'}}>
//         <PrimaryButton title={'Send'} onPress={sendHandler} />
//       </View>
//     </View>
//   );
// };

// export default ReadyToSendScreen;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: wp(4),
//     paddingBottom: wp(5),
//   },
//   headerView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   readyText: {
//     color: '#171717',
//     fontSize: '22@s',
//     fontWeight: '600',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import SVG from '../../../assets/svg';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {Image} from 'react-native';
// import Video from 'react-native-video';
import socket from '../../../components/socket/socket';

import Add from '../../../assets/images/Add.png';

import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import {videoUploadAction} from '../../../redux/actions/videoUploadAction';
import {imageUploadAction} from '../../../redux/actions/imageUploadAction';
const ReadyToSendScreen = ({route, navigation}) => {
  const SOCKET_URL = `http://13.51.89.92:5001`;
  const dispatch = useDispatch();
  const approvalData = route?.params?.approvalData || [];
  const identifier = route?.params?.identifier || {};

  console.log(identifier);
  // const receiverUserId = route?.params?.receiverUserId;
  const userId = useSelector(state => state.loginReducer.user?.data?.data?._id);
  const socket = io(SOCKET_URL);

  console.log(approvalData, '<<<<<<<<approvalData');

  // console.log(approvalData);

  const {profile_name, receiverUserId, profile_picture, _id} = route?.params;

  const imageUplaodLoader = useSelector(
    state => state.imageUploadReducer.loading,
  );
  const videoUplaodLoader = useSelector(
    state => state.videoUploadReducer.loading,
  );

  // Initialize selectedMedia with the first media item by default
  const [selectedMedia, setSelectedMedia] = useState(
    approvalData.length > 0 ? approvalData[0] : null,
  );

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const removeVideo = () => {
    console.log('remove');
  };

  const sendHandler = async () => {
    try {
      const combinedMedia = [];
      const uploadPromises = [];

      approvalData?.forEach(item => {
        // item?.type?.startsWith('image/');
        if (item?.type?.startsWith('video/')) {
          if (
            identifier === 'approve' ||
            identifier === 'uploadPhotosAndVideos' ||
            identifier === 'cameraPhotosAndVideos'
          ) {
            let videoFormData = new FormData();
            videoFormData.append('videoUrls', {
              uri: item?.uri,
              type: item?.type,
              name: item?.fileName,
            });
            uploadPromises.push(
              dispatch(videoUploadAction(videoFormData)).then(res => {
                console.log(res?.data?.videoUrls);
                return res?.data?.videoUrls;
              }),
            );
            return uploadPromises;
          } else if (identifier === 'uploadFiles') {
            let videoFormData = new FormData();
            videoFormData.append('videoUrls', {
              uri: item?.uri,
              type: item?.type,
              name: item?.name,
            });
            uploadPromises.push(
              dispatch(videoUploadAction(videoFormData)).then(res => {
                console.log(res?.data?.videoUrls);
                return res?.data?.videoUrls;
              }),
            );
            return uploadPromises;
          }
        } else if (item?.type?.startsWith('image/')) {
          if (
            identifier === 'approve' ||
            identifier === 'uploadPhotosAndVideos' ||
            identifier === 'cameraPhotosAndVideos'
          ) {
            let imageFormData = new FormData();
            imageFormData.append('imgUrls', {
              uri: item?.uri,
              type: item?.type,
              name: item?.fileName,
            });
            uploadPromises.push(
              dispatch(imageUploadAction(imageFormData)).then(res => {
                console.log(res?.data?.imgUrls);
                return res?.data?.imgUrls;
              }),
            );
            return uploadPromises;
          } else if (identifier === 'uploadFiles') {
            let imageFormData = new FormData();
            imageFormData.append('imgUrls', {
              uri: item?.uri,
              type: item?.type,
              name: item?.name,
            });
            uploadPromises.push(
              dispatch(imageUploadAction(imageFormData)).then(res => {
                console.log(res?.data?.imgUrls);
                return res?.data?.imgUrls;
              }),
            );
            return uploadPromises;
          }
        }

        // if (
        //   (identifier === 'approve' ||
        //     identifier === 'uploadPhotosAndVideos' ||
        //     identifier === 'cameraPhotosAndVideos') &&
        //   item.type.startsWith('image/')
        // ) {
        //   formData.append('imgUrls', {
        //     uri: item.uri,
        //     type: item.type,
        //     name: item.fileName,
        //   });
        // } else if (
        //   identifier === 'uploadFiles' &&
        //   item.type.startsWith('video/')
        // ) {
        //   formData.append('videoUrls', {
        //     uri: item.uri,
        //     type: item.type,
        //     name: item.name,
        //   });
        // }

        // Dispatch upload action based on condition
        // if (item?.type?.startsWith('image/')) {
        //   uploadPromises.push(
        //     dispatch(imageUploadAction(formData)).then(res => {
        //       console.log(res?.data?.imgUrls);
        //       return res?.data?.imgUrls;
        //     }),
        //   );
        // } else if (item?.type?.startsWith('video/')) {
        //   uploadPromises.push(
        //     dispatch(videoUploadAction(formData)).then(res => {
        //       console.log(res?.data?.videoUrls);
        //       return res?.data?.videoUrls;
        //     }),
        //   );
        // }
      });

      const responses = await Promise.all(uploadPromises);

      responses.forEach(response => {
        if (response) {
          combinedMedia.push(...response);
        } else {
          throw new Error('Something went wrong while uploading media.');
        }
      });

      const jobData = {
        _id: _id,
        profile_name: profile_name,
        profile_picture: profile_picture,
      };

      navigation.navigate('JobChatScreen', {
        approvalData: combinedMedia,
        jobData: jobData,
      });
    } catch (error) {
      console.log(error, '<<<<<<<error in uploading media');
      Alert.alert(
        'Something went wrong while uploading media. Please try again.',
      );
    }
  };

  // const sendHandler = () => {
  //   let combinedMedia = [];
  //   let videoPromises = [];
  //   let imagePromises = [];

  //   approvalData?.forEach(item => {
  //     if (item?.type == 'video/mp4') {
  //       if (
  //         identifier === 'approve' ||
  //         identifier === 'uploadPhotosAndVideos' ||
  //         identifier === 'cameraPhotosAndVideos'
  //       ) {
  //         let videoFormData = new FormData();
  //         videoFormData.append('videoUrls', {
  //           uri: item?.uri,
  //           type: item?.type,
  //           name: item?.fileName,
  //         });

  //         videoPromises.push(
  //           dispatch(videoUploadAction(videoFormData))
  //             .then(res => {
  //               res?.data?.videoUrls;
  //               console.log(res?.data?.videoUrls);
  //               if (res?.data?.videoUrls == undefined) {
  //                 Alert.alert('something went wrong try again!');
  //               }
  //             })
  //             .catch(err => {
  //               console.log(err, '<<<<<<<video upload error');
  //               return null;
  //             }),
  //         );
  //       } else if (identifier === 'uploadFiles') {
  //         let videoFormData = new FormData();
  //         videoFormData.append('videoUrls', {
  //           uri: item?.uri,
  //           type: item?.type,
  //           name: item?.name,
  //         });

  //         videoPromises.push(
  //           dispatch(videoUploadAction(videoFormData))
  //             .then(res => {
  //               res?.data?.videoUrls;
  //               console.log(res?.data?.videoUrls);
  //               if (res?.data?.videoUrls == undefined) {
  //                 Alert.alert('something went wrong try again!');
  //               }
  //             })
  //             .catch(err => {
  //               console.log(err, '<<<<<<<video upload error');
  //               return null;
  //             }),
  //         );
  //       }
  //     } else if (item?.type && item?.type?.startsWith('image/')) {
  //       if (
  //         identifier === 'approve' ||
  //         identifier === 'uploadPhotosAndVideos' ||
  //         identifier === 'cameraPhotosAndVideos'
  //       ) {
  //         let imageFormData = new FormData();

  //         imageFormData.append('imgUrls', {
  //           uri: item?.uri,
  //           type: item?.type,
  //           name: item?.fileName,
  //         });
  //         dispatch(imageUploadAction(imageFormData))
  //           .then(res => {
  //             const response = res?.data?.imgUrls;
  //             const combineImages = [...response];
  //             console.log(combineImages);

  //             if (res?.data?.imgUrls == undefined) {
  //               Alert.alert('something went wrong try again!');
  //             }
  //           })
  //           .catch(err => {
  //             console.log(err, '<<<<<<<image uplaod res');
  //           });
  //       } else if (identifier === 'uploadFiles') {
  //         let imageFormData = new FormData();
  //         imageFormData.append('imgUrls', {
  //           uri: item?.uri,
  //           type: item?.type,
  //           name: item?.name,
  //         });
  //         dispatch(imageUploadAction(imageFormData))
  //           .then(res => {
  //             const response = res?.data?.imgUrls;
  //             const combineImages = [...response];
  //             console.log(combineImages);

  //             if (res?.data?.imgUrls == undefined) {
  //               Alert.alert('something went wrong try again!');
  //             }
  //           })
  //           .catch(err => {
  //             console.log(err, '<<<<<<<image uplaod res');
  //           });
  //       }
  //     }
  //   });

  //   Promise.all([...videoPromises, ...imagePromises])
  //     .then(responses => {
  //       combinedMedia = responses.reduce(
  //         (acc, val) => (val ? [...acc, ...val] : acc),
  //         [],
  //       );

  //       const jobData = {
  //         _id: _id,
  //         profile_name: profile_name,
  //         profile_picture: profile_picture,
  //       };

  //       navigation.navigate('JobChatScreen', {
  //         approvalData: combinedMedia,
  //         jobData: jobData,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err, '<<<<<<<error in uploading media');
  //     });
  // };

  // const sendHandler = () => {
  //   approvalData?.map(item => {
  //     if (item?.type === 'video/mp4') {
  //       let videoFormData = new FormData();
  //       videoFormData.append('videoUrls', {
  //         uri: item?.uri,
  //         type: item?.type,
  //         name: item?.fileName,
  //       });
  //       dispatch(videoUploadAction(videoFormData))
  //         .then(res => {
  //           const response = res?.data?.videoUrls;
  //           const combinedVideos = [...response];
  //           console.log(combinedVideos);
  //         })
  //         .catch(err => {
  //           console.log(err, '<<<<<<<video uplaod res');
  //         });
  //     } else if (item?.type === 'image/jpg' || item?.type === 'image/png') {
  //       let imageFormData = new FormData();
  //       imageFormData.append('imgUrls', {
  //         uri: item?.uri,
  //         type: item?.type,
  //         name: item?.fileName,
  //       });
  //       dispatch(imageUploadAction(imageFormData))
  //         .then(res => {
  //           const response = res?.data?.imgUrls;
  //           const combineImages = [...response];
  //           console.log(combineImages);
  //         })
  //         .catch(err => {
  //           console.log(err, '<<<<<<<image uplaod res');
  //         });
  //     }
  //   });
  //   // navigation.navigate('JobChatScreen', {
  //   //   approvalData: approvalData,
  //   // });
  //   // socket.emit('private message', {
  //   //   sender: userId,
  //   //   receiver: receiverUserId,
  //   //   media: selectedMedia ? [selectedMedia] : [], // Sending selected media item to chat screen
  //   // });
  // };

  const renderItem = ({item}) => {
    const isSelected = selectedMedia && selectedMedia.uri === item.uri;
    if (item?.type === 'video/mp4') {
      return (
        <TouchableOpacity onPress={() => setSelectedMedia(item)}>
          <Video
            resizeMode="cover"
            source={{uri: item?.uri}}
            controls
            muted
            paused
            style={{
              width: 120,
              height: 120,
              marginRight: 8,
              alignSelf: 'flex-end',
              marginVertical: 20,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>
      );
    } else if (item?.type.startsWith('image/')) {
      return (
        <TouchableOpacity onPress={() => setSelectedMedia(item)}>
          <Image
            source={{uri: item?.uri}}
            style={{
              width: 120,
              height: 120,
              marginRight: 8,
              alignSelf: 'flex-end',
              marginVertical: 20,
              // borderColor: isSelected ? 'white' : 'transparent',
              // borderWidth: isSelected ? 0 : 5,
            }}
          />
        </TouchableOpacity>
      );
    }
    // else if (item?.type === 'application/pdf') {
    //   return (
    //     <TouchableOpacity onPress={() => setSelectedMedia(item)}>
    //       <SVG.Document height={120} width={120} style={{marginVertical: 20}} />
    //     </TouchableOpacity>
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <BackArrow goBack={onGoBackHandler} />
      </View>
      <Text style={styles.readyText}>Ready to send?</Text>

      {/* Render selected media item above FlatList */}
      {selectedMedia && (
        <View style={{marginRight: 8, marginVertical: 20}}>
          {selectedMedia?.type === 'video/mp4' ? (
            <Video
              controls
              muted
              paused
              resizeMode="cover"
              source={{uri: selectedMedia?.uri}}
              style={{
                width: '100%',
                height: 250,
                borderRadius: 10,
                borderColor: 'red',
                borderWidth: 1,
              }}
            />
          ) : (
            <Image
              source={{uri: selectedMedia?.uri}}
              style={{width: '100%', height: 250, borderRadius: 10}}
            />
          )}
        </View>
      )}

      <TouchableOpacity onPress={() => setSelectedMedia(null)}>
        <Text style={{color: '#1DA1F2', fontSize: 14, textAlign: 'center'}}>
          Remove
        </Text>
      </TouchableOpacity>

      <FlatList
        data={approvalData}
        horizontal
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <View style={{alignSelf: 'flex-end'}}>
        <PrimaryButton
          title={
            imageUplaodLoader || videoUplaodLoader ? (
              <View style={{width: wp('93%'), justifyContent: 'center'}}>
                <ActivityIndicator
                  color={Colors.White}
                  size={'small'}
                  style={{marginTop: hp(1)}}
                />
              </View>
            ) : (
              'send'
            )
          }
          onPress={sendHandler}
        />
      </View>
    </View>
  );
};

export default ReadyToSendScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
    paddingBottom: wp(5),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readyText: {
    color: '#171717',
    fontSize: '22@s',
    fontWeight: '600',
  },
});
