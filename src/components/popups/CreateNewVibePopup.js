import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {CheckBox, Divider, Overlay} from 'react-native-elements';
import {useSelector} from 'react-redux';

// image
import checked from '../../assets/images/checked.png';
import unChecked from '../../assets/images/unChecked.png';
import SearchInputField from '../textInput/SearchInputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewVibePopup = ({
  vibeVisible,
  setVibeVisible,
  vibeType,
  setVibeType,
  language,
  setLanguage,
  mood,
  setMood,
  swear,
  setSwear,
}) => {
  const [search, setSearch] = useState('');

  const [allLanguages, setAllLanguages] = useState([]);

  // const allLanguages = langData || [];
  // const filterData = allLanguages?.filter(item =>
  //   item?.MainLanguage?.toUpperCase()?.includes(search?.toUpperCase()),
  // );

  useEffect(() => {
    const fetchLanguagesFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('allLanguagesData');
        const parsedData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setAllLanguages(parsedData);
      } catch (error) {
        console.error(
          'Error fetching languages data from AsyncStorage:',
          error,
        );
      }
    };

    fetchLanguagesFromAsyncStorage();
  }, []);

  const newFilterData = allLanguages?.slice(1);
  const newFilterDataArr = newFilterData || [];

  const allMoods = [
    {id: 1, name: 'Daring - bold and courageous'},
    {id: 2, name: 'Exploratory - eager to explore and discover'},
    {id: 3, name: 'Reassuring - offering comfort and confidence'},
    {id: 4, name: 'Supportive - providing encouragement and support'},
    {id: 5, name: 'Conversational - informal and natural in tone'},
    {id: 6, name: 'Relaxed - free from tension or anxiety'},
    {id: 7, name: 'Elegant - graceful and stylish in appearance'},
    {id: 8, name: 'Fashionable - conforming to the current style'},
    {id: 9, name: 'Imaginative - full of creativity and imagination'},
    {
      id: 10,
      name: 'Inventive - having the ability to create or design new things',
    },
    {id: 11, name: 'Emotional - arousing or characterised by intense feeling'},
    {id: 12, name: 'Gripping - deeply engaging or holding attention'},
    {id: 13, name: 'Green - environmentally friendly'},
    {
      id: 14,
      name: 'Resourceful - able to find quick and clever ways to overcome difficulties',
    },
    {id: 15, name: 'Lively - full of life and energy'},
    {id: 16, name: 'Vibrant - full of energy and enthusiasm'},
    {id: 17, name: 'Approachable - easy to talk to and friendly'},
    {id: 18, name: 'Welcoming - friendly and inviting'},
    {id: 19, name: 'Amusing - causing laughter and providing entertainment'},
    {id: 20, name: 'Whimsical - playfully quaint or fanciful'},
    {id: 21, name: 'Cheerful - noticeably happy and optimistic'},
    {
      id: 22,
      name: 'Joyful - feeling, expressing, or causing great pleasure and happiness',
    },
    {id: 23, name: 'Enlightening - giving greater knowledge and understanding'},
    {id: 24, name: 'Instructive - useful and informative'},
    {id: 25, name: 'Cutting-edge - highly advanced and innovative'},
    {
      id: 26,
      name: 'Visionary - thinking about or planning the future with imagination or wisdom',
    },
    {id: 27, name: 'Driven - highly motivated and determined to succeed'},
    {id: 28, name: 'Encouraging - giving support, confidence, or hope'},
    {id: 29, name: 'Enigmatic - mysterious and difficult to understand'},
    {id: 30, name: 'Intriguing - arousing one curiosity or interest'},
    {
      id: 31,
      name: 'Reminiscent - tending to remind one of something in the past',
    },
    {
      id: 32,
      name: 'Sentimental - of or prompted by feelings of tenderness, sadness, or nostalgia',
    },
    {id: 33, name: 'Serene - calm, peaceful, and untroubled'},
    {id: 34, name: 'Tranquil - free from disturbance; calm'},
    {
      id: 35,
      name: 'Affectionate - showing, indicating, or characterised by affection or love',
    },
    {
      id: 36,
      name: 'Passionate - showing or caused by strong feelings or a strong belief',
    },
    {id: 37, name: 'Melancholic - feeling or expressing pensive sadness'},
    {id: 38, name: 'Thoughtful - absorbed in or involving thought'},
    {
      id: 39,
      name: 'Authoritative - able to be trusted as being accurate or true',
    },
    {id: 40, name: 'Strategic - planned to achieve a specific goal'},
    {
      id: 41,
      name: 'Glamorous - having glamour; attractive in an exciting and special way',
    },
    {id: 42, name: 'Opulent - ostentatiously rich and luxurious or lavish'},
    {id: 43, name: 'Dependable - trustworthy and reliable'},
    {id: 44, name: 'Honest - free of deceit and untruthfulness; sincere'},
    {id: 45, name: 'Sporty - active and energetic'},
    {
      id: 46,
      name: 'Youthful - having the qualities of youth; fresh and vigorous',
    },
  ];
  const swearingData = [
    {id: 1, name: 'Not allowed'},
    {id: 2, name: 'Allowed'},
    {id: 3, name: 'Only if necessary.'},
  ];

  const handleLanguageToggle = selectedLanguage => {
    const isSelected = language?.includes(selectedLanguage);
    if (isSelected) {
      // If language is already selected, remove it
      setLanguage(language?.filter(lang => lang !== selectedLanguage));
    } else {
      // If language is not selected, add it
      setLanguage([...language, selectedLanguage]);
    }
  };

  return (
    <Overlay
      onRequestClose={() => setVibeVisible(false)}
      onBackdropPress={() => setVibeVisible(false)}
      isVisible={vibeVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View style={{padding: 10, height: '100%'}}>
        {vibeType == 'language' && (
          <View style={{marginBottom: hp(2)}}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setVibeVisible(false)}>
                <SVG.Cross width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.quickAdsHomescreen.Language}
              </Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
        )}
        {vibeType == 'mood' && (
          <View style={{marginBottom: hp(2)}}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setVibeVisible(false)}>
                <SVG.Cross width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Mood</Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
        )}
        {vibeType == 'Swearing' && (
          <View style={{marginBottom: hp(2)}}>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setVibeVisible(false)}>
                <SVG.Cross width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Swearing</Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
        )}

        <ScrollView
          scrollEnabled={vibeType == 'Swearing' ? false : true}
          // showsVerticalScrollIndicator={false}
          style={{
            height: vibeType == 'Swearing' ? scale(170) : scale(410),
          }}>
          {/* <SearchInputField
            placeholder={AppLocalizedStrings.quickAdsHomescreen.search}
            value={search}
            onChangeText={t => setSearch(t)}
          /> */}
          {/* {vibeType == 'language' &&
            newFilterDataArr?.length !== 0 &&
            [
              ...new Map(
                newFilterDataArr.map(item => [item.MainLanguage, item]),
              ).values(),
            ]?.map((item, index) => {
              return (
                <View key={item.id || index} style={{flexDirection: 'row'}}>
                  <CheckBox
                    containerStyle={styles.CheckBoxContainer}
                    wrapperStyle={{
                      right: 10,
                    }}
                    checkedIcon={
                      <Image
                        source={
                          language == item?.MainLanguage ? checked : unChecked
                        }
                        style={{width: scale(24), height: scale(24)}}
                      />
                    }
                    checked={language}
                    onPress={() => {
                      setLanguage(item?.MainLanguage);
                    }}
                    title={item?.MainLanguage}
                  />
                </View>
              );
            })} */}
          {vibeType == 'language' &&
            newFilterDataArr?.length !== 0 &&
            [
              ...new Map(
                newFilterDataArr
                  .sort((a, b) => a.MainLanguage.localeCompare(b.MainLanguage)) // Sorting languages alphabetically
                  .map(item => [item.MainLanguage, item]),
              ).values(),
            ]?.map((item, index) => {
              return (
                <>
                  <View key={item.id || index} style={{flexDirection: 'row'}}>
                    <CheckBox
                      containerStyle={styles.CheckBoxContainer}
                      wrapperStyle={{
                        right: 10,
                      }}
                      checkedIcon={
                        <Image
                          source={
                            language == item?.MainLanguage ? checked : unChecked
                          }
                          style={{width: scale(24), height: scale(24)}}
                        />
                      }
                      checked={language}
                      onPress={() => {
                        setLanguage(item?.MainLanguage);
                      }}
                      title={item?.MainLanguage}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </>
              );
            })}

          {vibeType == 'mood' &&
            allMoods?.length !== 0 &&
            allMoods?.map((item, index) => {
              return (
                <>
                  <View
                    key={item.id || index}
                    style={{
                      flexDirection: 'row',
                    }}>
                    <CheckBox
                      containerStyle={styles.CheckBoxContainer}
                      wrapperStyle={{
                        right: 10,
                        height: scale(32),
                      }}
                      checkedIcon={
                        <Image
                          source={mood == item.name ? checked : unChecked}
                          style={{width: scale(24), height: scale(24)}}
                        />
                      }
                      checked={mood}
                      onPress={() => {
                        setMood(item.name);
                      }}
                      title={item.name}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </>
              );
            })}
          {vibeType == 'Swearing' && (
            <Text style={styles.overlayTextStyle}>
              Do you allow swearing in your ad?
            </Text>
          )}
          {vibeType == 'Swearing' &&
            swearingData?.length !== 0 &&
            swearingData?.map((item, index) => {
              return (
                <>
                  <View key={item.id || index} style={{flexDirection: 'row'}}>
                    <CheckBox
                      containerStyle={styles.CheckBoxContainer}
                      wrapperStyle={{
                        right: 10,
                      }}
                      checkedIcon={
                        <Image
                          source={swear == item.name ? checked : unChecked}
                          style={{width: scale(24), height: scale(24)}}
                        />
                      }
                      checked={'Not Allowed'}
                      onPress={() => {
                        setSwear(item.name);
                      }}
                      title={item.name}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </>
              );
            })}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            setSearch('');
            setVibeVisible(false);
          }}
          activeOpacity={0.6}
          style={[
            styles.buttonStyle,
            {marginTop: vibeType == 'Swearing' ? scale(30) : scale(50)},
          ]}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Save}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CreateNewVibePopup;

const styles = ScaledSheet.create({
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    height: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
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
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
    marginBottom: '10@s',
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    // height: '35@s',
    borderWidth: 0,
  },
  overlayTextStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Neutral800,
    marginTop: '20@s',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
