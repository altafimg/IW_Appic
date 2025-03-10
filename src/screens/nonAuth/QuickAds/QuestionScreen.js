import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {hp} from '../../../utility/responsive/ScreenResponsive';
// images
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import BottomCard from './BottomCard';

const QuestionScreen = ({navigation, route}) => {
  const moadlOpen = route?.params?.moadlOpen;

  const value = route?.params?.value ? route?.params?.value : '';
  console.log('value', value);
  console.log('moadlOpen', moadlOpen);
  const [answers, setAnswers] = useState([]);
  const [showBottomCard, setShowBottomCard] = useState(true);
  {
    console.log('showBottomCard--------', showBottomCard);
  }
  const selectedTitle = route?.params?.selectedTitle || {};
  const selectedItem = route?.params?.selectedItem || {};
  const [adText, setAdText] = useState(value);

  console.log('selectedTitleselectedTitle', selectedTitle);
  console.log('selectedItemselectedItem', selectedItem);
  useEffect(() => {
    setShowBottomCard(moadlOpen);
  }, [moadlOpen]);

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

  const handleAnswer = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };
  const NavigateRevieScreen = () => {
    navigation.navigate('ReviewScreen', {
      adText: adText,
      setAdText: setAdText,
      answers: answers,
      selectedTitle: selectedTitle,
      selectedItem: selectedItem,
      isFromSpecialFlow: true,
      // setShowBottomCard: setShowBottomCard,
      // showBottomCard: showBottomCard,
    });
    // setShowBottomCard(false);
  };
  const handleContinue = () => {
    const length = Object.keys(answers).length;
    if (length != 3) {
      Alert.alert('Select All Answer ');
    } else {
      setShowBottomCard(true);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.Question}>{item.number}</Text>
      <Text style={styles.text}>{item.title}</Text>
      <View style={styles.CheckBoxContainer}>
        <TouchableOpacity
          style={{flexDirection: 'row', width: '30%'}}
          onPress={() => handleAnswer(item.id, 'Yes')}>
          <Image
            source={answers[item.id] === 'Yes' ? checked : unChecked}
            style={styles.checkbox}
          />
          <Text style={styles.text}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', width: '30%'}}
          onPress={() => handleAnswer(item.id, 'No')}>
          <Image
            source={answers[item.id] === 'No' ? checked : unChecked}
            style={styles.checkbox}
          />
          <Text style={styles.text}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <BackArrow goBack={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 40}}>
        <Text style={styles.titleText}>
          {AppLocalizedStrings.quickAdsHomescreen.Questions}
        </Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={answers}
        />
      </ScrollView>
      <View style={styles.buttonTopStyle}>
        <PrimaryButton
          onPress={handleContinue}
          title={AppLocalizedStrings.quickAdsHomescreen.save}
        />
      </View>
      {showBottomCard && (
        <BottomCard
          adText={adText}
          selectedItemTitle={selectedTitle}
          setAdText={setAdText}
          showBottomCard={showBottomCard}
          handleContinue={NavigateRevieScreen}
          setShowBottomCard={setShowBottomCard}
        />
      )}
    </SafeAreaView>
  );
};

export default QuestionScreen;

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
    marginVertical: 5,
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
    marginTop: hp(3),
    position: 'absolute',
    bottom: hp(5),
    alignSelf: 'center',
  },
});
