import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SelectCategoryDropDown from '../../../components/Auth/SelectCategoryDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {buildProfileDataAction} from '../../../redux/actions/buildProfileDataAction';
import {completeSteps} from '../../../redux/actions/completeStepsAction';
import {getCategoryAction} from '../../../redux/actions/getCategoryAction';
import SVG from '../../../assets/svg';
import SelectCategoryPopup from '../../../components/popups/SelectCategoryPopup';
import SelectSubCategoryPopup from '../../../components/popups/SelectSubCategoryPopup';
import SelectTagsPopup from '../../../components/popups/SelectTagsPopup';

const SelectYourCategoryScreen = ({navigation}) => {
  // const dispatch = useDispatch();

  // const profileBuildingData = useSelector(
  //   state => state.buildProfileDataReducer.data,
  // );

  // const [category, setCategory] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  // const [tags, setTags] = useState([]);
  // const [data, setData] = useState([]);
  // const [subData, setSubData] = useState([]);
  // const [tagsData, setTagsData] = useState([]);
  // const [limitMessage, setLimitMessage] = useState(false);

  // const [visiable1, setVisiable1] = useState(false);
  // const [visiable2, setVisiable2] = useState(false);
  // const [visiable3, setVisiable3] = useState(false);

  // console.log(category, '::::::::::');

  // useEffect(() => {
  //   dispatch(getCategoryAction())
  //     .then(res => {
  //       setData(res?.data?.user || []);
  //     })
  //     .catch(err => {
  //       console.error(err, 'Error fetching categories');
  //     });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (profileBuildingData) {
  //     if (profileBuildingData?.subCategory) {
  //       setSubCategory(profileBuildingData?.subCategory);
  //     }
  //     if (profileBuildingData?.tags) {
  //       setTags(profileBuildingData?.tags);
  //     }
  //   }
  // }, [profileBuildingData]);

  // useEffect(() => {
  //   dispatch(getCategoryAction())
  //     .then(res => {
  //       const userData = res?.data?.user;

  //       const subCategories = userData
  //         ?.filter(obj =>
  //           category.some(category => obj.Categories.includes(category)),
  //         )
  //         ?.flatMap(item => item?.Subcategories.split(', '))
  //         ?.filter(subcategory => subcategory.trim() !== '');

  //       const formattedSubCategories = subCategories.map(subcategory => {
  //         return {label: subcategory, value: subcategory};
  //       });

  //       setSubData(formattedSubCategories);

  //       const tagsFilterData = userData
  //         ?.filter(obj =>
  //           category.some(category => obj.Categories.includes(category)),
  //         )
  //         ?.flatMap(item => item?.tags.split(', '))
  //         ?.filter(tags => tags.trim() !== '');

  //       const formattedTags = tagsFilterData.map(item => {
  //         return {label: item, value: item};
  //       });

  //       setTagsData(formattedTags);
  //     })
  //     .catch(err => {
  //       console.error(err, 'Error fetching categories');
  //     });
  // }, [category]);

  // const onContinueHandler = () => {
  //   if (isFormIncomplete()) {
  //     console.log('Please fill in all fields');
  //     return;
  //   }
  //   const updatedProfileData = {
  //     ...profileBuildingData,
  //     category,
  //     subCategory,
  //     tags,
  //   };
  //   dispatch(buildProfileDataAction(updatedProfileData));
  //   dispatch(completeSteps(2));
  //   navigation.navigate('AddMusicVideosScreen');
  // };

  // const onSaveHandler = () => {
  //   if (isFormIncomplete()) {
  //     navigation.navigate('BuildProfileScreen');
  //   } else {
  //     const updatedProfileData = {
  //       ...profileBuildingData,
  //       category,
  //       subCategory,
  //       tags,
  //     };
  //     dispatch(buildProfileDataAction(updatedProfileData));
  //     dispatch(completeSteps(2));
  //     navigation.navigate('BuildProfileScreen');
  //   }
  // };

  // const isFormIncomplete = () => {
  //   return category.length === 0 || tags.length === 0;
  // };
  const dispatch = useDispatch();

  const profileBuildingData = useSelector(
    state => state.buildProfileDataReducer.data,
  );

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [limitMessage, setLimitMessage] = useState(false);

  const [visiable1, setVisiable1] = useState(false);
  const [visiable2, setVisiable2] = useState(false);
  const [visiable3, setVisiable3] = useState(false);

  useEffect(() => {
    if (profileBuildingData) {
      if (profileBuildingData?.category) {
        setCategory(profileBuildingData?.category);
      }
      if (profileBuildingData?.subCategory) {
        setSubCategory(profileBuildingData?.subCategory);
      }
      if (profileBuildingData?.tags) {
        setTags(profileBuildingData?.tags);
      }
    }
  }, [profileBuildingData]);

  useEffect(() => {
    dispatch(getCategoryAction())
      .then(res => {
        const userData = res?.data?.user;

        // categories
        const categories = userData?.map(item => ({
          label: item?.Categories,
          value: item?.Categories,
        }));
        setData(categories);

        const subCategories = userData
          ?.filter(obj =>
            category.some(category => obj.Categories.includes(category)),
          )
          ?.flatMap(item => item?.Subcategories.split(', '))
          ?.filter(subcategory => subcategory.trim() !== '');

        const formattedSubCategories = subCategories.map(subcategory => {
          return {label: subcategory, value: subcategory};
        });

        setSubData(formattedSubCategories);

        const tagsFilterData = userData
          ?.filter(obj =>
            category.some(category => obj.Categories.includes(category)),
          )
          ?.flatMap(item => item?.tags.split(', '))
          ?.filter(tags => tags.trim() !== '');

        const formattedTags = tagsFilterData.map(item => {
          return {label: item, value: item};
        });

        setTagsData(formattedTags);
      })
      .catch(err => {
        console.error(err, 'Error fetching categories');
      });
  }, [category]);

  const onContinueHandler = () => {
    if (isFormIncomplete()) {
      console.log('Please fill in all fields');
      return;
    }
    const updatedProfileData = {
      ...profileBuildingData,
      category,
      subCategory,
      tags,
    };
    dispatch(buildProfileDataAction(updatedProfileData));
    dispatch(completeSteps(2));
    navigation.navigate('AddMusicVideosScreen');
  };

  const onSaveHandler = () => {
    if (isFormIncomplete()) {
      navigation.navigate('BuildProfileScreen');
    } else {
      const updatedProfileData = {
        ...profileBuildingData,
        category,
        subCategory,
        tags,
      };
      dispatch(buildProfileDataAction(updatedProfileData));
      dispatch(completeSteps(2));
      navigation.navigate('BuildProfileScreen');
    }
  };

  const isFormIncomplete = () => {
    return category.length === 0 || tags.length === 0;
  };
  console.log(category);
  console.log(subCategory);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.topHeadTitle}>
          {AppLocalizedStrings.profilePictureScreen.step} 3 of 4
        </Text>
        <Header
          headerTitle={AppLocalizedStrings.selectYourCategoryScreen.select}
          subTitle={AppLocalizedStrings.selectYourCategoryScreen.so}
        />
        {/* <SelectCategoryDropDown
          category={category}
          setCategory={setCategory}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          tags={tags}
          setTags={setTags}
          data={data}
          subData={subData}
          tagsData={tagsData}
          limitMessage={limitMessage}
          setLimitMessage={setLimitMessage}
        /> */}
        <View>
          <View>
            <TouchableOpacity
              style={styles.card}
              //onPress={() => navigation.navigate('SelectCategoryScreen')}
              onPress={() => setVisiable1(true)}>
              <View style={styles.iconTitleView}>
                <Text style={styles.cardTitle}>Select a category</Text>
              </View>
              <TouchableOpacity>
                <SVG.LeftArrow width={24} height={24} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => setVisiable2(true)}>
              <View style={styles.iconTitleView}>
                <Text style={styles.cardTitle}>Select sub-categories</Text>
              </View>
              <TouchableOpacity>
                <SVG.LeftArrow width={24} height={24} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => setVisiable3(true)}>
              <View style={styles.iconTitleView}>
                <Text style={styles.cardTitle}>Select your tags</Text>
              </View>
              <TouchableOpacity>
                <SVG.LeftArrow width={24} height={24} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View>
        <PrimaryButton
          disabled={isFormIncomplete()}
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
        <TouchableOpacity style={styles.bottomButton} onPress={onSaveHandler}>
          <Text style={styles.buttonTitle}>
            {AppLocalizedStrings.selectYourCategoryScreen.save}
          </Text>
        </TouchableOpacity>
      </View>
      <SelectCategoryPopup
        setVisiable1={setVisiable1}
        visiable1={visiable1}
        category={category}
        setCategory={setCategory}
        data={data}
      />
      <SelectSubCategoryPopup
        setVisiable2={setVisiable2}
        visiable2={visiable2}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        subData={subData}
      />
      <SelectTagsPopup
        setVisiable3={setVisiable3}
        visiable3={visiable3}
        tags={tags}
        setTags={setTags}
        tagsData={tagsData}
      />
    </View>
  );
};

export default SelectYourCategoryScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  topHeadTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    paddingBottom: hp(1),
  },
  bottomButton: {
    marginTop: hp(2.3),
  },
  buttonTitle: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '400',
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginVertical: hp(1),
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#171717',
    fontSize: '14@s',
    fontWeight: '500',
  },
});
