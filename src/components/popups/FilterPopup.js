import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Divider, Slider, Overlay} from 'react-native-elements';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';
import {useSelector, useDispatch} from 'react-redux';
import {setFilter} from '../../redux/actions/filterAction';
import upArrow from '../../assets/images/upArrow.png';
import squreChecked from '../../assets/images/squreChecked.png';
import squreUnchecked from '../../assets/images/squreUnchecked.png';

const FilterPopup = ({
  sliderValue,
  setSliderValue,
  setVisible,
  setFilterArray,
  visible,
}) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSectionFollowers, setExpandedSectionFollowers] = useState(
    expandedSectionFollowers,
  );

  const toggleSection = section => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleSectionFollowers = () => {
    setExpandedSectionFollowers(!expandedSectionFollowers);
  };

  const toggleCategory = category => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category],
    );
  };

  const userData = useSelector(
    state => state.availableQuickAdsReducer.data?.data?.data || [],
  );

  const categories = [
    ...new Set(userData.flatMap(item => item.category || [])),
  ].filter(category => category.length > 0);

  const vibes = [...new Set(userData.flatMap(item => item.mood || []))].filter(
    vibe => vibe.length > 0,
  );

  const languages = [
    ...new Set(userData.flatMap(item => item.language || [])),
  ].filter(language => language.length > 0);

  const platforms = [
    ...new Set(
      userData.flatMap(
        item => item.platform.map(platform => platform.platform_name) || [],
      ),
    ),
  ].filter(platform => platform?.length > 0);

  const formatValue = value => {
    if (value < 1000) {
      return `${value}`;
    } else if (value < 1000000) {
      return `${value / 1000}K`;
    } else {
      return `${value / 1000000}M`;
    }
  };

  const handleShowResults = () => {
    const array = [
      ...selectedCategories.map(category => ({
        type: 'categories',
        value: category,
      })),
      ...selectedLanguages.map(language => ({
        type: 'language',
        value: language,
      })),
      ...selectedVibes.map(vibe => ({type: 'vibe', value: vibe})),
      ...selectedPlatforms.map(platform => ({
        type: 'platform',
        value: platform,
      })),
    ];

    dispatch(setFilter(array));
    setFilterArray(array);
    setVisible(false);
  };

  const renderDropdown = (title, data) => (
    <View>
      <TouchableOpacity
        onPress={() => toggleSection(title)}
        style={styles.cardView}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Image
          source={upArrow}
          style={[
            styles.image,
            {
              transform: [
                {rotate: expandedSection === title ? '0deg' : '180deg'},
              ],
            },
          ]}
        />
      </TouchableOpacity>
      {expandedSection === title && (
        <View style={styles.dropdownContent}>
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => toggleCategory(item)}>
                <Image
                  source={
                    selectedCategories.includes(item)
                      ? squreChecked
                      : squreUnchecked
                  }
                  style={styles.checkboxImage}
                />
                <Text style={styles.checkboxText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <Divider style={styles.divider} />
    </View>
  );

  return (
    <Overlay
      visible={visible}
      animationType="slide"
      overlayStyle={{
        width: Dimensions.get('screen').width,
        height: '100%',
        padding: 0,
      }}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}>
              <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.filterTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Filter}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategories([]);
                setSelectedLanguages([]);
                setSelectedPlatforms([]);
                setSelectedVibes([]);
                setTimeout(() => {
                  handleShowResults();
                }, 1000);
              }}>
              <Text style={styles.ResetTextStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Reset}
              </Text>
            </TouchableOpacity>
          </View>
          <Divider style={styles.divider} />

          <View style={{paddingHorizontal: 10, paddingBottom: 20}}>
            {renderDropdown('Category', categories)}
            {renderDropdown('Vibe', vibes)}
            {renderDropdown('Language', languages)}
            {renderDropdown('Platform', platforms)}
          </View>

          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            <TouchableOpacity
              onPress={() => toggleSectionFollowers(true)}
              style={styles.cardView}>
              <Text style={styles.cardTitle}>Followers</Text>
              <Image
                source={upArrow}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        rotate:
                          expandedSectionFollowers === true ? '0deg' : '180deg',
                      },
                    ],
                  },
                ]}
              />
            </TouchableOpacity>
            {expandedSectionFollowers === true && (
              <View>
                <Slider
                  style={{width: '90%', height: 40, alignSelf: 'center'}}
                  minimumValue={1000}
                  maximumValue={10000000}
                  minimumTrackTintColor={Colors.Primary500}
                  maximumTrackTintColor={Colors.Neutral700}
                  thumbTintColor={Colors.Primary500}
                  step={100}
                  thumbStyle={{width: 20, height: 20}}
                  value={sliderValue}
                  onValueChange={value => setSliderValue(value)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <Text style={{fontWeight: '500', color: Colors.Neutral700}}>
                    {formatValue(1000)}
                  </Text>
                  <Text style={{fontWeight: '500', color: Colors.Neutral700}}>
                    {formatValue(1000000)}
                  </Text>
                  <Text style={{fontWeight: '500', color: Colors.Neutral700}}>
                    {formatValue(10000000)}
                  </Text>
                </View>
              </View>
            )}
            <Divider style={styles.divider} />
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleShowResults}
          style={styles.ButtonStyle}>
          <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
            {AppLocalizedStrings.quickAdsHomescreen.Show_Results}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Overlay>
  );
};

export default FilterPopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '7@s',
    marginHorizontal: '10@s',
    top: 5,
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
  buttonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingTop: hp(2),
  },
  cardTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
  },
  image: {
    width: 20,
    height: 20,
  },
  dropdownContent: {
    backgroundColor: Colors.White,
    paddingVertical: '10@s',
    paddingHorizontal: '10@s',
    borderRadius: '5@s',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5@s',
    backgroundColor: Colors.White,
  },
  checkboxText: {
    fontSize: '14@s',
    color: Colors.Neutral800,
    marginLeft: '10@s',
    paddingVertical: hp(0.5),
  },
  checkboxImage: {
    width: 24,
    height: 24,
  },
  ButtonStyle: {
    marginTop: '40@s',
    height: '50@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5@s',
    marginHorizontal: '10@s',
  },
});
