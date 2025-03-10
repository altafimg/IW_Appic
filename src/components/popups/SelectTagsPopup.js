// SelectTagsPopup
import React, {useState} from 'react';
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
import {hp} from '../../utility/responsive/ScreenResponsive';
import NewHeader from '../NewHeader';
import SearchInputField from '../textInput/SearchInputField';
import PrimaryButton from '../buttons/PrimaryButton';

const SelectTagsPopup = props => {
  const visiable3 = props.visiable3;
  const setVisiable3 = props.setVisiable3;
  const tagsData = props.tagsData;
  const tags = props.tags;
  const setTags = props.setTags;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = tagsData?.filter(item =>
    item?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );

  const handleSelectCategory = selectedSubCategory => {
    if (tags.includes(selectedSubCategory)) {
      setTags(tags.filter(item => item !== selectedSubCategory));
    } else {
      setTags([...tags, selectedSubCategory]);
    }
  };
  return (
    <Overlay
      onRequestClose={() => setVisiable3(false)}
      onBackdropPress={() => setVisiable3(false)}
      isVisible={visiable3}
      overlayStyle={styles.overlayContainer}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewHeader
            headerTitle="Select Tags"
            onPress={() => setVisiable3(false)}
          />
          <View style={styles.main}>
            <SearchInputField
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Render Selected Categories */}
            <View style={styles.selectedContainer}>
              {tags.map((item, index) => (
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
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(item?.value)}>
                    <Text
                      style={[
                        styles.title,
                        tags.includes(item?.value) && styles.selectedCategory,
                      ]}>
                      {item?.value}
                    </Text>
                  </TouchableOpacity>
                  <Divider style={styles.divider} />
                </View>
              )}
            />
            <View style={{marginVertical: 40}}>
              <PrimaryButton title="Save" onPress={() => setVisiable3(false)} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Overlay>
  );
};

export default SelectTagsPopup;

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
