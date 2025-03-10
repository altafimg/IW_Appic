import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Divider, Overlay} from 'react-native-elements';

// images
import {hp} from '../../utility/responsive/ScreenResponsive';
import {useSelector} from 'react-redux';
import NewHeader from '../NewHeader';
import SearchInputField from '../textInput/SearchInputField';
import PrimaryButton from '../buttons/PrimaryButton';

const SelectCategoryPopup = props => {
  const visiable1 = props.visiable1;
  const setVisiable1 = props.setVisiable1;
  const category = props.category;
  const setCategory = props.setCategory;
  const data = props.data || [];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data?.filter(item =>
    item?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );

  // const profileBuildingData = useSelector(
  //   state => state.buildProfileDataReducer.data,
  // );

  // useEffect(() => {
  //   if (profileBuildingData?.category) {
  //     setCategory(profileBuildingData?.category);
  //   }
  // }, [profileBuildingData]);

  const handleSelectCategory = selectedCategory => {
    if (category.includes(selectedCategory)) {
      setCategory(category.filter(item => item !== selectedCategory));
    } else {
      setCategory([...category, selectedCategory]);
    }
  };
  return (
    <Overlay
      onRequestClose={() => setVisiable1(false)}
      onBackdropPress={() => setVisiable1(false)}
      isVisible={visiable1}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewHeader
            headerTitle="Select Category"
            onPress={() => setVisiable1(false)}
          />
          <View style={styles.main}>
            <SearchInputField
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Render Selected Categories */}
            <View style={styles.selectedContainer}>
              {category.map((item, index) => (
                <View key={index} style={styles.selectedItem}>
                  <Text style={styles.selectedText}>{item}</Text>
                  <TouchableOpacity onPress={() => handleSelectCategory(item)}>
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(item?.value)}>
                    <Text
                      style={[
                        styles.title,
                        category.includes(item?.value) &&
                          styles.selectedCategory,
                      ]}>
                      {item?.value}
                    </Text>
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </View>
              )}
            />
            <View style={{marginVertical: 40}}>
              <PrimaryButton title="Save" onPress={() => setVisiable1(false)} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Overlay>
  );
};

export default SelectCategoryPopup;

const styles = ScaledSheet.create({
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    width: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    height: '100%',
  },
  container: {
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
    marginTop: hp(5),
  },
  main: {
    marginTop: hp(3),
  },
  title: {
    color: '#171717',
    fontSize: '14@s',
    fontWeight: '400',
    paddingVertical: hp(1),
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: hp(2),
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
    paddingVertical: '5@s',
    borderRadius: '20@s',
    borderWidth: 0.5,
    borderColor: Colors.Primary500,
    marginRight: '10@s',
    marginBottom: '10@s',
  },
  selectedText: {
    color: Colors.Primary500,
    marginRight: '5@s',
    fontWeight: '400',
    fontSize: '14@s',
  },
  removeText: {
    color: Colors.Primary500,
    fontWeight: 'bold',
  },
  selectedCategory: {
    color: Colors.Primary500,
    fontWeight: '400',
    fontSize: '14@s',
  },
  divider: {
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    backgroundColor: Colors.Neutral400,
  },
});
