import React, {useRef, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  Animated,
  Dimensions,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Overlay} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';

// images

import image from '../../../assets/images/image.png';
import download from '../../../assets/images/download.png';
import speaker from '../../../assets/images/speaker.png';
import document from '../../../assets/images/document.png';
import links from '../../../assets/images/links.png';

import SearchInputField from '../../../components/textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';

const AllMediaScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('1');
  const [downloadVisible, setDownloadVisible] = useState(false);

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
  const videoData = [
    {
      id: 1,
      name: 'video2993.mov',
      image: image,
      download_size: '1.6',
    },
    {
      id: 2,
      name: 'video2993.mov',
      image: image,
      download_size: '1.6',
    },
    {
      id: 3,
      name: 'video2993.mov',
      image: image,
      download_size: '1.6',
    },
    {
      id: 4,
      name: 'video2993.mov',
      image: image,
      download_size: '1.6',
    },
  ];
  const audioData = [
    {
      id: 1,
      name: 'audio.wav',
      image: speaker,
      download_size: '1.6',
    },
    {
      id: 2,
      name: 'audio.wav',
      image: speaker,
      download_size: '1.6',
    },
    {
      id: 3,
      name: 'audio.wav',
      image: speaker,
      download_size: '1.6',
    },
    {
      id: 4,
      name: 'audio.wav',
      image: speaker,
      download_size: '1.6',
    },
  ];
  const linksData = [
    {
      id: 1,
      name: 'www.link.com',
      image: links,
      download_size: '1.6',
    },
    {
      id: 2,
      name: 'www.link.com',
      image: links,
      download_size: '1.6',
    },
    {
      id: 3,
      name: 'www.link.com',
      image: links,
      download_size: '1.6',
    },
    {
      id: 4,
      name: 'www.link.com',
      image: links,
      download_size: '1.6',
    },
  ];
  const docsData = [
    {
      id: 1,
      name: 'file.pdf',
      image: document,
      download_size: '1.6',
    },
    {
      id: 2,
      name: 'file.pdf',
      image: document,
      download_size: '1.6',
    },
    {
      id: 3,
      name: 'file.pdf',
      image: document,
      download_size: '1.6',
    },
    {
      id: 4,
      name: 'file.pdf',
      image: document,
      download_size: '1.6',
    },
  ];

  const renderQuickChat = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={1}
        style={styles.mainContainer}>
        <View style={styles.directionStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {selected == '3' || selected == '4' || selected == '5' ? (
              <View
                style={[
                  styles.profileImageStyle,
                  {
                    backgroundColor: Colors.PrimaryLight,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image
                  source={item.image}
                  style={{height: scale(24), width: scale(24)}}
                />
              </View>
            ) : (
              <Image source={item.image} style={styles.profileImageStyle} />
            )}
            <View
              style={{
                marginHorizontal: scale(15),
                width: scale(170),
              }}>
              <Text numberOfLines={1} style={styles.nameTextStyle}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Image source={download} style={styles.iconStyle} />

            <Text style={[styles.countStyle]}>{item.download_size} MB</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackArrow goBack={() => navigation.goBack()} />

      <Header headerTitle=" Media and Files" subTitle={null} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('1')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '1' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '1' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.images}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('2')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '2' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '2' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.video}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('3')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '3' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '3' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.audio}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('4')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '4' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '4' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.links}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelected('5')}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                selected == '5' ? Colors.Primary500 : Colors.Neutral100,
            },
          ]}>
          <Text
            style={[
              styles.buttonTextStyle,
              {
                color: selected == '5' ? Colors.White : Colors.Neutral600,
              },
            ]}>
            {AppLocalizedStrings.MessageingScreen.docs}
          </Text>
        </TouchableOpacity>
      </View>

      {selected == '1' && (
        <>
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.images}
          </Text>
          <FlatList
            data={imageData}
            keyExtractor={item => item.id}
            renderItem={renderQuickChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
        </>
      )}
      {selected == '2' && (
        <>
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.video}s
          </Text>
          <FlatList
            data={videoData}
            keyExtractor={item => item.id}
            renderItem={renderQuickChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
        </>
      )}
      {selected == '3' && (
        <>
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.audio}
          </Text>
          <FlatList
            data={audioData}
            keyExtractor={item => item.id}
            renderItem={renderQuickChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
        </>
      )}
      {selected == '4' && (
        <>
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.links}
          </Text>
          <FlatList
            data={linksData}
            keyExtractor={item => item.id}
            renderItem={renderQuickChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
        </>
      )}
      {selected == '5' && (
        <>
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.MessageingScreen.docs}
          </Text>
          <FlatList
            data={docsData}
            keyExtractor={item => item.id}
            renderItem={renderQuickChat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: scale(20),
            }}
          />
        </>
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTextStyle}>All images Size: 8.3 MB</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setDownloadVisible(true);
          }}
          style={styles.buttonStyle1}>
          {selected == '1' && (
            <Text style={styles.buttonTextStyle1}>Download all images</Text>
          )}
          {selected == '2' && (
            <Text style={styles.buttonTextStyle1}>Download all videos</Text>
          )}
          {selected == '3' && (
            <Text style={styles.buttonTextStyle1}>Download all audio</Text>
          )}
          {selected == '4' && (
            <Text style={styles.buttonTextStyle1}>Export all as PDF</Text>
          )}
          {selected == '5' && (
            <Text style={styles.buttonTextStyle1}>Download all documents</Text>
          )}
        </TouchableOpacity>
      </View>
      <Overlay
        overlayStyle={{
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: scale(200),
          width: Dimensions.get('window').width,
        }}
        visible={downloadVisible}>
        <TouchableOpacity onPress={() => setDownloadVisible(false)}>
          <Image
            style={{width: scale(24), height: scale(24), alignSelf: 'flex-end'}}
            source={require('../../../assets/images/close.png')}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Image
            style={{width: scale(34), height: scale(33.7), marginBottom: 10}}
            source={require('../../../assets/images/done.png')}
          />
          <Text style={styles.downloadText}>Downloaded</Text>
          <Text
            style={[styles.downloadText, {fontSize: scale(12), marginTop: 5}]}>
            35 KB
          </Text>
        </View>
      </Overlay>
    </View>
  );
};

export default AllMediaScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  iconStyle: {
    width: '18@s',
    height: '18@s',
    alignSelf: 'center',
  },
  backContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: '5@s',
  },

  directionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    padding: 10,
  },
  downloadText: {
    fontWeight: '400',
    color: Colors.Neutral800,
    fontSize: '16@s',
  },
  divider: {
    bottom: '20@s',
    top: '20@s',
  },
  searchInputStyle: {
    backgroundColor: 'red',
    width: '300@s',
  },
  imageStyle: {
    width: '221@s',
    height: '228@s',
    alignSelf: 'center',
    marginTop: '70@s',
  },
  titleStyle: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginTop: '20@s',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomTextStyle: {
    marginBottom: '80@s',
    top: '5@s',
    color: Colors.Neutral700,
    fontWeight: '400',
    fontSize: '14@s',
  },
  buttonContainer: {
    backgroundColor: Colors.Neutral100,
    height: '36@s',
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
    height: '28@s',
    width: '65@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3@s',
  },

  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral50,
  },
  buttonStyle1: {
    // borderWidth: 2,
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    alignSelf: 'center',
  },
  buttonTextStyle1: {
    color: Colors.White,
    fontSize: '16@s',
    fontWeight: '600',
  },
  mainContainer: {
    height: '80@s',
    // marginTop: 10,
    paddingVertical: '10@s',
    backgroundColor: Colors.White,
    // paddingHorizontal: '5@s',
  },
  profileImageStyle: {
    width: '50@s',
    height: '50@s',
    borderRadius: '5@s',
  },

  nameTextStyle: {
    fontSize: '14@s',
    fontWeight: '500',
    color: Colors.Neutral900,
  },
  countStyle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral400,
    marginHorizontal: 2,
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
});
