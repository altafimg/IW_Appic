import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import EnterAppTopButtons from '../../buttons/EnterAppTopButtons';
import SearchInputField from '../../textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {myQuickAdsAction} from '../../../redux/actions/myQuickadsAction';
import RenderMyQuickItem from '../QuickAds/RenderMyQuickItem';

//images
import no_post from '../../../assets/images/no_quickads.png';
import MyQuickAdsSearchPopup from '../../popups/MyQuickAdsSearchPopup';

const MyQuickAdsComponent = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const verifiedStatus = useSelector(
    state =>
      state.getLoggedInUserProfileReducer.data?.data?.data?.user_verify_status,
  );

  const navigation = useNavigation('');
  const selectedButton = props.selectedButton;
  const setSelectedButton = props.setSelectedButton;
  const userType = useSelector(
    state => state.loginReducer?.user?.data?.data?.user_role,
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('All');
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'In progress', value: 'in progress'},
    {label: 'Completed', value: 'Completed'},
    {label: 'Partially completed', value: 'Partially completed'},
    {label: 'Cancelled by IW admin', value: 'Cancelled by IW admin'},
    {label: 'Cancelled by the customer', value: 'Cancelled by the customer'},
    {label: 'Failed to deliver', value: 'Failed to Deliver'},
    {label: 'Expired', value: 'expired'},
  ]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(10000000);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const token = useSelector(state => state.loginReducer?.token);
  const _id = useSelector(state => state.loginReducer?.user?.data?.data?._id);

  const onQuickAdsHandler = () => {
    const data = {
      token: token,
      _id: _id,
    };
    dispatch(myQuickAdsAction(data));
  };

  useEffect(() => {
    if (isFocused) {
      onQuickAdsHandler();
    }
  }, [isFocused, dispatch]);

  const userData = useSelector(
    state => state?.myQuickAdsReducer?.data?.data?.data,
  );

  const jobsData = userData || [];

  const filterData = jobsData.filter(item => {
    const matchesSearch = item.quick_ads_title
      .toUpperCase()
      .includes(search.toUpperCase());
    const matchesStatus = value === 'All' || item.adsStatus === value;
    return matchesSearch && matchesStatus;
  });

  const HeaderShow = () => {
    const userType = useSelector(
      state => state.loginReducer?.user?.data?.data?.user_role,
    );
    if (userType == 'influencer' || userType == 'kid_influencer') {
      return (
        <EnterAppTopButtons
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          title1="Available"
          title2="My QuickAds"
        />
      );
    }
    return null;
  };

  const renderMyQuickItem = ({item}) => {
    return <RenderMyQuickItem item={item} />;
  };

  return (
    <View>
      <HeaderShow />
      <View style={styles.container}>
        <View>
          <View style={{marginTop: scale(20)}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setSearchVisible(true);
              }}>
              <SearchInputField
                placeholder={AppLocalizedStrings.quickAdsHomescreen.search}
                value={search}
                onChangeText={t => setSearch(t)}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          {verifiedStatus === 'verified' ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('CreateNewScreen');
              }}
              // disabled={verifiedStatus === 'verified' ? false : true}
              style={[
                styles.buttonContainer1,
                {
                  backgroundColor: Colors.Primary500,
                },
              ]}>
              <Text style={styles.newButtonTextStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.create_new}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('VerifyYourAccountScreen');
              }}
              style={[
                styles.buttonContainer1,
                {
                  backgroundColor: Colors.Neutral400,
                },
              ]}>
              <Text style={styles.newButtonTextStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.create_new}
              </Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('CreateNewScreen');
            }}
            disabled={verifiedStatus === 'verified' ? false : true}
            style={[
              styles.buttonContainer1,
              {
                backgroundColor:
                  verifiedStatus === 'verified'
                    ? Colors.Primary500
                    : Colors.Neutral400,
              },
            ]}>
            <Text style={styles.newButtonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.create_new}
            </Text>
          </TouchableOpacity> */}
          <View
            style={{marginTop: scale(10), marginBottom: scale(10), zIndex: 1}}>
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.showing}
            </Text>

            <DropDownPicker
              style={styles.mainContainer}
              customItemLabelStyle={styles.mainTextStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholderStyle={styles.mainTextStyle}
              placeholder="All"
            />
          </View>
          {filterData.length > 0 ? (
            <FlatList
              data={filterData}
              renderItem={renderMyQuickItem}
              inverted
              contentContainerStyle={{
                paddingBottom: scale(300),
              }}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noPostContainer}>
              <Image source={no_post} style={styles.imageStyle} />
              <Text style={[styles.noPostTextStyle, {fontSize: scale(24)}]}>
                {AppLocalizedStrings.quickAdsHomescreen.A_new_QuickAds}
              </Text>
              <Text
                style={[
                  styles.cardButtonTextStyle,
                  {
                    color: Colors.Neutral400,
                    fontSize: scale(12),
                    textAlign: 'center',
                    marginTop: 10,
                  },
                ]}>
                {AppLocalizedStrings.quickAdsHomescreen.A_new_QuickAds1}
              </Text>
            </View>
          )}
        </View>
      </View>
      <MyQuickAdsSearchPopup
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        searchVisible={searchVisible}
        setSearchVisible={setSearchVisible}
      />
    </View>
  );
};

export default MyQuickAdsComponent;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: wp(3),
  },
  mainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5@s',
    height: '36@s',
    marginTop: '10@s',
    paddingHorizontal: '10@s',
  },
  buttonContainer1: {
    height: '53@s',
    marginTop: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '4@s',
  },
  newButtonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
    marginBottom: hp(-1),
    marginTop: hp(1),
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  dropDownContainerStyle: {
    backgroundColor: Colors.Neutral100,
    marginTop: '12@s',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 0.2,
  },
  noPostContainer: {
    marginTop: '50@s',
  },
  imageStyle: {
    width: '152@s',
    height: '158@s',
    alignSelf: 'center',
  },
  noPostTextStyle: {
    fontSize: '29@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    alignSelf: 'center',
    marginTop: '40@s',
  },
  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
});
