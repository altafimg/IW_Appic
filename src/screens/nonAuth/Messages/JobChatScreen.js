import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Linking,
  TextInput,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Overlay} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import {io} from 'socket.io-client';
// images
import More from '../../../assets/images/More.png';
import image from '../../../assets/images/image.png';
import Add from '../../../assets/images/Add.png';
import downArrow from '../../../assets/images/downArrow.png';
import sendButtonIcon from '../../../assets/images/sendButtonIcon.png';
import content from '../../../assets/images/content.png';
import camera from '../../../assets/images/camera.png';
import file from '../../../assets/images/file.png';
import photo from '../../../assets/images/photo.png';
import moment from 'moment';
import SearchInputField from '../../../components/textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {getChatsDataAction} from '../../../redux/actions/getChatsDataAction';
import userImage from '../../../assets/images/userImage.png';
import {deleteMessageAction} from '../../../redux/actions/deleteMessageAction';
import SVG from '../../../assets/svg';

const JobChatScreen = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const SOCKET_URL = `http://13.51.89.92:5001`;
  const dispatch = useDispatch();

  let typingTimeout;
  const userId = useSelector(state => state.loginReducer.user?.data?.data?._id);
  const jobData = route?.params?.jobData || {};
  const receiverUserId = jobData?._id;
  const {profile_name, profile_picture} = jobData;

  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [searchSelected, setSearchSelected] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const [visiable1, setVisiable1] = useState(false);
  const [exportVisiable, setExportVisiable] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [mediaVisible, setMediaVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState('');
  const [mediaSource, setMediaSource] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isCurrentUserMessage, setIsCurrentUserMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [frontTyping, setFrontTyping] = useState(false);

  const getAllMessagesHandler = () => {
    const data = {
      senderId: userId,
      receiverId: receiverUserId,
    };
    dispatch(getChatsDataAction(data))
      .then(res => {
        setChatMessages(res?.data);
      })
      .catch(err => {
        console.log(err, '<<<<<Err');
      });
  };

  useEffect(() => {
    getAllMessagesHandler();
  }, [dispatch]);

  const handleLongPress = (messageId, text, isCurrentUserMessage) => {
    setSelectedMessage(text);
    setSelectedMessageId(messageId);
    setShowPopup(true);
    setIsCurrentUserMessage(isCurrentUserMessage);
  };

  const handleUnsend = messageId => {
    if (isCurrentUserMessage) {
      setShowPopup(false);
      dispatch(deleteMessageAction(messageId))
        .then(res => {
          if (res?.data?.message) {
            console.log(res?.data?.message, '<<<<<<<<<<<<<<response');
            getAllMessagesHandler();
          }
        })
        .catch(err => {
          console.log(err, '<<<<<<<<<<<<<<<<err');
        });
    }
    setShowPopup(false);
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    setShowPopup(false);
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {});

    setSocket(newSocket);

    newSocket.on('typing', ({userId, isTyping}) => {
      if (isTyping) {
        setFrontTyping(true);
      } else {
        setFrontTyping(false);
      }
    });

    if (userId) {
      newSocket.emit('new user', userId);
      newSocket.on(
        'private message',
        ({message, receiver, sender, timeStamp}) => {
          console.log('Received private message:', message);
          setChatMessages(prevChat => [
            ...prevChat,
            {
              text: message,
              senderId: sender,
              recipientId: receiver,
              timestamp: timeStamp,
            },
          ]);
        },
      );
    }

    newSocket.on('connect_error', err => {
      console.error('Socket connection error:', err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [receiverUserId, userId]);

  const handleTextChange = text => {
    setMessage(text);

    setIsTyping(true);
    socket.emit('typing', {userId: receiverUserId, isTyping: true});

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', {userId: receiverUserId, isTyping: false});
    }, 2000);
  };

  const sendMessageHandler = () => {
    if (!message.trim()) {
      return;
    }

    if (!socket) {
      return;
    }

    socket.emit('private message', {
      sender: userId,
      receiver: receiverUserId,
      message: message,
    });

    setChatMessages([
      ...chatMessages,
      {
        text: message,
        senderId: userId,
        recipientId: receiverUserId,
        timestamp: new Date().toUTCString(),
      },
    ]);

    getAllMessagesHandler();
    setMessage('');
  };

  let isPickingDocument = false;

  //------------------ document picker=> upload files -----------------
  const pickDocument = async () => {
    console.log('document picker=> upload files');
    if (isPickingDocument) {
      console.log('A document picking process is already in progress.');
      return;
    }

    try {
      isPickingDocument = true;

      const approvalData = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      const identifier = 'uploadFiles';

      if (approvalData) {
        navigation.navigate('ReadyToSendScreen', {
          approvalData: approvalData,
          receiverUserId: receiverUserId,
          profile_name: profile_name,
          profile_picture: profile_picture,
          _id: receiverUserId,
          identifier: identifier,
        });
      }
      setMediaVisible(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking canceled');
      } else {
        console.error('Error picking document:', err);
      }
    } finally {
      isPickingDocument = false;
    }
  };

  const requestMediaPermissionroll = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);

        if (
          granted['android.permission.READ_MEDIA_IMAGES'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          openMediaLibraryroll();
          console.log('You can use the media');
        } else {
          console.log('Media permission denied');
          showPermissionSettingsDialog();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      openMediaLibraryroll();
    }
  };

  //------------------ document picker=> upload photos and videos -----------------
  const openMediaLibraryroll = async () => {
    console.log('openMediaLibraryroll');
    const mediaOption = {
      mediaType: 'mixed',
      selectionLimit: 50,
      includeBase64: false,
      quality: 1,
    };

    try {
      const response = await launchImageLibrary(mediaOption);
      if (response?.assets) {
        const approvalData = response?.assets;
        const identifier = 'uploadPhotosAndVideos';

        navigation.navigate('ReadyToSendScreen', {
          approvalData: approvalData,
          receiverUserId: receiverUserId,
          profile_name: profile_name,
          profile_picture: profile_picture,
          _id: receiverUserId,
          identifier: identifier,
        });
      }
      //   setMediaVisible(false);

      setExportVisiable(false);
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  };

  //------------------ document picker=> upload files of approval content -----------------

  const approvalPickDocument = async () => {
    const mediaOption = {
      mediaType: 'mixed',
      selectionLimit: 50,
      includeBase64: false,
      quality: 1,
    };

    const response = await launchImageLibrary(mediaOption);

    // console.log(response?.assets);

    const identifier = 'approve';

    if (response?.assets) {
      const approvalData = response?.assets;

      navigation.navigate('ReadyToSendScreen', {
        approvalData: approvalData,
        receiverUserId: receiverUserId,
        profile_name: profile_name,
        profile_picture: profile_picture,
        _id: receiverUserId,
        identifier: identifier,
      });
      setMediaVisible(false);
    }
    if (response.didCancel) {
      console.log('user cancels');
    }
  };

  const requestMediaPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        if (
          granted['android.permission.READ_MEDIA_IMAGES'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          //   openMediaLibrary();
          pickDocument();
          console.log('You can use the media');
        } else {
          console.log('Media permission denied');
          showPermissionSettingsDialog();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      //   openMediaLibrary();
      pickDocument();
    }
  };

  const showPermissionSettingsDialog = () => {
    Alert.alert(
      'Permission Denied',
      'To use the media, you need to grant necessary permissions. Do you want to go to app settings?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Settings', onPress: () => openSettings()},
      ],
      {cancelable: false},
    );
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const openMediaLibrary = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      console.log('File picked:', result);
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const openCameraPermission = async mediaType => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Influence With wants your Camera Permission',
            message: 'Influence With needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          openCamera(mediaType);
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
          showPermissionSettingsDialog();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      openCamera(mediaType);
    }
  };

  const openCamera = mediaType => {
    console.log(mediaType);
    const cameraOption = {
      mediaType: mediaType,
      quality: 1,
    };

    launchCamera(cameraOption, response => {
      if (response?.didCancel) {
        console.log('User cancelled camera');
      } else if (response?.error) {
        console.log('Camera Error: ', response.error);
      } else if (response?.assets[0]?.uri) {
        setMediaSource(prevMediaSources => [
          ...prevMediaSources,
          {uri: response?.assets[0]?.uri, type: response?.assets[0]?.type},
        ]);
        const approvalData = response?.assets;
        const identifier = 'cameraPhotosAndVideos';
        navigation.navigate('ReadyToSendScreen', {
          approvalData: approvalData,
          receiverUserId: receiverUserId,
          profile_name: profile_name,
          profile_picture: profile_picture,
          _id: receiverUserId,
          identifier: identifier,
        });
      }
      setWarningVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      {searchSelected ? (
        <View
          style={[
            styles.directionStyle,
            {paddingTop: scale(10), paddingHorizontal: scale(10)},
          ]}>
          <SearchInputField
            focusable={true}
            style={{width: 150}}
            value={search}
            onChangeText={t => setSearch(t)}
            placeholder={AppLocalizedStrings.MessageingScreen.search}
          />
          <Text
            onPress={() => {
              setSearchSelected(false);
              setSearch('');
            }}
            style={{
              marginLeft: 5,
            }}>
            Cancel
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.directionStyle,
            {paddingTop: scale(4), paddingHorizontal: scale(10)},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BackArrow goBack={() => navigation.goBack()} />
            <View style={{marginHorizontal: scale(10)}}>
              <View>
                {profile_picture == null || profile_picture == undefined ? (
                  <Image source={userImage} style={styles.profileImageStyle} />
                ) : (
                  <Image
                    source={{uri: profile_picture}}
                    style={styles.profileImageStyle}
                  />
                )}
              </View>
            </View>

            <View>
              <Text style={styles.buttonTextStyle}>
                {profile_name
                  ?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setVisiable1(true);
            }}>
            <Image source={More} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      )}
      <Divider
        style={{
          width: Dimensions.get('window').width,
          alignSelf: 'center',
          marginTop: scale(10),
        }}
      />

      <View
        style={[
          styles.directionStyle,
          {top: scale(7), paddingHorizontal: scale(10)},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#A6A6AA',
          }}>
          <Image source={image} style={styles.imageStyle} />
          <View style={{marginHorizontal: scale(10)}}>
            <Text style={styles.buttonTextStyle}>
              Advertise the new apple watch
            </Text>
            <Text
              style={[
                styles.countStyle,
                {color: Colors.Neutral500, fontSize: scale(12)},
              ]}>
              Proposal sent on: 17 June 2020 5:30pm GMT
            </Text>
            <Text
              style={[
                styles.countStyle,
                {color: Colors.Neutral500, fontSize: scale(12)},
              ]}>
              Status: In progress
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={downArrow}
            style={[
              styles.iconStyle,
              {
                transform: [{rotate: '-90deg'}],
                tintColor: Colors.Neutral900,
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <Divider
        style={{
          width: Dimensions.get('window').width,
          alignSelf: 'center',
          marginTop: scale(5),
        }}
      />

      <FlatList
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()} // Added keyExtractor to FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({animated: true}); // Scroll to the bottom when content size changes
        }}
        ref={flatListRef} // Use the ref here
        keyboardShouldPersistTaps="handled"
        renderItem={({item, index}) => {
          return (
            <>
              <View style={{paddingHorizontal: scale(10)}}>
                {item?.senderId === userId ? (
                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                      alignSelf: 'flex-end',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#1DA1F2',
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 10,
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      <TouchableOpacity
                        onLongPress={() =>
                          handleLongPress(item?._id, item?.text, true)
                        }>
                        <Text
                          style={{
                            padding: 5,
                            color: '#fff',
                            fontSize: scale(13),
                          }}>
                          {search ? (
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: scale(13),
                                backgroundColor: '#E65C19',
                              }}>
                              {item?.text
                                .split(new RegExp(`(${search})`, 'gi'))
                                .map((part, index) => (
                                  <Text
                                    key={index}
                                    style={{
                                      fontSize: scale(13),
                                      backgroundColor:
                                        part.toLowerCase() ===
                                        search.toLowerCase()
                                          ? '#FBBF24'
                                          : 'transparent',
                                    }}>
                                    {part}
                                  </Text>
                                ))}
                            </Text>
                          ) : (
                            <Text>{item?.text}</Text>
                          )}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        color: '#808080',
                        fontWeight: 400,
                        alignSelf: 'flex-end',
                        fontSize: 12,
                      }}>
                      {moment(item?.timestamp).format('LT')}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginBottom: 5,
                      marginTop: 5,
                      backgroundColor: '#F2F3F5',
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 0,
                      borderRadius: 10,
                      padding: 5,
                      alignSelf: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onLongPress={() =>
                        handleLongPress(item?._id, item?.text, false)
                      }>
                      <Text
                        style={{
                          padding: 5,
                          color: '#000',
                          fontSize: scale(13),
                        }}>
                        {search ? (
                          <Text
                            style={{
                              color: 'black',
                              backgroundColor: '#E65C19',
                            }}>
                            {item?.text
                              .split(new RegExp(`(${search})`, 'gi'))
                              .map((part, index) => (
                                <Text
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      part.toLowerCase() ===
                                      search.toLowerCase()
                                        ? '#FBBF24'
                                        : 'transparent',
                                  }}>
                                  {part}
                                </Text>
                              ))}
                          </Text>
                        ) : (
                          <Text>{item?.text}</Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* --------------------------- copy/unsend modal  start -------------------------- */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={showPopup}
                onRequestClose={() => setShowPopup(false)}>
                <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: '#1C1C1E',
                        alignItems: 'center',
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#1C1C1E',
                          padding: 20,
                          borderRadius: 25,
                        }}
                        onPress={() => copyToClipboard(selectedMessage)}>
                        <Text
                          style={{
                            color: '#FFFFFF',
                            fontWeight: '600',
                            fontSize: 16,
                          }}>
                          Copy
                        </Text>
                      </TouchableOpacity>

                      {isCurrentUserMessage ? (
                        <>
                          <View
                            style={{
                              borderColor: '#636366',
                              borderWidth: 1,
                              height: '100%',
                            }}></View>
                          <TouchableOpacity
                            onPress={() => handleUnsend(selectedMessageId)}
                            style={{
                              backgroundColor: '#1C1C1E',
                              padding: 20,
                              borderRadius: 25,
                            }}>
                            <Text
                              style={{
                                color: '#FFFFFF',
                                fontWeight: '600',
                                fontSize: 16,
                              }}>
                              Unsend
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : null}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              {/* --------------------------- copy/unsend modal  end -------------------------- */}
            </>
          );
        }}
      />

      <View style={{position: 'relative', marginBottom: scale(20)}}>
        {frontTyping ? (
          <Text
            style={{
              color: '#808080',
              fontSize: scale(14),
              fontWeight: '400',
              textAlign: 'left',
            }}>
            {(profile_name?.split(' ')[0] || '').charAt(0).toUpperCase() +
              profile_name?.split(' ')[0].slice(1) +
              ' is typing...'}
          </Text>
        ) : (
          ''
        )}
      </View>
      <View style={styles.messageContainer}>
        <TouchableOpacity
          onPress={() => {
            setMediaVisible(true);
          }}>
          <SVG.AddChatScreen width={30} height={30} />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor={Colors.Neutral400}
          value={message}
          style={styles.inputStyle}
          onChangeText={t => handleTextChange(t)}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            sendMessageHandler();
          }}>
          <Image
            source={sendButtonIcon}
            style={{
              width: scale(30),
              height: scale(30),
            }}
          />
        </TouchableOpacity>
      </View>

      <Overlay
        onRequestClose={() => setVisiable(false)}
        onBackdropPress={() => setVisiable(false)}
        isVisible={visiable}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.overlaythumbStyle} />
        <View style={styles.bottomSheetStyle}>
          <Text style={styles.overlayTitleStyle}>
            {AppLocalizedStrings.MessageingScreen.Translation_Settings}
          </Text>
          <View style={{marginTop: scale(10), padding: 5}}>
            <View style={styles.directionStyle}>
              <Text
                style={[
                  styles.newButtonTextStyle,
                  {fontWeight: '400', color: Colors.Neutral800},
                ]}>
                {AppLocalizedStrings.MessageingScreen.Translation_Assistant}
              </Text>
              <ToggleSwitch
                isOn={checked}
                onColor={Colors.Success500}
                offColor={Colors.Neutral400}
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="large"
                onToggle={() => setChecked(!checked)}
              />
            </View>
            <Text
              style={[
                styles.countStyle,
                {marginTop: scale(10), color: Colors.Neutral500},
              ]}>
              {AppLocalizedStrings.MessageingScreen.Translation_All}
            </Text>
            <View style={[styles.directionStyle, {marginTop: scale(10)}]}>
              <Text
                style={[
                  styles.countStyle,
                  {marginTop: scale(0), color: Colors.Neutral900},
                ]}>
                English (US)
              </Text>
              <Image
                source={downArrow}
                style={{
                  width: scale(26),
                  height: scale(26),
                  tintColor: Colors.Neutral900,
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable(false);
              }}
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: Colors.Primary500,
                  marginBottom: scale(20),
                  height: scale(53),
                },
              ]}>
              <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
                {AppLocalizedStrings.MessageingScreen.save}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
      <Overlay
        onRequestClose={() => setVisiable1(false)}
        onBackdropPress={() => setVisiable1(false)}
        isVisible={visiable1}
        overlayStyle={[styles.overlayContainer, {height: scale(400)}]}>
        <View style={styles.overlaythumbStyle} />
        <View style={styles.bottomSheetStyle}>
          <View style={{marginTop: scale(10), padding: 5}}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable1(false);
                setVisiable(true);
              }}
              style={{marginTop: scale(20)}}>
              <Text style={styles.textStyle}>
                {AppLocalizedStrings.MessageingScreen.Translation_Settings}
              </Text>
              <Text style={[styles.textStyle, {fontSize: scale(12)}]}>
                {AppLocalizedStrings.MessageingScreen.on_off}
              </Text>
            </TouchableOpacity>
            <Divider style={{marginTop: scale(10)}} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable1(false);
                setSearchSelected(true);
              }}
              style={{marginTop: scale(15)}}>
              <Text style={styles.textStyle}>
                {AppLocalizedStrings.MessageingScreen.Chat_search}
              </Text>
              <Text style={[styles.textStyle, {fontSize: scale(12)}]}>
                {AppLocalizedStrings.MessageingScreen.search_keyword}
              </Text>
            </TouchableOpacity>
            <Divider style={{marginTop: scale(10)}} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable1(false);
                navigation.navigate('AllMediaScreen');
              }}
              style={{marginTop: scale(15)}}>
              <Text style={styles.textStyle}>
                {AppLocalizedStrings.MessageingScreen.all_media}
              </Text>
              <Text style={[styles.textStyle, {fontSize: scale(12)}]}>
                {AppLocalizedStrings.MessageingScreen.download_media}
              </Text>
            </TouchableOpacity>
            <Divider style={{marginTop: scale(10)}} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable1(false);
                setExportVisiable(true);
              }}
              style={{marginTop: scale(15)}}>
              <Text style={styles.textStyle}>
                {AppLocalizedStrings.MessageingScreen.export_file}
              </Text>
              <Text style={[styles.textStyle, {fontSize: scale(12)}]}>
                {AppLocalizedStrings.MessageingScreen.export_dec}
              </Text>
            </TouchableOpacity>
            <Divider style={{marginTop: scale(10)}} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable1(false);
                navigation.navigate('ReportScreen', {
                  data: jobData ? jobData : quickChatData,
                });
              }}
              style={{marginTop: scale(15)}}>
              <Text style={styles.textStyle}>
                {AppLocalizedStrings.MessageingScreen.block_user}
              </Text>
              <Text style={[styles.textStyle, {fontSize: scale(12)}]}>
                {AppLocalizedStrings.MessageingScreen.block_dec}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
      <Overlay
        onRequestClose={() => setExportVisiable(false)}
        onBackdropPress={() => setExportVisiable(false)}
        isVisible={exportVisiable}
        overlayStyle={[styles.overlayContainer, {height: scale(240)}]}>
        <View style={styles.overlaythumbStyle} />
        <View style={{marginTop: scale(10)}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              requestMediaPermissionroll();
            }}
            style={{padding: scale(15)}}>
            <Text style={styles.textStyle}>
              {type == 'upload photo'
                ? AppLocalizedStrings.MessageingScreen.Browse_camera
                : AppLocalizedStrings.MessageingScreen.save_page}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              requestMediaPermission();
            }}
            style={{padding: scale(15)}}>
            <Text style={styles.textStyle}>
              {type == 'upload photo'
                ? AppLocalizedStrings.MessageingScreen.Browse_files
                : AppLocalizedStrings.MessageingScreen.save_file}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setExportVisiable(false);
            }}
            style={{padding: scale(15)}}>
            <Text style={[styles.textStyle, {color: 'red'}]}>
              {AppLocalizedStrings.MessageingScreen.cancel}
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        onRequestClose={() => setMediaVisible(false)}
        onBackdropPress={() => setMediaVisible(false)}
        isVisible={mediaVisible}
        overlayStyle={[styles.overlayContainer, {height: scale(265)}]}>
        <View style={styles.overlaythumbStyle} />
        <View style={{marginTop: scale(10)}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              approvalPickDocument();
            }}
            style={styles.contentStyle}>
            <Image source={content} style={styles.iconStyle} />
            <Text style={styles.textStyle}>
              {AppLocalizedStrings.MessageingScreen.send_content}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              pickDocument();
            }}
            style={styles.contentStyle}>
            <Image source={file} style={styles.iconStyle} />
            <Text style={styles.textStyle}>
              {AppLocalizedStrings.MessageingScreen.upload_file}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setMediaVisible(false);
              setExportVisiable(true);
              setType('upload photo');
            }}
            style={styles.contentStyle}>
            <Image source={photo} style={styles.iconStyle} />
            <Text style={styles.textStyle}>
              {AppLocalizedStrings.MessageingScreen.upload_photo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setMediaVisible(false);
              setWarningVisible(true);
            }}
            style={styles.contentStyle}>
            <Image source={camera} style={styles.iconStyle} />
            <Text style={styles.textStyle}>
              {AppLocalizedStrings.MessageingScreen.upload_camera}
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        onRequestClose={() => setWarningVisible(false)}
        onBackdropPress={() => setWarningVisible(false)}
        isVisible={warningVisible}
        overlayStyle={[
          styles.overlayContainer,
          {height: '100%', borderTopLeftRadius: 0, borderBottomRightRadius: 0},
        ]}>
        <SafeAreaView>
          <BackArrow goBack={() => setWarningVisible(false)} />

          <ScrollView style={{padding: 10}}>
            <Text style={[styles.titleStyle, {textAlign: null, marginTop: 0}]}>
              {AppLocalizedStrings.MessageingScreen.before_you}
            </Text>
            <Text style={styles.subTitleStyle}>
              {AppLocalizedStrings.MessageingScreen.camera_warning}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.bottomButtonStyle}>
              <Text style={styles.bottomButtonTextStyle}>Got it</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Overlay>
      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <View
          style={{
            backgroundColor: 'ghostwhite',
            borderRadius: 10,
            justifyContent: 'space-around',
            flexDirection: 'row',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 0.5,
              borderColor: 'black',
            }}
            onPress={() => {
              openCameraPermission('image');
            }}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 400}}>
              Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
            }}
            onPress={() => {
              openCameraPermission('video');
            }}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 400}}>
              Video
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default JobChatScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  iconStyle: {
    width: '24@s',
    height: '24@s',
  },
  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  divider: {
    marginTop: '15@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  searchInputStyle: {
    backgroundColor: 'red',
    width: '300@s',
  },
  imageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },
  contentStyle: {
    padding: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10@s',
  },
  titleStyle: {
    fontSize: '24@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    textAlign: 'center',
    marginTop: '30@s',
  },
  subTitleStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral700,
    marginTop: '10@s',
    lineHeight: '20@s',
  },
  buttonContainer: {
    backgroundColor: Colors.Neutral100,
    height: '40@s',
    marginTop: '20@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '3@s',
  },

  newButtonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  buttonStyle: {
    height: '36.8@s',
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3@s',
  },

  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  bottomButtonStyle: {
    backgroundColor: Colors.Primary500,
    height: '54@s',
    borderRadius: '5@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '60@s',
  },
  bottomButtonTextStyle: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
  },
  mainContainer: {
    height: '75@s',
  },
  profileImageStyle: {
    width: '34@s',
    height: '34@s',
    borderRadius: '60@s',
    alignSelf: 'center',
  },
  dotSignStyle: {
    position: 'absolute',
    width: '7@s',
    height: '7@s',
    borderRadius: '60@s',
    bottom: 3,
    right: 3,
    zIndex: 999,
  },
  nameTextStyle: {
    fontSize: '14@s',
    fontWeight: '500',
    color: Colors.Neutral900,
  },
  textStyle: {
    fontSize: '16@s',
    fontWeight: '400',
    color: Colors.Neutral800,
  },
  countStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Primary500,
  },
  messageCountStyle: {
    backgroundColor: Colors.Primary500,
    width: '19@s',
    height: '19@s',
    borderRadius: '60@s',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: '13@s',
    fontWeight: '500',
    color: Colors.Neutral50,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  overlayTitleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '10@s',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '60@s',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: scale(5),
    marginTop: scale(10),
    borderTopWidth: 1,
    borderColor: '#ACACB1',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ACACB1',
    borderRadius: 50,
    backgroundColor: '#fff',
    width: '78%',
    height: '35@s',
    marginHorizontal: '6@s',
    paddingHorizontal: '10@s',
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral900,
  },
  sendTextStyle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
    paddingVertical: 10,
  },
});
