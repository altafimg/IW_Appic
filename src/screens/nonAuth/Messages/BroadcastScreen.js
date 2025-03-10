import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  Dimensions,
  TextInput,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Overlay} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';

// images
import More from '../../../assets/images/More.png';
import image from '../../../assets/images/image.png';
import profile from '../../../assets/images/profile.png';
import dot from '../../../assets/images/dot.png';
import Add from '../../../assets/images/Add.png';
import downArrow from '../../../assets/images/downArrow.png';
import content from '../../../assets/images/content.png';
import camera from '../../../assets/images/camera.png';
import file from '../../../assets/images/file.png';
import photo from '../../../assets/images/photo.png';

import SearchInputField from '../../../components/textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';

const BroadCastScreen = ({navigation, route}) => {
  const {jobData, quickChatData, title} = route.params || {};
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

  let chatData = [
    {
      id: 1,
      message:
        'No mostraremos este banner si no hay ninguna factura pendiente en este grupo de facturas',
      timeStamp: 1706189192,
    },
  ];

  return (
    <View style={styles.container}>
      {searchSelected ? (
        <View style={[styles.directionStyle, {paddingTop: scale(10)}]}>
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
            }}
            style={{marginHorizontal: 10}}>
            Cancel
          </Text>
        </View>
      ) : (
        <View style={[styles.directionStyle, {paddingTop: scale(4)}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BackArrow goBack={() => navigation.goBack()} />
            <View style={{marginHorizontal: scale(10)}}>
              {/* <Image source={dot} style={styles.dotSignStyle} /> */}
              <Image source={profile} style={styles.profileImageStyle} />
            </View>
            <View>
              <Text style={styles.buttonTextStyle}>{'Broadcast message'}</Text>
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
      {title == 'Job' && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('QuickDetailScreen', {
              title: 'broadCast',
            });
          }}
          style={[styles.directionStyle, {top: scale(7)}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              // setVisiable(true);
            }}>
            <Image
              source={downArrow}
              style={[
                styles.iconStyle,
                {transform: [{rotate: '-90deg'}], tintColor: Colors.Neutral900},
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      {title === 'Quick' && (
        <View style={{alignSelf: 'center', marginTop: scale(11)}}>
          <Text style={styles.buttonTextStyle}>
            This chat will expire in 23h 45m 20s
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: scale(12),
              color: Colors.Neutral500,
              textAlign: 'center',
              top: 3,
            }}>
            Only ask quick questions on here
          </Text>
        </View>
      )}
      <Divider style={styles.divider} />

      {chatData.length > 0 && (
        <FlatList
          data={chatData}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.Neutral200,
                  width: '90%',
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text>{item.message}</Text>
              </View>
            );
          }}
        />
      )}

      <View style={styles.messageContainer}>
        <TouchableOpacity
          onPress={() => {
            setMediaVisible(true);
          }}>
          <Image source={Add} style={{width: scale(24), height: scale(24)}} />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor={Colors.Neutral400}
          value={message}
          style={styles.inputStyle}
          onChangeText={t => setMessage(t)}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            let id = 1;
            let element = {
              id: chatData?.includes(id) == false ? id + 1 : 1,
              message: message,
              timeStamp: 1706189192,
            };
            chatData.push(element);
          }}>
          <Text style={styles.sendTextStyle}>Send</Text>
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
                //   label="Example label"
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
        overlayStyle={[styles.overlayContainer, {height: scale(340)}]}>
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
              setExportVisiable(false);
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
              setExportVisiable(false);
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
              setMediaVisible(false);
            }}
            style={styles.contentStyle}>
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
        <View>
          <BackArrow goBack={() => setWarningVisible(false)} />

          <View style={{padding: 10}}>
            <Text style={[styles.titleStyle, {textAlign: null, marginTop: 0}]}>
              {AppLocalizedStrings.MessageingScreen.before_you}
            </Text>
            <Text style={styles.subTitleStyle}>
              {AppLocalizedStrings.MessageingScreen.camera_warning}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {}}
              style={styles.bottomButtonStyle}>
              <Text style={styles.bottomButtonTextStyle}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default BroadCastScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
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
    // marginTop: '10@s',
  },
  profileImageStyle: {
    width: '34@s',
    height: '34@s',
    borderRadius: '60@s',
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
    // height: '180@s',
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
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    bottom: '10@s',
    paddingHorizontal: '5@s',
  },
  inputStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    width: '242@s',
    marginHorizontal: '6@s',
    color: Colors.Neutral900,
  },
  sendTextStyle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
  },
});
