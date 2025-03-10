import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider, Slider} from 'react-native-elements';
import Colors from '../../../theme/Colors';

import close from '../../../assets/images/close.png';
import thumb from '../../../assets/images/thumb.png';
import {AppLocalizedStrings} from '../../../localization/Localization';
const FilterComponent = ({setVisible, setFilterArray}, props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const categories = [
    'All',
    'Beauty',
    'Electronics',
    'Cars',
    'Gaming',
    'Fitness',
    'Sports',
    'Food',
    'Film & TV',
    'Music',
    'HealthCare',
  ];
  const vibes = [
    'All',
    'Fun & humorous',
    'Cool',
    'Respectful to cause',
    'Calm',
    'Energetic & loud',
    'Serious or urgent',
    'Make or save money',
    'Naughty',
  ];
  const languages = [
    'All',
    'English',
    'Spanish',
    'Hindi',
    'Bengali',
    'Russian',
    'Indonesian',
  ];
  const platforms = [
    'All',
    'TikTok',
    'Youtube',
    'Twitch',
    'Instagram',
    'Twitter',
    'Snapchat',
    'Linkedin',
    'Facebook',
  ];

  const handleSelect = category => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      setSelectedCategories(prevSelected =>
        prevSelected.filter(selected => selected !== category),
      );
    } else {
      setSelectedCategories(prevSelected => [...prevSelected, category]);
    }
  };
  const handleSelect1 = vibes => {
    const isSelected = selectedVibes.includes(vibes);
    if (isSelected) {
      setSelectedVibes(prevSelected =>
        prevSelected.filter(selected => selected !== vibes),
      );
    } else {
      setSelectedVibes(prevSelected => [...prevSelected, vibes]);
    }
  };
  const handleSelect2 = languages => {
    const isSelected = selectedLanguages.includes(languages);
    if (isSelected) {
      setSelectedLanguages(prevSelected =>
        prevSelected.filter(selected => selected !== languages),
      );
    } else {
      setSelectedLanguages(prevSelected => [...prevSelected, languages]);
    }
  };
  const handleSelect3 = platforms => {
    const isSelected = selectedPlatforms.includes(platforms);
    if (isSelected) {
      setSelectedPlatforms(prevSelected =>
        prevSelected.filter(selected => selected !== platforms),
      );
    } else {
      setSelectedPlatforms(prevSelected => [...prevSelected, platforms]);
    }
  };

  const renderCategory = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          style={[
            styles.selectBox,
            {
              backgroundColor: selectedCategories.includes(item)
                ? Colors.Primary500
                : Colors.White,
              borderColor: selectedCategories.includes(item)
                ? Colors.Primary500
                : Colors.Neutral400,
            },
          ]}>
          <Text
            style={[
              styles.selectText,
              {
                color: selectedCategories.includes(item)
                  ? Colors.White
                  : Colors.Neutral700,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderVibes = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleSelect1(item)}
          style={[
            styles.selectBox,
            {
              backgroundColor: selectedVibes.includes(item)
                ? Colors.Primary500
                : Colors.White,
              borderColor: selectedVibes.includes(item)
                ? Colors.Primary500
                : Colors.Neutral400,
            },
          ]}>
          <Text
            style={[
              styles.selectText,
              {
                color: selectedVibes.includes(item)
                  ? Colors.White
                  : Colors.Neutral700,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderLanguages = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleSelect2(item)}
          style={[
            styles.selectBox,
            {
              backgroundColor: selectedLanguages.includes(item)
                ? Colors.Primary500
                : Colors.White,
              borderColor: selectedLanguages.includes(item)
                ? Colors.Primary500
                : Colors.Neutral400,
            },
          ]}>
          <Text
            style={[
              styles.selectText,
              {
                color: selectedLanguages.includes(item)
                  ? Colors.White
                  : Colors.Neutral700,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderPlatforms = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleSelect3(item)}
          style={[
            styles.selectBox,
            {
              backgroundColor: selectedPlatforms.includes(item)
                ? Colors.Primary500
                : Colors.White,
              borderColor: selectedPlatforms.includes(item)
                ? Colors.Primary500
                : Colors.Neutral400,
            },
          ]}>
          <Text
            style={[
              styles.selectText,
              {
                color: selectedPlatforms.includes(item)
                  ? Colors.White
                  : Colors.Neutral700,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}>
              <Image source={close} style={styles.imageStyle} />
            </TouchableOpacity>
            <Text style={styles.filterTextStyle}>
              {AppLocalizedStrings.filterComponent.filter}
            </Text>
            <Text
              onPress={() => {
                setSelectedCategories([]);
                setSelectedLanguages([]);
                setSelectedPlatforms([]);
                setSelectedVibes([]);
              }}
              style={styles.ResetTextStyle}>
              Reset
            </Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.filterComponent.category}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            data={categories}
            renderItem={renderCategory}
          />
          <Divider style={[styles.divider, {width: '100%'}]} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.filterComponent.vibe}
          </Text>
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            data={vibes}
            renderItem={renderVibes}
          />
          <Divider style={[styles.divider, {width: '100%'}]} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.filterComponent.language}
          </Text>
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            data={languages}
            renderItem={renderLanguages}
          />
          <Divider style={[styles.divider, {width: '100%'}]} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.filterComponent.platform}
          </Text>
          <FlatList
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            horizontal
            data={platforms}
            renderItem={renderPlatforms}
          />
          <Divider style={[styles.divider, {width: '100%'}]} />
          <Text style={styles.titleStyle}>
            {AppLocalizedStrings.filterComponent.num}
          </Text>
          <View>
            <Slider
              style={{height: scale(40), marginTop: 20}}
              allowTouchTrack={true}
              thumbTouchSize={1}
              thumbStyle={{
                width: scale(20),
                height: scale(20),
              }}
              thumbProps={{
                children: (
                  <Image
                    source={thumb}
                    style={{
                      width: scale(30),
                      height: scale(30),
                      alignSelf: 'center',
                      justifyContent: 'center',
                      bottom: 5,
                    }}
                  />
                ),
              }}
              thumbTintColor={Colors.Primary500}
              maximumTrackTintColor={Colors.Primary500}
              minimumTrackTintColor={Colors.Primary500}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  color: Colors.Neutral700,
                  fontSize: scale(14),
                }}>
                1K
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: Colors.Neutral700,
                  fontSize: scale(14),
                }}>
                1M
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  color: Colors.Neutral700,
                  fontSize: scale(14),
                }}>
                10M
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                let array = selectedCategories
                  .concat(selectedLanguages)
                  .concat(selectedVibes)
                  .concat(selectedPlatforms);
                setVisible(false);
                setFilterArray(array);
              }}
              style={styles.ButtonStyle}>
              <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
                {AppLocalizedStrings.filterComponent.show}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FilterComponent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    width: '24@s',
    height: '24@s',
  },
  filterTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral800,
  },
  ResetTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Neutral600,
  },
  divider: {
    marginTop: '15@s',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },
  titleStyle: {
    fontWeight: '600',
    color: Colors.Neutral900,
    fontSize: '16@s',
    marginTop: '10@s',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: Colors.Neutral400,
    paddingHorizontal: '10@s',
    height: '30@s',
    borderRadius: '60@s',
    // marginTop: '10@s',
  },
  selectText: {
    fontWeight: '400',
    color: Colors.Neutral700,
    fontSize: '16@s',
    top: 3,
  },
  flatListContainer: {
    gap: '13@s',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '15@s',
  },
  buttonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
  },
  ButtonStyle: {
    marginTop: '40@s',
    height: '50@s',
    backgroundColor: Colors.Primary500,
    // marginTop: '20@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5@s',
  },
});
