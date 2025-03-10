import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import SVG from '../../../assets/svg';
import SearchInputField from '../../textInput/SearchInputField';
import FilterPopup from '../../popups/FilterPopup';
import LocationPopup from '../../popups/LocationPopup';

const AvailableInfluencerComponent = props => {
  const navigation = useNavigation('');
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;
  const [filterArray, setFilterArray] = useState([]);
  const [locationArray, setLocationArray] = useState([]);
  const [mapArray, setMapArray] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);

  let selectedArray = [];

  const filterArrayList = ({item}) => {
    return (
      <View style={styles.selectBox}>
        <View style={styles.selectBoxSec}>
          <Text style={styles.selectText}>{item}</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <SVG.CloseCross
              color={Colors.Primary500}
              style={styles.filterIconStyleSec}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <EnterAppTopButtons
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        title1="Available"
        title2="Boost Profile"
      />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <SVG.FilterSec
              width={17}
              height={17}
              style={styles.filterIconStyle}
            />
            <Text style={styles.buttonTextStyle}>Filter</Text>
            {filterArray.length > 0 && <Text style={styles.dotStyle}>•</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLocationVisible(true)}
            activeOpacity={0.6}
            style={styles.buttonStyle}>
            <SVG.Location
              width={17}
              height={17}
              style={styles.filterIconStyle}
            />
            <Text style={styles.buttonTextStyle}>Location</Text>
            {locationArray.length > 0 && <Text style={styles.dotStyle}>•</Text>}
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.bottomContainer}>
          {filterArray?.length > 0 && (
            <FlatList
              data={filterArray}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={filterArrayList}
            />
          )}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setSearchVisible(true);
              }}>
              <SearchInputField editable={false} placeholder="Search" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('SavedScreen', {
                  selectedArray: selectedArray,
                });
              }}>
              <SVG.Save width={25} height={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FilterPopup
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        setVisible={setVisible}
        setFilterArray={setFilterArray}
        visible={visible}
      />
      <LocationPopup
        locationVisible={locationVisible}
        setLocationVisible={setLocationVisible}
      />
    </View>
  );
};

export default AvailableInfluencerComponent;

const styles = ScaledSheet.create({
  container: {
    // paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconStyle: {
    marginHorizontal: wp(1.5),
  },
  buttonTextStyle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '500',
  },
  dotStyle: {
    fontWeight: '700',
    fontSize: '20@s',
    color: 'red',
    top: -5,
  },
  divider: {
    borderColor: Colors.Neutral300,
    marginVertical: hp(1.5),
  },
  bottomContainer: {
    paddingHorizontal: wp(3),
  },
  selectBox: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    paddingHorizontal: '10@s',
    height: '30@s',
    borderRadius: '60@s',
    marginRight: '15@s',
  },
  selectBoxSec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontWeight: '400',
    color: Colors.Primary500,
    fontSize: '16@s',
    top: 3,
  },
  filterIconStyleSec: {
    marginBottom: hp(-1),
  },
  searchContainer: {
    marginTop: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '7@s',
  },
});
