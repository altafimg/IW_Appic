import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';
import {MultiSelect} from 'react-native-element-dropdown';
import CustomToast from '../../utility/CustomToast';

const SelectCategoryDropDown = ({
  category,
  setCategory,
  subCategory,
  setSubCategory,
  tags,
  setTags,
  data,
  subData,
  tagsData,
  limitMessage,
  setLimitMessage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.relationView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.selectYourCategoryScreen.selectA}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          maxHeight={200}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={category}
          onChange={selectedItems => {
            const data = selectedItems.map(item => item);
            setCategory(data);
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      <View style={styles.relationView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.selectYourCategoryScreen.add}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          search
          data={subData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={subCategory}
          onChange={item => {
            setSubCategory(item);
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      <View style={styles.relationView}>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.selectYourCategoryScreen.tags}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          search
          maxHeight={200}
          data={tagsData}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={tags}
          onChange={selectedTags => {
            if (selectedTags.length <= 10) {
              setTags(selectedTags);
              setLimitMessage(false);
            } else {
              setLimitMessage(true);
            }
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {limitMessage ? (
          <CustomToast
            message="You can't select more than 10 tags!"
            backgroundColor="#E72929"
            color="white"
          />
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

export default SelectCategoryDropDown;

const styles = ScaledSheet.create({
  container: {
    marginTop: hp(-1.5),
  },
  relationView: {
    marginVertical: hp(1),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '13@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
  },
  placeholderStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  iconStyle: {
    tintColor: Colors.Neutral800,
  },
  itemTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedTextStyle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedMainView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedView: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
    borderRadius: '60@s',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2.5),
    marginVertical: hp(1),
    marginHorizontal: wp(1),
  },
  selectedTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
    paddingVertical: hp(0.8),
    paddingRight: wp(1),
  },
  selectedStyle: {
    borderWidth: 1,
    color: Colors.Primary500,
    borderColor: Colors.Primary500,
    borderRadius: '60@s',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2.5),
    marginVertical: hp(1),
    marginHorizontal: wp(1),
  },
});
