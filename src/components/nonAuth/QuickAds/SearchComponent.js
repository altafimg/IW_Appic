import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {Divider} from 'react-native-elements';
import Colors from '../../../theme/Colors';
import close from '../../../assets/images/close.png';
import instagram from '../../../assets/images/instagram.png';
import SearchInputField from '../../textInput/SearchInputField';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SearchComponent = ({navigation, setSearchVisible}) => {
  const [search, setSearch] = useState('');
  const data = [
    {
      id: 1,
      name: 'mahendra',
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVDD_D0mDmK0UyXIh-yz-REXxz-Fyo9edsmIUR6BHUo-WYcwVRLa0OHxu9Pr_utVPhuI&usqp=CAU`,
      dec: `This is the title of the QuickAd, not the description. This is the title of the QuickAd not the des..`,
      language: 'English',
      Platform: instagram,
      Followers: '100k+',
      Target: 'United States',
      earning: '$1500',
      Spaces_remaining: '3',
      Days_remaining: '10',
    },
    {
      id: 2,
      name: 'ramesh',
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVDD_D0mDmK0UyXIh-yz-REXxz-Fyo9edsmIUR6BHUo-WYcwVRLa0OHxu9Pr_utVPhuI&usqp=CAU`,
      dec: `This is the title of the QuickAd, not the description. This is the title of the QuickAd not the des..`,
      language: 'English',
      Platform: instagram,
      Followers: '100k+',
      Target: 'United States',
      earning: '$1500',
      Spaces_remaining: '3',
      Days_remaining: '10',
    },
    {
      id: 3,
      name: 'hanees',
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVDD_D0mDmK0UyXIh-yz-REXxz-Fyo9edsmIUR6BHUo-WYcwVRLa0OHxu9Pr_utVPhuI&usqp=CAU`,
      dec: `This is the title of the QuickAd, not the description. This is the title of the QuickAd not the des..`,
      language: 'English',
      Platform: instagram,
      Followers: '100k+',
      Target: 'United States',
      earning: '$1500',
      Spaces_remaining: '3',
      Days_remaining: '10',
    },
    {
      id: 4,
      name: 'customers name',
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVDD_D0mDmK0UyXIh-yz-REXxz-Fyo9edsmIUR6BHUo-WYcwVRLa0OHxu9Pr_utVPhuI&usqp=CAU`,
      dec: `This is the title of the QuickAd, not the description. This is the title of the QuickAd not the des..`,
      language: 'English',
      Platform: instagram,
      Followers: '100k+',
      Target: 'United States',
      earning: '$1500',
      Spaces_remaining: '3',
      Days_remaining: '10',
    },
    {
      id: 5,
      name: 'customers name',
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVDD_D0mDmK0UyXIh-yz-REXxz-Fyo9edsmIUR6BHUo-WYcwVRLa0OHxu9Pr_utVPhuI&usqp=CAU`,
      dec: `This is the title of the QuickAd, not the description. This is the title of the QuickAd not the des..`,
      language: 'English',
      Platform: instagram,
      Followers: '100k+',
      Target: 'United States',
      earning: '$1500',
      Spaces_remaining: '3',
      Days_remaining: '10',
    },
  ];
  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
  const renderItem = ({item}) => {
    return (
      <View style={styles.dataCardContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.photo}} style={styles.cardPhotoStyle} />
          <View
            style={{
              marginHorizontal: 10,
              width: scale(215),
            }}>
            <Text style={[styles.cardNameStyle, {fontSize: scale(16)}]}>
              {item.name}
            </Text>
            <Text
              numberOfLines={3}
              style={[styles.cardDecStyle, {color: Colors.Neutral500}]}>
              {item.dec}
            </Text>
          </View>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Spaces_remaining}
          </Text>
          <Text style={styles.cardNameStyle}>{item.Spaces_remaining}</Text>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.daysLeft}
          </Text>
          <Text style={styles.cardNameStyle}>{item.Days_remaining}</Text>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Language}
          </Text>
          <Text style={styles.cardNameStyle}>{item.language}</Text>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Platform}
          </Text>
          <Image
            source={item.Platform}
            style={{width: scale(24), height: scale(24)}}
          />
          {/* <Text style={styles.cardNameStyle}>{item.Platform}</Text> */}
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Followers}
          </Text>
          <Text style={styles.cardNameStyle}>{item.Followers}</Text>
        </View>
        <View style={styles.cardDetailContainer}>
          <Text style={styles.cardDecStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Target}
          </Text>
          <Text style={styles.cardNameStyle}>{item.Target}</Text>
        </View>
        <Divider style={{paddingVertical: scale(7)}} />

        <View style={styles.cardDetailContainer1}>
          <Text style={styles.cardDecStyle1}>
            {AppLocalizedStrings.quickAdsHomescreen.earning}
          </Text>
          <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
            {item.earning}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(10),
          }}>
          <TouchableOpacity activeOpacity={0.6} style={styles.cardButtonStyle}>
            <Text style={styles.cardButtonTextStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Save}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.cardButtonStyle,
              {backgroundColor: Colors.Primary500},
            ]}>
            <Text
              style={[
                styles.cardButtonTextStyle,
                {
                  color: Colors.White,
                },
              ]}>
              {AppLocalizedStrings.quickAdsHomescreen.View}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setSearchVisible(false);
          }}>
          <Image source={close} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text style={styles.filterTextStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.search}
        </Text>
        <Text onPress={() => {}} style={styles.ResetTextStyle}>
          ...
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={{marginTop: 15}}>
        <SearchInputField
          value={search}
          onChangeText={t => setSearch(t)}
          placeholder="Search QuickAds"
        />

        <View style={{marginTop: scale(15)}}>
          <Text style={styles.recommendTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Recommended}
          </Text>
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
              <Text style={styles.notFoundText}>
                {AppLocalizedStrings.quickAdsHomescreen.noResult}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = ScaledSheet.create({
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
    color: Colors.White,
  },
  notFoundText: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
    marginTop: '240@s',
  },
  divider: {
    marginTop: '15@s',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginTop: '10@s',
    padding: '7@s',
    borderRadius: '5@s',
    alignSelf: 'center',
  },
  cardPhotoStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '15@s',
  },
  cardNameStyle: {
    color: Colors.Neutral800,
    fontWeight: '600',
    fontSize: '14@s',
  },
  cardDecStyle: {
    color: Colors.Neutral600,
    fontWeight: '400',
    fontSize: '14@s',
  },
  cardDecStyle1: {
    color: Colors.Neutral800,
    fontWeight: '400',
    fontSize: '16@s',
  },
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5@s',
    marginVertical: '8@s',
  },
  cardDetailContainer1: {
    backgroundColor: Colors.Primary500,
    marginTop: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5@s',
    height: '36@s',
    borderRadius: '5@s',
  },
  cardButtonStyle: {
    width: '147@s',
    height: '47@s',
    marginTop: '10@s',
    borderWidth: 2,
    borderColor: Colors.Primary500,
    borderRadius: '5@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
  recommendTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
});
