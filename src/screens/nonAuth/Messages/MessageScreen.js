import React, {useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import SearchInputField from '../../../components/textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';
import JobMessagesComponent from '../../../components/nonAuth/Message/JobMessagesComponent';
import QuickChatsComponent from '../../../components/nonAuth/Message/QuickChatsComponent';
import TranslationSettingsPopup from '../../../components/popups/TranslationSettingsPopup';
import translate from '../../../assets/images/translate.png';
import EnterAppTopButtons from '../../../components/buttons/EnterAppTopButtons';

const MessageScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [visiable, setVisiable] = useState(false);
  const [selectedButton, setSelectedButton] = useState(0);

  const HandleButtonClick = () => {
    if (selectedButton === 0) {
      return (
        <JobMessagesComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          search={search}
        />
      );
    } else {
      return (
        <QuickChatsComponent
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          search={search}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.directionStyle}>
        <BackArrow goBack={() => navigation.goBack()} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setVisiable(true);
          }}>
          <Image source={translate} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: scale(10)}}>
        <Header style={{height: scale(50)}} headerTitle="Messages" />
        <View style={styles.searchView}>
          <SearchInputField
            value={search}
            onChangeText={t => {
              setSearch(t);
            }}
            placeholder={AppLocalizedStrings.MessageingScreen.search}
          />
        </View>
      </View>
      <EnterAppTopButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        title1={AppLocalizedStrings.MessageingScreen.Job_Messages}
        title2={AppLocalizedStrings.MessageingScreen.Quick_Chats}
      />
      <HandleButtonClick />
      <TranslationSettingsPopup visiable={visiable} setVisiable={setVisiable} />
    </View>
  );
};

export default MessageScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 10,
  },
  searchView: {
    marginTop: hp(-5.7),
    marginBottom: hp(1.5),
  },
});
