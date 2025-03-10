import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import {Divider, Overlay} from 'react-native-elements';
import Colors from '../../theme/Colors';
import SearchInputField from '../textInput/SearchInputField';
import {hp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';
import {useDispatch, useSelector} from 'react-redux';
import QuickAdsCardRenderItem from '../nonAuth/QuickAds/QuickAdsCardRenderItem';
import {saveQuickAdsAction} from '../../redux/actions/saveQuickAdsAction';

// image
import instagram from '../../assets/images/instagram.png';

const SearchPopup = ({sliderValue, setSliderValue, ...props}) => {
  const setSearchVisible = props.setSearchVisible;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const recommendedData = useSelector(
    state => state.availableQuickAdsReducer.data?.data?.data,
  );
  const newRecommendedData = recommendedData || [];
  const filterData = newRecommendedData.filter(item =>
    item.quick_ads_title.toUpperCase().includes(search.toUpperCase()),
  );

  const handleSaveItem = i => {
    dispatch(saveQuickAdsAction(i));
  };
  const renderItem = ({item}) => {
    return (
      <QuickAdsCardRenderItem
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        item={item}
        handleSaveItem={handleSaveItem}
      />
    );
  };

  return (
    <Overlay
      visible={props.searchVisible}
      animationType="slide"
      overlayStyle={{
        width: Dimensions.get('window').width,
        flex: 1,
        paddingTop: hp(3),
      }}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              setSearchVisible(false);
            }}>
            {/* <SVG.Cross width={20} height={20} /> */}
            <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.filterTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.search}
          </Text>
          <Text style={styles.ResetTextStyle}>...</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={{marginTop: 15}}>
          <SearchInputField
            value={search}
            onChangeText={t => setSearch(t)}
            placeholder="Search QuickAds"
          />
          <View style={{marginTop: hp(1.5)}}>
            {filterData.length > 0 && (
              <Text style={styles.recommendTextStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Recommended}
              </Text>
            )}
            {filterData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: scale(270)}}
                data={filterData}
                renderItem={renderItem}
                key={item => item.id}
              />
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.notFoundText}>No results found</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Overlay>
  );
};

export default SearchPopup;

const styles = ScaledSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  filterTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.Neutral800,
  },
  ResetTextStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  notFoundText: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Colors.Neutral300,
  },
  recommendTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
