import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  LogBox,
  ScrollView,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Divider, Tooltip} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import SearchInputField from '../../textInput/SearchInputField';
import LocationPopup from '../../popups/LocationPopup';
import SearchPopup from '../../popups/SearchPopup';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVG from '../../../assets/svg';
import PrimaryButton from '../../buttons/PrimaryButton';
import FilterPopup from '../../popups/FilterPopup';
import LimitReachedPopup from '../../popups/LimitReachedPopup';
import QuickAdsCardRenderItem from '../QuickAds/QuickAdsCardRenderItem';
import {getSavedQuickAdsApiAction} from '../../../redux/actions/getSavedQuickAdsApiAction';
import AvailableSkeleton from '../../skeleton/AvailableSkeleton';
import {getJobsByApplicantIdAction} from '../../../redux/actions/getJobsByApplicantIdAction';
import {setFilter, clearFilter} from '../../../redux/actions/filterAction';

const AvailableQuickAdsComponent = props => {
  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);
  const token = useSelector(state => state.loginReducer?.token);
  const savedFilterArray = useSelector(
    state => state.filterReducer.filterArray,
  );

  const navigation = useNavigation('');
  const dispatch = useDispatch();
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;
  const userData = props.userData;
  const loading = props?.loading;
  const [visible, setVisible] = useState(false);
  const [filterArray, setFilterArray] = useState(savedFilterArray);
  const [locationArray, setLocationArray] = useState({
    country: '',
    state: '',
    city: '',
  });
  const [locationArrayCountry, setLocationArrayCountry] = useState();
  const [locationArrayState, setLocationArrayState] = useState();
  const [locationArrayCity, setLocationArrayCity] = useState();
  const [locationVisible, setLocationVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [openReached, setOpenReached] = useState(false);
  const [filteredData, setFilteredData] = useState('');
  const [sliderValue, setSliderValue] = useState(10000000);

  const getSavedQuickAdsHandler = () => {
    dispatch(getSavedQuickAdsApiAction(_id));
  };

  const getJobsByApplicantId = () => {
    const jobByApplicantId = {
      token: token,
      _id: _id,
    };

    dispatch(getJobsByApplicantIdAction(jobByApplicantId));
  };

  useEffect(() => {
    getJobsByApplicantId();
    getSavedQuickAdsHandler();
  }, []);

  const filteredLoginData = userData?.filter(
    item => item?.user_id?._id !== _id,
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const navigateToSaveScreen = () => {
    navigation.navigate('SavedScreen');
  };

  const renderItem = ({item}) => {
    return (
      <QuickAdsCardRenderItem
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        item={item}
      />
    );
  };
  const filterData = () => {
    if (filterArray.length === 0) {
      setFilteredData(filteredLoginData);
    } else {
      const filteredItems = filteredLoginData?.filter(item => {
        const filterValues = filterArray.map(filterItem => filterItem.value);
        const filterType = filterArray.map(filterItem => filterItem.type);
        const areFilterTypesSame = () => {
          if (filterArray.length === 0) return false;

          const filterTypes = filterArray.map(filterItem => filterItem.type);
          const firstType = filterTypes[0];

          const allTypesSame = filterTypes.every(type => type === firstType);

          return allTypesSame;
        };

        const allSame = areFilterTypesSame();

        const languageMatches =
          item.language &&
          filterValues.some(filterValue => item.language.includes(filterValue));
        const categoryMatches =
          item.category &&
          filterValues.some(filterValue => item.category.includes(filterValue));
        const vibeMatches =
          item.mood &&
          filterValues.some(filterValue => item.mood.includes(filterValue));
        const platformMatches = item.platform?.some(i =>
          filterValues.includes(i.platform_name),
        );

        const allConditionsMatch = [
          allSame &&
            ((languageMatches &&
              !categoryMatches &&
              !vibeMatches &&
              !platformMatches) ||
              (!languageMatches &&
                categoryMatches &&
                !vibeMatches &&
                !platformMatches) ||
              (!languageMatches &&
                !categoryMatches &&
                vibeMatches &&
                !platformMatches) ||
              (!languageMatches &&
                !categoryMatches &&
                !vibeMatches &&
                platformMatches)),
          allSame == false &&
            ((languageMatches && categoryMatches) ||
              (languageMatches && vibeMatches) ||
              (languageMatches && platformMatches) ||
              (categoryMatches && vibeMatches) ||
              (categoryMatches && platformMatches) ||
              (vibeMatches && platformMatches) ||
              (languageMatches && categoryMatches && vibeMatches) ||
              (languageMatches && categoryMatches && platformMatches) ||
              (languageMatches && vibeMatches && platformMatches) ||
              (categoryMatches && vibeMatches && platformMatches) ||
              (languageMatches &&
                categoryMatches &&
                vibeMatches &&
                platformMatches)),
        ];

        return allConditionsMatch.some(condition => condition);
      });
      setFilteredData(filteredItems);
    }
  };

  useEffect(() => {
    if (filterArray.length > 0) {
      filterData();
    } else {
      setFilteredData(filteredLoginData);
    }
  }, [filterArray]);

  const userType = useSelector(
    state => state.loginReducer?.user?.data?.data?.user_role,
  );

  const handleDeleteItem = item => {
    const updatedFilterArray = filterArray.filter(
      filterItem => filterItem !== item,
    );
    setFilterArray(updatedFilterArray);
  };

  const clearFilters = () => {
    setFilterArray([]);
    dispatch(clearFilter());
  };

  const HeaderShow = () => {
    if (userType == 'influencer' || userType == 'kid_influencer') {
      return (
        <EnterAppTopButtons
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          title1="Available"
          title2="My QuickAds"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <HeaderShow />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            activeOpacity={0.6}
            style={[styles.buttonStyle, {flexDirection: 'row'}]}>
            <SVG.FilterSec
              width={17}
              height={17}
              style={styles.filterIconStyle}
            />
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Filter}
            </Text>
            {filterArray.length > 0 && <Text style={styles.dotStyle}>•</Text>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLocationVisible(true)}
            activeOpacity={0.6}
            style={[styles.buttonStyle, {flexDirection: 'row'}]}>
            <SVG.Location
              width={17}
              height={17}
              style={styles.filterIconStyle}
            />
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Location}
            </Text>
            {locationArrayCountry?.length ||
            locationArrayState?.length ||
            locationArrayCity?.length > 0 ? (
              <Text
                style={[
                  styles.dotStyle,
                  {
                    right: scale(5),
                  },
                ]}>
                •
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <Divider
          style={{width: Dimensions.get('window').width, alignSelf: 'center'}}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: scale(10), marginBottom: scale(-10)}}>
          {locationArrayCountry?.length > 0 ? (
            <TouchableOpacity onPress={() => setLocationArrayCountry('')}>
              <View style={styles.selectBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.selectText}>{locationArrayCountry}</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <SVG.CloseCross
                      color={Colors.Primary500}
                      style={styles.filterIconStyleSec}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          {locationArrayState?.length > 0 ? (
            <TouchableOpacity onPress={() => setLocationArrayState('')}>
              <View style={styles.selectBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.selectText}>{locationArrayState}</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <SVG.CloseCross
                      color={Colors.Primary500}
                      style={styles.filterIconStyleSec}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          {locationArrayCity?.length > 0 ? (
            <TouchableOpacity onPress={() => setLocationArrayCity('')}>
              <View style={styles.selectBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.selectText}>{locationArrayCity}</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <SVG.CloseCross
                      color={Colors.Primary500}
                      style={styles.filterIconStyleSec}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
        </ScrollView>

        <View
          style={{
            marginTop: hp(2),
          }}>
          {filterArray?.length > 0 && (
            <FlatList
              data={filterArray}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  // onPress={() => handleDeleteItem(item)}
                  key={index}>
                  <View style={styles.selectBox}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.selectText}>{item?.value}</Text>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        //  onPress={() => handleDeleteItem(item)}
                        onPress={clearFilters}>
                        <SVG.CloseCross
                          color={Colors.Primary500}
                          style={styles.filterIconStyleSec}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setSearchVisible(true);
            }}>
            <SearchInputField
              editable={false}
              placeholder={AppLocalizedStrings.quickAdsHomescreen.search}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSaveScreen}>
            <SVG.Save />
          </TouchableOpacity>
        </View>

        {userData?.length > 0 ? (
          <>
            {/* timer ui commit */}

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setOpenReached(true);
              }}
              style={{
                alignItems: 'flex-start',
                marginTop: hp(2),
                marginBottom: hp(1.5),
                borderWidth: 1,
                borderColor: '#D3D3D3',
                borderRadius: 8,
                paddingVertical: hp(3),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.White}}>kjhgfd</Text>
              <View style={{alignItems: 'center'}}>
                <SVG.Time />
                <Text style={styles.limitReached}>
                  {AppLocalizedStrings.quickAdsHomescreen.limitReached}
                </Text>
                <Text style={styles.mainTextStyle}>Try in 23h 42m</Text>
              </View>
              <Tooltip
                width={257}
                height={'100@s'}
                withPointer={false}
                containerStyle={styles.tooltipStyle}
                // overlayColor="#555"
                overlayColor={(232, 255, 132)}
                popover={
                  <Text style={styles.tooltipTitle}>
                    You can only accept 10 QuickAd jobs per day (24 hours). This
                    limit helps prevent cancellations and ensures other
                    influencers have a fair chance to accept jobs. Feel free to
                    save jobs for later.
                  </Text>
                }>
                <SVG.IButton style={{marginRight: wp(4)}} />
              </Tooltip>
            </TouchableOpacity>
            {loading ? (
              <ScrollView>
                <AvailableSkeleton />
                <AvailableSkeleton />
              </ScrollView>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            )}
          </>
        ) : (
          <View style={styles.noPostContainer}>
            <SVG.DontHaveID style={styles.imageStyle} />
            <Text style={styles.noPostTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.NoQuickAds}
            </Text>
            <PrimaryButton
              title="Post QuickAds"
              onPress={() => navigation.navigate('CreateNewScreen')}
            />
          </View>
        )}
      </View>

      <FilterPopup
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
        setVisible={setVisible}
        setFilterArray={setFilterArray}
        visible={visible}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      <LocationPopup
        locationVisible={locationVisible}
        setLocationVisible={setLocationVisible}
        setLocationArray={setLocationArray}
        locationArray={locationArray}
        setLocationArrayCountry={setLocationArrayCountry}
        setLocationArrayState={setLocationArrayState}
        setLocationArrayCity={setLocationArrayCity}
      />
      <SearchPopup
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
      <LimitReachedPopup
        openReached={openReached}
        setOpenReached={setOpenReached}
      />
    </View>
  );
};

export default AvailableQuickAdsComponent;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: wp(3),
    paddingTop: hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    height: '33@s',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconStyle: {
    marginHorizontal: wp(1.5),
  },
  filterIconStyleSec: {
    marginBottom: hp(-1),
  },
  buttonTextStyle: {
    fontWeight: '400',
    fontSize: '13@s',
    color: Colors.Neutral900,
  },
  dotStyle: {
    fontWeight: '700',
    fontSize: '20@s',
    color: 'red',
    top: -5,
    alignSelf: 'flex-start',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    paddingHorizontal: '10@s',
    height: '30@s',
    borderRadius: '60@s',
    marginRight: '15@s',
    marginBottom: hp(1.5),
  },
  selectText: {
    fontWeight: '400',
    color: Colors.Primary500,
    fontSize: '16@s',
    top: 3,
  },
  //   {}
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  limitReached: {
    fontSize: '20@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    marginVertical: hp(1),
  },
  noPostContainer: {
    marginTop: '50@s',
  },
  imageStyle: {
    alignSelf: 'center',
  },
  noPostTextStyle: {
    fontSize: '29@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
    marginVertical: hp(3.5),
  },
  tooltipStyle: {
    backgroundColor: Colors.Primary500,
    marginRight: wp(4),
  },
  tooltipTitle: {
    color: Colors.White,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
  },
});
