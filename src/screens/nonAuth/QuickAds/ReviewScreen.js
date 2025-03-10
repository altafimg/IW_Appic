import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp} from '../../../utility/responsive/ScreenResponsive';

// images
import bin from '../../../assets/images/bin.png';
import Edit from '../../../assets/images/Edit.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewScreen = ({navigation, route}) => {
  const {
    adText,
    setAdText,
    isFromSpecialFlow,
    setShowBottomCard,
    showBottomCard,
  } = route?.params || {};
  const answers = route?.params?.answers || {};
  const selectedTitle = route?.params?.selectedTitle || {};
  const selectedItem = route?.params?.selectedItem || {};
  // console.log('answers ----', answers);
  // console.log('selectedItem ----', selectedItem);
  // console.log('selectedTitle ----', selectedTitle);
  const length = Object.keys(answers)?.length;

  const data = [
    {
      id: '1',
      number: 'Q1',
      title:
        'Are you affiliated with the political person or party that this Advertisement is about?',
    },
    {
      id: '2',
      number: 'Q2',
      title:
        'Do you have consent from the political person, party or government to organise this Ad?',
    },
    {
      id: '3',
      number: 'Q3',
      title: 'Have you received any compensation for creating this campaign?',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.Question}>{item.number}</Text>
      <Text style={styles.text}>{item.title}</Text>
      <View style={{flexDirection: 'row', marginTop: hp(1)}}>
        <Text style={{color: 'black'}}>Advertiser responded:</Text>
        <Text style={{color: '#1DA1F2', marginLeft: hp(1)}}>
          {answers[item.id]}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate('QuestionScreen', {
            moadlOpen: false,
            value: adText,
            selectedItem: selectedItem,
            selectedTitle: selectedTitle,
          })
        }>
        <Text style={{color: '#1DA1F2', fontSize: 17}}>Change answer</Text>
      </TouchableOpacity>
    </View>
  );
  const openNewEditModal = () => {
    navigation.navigate('QuestionScreen', {
      moadlOpen: true,
      value: adText,
      selectedItem: selectedItem,
      selectedTitle: selectedTitle,
    });
  };

  const handleSave = async () => {
    try {
      const savedDisclosureNotice = await AsyncStorage.getItem(
        'disclosureNoticeData',
      );
      let disclosureNoticeArray = [];
      if (savedDisclosureNotice) {
        disclosureNoticeArray = JSON.parse(savedDisclosureNotice);
      }
      const newEntry = {
        data: data,
        answers: answers,
        selectedItem: selectedItem,
        selectedTitle: selectedTitle,
      };
      const isDuplicate = disclosureNoticeArray.some(
        item => JSON.stringify(item) === JSON.stringify(newEntry), // Simple check for duplication
      );
      if (!isDuplicate) {
        disclosureNoticeArray.push(newEntry);
        await AsyncStorage.setItem(
          'disclosureNoticeData',
          JSON.stringify(disclosureNoticeArray),
        );
        navigation.navigate('CreateNewScreen', {
          disclosureNoticeData: disclosureNoticeArray,
        });
      } else {
        console.log('Duplicate entry detected. Not adding to storage.');
      }
    } catch (error) {
      console.error('Error saving disclosure notice:', error);
    }
    // const saveddisclosureNotice = await AsyncStorage.getItem(
    //   'disclosureNoticeData',
    // );
    // const disclosureNoticeData = [
    //   {
    //     data: data,
    //     answers: answers,
    //     selectedItem: selectedItem,
    //     selectedTitle: selectedTitle,
    //   },
    // ];
    // navigation.navigate('CreateNewScreen', {
    //   disclosureNoticeData: disclosureNoticeData,
    // });
    // await AsyncStorage.setItem(
    //   'disclosureNoticeData',
    //   JSON.stringify(disclosureNoticeData),
    // );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <BackArrow goBack={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 40}}>
        <Text style={styles.titleText}>
          {AppLocalizedStrings.quickAdsHomescreen.Review}
        </Text>
        <Text style={{color: 'black'}}>{selectedTitle}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
          <Text style={{color: 'black'}}>
            {AppLocalizedStrings.quickAdsHomescreen.NoteAdded}
          </Text>
          <TouchableOpacity onPress={() => openNewEditModal()}>
            <Image
              style={{width: hp(4), height: hp(4), marginLeft: 110}}
              source={Edit}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{width: hp(4), height: hp(4)}} source={bin} />
          </TouchableOpacity>
        </View>
        {adText ? <Text style={styles.textInput}>{adText}</Text> : ''}
        {length == 3 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={answers}
          />
        ) : null}
        <View style={styles.buttonTopStyle}>
          <PrimaryButton
            onPress={handleSave}
            title={AppLocalizedStrings.quickAdsHomescreen.save}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    alignSelf: 'center',
    width: '100%',
    maxHeight: hp(20),
    // height: hp(20),
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 10,
    fontSize: '16@s',
    lineHeight: 20,
    marginTop: 5,
  },
  titleText: {
    width: '80%',
    fontWeight: '500',
    fontSize: '25@s',
    color: Colors.Neutral900,
    textAlign: 'left',
    marginBottom: hp(2),
    marginTop: hp(1),
  },

  addNote: {
    fontWeight: '400',
    fontSize: '13@s',
    color: Colors.Neutral400,
    textAlign: 'left',
    marginBottom: hp(2),
  },
  itemContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: scale(24),
    height: scale(24),
    marginRight: 5,
  },
  Question: {
    fontSize: 15,
    flex: 1,
    color: '#1DA1F2',
  },

  text: {
    fontSize: 15,
    flex: 1,
    color: 'black',
    marginVertical: 5,
  },

  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
  },
  btn: {
    marginTop: hp(2),
    width: hp(19),
    height: hp(6),
    borderRadius: 5,
    borderColor: '#1DA1F2',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '200@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  CheckBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },

  buttonTopStyle: {
    marginVertical: hp(3),
    // position: 'absolute',
    // bottom: hp(5),
    alignSelf: 'center',
  },
});
