import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {ScaledSheet} from 'react-native-size-matters';
import {MultiSelect} from 'react-native-element-dropdown';
import {getCategoryAction} from '../../../redux/actions/getCategoryAction';
import {useDispatch} from 'react-redux';
import CustomToast from '../../../utility/CustomToast';

const MyCategoryComponent = ({categoryFormData, handleCategoryData}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryAction())
      .then(res => {
        const userData = res?.data?.user;

        const categories = userData?.map(item => ({
          label: item?.Categories,
          value: item?.Categories,
        }));
        handleCategoryData('categoryData', categories);

        if (categoryFormData.category.length === 0) {
          handleCategoryData('subData', []);
          handleCategoryData('tagsData', []);
          handleCategoryData('subCategory', []);
          handleCategoryData('tags', []);
          return;
        }

        const subCategories = userData
          ?.filter(obj =>
            categoryFormData?.category?.some(category =>
              obj.Categories?.includes(category),
            ),
          )
          ?.flatMap(item => item?.Subcategories?.split(', '))
          ?.filter(subcategory => subcategory?.trim() !== '');

        const formattedSubCategories = subCategories?.map(subcategory => ({
          label: subcategory,
          value: subcategory,
        }));

        handleCategoryData('subData', formattedSubCategories);

        const tagsFilterData = userData
          ?.filter(obj =>
            categoryFormData?.category?.some(category =>
              obj.Categories.includes(category),
            ),
          )
          ?.flatMap(item => item?.tags.split(', '))
          ?.filter(tags => tags.trim() !== '');

        const formattedTags = tagsFilterData?.map(item => ({
          label: item,
          value: item,
        }));

        handleCategoryData('tagsData', formattedTags);
      })
      .catch(err => {
        console.error(err, 'Error fetching categories');
      });
  }, [categoryFormData.category]);

  // useEffect(() => {
  //   dispatch(getCategoryAction())
  //     .then(res => {
  //       const userData = res?.data?.user;
  //       const categories = userData?.map(item => ({
  //         label: item?.Categories,
  //         value: item?.Categories,
  //       }));
  //       handleCategoryData('categoryData', categories);

  //       const subCategories = userData
  //         ?.filter(obj =>
  //           categoryFormData?.category?.some(category =>
  //             obj.Categories?.includes(category),
  //           ),
  //         )
  //         ?.flatMap(item => item?.Subcategories?.split(', '))
  //         ?.filter(subcategory => subcategory?.trim() !== '');

  //       const formattedSubCategories = subCategories?.map(subcategory => {
  //         return {label: subcategory, value: subcategory};
  //       });

  //       handleCategoryData('subData', formattedSubCategories);

  //       const tagsFilterData = userData
  //         ?.filter(obj =>
  //           categoryFormData?.category?.some(category =>
  //             obj.Categories.includes(category),
  //           ),
  //         )
  //         ?.flatMap(item => item?.tags.split(', '))
  //         ?.filter(tags => tags.trim() !== '');

  //       const formattedTags = tagsFilterData?.map(item => {
  //         return {label: item, value: item};
  //       });

  //       handleCategoryData('tagsData', formattedTags);
  //     })
  //     .catch(err => {
  //       console.error(err, 'Error fetching categories');
  //     });
  // }, [categoryFormData.category]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.editProfileScreen.category}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          maxHeight={500}
          search
          data={categoryFormData?.categoryData}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={categoryFormData.category}
          onChange={selectedItems => {
            const modifiedData = selectedItems?.map(item => item);
            handleCategoryData('category', modifiedData);
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>
      <View>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.editProfileScreen.subCategory}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          search
          data={categoryFormData?.subData}
          maxHeight={400}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={categoryFormData?.subCategory}
          onChange={item => {
            handleCategoryData('subCategory', item);
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>
      <View>
        <Text style={styles.textInputTitle}>
          {AppLocalizedStrings.editProfileScreen.tags}
        </Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={Colors.Primary500}
          search
          maxHeight={300}
          data={categoryFormData?.tagsData}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={categoryFormData?.tags}
          onChange={selectedTags => {
            if (selectedTags.length <= 10) {
              handleCategoryData('tags', selectedTags);

              handleCategoryData('limitMessage', false);
            } else {
              handleCategoryData('limitMessage', true);
            }
          }}
          selectedStyle={styles.selectedStyle}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {categoryFormData?.limitMessage ? (
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

export default MyCategoryComponent;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(3),
    paddingHorizontal: wp(3),
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
    marginTop: hp(2),
  },
  relationView: {
    marginVertical: hp(1),
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
