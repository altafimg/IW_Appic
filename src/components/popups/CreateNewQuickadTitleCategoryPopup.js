import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {Divider, Overlay} from 'react-native-elements';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import SearchInputField from '../textInput/SearchInputField';
import PrimaryButton from '../buttons/PrimaryButton';
import {useDispatch} from 'react-redux';
import {getCategoryAction} from '../../redux/actions/getCategoryAction';
import {hp} from '../../utility/responsive/ScreenResponsive';
import SVG from '../../assets/svg';

const CreateNewQuickadTitleCategoryPopup = ({
  categoryVisible,
  setCategoryVisible,
  selectedCategories,
  setSelectedCategories,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getCategoryAction()).then(res => {
      const userData = res?.data?.user;
      setData(userData);
    });
  }, []);

  const categoryData = data || [];
  const filterData = categoryData?.filter(item =>
    item?.Categories.toUpperCase()?.includes(search?.toUpperCase()),
  );

  // **********MultiSelect Function*******
  // const toggleCategory = category => {
  //   const index = selectedCategories.indexOf(category);
  //   if (index === -1) {
  //     setSelectedCategories([...selectedCategories, category]);
  //   } else {
  //     const updatedCategories = selectedCategories.filter(
  //       cat => cat !== category,
  //     );
  //     setSelectedCategories(updatedCategories);
  //   }
  // };

  // **********SingleSelect Function*******
  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([category]);
    }
  };

  const handler = item => {
    toggleCategory(item?.Categories);
    setCategoryVisible(false);
  };

  const renderItem = ({item}) => {
    const isSelected = selectedCategories.includes(item?.Categories);
    return (
      <>
        <TouchableOpacity
          onPress={() => handler(item)}
          activeOpacity={0.6}
          style={[
            styles.categoryItem,
            {backgroundColor: isSelected ? Colors.Primary500 : Colors.White},
          ]}>
          <Text
            style={{
              fontSize: scale(15),
              fontWeight: '400',
              color: isSelected ? Colors.White : Colors.Neutral900,
            }}>
            {item?.Categories}
          </Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </>
    );
  };

  return (
    <Overlay
      onRequestClose={() => setCategoryVisible(false)}
      onBackdropPress={() => setCategoryVisible(false)}
      isVisible={categoryVisible}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.overlayContent}>
        <View style={{marginBottom: hp(3)}}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setCategoryVisible(false);
              }}>
              <SVG.Cross width={24} height={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {AppLocalizedStrings.quickAdsHomescreen.select_Category}
            </Text>
            <Text style={styles.headerSubTitle}>kk</Text>
          </View>
          <Divider style={styles.divider} />
        </View>
        <SearchInputField
          placeholder={AppLocalizedStrings.quickAdsHomescreen.search}
          value={search}
          onChangeText={t => setSearch(t)}
        />
        <Text style={styles.suggestedTitle}>SUGGESTED</Text>
        {filterData.length > 0 ? (
          <FlatList
            data={filterData}
            renderItem={renderItem}
            // keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.categoryList}
            key={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
        {/* <PrimaryButton title="Next" onPress={() => setCategoryVisible(false)} /> */}
      </View>
    </Overlay>
  );
};

export default CreateNewQuickadTitleCategoryPopup;

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
  overlayContent: {
    padding: scale(10),
    height: '100%',
  },
  headerText: {
    fontSize: '18@s',
    fontWeight: 'bold',
    color: Colors.Neutral900,
    marginBottom: '10@s',
  },
  categoryList: {
    marginTop: '10@s',
  },
  categoryItem: {
    paddingVertical: '11@s',
    // paddingHorizontal: '15@s',
    marginVertical: '5@s',
    borderRadius: '10@s',
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
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
  suggestedTitle: {
    color: '#000',
    fontSize: '10@s',
    fontWeight: '600',
    marginTop: hp(2),
  },
});
