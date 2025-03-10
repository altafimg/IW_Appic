import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp} from '../../../utility/responsive/ScreenResponsive';

// images
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import Question from '../../../assets/images/questions.png';
import plus from '../../../assets/images/plus.png';
import BottomCard from './BottomCard';

const DisclosureNoticeScreen = ({navigation, route}) => {
  // const {adText, setAdText} = route.params;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showBottomCard, setShowBottomCard] = useState(false);
  const [answers, setAnswers] = useState({});
  const [adText, setAdText] = useState('');
  const [data, setData] = useState([
    {id: '1', title: 'Nudity and adult content', status: false, question: true},
    {
      id: '2',
      title: 'Threats, violence, offensive behaviour',
      status: false,
      question: false,
    },
    {
      id: '3',
      title: 'Tobacco, eating or smoking tobacco',
      status: false,
      question: true,
    },
    {id: '4', title: 'Vaping and e-cigarettes', status: false, question: true},
    {id: '5', title: 'CBD products', status: false, question: true},
    {id: '6', title: 'Cannabis/Marijuana', status: false, question: true},
    {id: '7', title: 'Alcohol consumption  ', status: false, question: true},
    {
      id: '8',
      title: 'Gambling/Betting/Cryptocurrency',
      status: false,
      question: true,
    },
    {id: '9', title: 'Political Advertisement', status: false, question: true},
    {id: '10', title: 'Religious Views ', status: false, question: true},
    {id: '11', title: 'Profanity and humour ', status: false, question: true},
    {id: '12', title: 'Health care products', status: false, question: true},
    {
      id: '13',
      title: 'Unlicensed healthcare products',
      status: false,
      question: true,
    },
    {
      id: '14',
      title: 'This is a public services Ad',
      status: false,
      question: true,
    },
    {
      id: '15',
      title: 'Government Advertisement',
      status: false,
      question: true,
    },
  ]);

  // const toggleStatus = id => {
  //   setData(prevData =>
  //     prevData.map(item =>
  //       item.id === id ? {...item, status: true} : {...item, status: false},
  //     ),
  //   );
  // };

  const handleSave = () => {
    const selectedTitle = data?.find(item => item?.status === true)?.title;
    const isQuestionRequired = data?.find(item => item?.question === true);
    const selectedItem = data?.find(item => item?.status === true);
    setSelectedItem(selectedItem);
    if (selectedTitle) {
      if (selectedTitle === 'Political Advertisement') {
        const selectedItem = data?.find(item => item?.status === true);
        navigation.navigate('QuestionScreen', {
          selectedTitle,
          selectedItem,
          adText: adText,
          setAdText: setAdText,
          answers: answers,
        });
      } else {
        setShowBottomCard(true);
      }
    } else {
      Alert.alert('No Item Selected', 'Please select an item before saving.');
    }
  };

  const toggleStatus = id => {
    setData(prevData => {
      const updatedData = prevData.map(item =>
        item.id === id ? {...item, status: true} : {...item, status: false},
      );
      const selectedItem = updatedData?.find(item => item?.status === true);
      setSelectedItem(selectedItem);
      if (selectedItem && selectedItem?.title === 'Political Advertisement') {
        navigation.navigate('QuestionScreen', {
          selectedTitle: selectedItem?.title,
          selectedItem,
          adText: adText,
          setAdText: setAdText,
          answers: answers,
        });
        console.log('selectedItem===', selectedItem);
      } else {
        setShowBottomCard(true);
      }
      return updatedData;
    });
  };

  const handleSavePopup = id => {
    setShowBottomCard(!showBottomCard);
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? {...item, status: !item.status} : item,
      ),
    );
  };

  const handleContinue = () => {
    navigation.navigate('ReviewScreen', {
      adText: adText,
      setAdText: setAdText,
      answers: answers,
      selectedItem: selectedItem,
      selectedTitle: selectedItem?.title,
    });
  };

  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContainerSec}
        onPress={() => {
          toggleStatus(item.id);
        }}>
        <Image
          source={item.status ? checked : unChecked}
          style={styles.checkbox}
        />
        <Text style={styles.text}>{item.title}</Text>
        {item.title === 'Political Advertisement' && (
          <Image
            source={Question}
            style={{width: scale(15), height: scale(15)}}
          />
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          handleSavePopup(item.id);
        }}> */}
      <Image source={plus} style={{width: scale(15), height: scale(15)}} />
      {/* </TouchableOpacity> */}
    </View>
  );
  // const handleSave = () => {
  //   const selectedTitle = data.find(item => item.status === true)?.title;
  //   const isQuestionRequried = data.find(item => item.question === true);
  //   if (selectedTitle) {
  //     if (isQuestionRequried) {
  //       navigation.navigate('QuestionScreen', {
  //         selectedTitle,
  //         selectedItem,
  //         adText: adText,
  //         setAdText: setAdText,
  //         answers: answers,
  //       });
  //     } else {
  //       navigation.navigate('ReviewScreen', {
  //         adText: adText,
  //         setAdText: setAdText,
  //         answers: answers,
  //         selectedTitle: data,
  //       });
  //     }
  //   } else {
  //     Alert.alert('No Item Selected', 'Please select an item before saving.');
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow
        goBack={() => {
          navigation.goBack();
          setShowBottomCard(false);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>
          {AppLocalizedStrings.quickAdsHomescreen.titleText}
        </Text>
        <Text style={styles.addNote}>
          {AppLocalizedStrings.quickAdsHomescreen.add_note}
        </Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.buttonTopStyle}></View>
      </ScrollView>
      <PrimaryButton
        onPress={handleSave}
        title={AppLocalizedStrings.quickAdsHomescreen.save}
      />
      {showBottomCard && (
        <BottomCard
          adText={adText}
          selectedItemTitle={selectedItem?.title}
          setAdText={setAdText}
          showBottomCard={showBottomCard}
          handleContinue={handleContinue}
          setShowBottomCard={setShowBottomCard}
        />
      )}
    </SafeAreaView>
  );
};

export default DisclosureNoticeScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
    marginBottom: 15,
  },
  titleText: {
    width: '80%',
    fontWeight: '500',
    fontSize: '25@s',
    color: Colors.Neutral900,
    textAlign: 'left',
    marginBottom: hp(1),
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
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  itemContainerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: scale(24),
    height: scale(24),
    marginRight: 5,
  },
  text: {
    fontSize: 15,
    // flex:
    color: 'black',
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
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },
  buttonTopStyle: {
    marginTop: hp(5),
  },
});
